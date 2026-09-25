from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import desc, select
from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    create_refresh_token,
    hash_password,
    verify_password,
)
from app.db.session import get_db
from app.models.email_verification import EmailVerificationCode
from app.models.membership import RestaurantMember
from app.models.password_reset import PasswordResetCode
from app.models.restaurant import Restaurant
from app.models.user import User
from app.schemas.auth import (
    ForgotPasswordRequest,
    LoginRequest,
    MessageResponse,
    RegisterRequest,
    ResendVerificationRequest,
    ResetPasswordRequest,
    TokenResponse,
    VerifyEmailRequest,
    VerifyResetCodeRequest,
)
from app.services.email import (
    send_password_reset_email,
    send_verification_email,
)
from app.utils.verification import (
    generate_verification_code,
    hash_verification_code,
    verify_verification_code,
)


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"],
)


CODE_EXPIRATION_MINUTES = 10
MAX_CODE_ATTEMPTS = 5
RESEND_COOLDOWN_SECONDS = 60


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


def _can_resend(created_at: datetime | None) -> bool:
    if not created_at:
        return True

    now = _utc_now()

    if created_at.tzinfo is None:
        created_at = created_at.replace(tzinfo=timezone.utc)

    elapsed = (now - created_at).total_seconds()

    return elapsed >= RESEND_COOLDOWN_SECONDS


def _create_email_verification_code(
    db: Session,
    user: User,
) -> str:
    code = generate_verification_code()

    verification = EmailVerificationCode(
        user_id=user.id,
        code_hash=hash_verification_code(code),
        expires_at=_utc_now()
        + timedelta(minutes=CODE_EXPIRATION_MINUTES),
    )

    db.add(verification)
    db.commit()

    return code


def _create_password_reset_code(
    db: Session,
    user: User,
) -> str:
    code = generate_verification_code()

    reset_code = PasswordResetCode(
        user_id=user.id,
        code_hash=hash_verification_code(code),
        expires_at=_utc_now()
        + timedelta(minutes=CODE_EXPIRATION_MINUTES),
    )

    db.add(reset_code)
    db.commit()

    return code


@router.post(
    "/register",
    response_model=MessageResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db),
):
    existing_user = db.scalar(
        select(User).where(User.email == data.email)
    )

    if existing_user:
        if not existing_user.is_email_verified:
            latest_code = db.scalar(
                select(EmailVerificationCode)
                .where(
                    EmailVerificationCode.user_id
                    == existing_user.id
                )
                .order_by(
                    desc(EmailVerificationCode.created_at)
                )
            )

            if latest_code and not _can_resend(
                latest_code.created_at
            ):
                raise HTTPException(
                    status_code=429,
                    detail=(
                        "A verification code was already sent. "
                        "Please wait before requesting another."
                    ),
                )

            code = _create_email_verification_code(
                db,
                existing_user,
            )

            send_verification_email(
                to_email=existing_user.email,
                full_name=existing_user.full_name,
                code=code,
            )

            return MessageResponse(
                message=(
                    "Your account already exists but is not verified. "
                    "A new verification code has been sent."
                )
            )

        raise HTTPException(
            status_code=400,
            detail="An account with this email already exists.",
        )

    user = User(
        full_name=data.full_name,
        email=data.email,
        phone=data.phone,
        password_hash=hash_password(data.password),
        is_email_verified=False,
    )

    restaurant = Restaurant(
        name=data.restaurant_name,
        phone=data.phone,
    )

    db.add(user)
    db.add(restaurant)

    db.flush()

    membership = RestaurantMember(
        user_id=user.id,
        restaurant_id=restaurant.id,
        role="owner",
    )

    db.add(membership)

    db.commit()
    db.refresh(user)

    code = _create_email_verification_code(
        db,
        user,
    )

    send_verification_email(
        to_email=user.email,
        full_name=user.full_name,
        code=code,
    )

    return MessageResponse(
        message=(
            "Registration successful. "
            "Please check your email for your verification code."
        )
    )


@router.post(
    "/verify-email",
    response_model=MessageResponse,
)
def verify_email(
    data: VerifyEmailRequest,
    db: Session = Depends(get_db),
):
    user = db.scalar(
        select(User).where(User.email == data.email)
    )

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Invalid verification code.",
        )

    if user.is_email_verified:
        return MessageResponse(
            message="Your email is already verified."
        )

    verification = db.scalar(
        select(EmailVerificationCode)
        .where(
            EmailVerificationCode.user_id == user.id,
            EmailVerificationCode.used_at.is_(None),
        )
        .order_by(
            desc(EmailVerificationCode.created_at)
        )
    )

    if not verification:
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired verification code.",
        )

    now = _utc_now()

    if verification.expires_at < now:
        raise HTTPException(
            status_code=400,
            detail="This verification code has expired.",
        )

    if verification.attempts >= MAX_CODE_ATTEMPTS:
        raise HTTPException(
            status_code=400,
            detail="Too many incorrect attempts. Please request a new code.",
        )

    if not verify_verification_code(
        data.code,
        verification.code_hash,
    ):
        verification.attempts += 1
        db.commit()

        raise HTTPException(
            status_code=400,
            detail="Invalid verification code.",
        )

    verification.used_at = now

    user.is_email_verified = True
    user.email_verified_at = now

    db.commit()

    return MessageResponse(
        message="Email verified successfully. You can now log in."
    )


