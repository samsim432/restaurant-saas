from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies.restaurant import get_current_restaurant_id
from app.db.session import get_db
from app.models.menu_category import MenuCategory
from app.models.menu_item import MenuItem


router = APIRouter(
    prefix="/api/menu",
    tags=["Menu"],
)


class CategoryCreateRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)


class CategoryResponse(BaseModel):
    id: int
    name: str
    sort_order: int
    is_active: bool


class MenuItemCreateRequest(BaseModel):
    name: str = Field(min_length=1, max_length=150)
    category_id: int | None = None
    description: str | None = None
    price: Decimal = Field(gt=0)
    is_available: bool = True


class MenuItemUpdateRequest(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=150)
    category_id: int | None = None
    description: str | None = None
    price: Decimal | None = Field(default=None, gt=0)
    is_available: bool | None = None


class MenuItemResponse(BaseModel):
    id: int
    category_id: int | None
    name: str
    description: str | None
    price: Decimal
    is_available: bool


@router.get("/categories", response_model=list[CategoryResponse])
def list_categories(
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    return list(
        db.scalars(
            select(MenuCategory)
            .where(MenuCategory.restaurant_id == restaurant_id)
            .order_by(MenuCategory.sort_order, MenuCategory.id)
        )
    )


@router.post(
    "/categories",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_category(
    data: CategoryCreateRequest,
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    category = MenuCategory(
        restaurant_id=restaurant_id,
        name=data.name,
    )

    db.add(category)
    db.commit()
    db.refresh(category)

    return category


@router.patch("/categories/{category_id}", response_model=CategoryResponse)
def update_category(
    category_id: int,
    data: CategoryCreateRequest,
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    category = db.scalar(
        select(MenuCategory).where(
            MenuCategory.id == category_id,
            MenuCategory.restaurant_id == restaurant_id,
        )
    )

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category not found.",
        )

    category.name = data.name

    db.commit()
    db.refresh(category)

    return category


@router.delete("/categories/{category_id}")
def delete_category(
    category_id: int,
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    category = db.scalar(
        select(MenuCategory).where(
            MenuCategory.id == category_id,
            MenuCategory.restaurant_id == restaurant_id,
        )
    )

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category not found.",
        )

    db.delete(category)
    db.commit()

    return {
        "message": "Category deleted successfully.",
    }


@router.get("/items", response_model=list[MenuItemResponse])
def list_menu_items(
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    return list(
        db.scalars(
            select(MenuItem)
            .where(MenuItem.restaurant_id == restaurant_id)
            .order_by(MenuItem.id)
        )
    )


@router.post(
    "/items",
    response_model=MenuItemResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_menu_item(
    data: MenuItemCreateRequest,
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    if data.category_id is not None:
        category = db.scalar(
            select(MenuCategory).where(
                MenuCategory.id == data.category_id,
                MenuCategory.restaurant_id == restaurant_id,
            )
        )

        if not category:
            raise HTTPException(
                status_code=400,
                detail="Invalid menu category.",
            )

    item = MenuItem(
        restaurant_id=restaurant_id,
        category_id=data.category_id,
        name=data.name,
        description=data.description,
        price=data.price,
        is_available=data.is_available,
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return item


@router.patch("/items/{item_id}", response_model=MenuItemResponse)
def update_menu_item(
    item_id: int,
    data: MenuItemUpdateRequest,
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    item = db.scalar(
        select(MenuItem).where(
            MenuItem.id == item_id,
            MenuItem.restaurant_id == restaurant_id,
        )
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Menu item not found.",
        )

    updates = data.model_dump(exclude_unset=True)

    if "category_id" in updates and updates["category_id"] is not None:
        category = db.scalar(
            select(MenuCategory).where(
                MenuCategory.id == updates["category_id"],
                MenuCategory.restaurant_id == restaurant_id,
            )
        )

        if not category:
            raise HTTPException(
                status_code=400,
                detail="Invalid menu category.",
            )

    for field, value in updates.items():
        setattr(item, field, value)

    db.commit()
    db.refresh(item)

    return item


@router.delete("/items/{item_id}")
def delete_menu_item(
    item_id: int,
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    item = db.scalar(
        select(MenuItem).where(
            MenuItem.id == item_id,
            MenuItem.restaurant_id == restaurant_id,
        )
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Menu item not found.",
        )

    db.delete(item)
    db.commit()

    return {
        "message": "Menu item deleted successfully.",
    }