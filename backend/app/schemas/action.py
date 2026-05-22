from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ActionBase(BaseModel):
    name: str
    description: Optional[str] = None


class ActionCreate(ActionBase):
    pass


class ActionUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None


class ActionRead(ActionBase):
    id: int
    create_date: Optional[datetime] = None
    update_date: Optional[datetime] = None

    class Config:
        from_attributes = True
