from datetime import datetime
from typing import Optional, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .role import Role
    from .action import Action


class RoleAction(SQLModel, table=True):
    __tablename__ = "role_action"

    id: Optional[int] = Field(default=None, primary_key=True)
    role_id: int = Field(foreign_key="role.id")
    action_id: int = Field(foreign_key="action.id")
    create_date: datetime = Field(default_factory=datetime.now)
    update_date: datetime = Field(default_factory=datetime.now)

    role: Optional["Role"] = Relationship(back_populates="role_actions")
    action: Optional["Action"] = Relationship(back_populates="role_actions")
