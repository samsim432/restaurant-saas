from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies.restaurant import get_current_restaurant_id
from app.db.session import get_db
from app.models.audit_log import AuditLog


router = APIRouter(
    prefix="/api/audit-logs",
    tags=["Audit Logs"],
)


@router.get("")
def list_audit_logs(
    restaurant_id: int = Depends(get_current_restaurant_id),
    db: Session = Depends(get_db),
):
    logs = list(
        db.scalars(
            select(AuditLog)
            .where(AuditLog.restaurant_id == restaurant_id)
            .order_by(AuditLog.id.desc())
            .limit(100)
        )
    )

    return logs