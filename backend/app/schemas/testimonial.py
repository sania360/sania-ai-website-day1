from datetime import datetime
from pydantic import BaseModel, Field


class TestimonialCreate(BaseModel):
    author: str
    quote: str
    rating: int = Field(default=5, ge=1, le=5)
    is_featured: bool = False


class TestimonialOut(TestimonialCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
