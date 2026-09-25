from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies.restaurant import get_current_restaurant_id
from app.db.session import get_db
from app.models.membership import RestaurantMember
from app.models.user import User


router = APIRouter(
    prefix="/api/staff",
    tags=["Staff"],
)


class StaffResponse(BaseModel):
    membership_id: int
    user_id: int
    full_name: str
    email: str
    phone: str | None
    role: str
    is_active: bool


class StaffRoleUpdate(BaseModel):
    role: str = Field(pattern="^(owner|manager|staff)$")


@router.get("", response_model=list[StaffResponse])
def list_staff(
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    rows = db.execute(
        select(RestaurantMember, User)
        .join(User, RestaurantMember.user_id == User.id)
        .where(RestaurantMember.restaurant_id == restaurant_id)
        .order_by(RestaurantMember.id)
    ).all()

    return [
        StaffResponse(
            membership_id=membership.id,
            user_id=user.id,
            full_name=user.full_name,
            email=user.email,
            phone=user.phone,
            role=membership.role,
            is_active=user.is_active,
        )
        for membership, user in rows
    ]


@router.patch("/{membership_id}", response_model=StaffResponse)
def update_staff(
    membership_id: int,
    data: StaffRoleUpdate,
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    membership = db.scalar(
        select(RestaurantMember).where(
            RestaurantMember.id == membership_id,
            RestaurantMember.restaurant_id == restaurant_id,
        )
    )

    if not membership:
        raise HTTPException(
            status_code=404,
            detail="Staff member not found.",
        )

    membership.role = data.role

    user = db.scalar(
        select(User).where(User.id == membership.user_id)
    )

    db.commit()

    return StaffResponse(
        membership_id=membership.id,
        user_id=user.id,
        full_name=user.full_name,
        email=user.email,
        phone=user.phone,
        role=membership.role,
        is_active=user.is_active,
    )


@router.post("/{membership_id}/deactivate", response_model=StaffResponse)
def deactivate_staff(
    membership_id: int,
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    membership = db.scalar(
        select(RestaurantMember).where(
            RestaurantMember.id == membership_id,
            RestaurantMember.restaurant_id == restaurant_id,
        )
    )

    if not membership:
        raise HTTPException(
            status_code=404,
            detail="Staff member not found.",
        )

    user = db.scalar(
        select(User).where(User.id == membership.user_id)
    )

    if membership.role == "owner":
        raise HTTPException(
            status_code=400,
            detail="The restaurant owner cannot be deactivated.",
        )

    user.is_active = False

    db.commit()

    return StaffResponse(
        membership_id=membership.id,
        user_id=user.id,
        full_name=user.full_name,
        email=user.email,
        phone=user.phone,
        role=membership.role,
        is_active=user.is_active,
    )


@router.post("/{membership_id}/activate", response_model=StaffResponse)
def activate_staff(
    membership_id: int,
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    membership = db.scalar(
        select(RestaurantMember).where(
            RestaurantMember.id == membership_id,
            RestaurantMember.restaurant_id == restaurant_id,
        )
    )

    if not membership:
        raise HTTPException(
            status_code=404,
            detail="Staff member not found.",
        )

    user = db.scalar(
        select(User).where(User.id == membership.user_id)
    )

    user.is_active = True

    db.commit()

    return StaffResponse(
        membership_id=membership.id,
        user_id=user.id,
        full_name=user.full_name,
        email=user.email,
        phone=user.phone,
        role=membership.role,
        is_active=user.is_active,
    )