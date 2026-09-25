from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies.restaurant import get_current_restaurant_id
from app.db.session import get_db
from app.models.menu_item import MenuItem
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.table import RestaurantTable


router = APIRouter(
    prefix="/api/orders",
    tags=["Orders"],
)


class OrderItemCreate(BaseModel):
    menu_item_id: int
    quantity: int = Field(ge=1, le=100)


class OrderCreateRequest(BaseModel):
    table_id: int | None = None
    payment_method: str | None = None
    customer_name: str | None = None
    customer_phone: str | None = None
    items: list[OrderItemCreate] = Field(min_length=1)
    idempotency_key: str | None = Field(default=None, max_length=128)


class OrderStatusUpdate(BaseModel):
    status: str = Field(
        pattern="^(new|preparing|ready|completed|cancelled)$"
    )


class OrderResponse(BaseModel):
    id: int
    order_number: int
    table_id: int | None
    status: str
    payment_status: str
    payment_method: str | None
    subtotal: Decimal
    tax: Decimal
    total: Decimal
    customer_name: str | None
    customer_phone: str | None


@router.get("", response_model=list[OrderResponse])
def list_orders(
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    return list(
        db.scalars(
            select(Order)
            .where(Order.restaurant_id == restaurant_id)
            .order_by(Order.id.desc())
        )
    )


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: int,
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    order = db.scalar(
        select(Order).where(
            Order.id == order_id,
            Order.restaurant_id == restaurant_id,
        )
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found.",
        )

    return order


@router.post(
    "",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_order(
    data: OrderCreateRequest,
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    if data.idempotency_key:
        existing = db.scalar(
            select(Order).where(
                Order.idempotency_key == data.idempotency_key,
                Order.restaurant_id == restaurant_id,
            )
        )

        if existing:
            return existing

    if data.table_id is not None:
        table = db.scalar(
            select(RestaurantTable).where(
                RestaurantTable.id == data.table_id,
                RestaurantTable.restaurant_id == restaurant_id,
                RestaurantTable.is_active.is_(True),
            )
        )

        if not table:
            raise HTTPException(
                status_code=400,
                detail="Invalid or inactive table.",
            )

    menu_ids = [item.menu_item_id for item in data.items]

    menu_items = list(
        db.scalars(
            select(MenuItem).where(
                MenuItem.restaurant_id == restaurant_id,
                MenuItem.id.in_(menu_ids),
            )
        )
    )

    menu_map = {item.id: item for item in menu_items}

    subtotal = Decimal("0.00")

    order_number = (
        db.scalar(
            select(Order.order_number)
            .where(Order.restaurant_id == restaurant_id)
            .order_by(Order.order_number.desc())
            .limit(1)
        )
        or 0
    ) + 1

    order = Order(
        restaurant_id=restaurant_id,
        table_id=data.table_id,
        order_number=order_number,
        status="new",
        payment_status="pending",
        payment_method=data.payment_method,
        subtotal=Decimal("0.00"),
        tax=Decimal("0.00"),
        total=Decimal("0.00"),
        customer_name=data.customer_name,
        customer_phone=data.customer_phone,
        idempotency_key=data.idempotency_key,
    )

    db.add(order)
    db.flush()

    for requested_item in data.items:
        menu_item = menu_map.get(requested_item.menu_item_id)

        if not menu_item:
            raise HTTPException(
                status_code=400,
                detail=f"Menu item {requested_item.menu_item_id} not found.",
            )

        if not menu_item.is_available:
            raise HTTPException(
                status_code=400,
                detail=f"{menu_item.name} is currently unavailable.",
            )

        unit_price = Decimal(menu_item.price)
        line_total = unit_price * requested_item.quantity

        subtotal += line_total

        db.add(
            OrderItem(
                order_id=order.id,
                menu_item_id=menu_item.id,
                item_name=menu_item.name,
                unit_price=unit_price,
                quantity=requested_item.quantity,
                line_total=line_total,
            )
        )

    order.subtotal = subtotal
    order.tax = Decimal("0.00")
    order.total = subtotal

    db.commit()
    db.refresh(order)

    return order


@router.patch("/{order_id}/status", response_model=OrderResponse)
def update_order_status(
    order_id: int,
    data: OrderStatusUpdate,
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    order = db.scalar(
        select(Order).where(
            Order.id == order_id,
            Order.restaurant_id == restaurant_id,
        )
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found.",
        )

    order.status = data.status

    db.commit()
    db.refresh(order)

    return order