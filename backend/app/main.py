from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.database import SessionLocal
from app.core.security import seed_default_admin
from app.seeds.blog_seeds import seed_blog_posts
from app.seeds.testimonial_seeds import seed_testimonials
from app.api import (
    auth,
    orders,
    messages,
    dashboard,
    projects,
    services,
    testimonials,
    blogs,
)

# Schema is now managed by Alembic migrations (backend/alembic/).
# Run `alembic upgrade head` before starting the app for the first time,
# and after pulling any change that adds/modifies a model.

# Seed the first admin account and starter content if they don't exist yet.
_db = SessionLocal()
try:
    seed_default_admin(_db)
    seed_blog_posts(_db)
    seed_testimonials(_db)
finally:
    _db.close()

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix=f"{settings.API_V1_PREFIX}/auth", tags=["auth"])
app.include_router(orders.router, prefix=f"{settings.API_V1_PREFIX}/orders", tags=["orders"])
app.include_router(messages.router, prefix=f"{settings.API_V1_PREFIX}/messages", tags=["messages"])
app.include_router(dashboard.router, prefix=f"{settings.API_V1_PREFIX}/admin/dashboard", tags=["admin-dashboard"])
app.include_router(projects.router, prefix=f"{settings.API_V1_PREFIX}/projects", tags=["projects"])
app.include_router(services.router, prefix=f"{settings.API_V1_PREFIX}/services", tags=["services"])
app.include_router(testimonials.router, prefix=f"{settings.API_V1_PREFIX}/testimonials", tags=["testimonials"])
app.include_router(blogs.router, prefix=f"{settings.API_V1_PREFIX}/blogs", tags=["blogs"])


@app.get("/", tags=["health"])
def root():
    return {"status": "ok", "service": settings.PROJECT_NAME}


@app.get("/health", tags=["health"])
def health_check():
    return {"status": "healthy"}

