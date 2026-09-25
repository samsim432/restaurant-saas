"""add email verification

Revision ID: cb4f247af313
Revises: 5c9c08726768
Create Date: 2026-09-25
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "cb4f247af313"
down_revision: Union[str, Sequence[str], None] = "5c9c08726768"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add email verification fields with a temporary
    # server default so existing users receive False.
    op.add_column(
        "users",
        sa.Column(
            "is_email_verified",
            sa.Boolean(),
            nullable=False,
            server_default=sa.false(),
        ),
    )

    op.add_column(
        "users",
        sa.Column(
            "email_verified_at",
            sa.DateTime(timezone=True),
            nullable=True,
        ),
    )

    # Remove the database-level default after existing rows
    # have been safely populated.
    op.alter_column(
        "users",
        "is_email_verified",
        server_default=None,
    )

    op.create_table(
        "email_verification_codes",
        sa.Column(
            "id",
            sa.Integer(),
            primary_key=True,
            nullable=False,
        ),
        sa.Column(
            "user_id",
            sa.Integer(),
            sa.ForeignKey(
                "users.id",
                ondelete="CASCADE",
            ),
            nullable=False,
        ),
        sa.Column(
            "code_hash",
            sa.String(length=255),
            nullable=False,
        ),
        sa.Column(
            "expires_at",
            sa.DateTime(timezone=True),
            nullable=False,
        ),
        sa.Column(
            "used_at",
            sa.DateTime(timezone=True),
            nullable=True,
        ),
        sa.Column(
            "attempts",
            sa.Integer(),
            nullable=False,
            server_default="0",
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )

    op.create_index(
        "ix_email_verification_codes_id",
        "email_verification_codes",
        ["id"],
        unique=False,
    )

    op.create_index(
        "ix_email_verification_codes_user_id",
        "email_verification_codes",
        ["user_id"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        "ix_email_verification_codes_user_id",
        table_name="email_verification_codes",
    )

    op.drop_index(
        "ix_email_verification_codes_id",
        table_name="email_verification_codes",
    )

    op.drop_table("email_verification_codes")

    op.drop_column(
        "users",
        "email_verified_at",
    )

    op.drop_column(
        "users",
        "is_email_verified",
    )