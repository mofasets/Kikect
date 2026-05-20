from typing import Optional, List, TYPE_CHECKING
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .user import User
    from .role_action import RoleAction


class Role(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    level: int
    create_date: datetime = Field(default_factory=datetime.now)
    update_date: datetime = Field(default_factory=datetime.now)

    users: List["User"] = Relationship(back_populates="role")
    role_actions: List["RoleAction"] = Relationship(back_populates="role")
