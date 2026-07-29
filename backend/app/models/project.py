from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from app.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    category = Column(String, nullable=False)
    summary = Column(Text, nullable=False)
    github = Column(String, nullable=True)
    live_demo = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
