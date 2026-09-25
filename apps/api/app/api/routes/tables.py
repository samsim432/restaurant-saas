import secrets

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies.restaurant import get_current_restaurant_id
from app.db.session import get_db
from app.models.table import RestaurantTable


router = APIRouter(
    prefix="/api/tables",
    tags=["Tables"],
)


class TableCreateRequest(BaseModel):
    name: str = Field(min_length=1, max_length=50)
    capacity: int = Field(default=2, ge=1, le=50)


class TableUpdateRequest(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=50)
    capacity: int | None = Field(default=None, ge=1, le=50)
    is_active: bool | None = None


class TableResponse(BaseModel):
    id: int
    name: str
    capacity: int
    qr_token: str
    is_active: bool


@router.get("", response_model=list[TableResponse])
def list_tables(
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    return list(
        db.scalars(
            select(RestaurantTable)
            .where(RestaurantTable.restaurant_id == restaurant_id)
            .order_by(RestaurantTable.id)
        )
    )


@router.post(
    "",
    response_model=TableResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_table(
    data: TableCreateRequest,
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    table = RestaurantTable(
        restaurant_id=restaurant_id,
        name=data.name,
        capacity=data.capacity,
        qr_token=secrets.token_urlsafe(32),
        is_active=True,
    )

    db.add(table)
    db.commit()
    db.refresh(table)

    return table


@router.patch("/{table_id}", response_model=TableResponse)
def update_table(
    table_id: int,
    data: TableUpdateRequest,
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    table = db.scalar(
        select(RestaurantTable).where(
            RestaurantTable.id == table_id,
            RestaurantTable.restaurant_id == restaurant_id,
        )
    )

    if not table:
        raise HTTPException(
            status_code=404,
            detail="Table not found.",
        )

    updates = data.model_dump(exclude_unset=True)

    for field, value in updates.items():
        setattr(table, field, value)

    db.commit()
    db.refresh(table)

    return table


@router.delete("/{table_id}")
def delete_table(
    table_id: int,
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    table = db.scalar(
        select(RestaurantTable).where(
            RestaurantTable.id == table_id,
            RestaurantTable.restaurant_id == restaurant_id,
        )
    )

    if not table:
        raise HTTPException(
            status_code=404,
            detail="Table not found.",
        )

    db.delete(table)
    db.commit()

    return {
        "message": "Table deleted successfully.",
    }