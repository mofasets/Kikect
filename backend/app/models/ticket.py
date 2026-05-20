from typing import Optional, List, TYPE_CHECKING
from datetime import datetime
from enum import Enum as PyEnum
from sqlalchemy import Column
from sqlalchemy import Enum as SAEnum
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .user import User
    from .ticket_history import TicketHistory


class TicketState(PyEnum):
    NEW = "NUEVO"
    IN_PROGRESS = "EN_PROCESO"
    PENDING = "PENDIENTE"
    RESOLVED = "RESUELTO"
    REJECTED = "RECHAZADO"


class Ticket(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    state: TicketState = Field(default=TicketState.NEW, sa_column=Column(SAEnum(TicketState), nullable=False))
    requester_id: Optional[int] = Field(default=None, foreign_key="user.id")
    technical_id: Optional[int] = Field(default=None, foreign_key="user.id")
    create_date: datetime = Field(default_factory=datetime.now)
    update_date: datetime = Field(default_factory=datetime.now)

    requester: Optional["User"] = Relationship(back_populates="requested_tickets")
    technical: Optional["User"] = Relationship(back_populates="technical_tickets")
    histories: List["TicketHistory"] = Relationship(back_populates="ticket")
