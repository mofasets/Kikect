from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TicketHistoryBase(BaseModel):
    previous_state: Optional[str] = None
    new_state: Optional[str] = None
    comments: Optional[str] = None


class TicketHistoryCreate(TicketHistoryBase):
    ticket_id: int
    user_id: int


class TicketHistoryUpdate(BaseModel):
    ticket_id: Optional[int] = None
    user_id: Optional[int] = None
    previous_state: Optional[str] = None
    new_state: Optional[str] = None
    comments: Optional[str] = None


class TicketHistoryRead(TicketHistoryBase):
    id: int
    ticket_id: int
    user_id: int
    create_date: Optional[datetime] = None
    update_date: Optional[datetime] = None

    class Config:
        from_attributes = True
