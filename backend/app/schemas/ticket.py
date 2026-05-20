from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.ticket import TicketState


class TicketBase(BaseModel):
    name: str
    description: Optional[str] = None
    image_url: Optional[str] = None


class TicketCreate(TicketBase):
    requester_id: Optional[int] = None
    technical_id: Optional[int] = None


class TicketRead(TicketBase):
    id: int
    state: TicketState
    requester_id: Optional[int]
    technical_id: Optional[int]
    create_date: Optional[datetime] = None
    update_date: Optional[datetime] = None

    class Config:
        orm_mode = True
