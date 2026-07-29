import csv
import io

from fastapi import APIRouter, Depends, Form, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.models.order import Order, generate_order_id
from app.schemas.order import OrderOut, OrderStatusUpdate
from app.core.email import send_order_confirmation, send_admin_order_notification
from app.core.uploads import upload_order_file
from app.core.security import get_current_admin

router = APIRouter()

VALID_STATUSES = {"Pending", "Accepted", "In Progress", "Completed", "Cancelled"}


@router.post("/", response_model=OrderOut)
async def create_order(
    full_name: str = Form(...),
    company: Optional[str] = Form(None),
    email: str = Form(...),
    phone: str = Form(...),
    country: str = Form(...),
    service: str = Form(...),
    budget: str = Form(...),
    deadline: str = Form(...),
    description: str = Form(...),
    notes: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
):
    file_url = upload_order_file(file)

    order = Order(
        order_id=generate_order_id(),
        full_name=full_name,
        company=company,
        email=email,
        phone=phone,
        country=country,
        service=service,
        budget=budget,
        deadline=deadline,
        description=description,
        notes=notes,
        file_url=file_url,
        status="Pending",
    )
    db.add(order)
    db.commit()
    db.refresh(order)

    # Email sending never blocks or fails the order — see core/email.py
    send_order_confirmation(order.email, order.full_name, order.order_id)
    send_admin_order_notification(order.order_id, order.full_name, order.service, order.email)

    return order


@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: str, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.order_id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.get("/", response_model=list[OrderOut])
def list_orders(db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    # Admin-only: this returns client PII (email, phone), so it must stay protected.
    return db.query(Order).order_by(Order.created_at.desc()).all()


@router.patch("/{order_id}/status", response_model=OrderOut)
def update_order_status(
    order_id: str,
    payload: OrderStatusUpdate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    if payload.status not in VALID_STATUSES:
        raise HTTPException(status_code=400, detail=f"Status must be one of {sorted(VALID_STATUSES)}")
    order = db.query(Order).filter(Order.order_id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = payload.status
    db.commit()
    db.refresh(order)
    return order


@router.get("/export/csv")
def export_orders_csv(db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    orders = db.query(Order).order_by(Order.created_at.desc()).all()
    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow(
        ["Order ID", "Full Name", "Email", "Phone", "Country", "Service", "Budget", "Deadline", "Status", "Created At"]
    )
    for o in orders:
        writer.writerow(
            [o.order_id, o.full_name, o.email, o.phone, o.country, o.service, o.budget, o.deadline, o.status, o.created_at]
        )
    buffer.seek(0)
    return StreamingResponse(
        iter([buffer.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=orders_export.csv"},
    )
