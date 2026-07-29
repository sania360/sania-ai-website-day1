from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.order import Order
from app.models.message import Message
from app.core.security import get_current_admin

router = APIRouter()


@router.get("/summary")
def dashboard_summary(db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    total_orders = db.query(func.count(Order.id)).scalar() or 0
    by_status = dict(
        db.query(Order.status, func.count(Order.id)).group_by(Order.status).all()
    )
    total_messages = db.query(func.count(Message.id)).scalar() or 0
    unread_messages = db.query(func.count(Message.id)).filter(Message.is_read.is_(False)).scalar() or 0

    return {
        "total_orders": total_orders,
        "orders_by_status": {
            "Pending": by_status.get("Pending", 0),
            "Accepted": by_status.get("Accepted", 0),
            "In Progress": by_status.get("In Progress", 0),
            "Completed": by_status.get("Completed", 0),
            "Cancelled": by_status.get("Cancelled", 0),
        },
        "total_messages": total_messages,
        "unread_messages": unread_messages,
    }
