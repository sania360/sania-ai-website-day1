from sqlalchemy.orm import Session
from app.models.testimonial import Testimonial

STARTER_TESTIMONIALS = [
    {
        "author": "Project Supervisor",
        "quote": "Clear communication and a genuinely solid grasp of the ML fundamentals — exactly what our project needed.",
        "rating": 5,
        "is_featured": True,
    },
    {
        "author": "Coursework Collaborator",
        "quote": "Delivered a working pipeline ahead of schedule and explained every step along the way.",
        "rating": 5,
        "is_featured": True,
    },
    {
        "author": "Internship Mentor",
        "quote": "Turned a messy dataset into a clean, usable dashboard without any back-and-forth.",
        "rating": 4,
        "is_featured": True,
    },
]


def seed_testimonials(db: Session) -> None:
    if db.query(Testimonial).first():
        return
    for t in STARTER_TESTIMONIALS:
        db.add(Testimonial(**t))
    db.commit()
