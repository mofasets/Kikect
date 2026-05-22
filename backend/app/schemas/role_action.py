from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class RoleActionBase(BaseModel):
    role_id: int
    action_id: int


class RoleActionCreate(RoleActionBase):
    pass


class RoleActionUpdate(BaseModel):
    role_id: Optional[int] = None
    action_id: Optional[int] = None


class RoleActionRead(RoleActionBase):
    id: int
    create_date: Optional[datetime] = None
    update_date: Optional[datetime] = None

    class Config:
        from_attributes = True
