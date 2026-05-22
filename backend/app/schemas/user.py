from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    name: str
    email: EmailStr
    identification_id: Optional[str] = None


class UserCreate(UserBase):
    hashed_password: str
    role_id: Optional[int] = None


class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    identification_id: Optional[str] = None
    hashed_password: Optional[str] = None
    is_active: Optional[bool] = None
    role_id: Optional[int] = None
    google_id: Optional[str] = None


class UserRead(UserBase):
    id: int
    is_active: bool
    role_id: Optional[int] = None
    google_id: Optional[str] = None
    create_date: Optional[datetime] = None
    update_date: Optional[datetime] = None

    class Config:
        from_attributes = True
