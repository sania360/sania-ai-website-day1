from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class BlogCreate(BaseModel):
    slug: str
    title: str
    category: str
    excerpt: str
    content_markdown: str
    tags: Optional[str] = None          # comma-separated, e.g. "python,ml,rag"
    featured_image: Optional[str] = None  # URL


class BlogOut(BlogCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
