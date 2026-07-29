import uuid
from datetime import datetime

from sqlalchemy import Column, Integer, String, Text, DateTime
from app.database import Base


def generate_order_id() -> str:
    year = datetime.utcnow().year
    return f"ORD-{year}-{uuid.uuid4().hex[:6].upper()}"


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(String, unique=True, index=True, default=generate_order_id)

    full_name = Column(String, nullable=False)
    company = Column(String, nullable=True)
    email = Column(String, nullable=False, index=True)
    phone = Column(String, nullable=False)
    country = Column(String, nullable=False)

    service = Column(String, nullable=False)
    budget = Column(String, nullable=False)
    deadline = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    notes = Column(Text, nullable=True)

    file_url = Column(String, nullable=True)
    status = Column(String, nullable=False, default="Pending")  # Pending, Accepted, In Progress, Completed, Cancelled

    created_at = Column(DateTime, default=datetime.utcnow)
