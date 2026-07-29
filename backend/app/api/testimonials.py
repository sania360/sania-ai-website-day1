from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.testimonial import Testimonial
from app.schemas.testimonial import TestimonialCreate, TestimonialOut
from app.core.security import get_current_admin

router = APIRouter()


@router.get("/", response_model=list[TestimonialOut])
def list_testimonials(db: Session = Depends(get_db)):
    return db.query(Testimonial).order_by(Testimonial.created_at.desc()).all()


@router.post("/", response_model=TestimonialOut)
def create_testimonial(payload: TestimonialCreate, db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    testimonial = Testimonial(**payload.model_dump())
    db.add(testimonial)
    db.commit()
    db.refresh(testimonial)
    return testimonial


@router.delete("/{testimonial_id}")
def delete_testimonial(testimonial_id: int, db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    db.delete(testimonial)
    db.commit()
    return {"status": "deleted"}