@router.post(
    "/resend-verification",
    response_model=MessageResponse,
)
def resend_verification(
    data: ResendVerificationRequest,
    db: Session = Depends(get_db),
):
    user = db.scalar(
        select(User).where(User.email == data.email)
    )

    if not user:
        return MessageResponse(
            message=(
                "If an account exists with this email, "
                "a verification code will be sent."
            )
        )

    if user.is_email_verified:
        return MessageResponse(
            message="Your email is already verified."
        )

    latest_code = db.scalar(
        select(EmailVerificationCode)
        .where(
            EmailVerificationCode.user_id == user.id
        )
        .order_by(
            desc(EmailVerificationCode.created_at)
        )
    )

    if latest_code and not _can_resend(
        latest_code.created_at
    ):
        raise HTTPException(
            status_code=429,
            detail=(
                "Please wait 60 seconds before requesting "
                "another verification code."
            ),
        )

    code = _create_email_verification_code(
        db,
        user,
    )

    send_verification_email(
        to_email=user.email,
        full_name=user.full_name,
        code=code,
    )

    return MessageResponse(
        message="A new verification code has been sent."
    )


@router.post(
    "/forgot-password",
    response_model=MessageResponse,
)
def forgot_password(
    data: ForgotPasswordRequest,
    db: Session = Depends(get_db),
):
    user = db.scalar(
        select(User).where(User.email == data.email)
    )

    # Deliberately return the same response whether the
    # account exists or not. This prevents email enumeration.
    if not user:
        return MessageResponse(
            message=(
                "If an account exists with this email, "
                "a password reset code will be sent."
            )
        )

    if not user.is_active:
        return MessageResponse(
            message=(
                "If an account exists with this email, "
                "a password reset code will be sent."
            )
        )

    latest_code = db.scalar(
        select(PasswordResetCode)
        .where(
            PasswordResetCode.user_id == user.id
        )
        .order_by(
            desc(PasswordResetCode.created_at)
        )
    )

    if latest_code and not _can_resend(
        latest_code.created_at
    ):
        return MessageResponse(
            message=(
                "If an account exists with this email, "
                "a password reset code will be sent."
            )
        )

    code = _create_password_reset_code(
        db,
        user,
    )

    send_password_reset_email(
        to_email=user.email,
        full_name=user.full_name,
        code=code,
    )

    return MessageResponse(
        message=(
            "If an account exists with this email, "
            "a password reset code will be sent."
        )
    )


@router.post(
    "/verify-reset-code",
    response_model=MessageResponse,
)
def verify_reset_code(
    data: VerifyResetCodeRequest,
    db: Session = Depends(get_db),
):
    user = db.scalar(
        select(User).where(User.email == data.email)
    )

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired reset code.",
        )

    reset_code = db.scalar(
        select(PasswordResetCode)
        .where(
            PasswordResetCode.user_id == user.id,
            PasswordResetCode.used_at.is_(None),
        )
        .order_by(
            desc(PasswordResetCode.created_at)
        )
    )

    if not reset_code:
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired reset code.",
        )

    now = _utc_now()

    if reset_code.expires_at < now:
        raise HTTPException(
            status_code=400,
            detail="This reset code has expired.",
        )

    if reset_code.attempts >= MAX_CODE_ATTEMPTS:
        raise HTTPException(
            status_code=400,
            detail="Too many incorrect attempts. Please request a new code.",
        )

    if not verify_verification_code(
        data.code,
        reset_code.code_hash,
    ):
        reset_code.attempts += 1
        db.commit()

        raise HTTPException(
            status_code=400,
            detail="Invalid reset code.",
        )

    return MessageResponse(
        message="Reset code verified successfully."
    )


@router.post(
    "/reset-password",
    response_model=MessageResponse,
)
def reset_password(
    data: ResetPasswordRequest,
    db: Session = Depends(get_db),
):
    user = db.scalar(
        select(User).where(User.email == data.email)
    )

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired reset code.",
        )

    reset_code = db.scalar(
        select(PasswordResetCode)
        .where(
            PasswordResetCode.user_id == user.id,
            PasswordResetCode.used_at.is_(None),
        )
        .order_by(
            desc(PasswordResetCode.created_at)
        )
    )

    if not reset_code:
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired reset code.",
        )

    now = _utc_now()

    if reset_code.expires_at < now:
        raise HTTPException(
            status_code=400,
            detail="This reset code has expired.",
        )

    if reset_code.attempts >= MAX_CODE_ATTEMPTS:
        raise HTTPException(
            status_code=400,
            detail="Too many incorrect attempts. Please request a new code.",
        )

    if not verify_verification_code(
        data.code,
        reset_code.code_hash,
    ):
        reset_code.attempts += 1
        db.commit()

        raise HTTPException(
            status_code=400,
            detail="Invalid reset code.",
        )

    user.password_hash = hash_password(
        data.new_password
    )

    reset_code.used_at = now

    db.commit()

    return MessageResponse(
        message="Password reset successfully. You can now log in."
    )


@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
):
    user = db.scalar(
        select(User).where(User.email == data.email)
    )

    if not user or not verify_password(
        data.password,
        user.password_hash,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=403,
            detail="This account is inactive.",
        )

    if not user.is_email_verified:
        raise HTTPException(
            status_code=403,
            detail="Please verify your email before logging in.",
        )

    membership = db.scalar(
        select(RestaurantMember)
        .where(
            RestaurantMember.user_id == user.id,
        )
        .order_by(RestaurantMember.id)
    )

    if not membership:
        raise HTTPException(
            status_code=403,
            detail="You are not a member of any restaurant.",
        )

    restaurant = db.get(
        Restaurant,
        membership.restaurant_id,
    )

    if not restaurant:
        raise HTTPException(
            status_code=403,
            detail="Restaurant not found.",
        )

    if not restaurant.is_active:
        raise HTTPException(
            status_code=403,
            detail="This restaurant is inactive.",
        )

    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        user_id=user.id,
        full_name=user.full_name,
        email=user.email,
        restaurant_id=restaurant.id,
        restaurant_name=restaurant.name,
        role=membership.role,
    )