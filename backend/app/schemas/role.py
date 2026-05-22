from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class RoleBase(BaseModel):
    name: str
    level: int


class RoleCreate(RoleBase):
    pass


class RoleUpdate(BaseModel):
    name: Optional[str] = None
    level: Optional[int] = None


class RoleRead(RoleBase):
    id: int
    create_date: Optional[datetime] = None
    update_date: Optional[datetime] = None

    class Config:
        from_attributes = True
