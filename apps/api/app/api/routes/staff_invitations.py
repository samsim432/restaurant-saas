from datetime import datetime, timedelta, timezone
import hashlib
import secrets

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies.auth import get_current_user
from app.core.security import hash_password
from app.db.session import get_db
from app.models.membership import RestaurantMember
from app.models.restaurant import Restaurant
from app.models.staff_invitation import StaffInvitation
from app.models.user import User
from app.schemas.staff import (
    StaffInvitationAccept,
    StaffInvitationCreate,
    StaffInvitationResponse,
)

router = APIRouter(
    prefix="/api/staff/invitations",
    tags=["Staff Invitations"],
)

INVITATION_EXPIRATION_HOURS = 48


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


@router.post(
    "",
    response_model=StaffInvitationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_staff_invitation(
    data: StaffInvitationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Create a staff invitation.

    Only restaurant owners can invite staff.
    """

    membership = db.scalar(
        select(RestaurantMember)
        .where(
            RestaurantMember.user_id == current_user.id,
            RestaurantMember.role == "owner",
        )
        .order_by(RestaurantMember.id)
    )

    if not membership:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only restaurant owners can invite staff.",
        )

    restaurant = db.get(
        Restaurant,
        membership.restaurant_id,
    )

    if not restaurant or not restaurant.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Restaurant is not active.",
        )

    existing_user = db.scalar(
        select(User)
        .where(User.email == data.email)
    )

    if existing_user:
        existing_membership = db.scalar(
            select(RestaurantMember)
            .where(
                RestaurantMember.user_id == existing_user.id,
                RestaurantMember.restaurant_id
                == membership.restaurant_id,
            )
        )

        if existing_membership:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="This user is already a member of your restaurant.",
            )

    existing_invitation = db.scalar(
        select(StaffInvitation)
        .where(
            StaffInvitation.restaurant_id
            == membership.restaurant_id,
            StaffInvitation.email == data.email,
            StaffInvitation.accepted_at.is_(None),
        )
        .order_by(StaffInvitation.created_at.desc())
    )

    if existing_invitation:
        now = datetime.now(timezone.utc)

        if existing_invitation.expires_at > now:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="An active invitation already exists for this email.",
            )

    raw_token = secrets.token_urlsafe(48)

    invitation = StaffInvitation(
        restaurant_id=membership.restaurant_id,
        invited_by_user_id=current_user.id,
        email=data.email,
        full_name=data.full_name,
        phone=data.phone,
        role=data.role,
        token_hash=hash_token(raw_token),
        expires_at=(
            datetime.now(timezone.utc)
            + timedelta(hours=INVITATION_EXPIRATION_HOURS)
        ),
    )

    db.add(invitation)
    db.commit()
    db.refresh(invitation)

    # Development only.
    #
    # The raw token is intentionally NOT stored in the database.
    # Once SMTP is configured, this token will be included in
    # the staff invitation email.
    print(
        f"STAFF INVITATION TOKEN for {data.email}: {raw_token}"
    )

    return StaffInvitationResponse(
        id=invitation.id,
        message="Staff invitation created successfully.",
    )


@router.post(
    "/accept",
    response_model=StaffInvitationResponse,
)
def accept_staff_invitation(
    data: StaffInvitationAccept,
    db: Session = Depends(get_db),
):
    """
    Accept a staff invitation and create/activate the staff account.
    """

    token_hash = hash_token(data.token)

    invitation = db.scalar(
        select(StaffInvitation)
        .where(
            StaffInvitation.token_hash == token_hash,
            StaffInvitation.accepted_at.is_(None),
        )
    )

    if not invitation:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired invitation.",
        )

    now = datetime.now(timezone.utc)

    if invitation.expires_at <= now:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This invitation has expired.",
        )

    existing_user = db.scalar(
        select(User)
        .where(User.email == invitation.email)
    )

    if existing_user:
        user = existing_user

        if not user.is_active:
            user.is_active = True

        user.full_name = invitation.full_name

        if invitation.phone:
            user.phone = invitation.phone

        user.password_hash = hash_password(
            data.password
        )

        user.is_email_verified = True
        user.email_verified_at = now

    else:
        user = User(
            full_name=invitation.full_name,
            email=invitation.email,
            phone=invitation.phone,
            password_hash=hash_password(
                data.password
            ),
            is_active=True,
            is_email_verified=True,
            email_verified_at=now,
        )

        db.add(user)
        db.flush()

    existing_membership = db.scalar(
        select(RestaurantMember)
        .where(
            RestaurantMember.user_id == user.id,
            RestaurantMember.restaurant_id
            == invitation.restaurant_id,
        )
    )

    if existing_membership:
        existing_membership.role = invitation.role
    else:
        membership = RestaurantMember(
            user_id=user.id,
            restaurant_id=invitation.restaurant_id,
            role=invitation.role,
        )

        db.add(membership)

    invitation.accepted_at = now

    db.commit()

    return StaffInvitationResponse(
        id=invitation.id,
        message="Staff account activated successfully.",
    )