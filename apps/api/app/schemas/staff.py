from pydantic import BaseModel, EmailStr, Field


class StaffInvitationCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=30)
    role: str = Field(default="staff", pattern="^(manager|staff)$")


class StaffInvitationResponse(BaseModel):
    id: int
    message: str


class StaffInvitationAccept(BaseModel):
    token: str = Field(min_length=20, max_length=255)
    password: str = Field(min_length=8, max_length=128)