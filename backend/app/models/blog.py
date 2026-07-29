from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from app.database import Base


class Blog(Base):
    __tablename__ = "blogs"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    category = Column(String, nullable=False)
    excerpt = Column(Text, nullable=False)
    content_markdown = Column(Text, nullable=False)
    tags = Column(String, nullable=True)  # comma-separated, e.g. "python,ml,rag"
    featured_image = Column(String, nullable=True)  # URL, optional
    created_at = Column(DateTime, default=datetime.utcnow)
