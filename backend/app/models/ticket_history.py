from typing import Optional, TYPE_CHECKING
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .ticket import Ticket
    from .user import User


class TicketHistory(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    ticket_id: int = Field(foreign_key="ticket.id")
    user_id: int = Field(foreign_key="user.id")
    previous_state: Optional[str] = None
    new_state: Optional[str] = None
    comments: Optional[str] = None
    create_date: datetime = Field(default_factory=datetime.now)
    update_date: datetime = Field(default_factory=datetime.now)

    ticket: Optional["Ticket"] = Relationship(back_populates="histories")
    user: Optional["User"] = Relationship(back_populates="ticket_histories")
