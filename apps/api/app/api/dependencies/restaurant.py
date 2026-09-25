from fastapi import Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies.auth import get_current_user
from app.db.session import get_db
from app.models.membership import RestaurantMember
from app.models.user import User


def get_current_membership(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> RestaurantMember:
    membership = db.scalar(
        select(RestaurantMember)
        .where(RestaurantMember.user_id == current_user.id)
        .order_by(RestaurantMember.id)
    )

    if not membership:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not a member of any restaurant.",
        )

    return membership


def get_current_restaurant_id(
    membership: RestaurantMember = Depends(get_current_membership),
) -> int:
    return membership.restaurant_id