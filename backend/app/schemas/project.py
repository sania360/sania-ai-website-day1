from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class ProjectCreate(BaseModel):
    slug: str
    title: str
    category: str
    summary: str
    github: Optional[str] = None
    live_demo: Optional[str] = None


class ProjectOut(ProjectCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
