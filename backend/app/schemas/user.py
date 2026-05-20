from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    name: str
    email: EmailStr
    identification_id: Optional[str] = None


class UserCreate(UserBase):
    password: str
    role_id: Optional[int] = None


class UserRead(UserBase):
    id: int
    is_active: bool
    role_id: Optional[int] = None
    google_id: Optional[str] = None
    create_date: Optional[datetime] = None
    update_date: Optional[datetime] = None

    class Config:
        orm_mode = True
