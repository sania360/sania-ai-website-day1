import logging
from typing import Optional
from fastapi import UploadFile

from app.core.config import settings

logger = logging.getLogger("uploads")

_cloudinary_ready = False
try:
    import cloudinary
    import cloudinary.uploader

    if settings.CLOUDINARY_CLOUD_NAME:
        cloudinary.config(
            cloud_name=settings.CLOUDINARY_CLOUD_NAME,
            api_key=settings.CLOUDINARY_API_KEY,
            api_secret=settings.CLOUDINARY_API_SECRET,
        )
        _cloudinary_ready = True
except ImportError:
    logger.warning("cloudinary package not installed — file uploads will be skipped")


def upload_order_file(file: Optional[UploadFile]) -> Optional[str]:
    """Uploads an order attachment to Cloudinary. Returns None (and logs a warning)
    if Cloudinary isn't configured, so order submission never fails just because
    of a missing file-storage credential during local development."""
    if file is None:
        return None
    if not _cloudinary_ready:
        logger.warning("Cloudinary not configured — skipping upload of '%s'", file.filename)
        return None
    try:
        result = cloudinary.uploader.upload(file.file, folder="sania-ai-website/orders", resource_type="auto")
        return result.get("secure_url")
    except Exception as exc:  # noqa: BLE001
        logger.error("Cloudinary upload failed for '%s': %s", file.filename, exc)
        return None
