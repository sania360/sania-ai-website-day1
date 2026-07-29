from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


class OrderCreate(BaseModel):
    full_name: str
    company: Optional[str] = None
    email: EmailStr
    phone: str
    country: str
    service: str
    budget: str
    deadline: str
    description: str
    notes: Optional[str] = None


class OrderOut(BaseModel):
    order_id: str
    full_name: str
    email: EmailStr
    service: str
    status: str
    created_at: datetime
    file_url: Optional[str] = None

    class Config:
        from_attributes = True


class OrderStatusUpdate(BaseModel):
    status: str
