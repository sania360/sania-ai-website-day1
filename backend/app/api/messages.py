from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.message import Message
from app.schemas.message import MessageCreate, MessageOut
from app.core.email import send_admin_message_notification
from app.core.security import get_current_admin

router = APIRouter()


@router.post("/", response_model=MessageOut)
def create_message(payload: MessageCreate, db: Session = Depends(get_db)):
    message = Message(**payload.model_dump())
    db.add(message)
    db.commit()
    db.refresh(message)

    send_admin_message_notification(message.name, message.email, message.subject, message.message)
    return message


@router.get("/", response_model=list[MessageOut])
def list_messages(db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    return db.query(Message).order_by(Message.created_at.desc()).all()


@router.patch("/{message_id}/read", response_model=MessageOut)
def mark_read(message_id: int, db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    message.is_read = True
    db.commit()
    db.refresh(message)
    return message
