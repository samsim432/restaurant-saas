import smtplib
from email.message import EmailMessage

from app.core.config import settings


def send_email(
    to_email: str,
    subject: str,
    body: str,
) -> None:
    message = EmailMessage()

    message["From"] = (
        f"{settings.SMTP_FROM_NAME} "
        f"<{settings.SMTP_FROM_EMAIL}>"
    )

    message["To"] = to_email
    message["Subject"] = subject

    message.set_content(body)

    with smtplib.SMTP(
        settings.SMTP_HOST,
        settings.SMTP_PORT,
        timeout=20,
    ) as smtp:
        if settings.SMTP_USE_TLS:
            smtp.starttls()

        smtp.login(
            settings.SMTP_USERNAME,
            settings.SMTP_PASSWORD,
        )

        smtp.send_message(message)


def _development_email_notice(
    email_type: str,
    to_email: str,
    full_name: str,
    code: str,
) -> None:
    print()
    print("=" * 60)
    print(f"DEVELOPMENT {email_type.upper()}")
    print("=" * 60)
    print(f"To: {to_email}")
    print(f"Name: {full_name}")
    print(f"Code: {code}")
    print("=" * 60)
    print()


def send_verification_email(
    to_email: str,
    full_name: str,
    code: str,
) -> None:
    subject = "Verify your RestaurantOS account"

    body = f"""Hello {full_name},

Welcome to RestaurantOS.

Your email verification code is:

{code}

This code will expire in 10 minutes.

If you did not create a RestaurantOS account, you can safely ignore this email.

RestaurantOS
"""

    try:
        send_email(
            to_email=to_email,
            subject=subject,
            body=body,
        )
    except (smtplib.SMTPException, OSError) as exc:
        print(
            f"Email delivery failed during development: {exc}"
        )

        _development_email_notice(
            email_type="verification code",
            to_email=to_email,
            full_name=full_name,
            code=code,
        )


def send_password_reset_email(
    to_email: str,
    full_name: str,
    code: str,
) -> None:
    subject = "Reset your RestaurantOS password"

    body = f"""Hello {full_name},

We received a request to reset your RestaurantOS password.

Your password reset code is:

{code}

This code will expire in 10 minutes.

If you did not request a password reset, you can safely ignore this email.

RestaurantOS
"""

    try:
        send_email(
            to_email=to_email,
            subject=subject,
            body=body,
        )
    except (smtplib.SMTPException, OSError) as exc:
        print(
            f"Email delivery failed during development: {exc}"
        )

        _development_email_notice(
            email_type="password reset code",
            to_email=to_email,
            full_name=full_name,
            code=code,
        )