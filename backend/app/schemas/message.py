from datetime import datetime
from pydantic import BaseModel, EmailStr


class MessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str


class MessageOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    subject: str
    message: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True
