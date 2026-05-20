from typing import Optional, List, TYPE_CHECKING
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .role import Role
    from .ticket import Ticket
    from .ticket_history import TicketHistory

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    identification_id: Optional[str] = None
    password: str
    is_active: bool = True
    role_id: Optional[int] = Field(default=None, foreign_key="role.id")
    google_id: Optional[str] = None
    create_date: datetime = Field(default_factory=datetime.now)
    update_date: datetime = Field(default_factory=datetime.now)

    role: Optional["Role"] = Relationship(back_populates="users")
    requested_tickets: List["Ticket"] = Relationship(back_populates="requester")
    technical_tickets: List["Ticket"] = Relationship(back_populates="technical")
    ticket_histories: List["TicketHistory"] = Relationship(back_populates="user")
