from datetime import datetime, timezone
from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies.restaurant import get_current_restaurant_id
from app.db.session import get_db
from app.models.order import Order
from app.models.payment import Payment


router = APIRouter(
    prefix="/api/payments",
    tags=["Payments"],
)


class CashPaymentRequest(BaseModel):
    order_id: int
    amount: Decimal = Field(gt=0)
    idempotency_key: str | None = Field(default=None, max_length=128)


class PaymentResponse(BaseModel):
    id: int
    order_id: int
    method: str
    status: str
    amount: Decimal
    provider_transaction_id: str | None
    paid_at: datetime | None


@router.get("", response_model=list[PaymentResponse])
def list_payments(
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    return list(
        db.scalars(
            select(Payment)
            .join(Order, Payment.order_id == Order.id)
            .where(Order.restaurant_id == restaurant_id)
            .order_by(Payment.id.desc())
        )
    )


@router.post(
    "/cash",
    response_model=PaymentResponse,
    status_code=status.HTTP_201_CREATED,
)
def mark_cash_paid(
    data: CashPaymentRequest,
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    order = db.scalar(
        select(Order).where(
            Order.id == data.order_id,
            Order.restaurant_id == restaurant_id,
        )
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found.",
        )

    if data.idempotency_key:
        existing = db.scalar(
            select(Payment).where(
                Payment.idempotency_key == data.idempotency_key
            )
        )

        if existing:
            return existing

    if data.amount != order.total:
        raise HTTPException(
            status_code=400,
            detail="Payment amount does not match order total.",
        )

    payment = Payment(
        order_id=order.id,
        method="cash",
        status="paid",
        amount=data.amount,
        idempotency_key=data.idempotency_key,
        paid_at=datetime.now(timezone.utc),
    )

    order.payment_status = "paid"
    order.payment_method = "cash"

    db.add(payment)
    db.commit()
    db.refresh(payment)

    return payment