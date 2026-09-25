from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies.auth import get_current_user
from app.db.session import get_db
from app.models.membership import RestaurantMember
from app.models.restaurant import Restaurant
from app.models.user import User

router = APIRouter(prefix="/api", tags=["Current User"])


@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    membership = db.scalar(
        select(RestaurantMember)
        .where(RestaurantMember.user_id == current_user.id)
        .order_by(RestaurantMember.id)
    )

    restaurant = None

    if membership:
        restaurant = db.scalar(
            select(Restaurant)
            .where(Restaurant.id == membership.restaurant_id)
        )

    return {
        "user": {
            "id": current_user.id,
            "full_name": current_user.full_name,
            "email": current_user.email,
            "phone": current_user.phone,
        },
        "restaurant": (
            {
                "id": restaurant.id,
                "name": restaurant.name,
                "address": restaurant.address,
                "city": restaurant.city,
                "phone": restaurant.phone,
            }
            if restaurant
            else None
        ),
        "role": membership.role if membership else None,
    }