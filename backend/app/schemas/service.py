from datetime import datetime
from pydantic import BaseModel


class ServiceCreate(BaseModel):
    title: str
    category: str
    price: str
    description: str


class ServiceOut(ServiceCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
