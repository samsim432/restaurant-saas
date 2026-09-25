from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies.restaurant import get_current_restaurant_id
from app.db.session import get_db
from app.models.restaurant import Restaurant


router = APIRouter(
    prefix="/api/restaurant",
    tags=["Restaurant"],
)


class RestaurantResponse(BaseModel):
    id: int
    name: str
    address: str | None
    city: str | None
    phone: str | None
    is_active: bool


class RestaurantUpdateRequest(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=150)
    address: str | None = Field(default=None, max_length=255)
    city: str | None = Field(default=None, max_length=100)
    phone: str | None = Field(default=None, max_length=30)


@router.get("", response_model=RestaurantResponse)
def get_restaurant(
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    restaurant = db.scalar(
        select(Restaurant).where(Restaurant.id == restaurant_id)
    )

    if not restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found.",
        )

    return restaurant


@router.patch("", response_model=RestaurantResponse)
def update_restaurant(
    data: RestaurantUpdateRequest,
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    restaurant = db.scalar(
        select(Restaurant).where(Restaurant.id == restaurant_id)
    )

    if not restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found.",
        )

    updates = data.model_dump(exclude_unset=True)

    for field, value in updates.items():
        setattr(restaurant, field, value)

    db.commit()
    db.refresh(restaurant)

    return restaurant