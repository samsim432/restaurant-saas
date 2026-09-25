from decimal import Decimal

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.dependencies.restaurant import get_current_restaurant_id
from app.db.session import get_db
from app.models.order import Order


router = APIRouter(
    prefix="/api/reports",
    tags=["Reports"],
)


@router.get("/summary")
def reports_summary(
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    total_orders = db.scalar(
        select(func.count(Order.id)).where(
            Order.restaurant_id == restaurant_id
        )
    ) or 0

    paid_revenue = db.scalar(
        select(func.coalesce(func.sum(Order.total), 0))
        .where(
            Order.restaurant_id == restaurant_id,
            Order.payment_status == "paid",
        )
    ) or Decimal("0.00")

    completed_orders = db.scalar(
        select(func.count(Order.id)).where(
            Order.restaurant_id == restaurant_id,
            Order.status == "completed",
        )
    ) or 0

    average_order = (
        paid_revenue / total_orders
        if total_orders
        else Decimal("0.00")
    )

    return {
        "total_orders": total_orders,
        "paid_revenue": paid_revenue,
        "completed_orders": completed_orders,
        "average_order": average_order,
    }