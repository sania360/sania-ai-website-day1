from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.blog import Blog
from app.schemas.blog import BlogCreate, BlogOut
from app.core.security import get_current_admin

router = APIRouter()


@router.get("/", response_model=list[BlogOut])
def list_blogs(db: Session = Depends(get_db)):
    return db.query(Blog).order_by(Blog.created_at.desc()).all()


@router.get("/{slug}", response_model=BlogOut)
def get_blog(slug: str, db: Session = Depends(get_db)):
    blog = db.query(Blog).filter(Blog.slug == slug).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return blog


@router.post("/", response_model=BlogOut)
def create_blog(payload: BlogCreate, db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    if db.query(Blog).filter(Blog.slug == payload.slug).first():
        raise HTTPException(status_code=400, detail="A post with this slug already exists")
    blog = Blog(**payload.model_dump())
    db.add(blog)
    db.commit()
    db.refresh(blog)
    return blog


@router.delete("/{blog_id}")
def delete_blog(blog_id: int, db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog post not found")
    db.delete(blog)
    db.commit()
    return {"status": "deleted"}
