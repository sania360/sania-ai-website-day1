import smtplib
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from app.core.config import settings

logger = logging.getLogger("email")


def _send(to_email: str, subject: str, html_body: str) -> bool:
    """
    Sends an email via SMTP. Returns True/False instead of raising, so a missing
    or misconfigured SMTP_USER/SMTP_PASSWORD never breaks order/message creation
    during local development.
    """
    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        logger.warning("SMTP not configured — skipping email send to %s ('%s')", to_email, subject)
        return False

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = settings.SMTP_USER
    msg["To"] = to_email
    msg.attach(MIMEText(html_body, "html"))

    try:
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.sendmail(settings.SMTP_USER, to_email, msg.as_string())
        return True
    except Exception as exc:  # noqa: BLE001 — log and continue, never crash the request
        logger.error("Failed to send email to %s: %s", to_email, exc)
        return False


BRAND_HEADER = """
<div style="font-family:Inter,Arial,sans-serif;background:#0b2545;padding:20px;border-radius:12px 12px 0 0">
  <h2 style="color:#ffffff;margin:0">Sania Ismail</h2>
  <p style="color:#13a89e;margin:4px 0 0">AI, Machine Learning & Data Analytics Solutions</p>
</div>
"""


def send_order_confirmation(client_email: str, client_name: str, order_id: str) -> bool:
    body = f"""
    {BRAND_HEADER}
    <div style="padding:24px;font-family:Inter,Arial,sans-serif;color:#0d1b2a">
      <p>Hi {client_name},</p>
      <p>Thanks for reaching out to Sania Ismail — AI, Machine Learning & Data Analytics Solutions.
      Your order <strong>{order_id}</strong> is now <strong>Pending</strong> review.</p>
      <p>Expect a reply within 24 hours.</p>
    </div>
    """
    return _send(client_email, f"We've received your request, {client_name}!", body)


def send_admin_order_notification(order_id: str, client_name: str, service: str, email: str) -> bool:
    body = f"""
    {BRAND_HEADER}
    <div style="padding:24px;font-family:Inter,Arial,sans-serif;color:#0d1b2a">
      <p>New order received:</p>
      <ul>
        <li><strong>Order ID:</strong> {order_id}</li>
        <li><strong>Client:</strong> {client_name} ({email})</li>
        <li><strong>Service:</strong> {service}</li>
      </ul>
    </div>
    """
    return _send(settings.ADMIN_EMAIL, f"New Order {order_id} — {service}", body)


def send_admin_message_notification(name: str, email: str, subject: str, message: str) -> bool:
    body = f"""
    {BRAND_HEADER}
    <div style="padding:24px;font-family:Inter,Arial,sans-serif;color:#0d1b2a">
      <p>New contact message:</p>
      <ul>
        <li><strong>From:</strong> {name} ({email})</li>
        <li><strong>Subject:</strong> {subject}</li>
      </ul>
      <p>{message}</p>
    </div>
    """
    return _send(settings.ADMIN_EMAIL, f"New Contact Message: {subject}", body)
