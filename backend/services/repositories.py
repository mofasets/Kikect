from typing import List
from sqlmodel import Session
from app import models
from app.models.ticket import TicketState
from datetime import datetime


class BaseRepository:
    def __init__(self, db: Session):
        self.db = db


class UserRepository(BaseRepository):
    def get(self, user_id: int):
        return self.db.query(models.User).filter(models.User.id == user_id).first()

    def get_by_email(self, email: str):
        return self.db.query(models.User).filter(models.User.email == email).first()

    def create(self, **kwargs):
        user = models.User(**kwargs)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user


class RoleRepository(BaseRepository):
    def get(self, role_id: int):
        return self.db.query(models.Role).filter(models.Role.id == role_id).first()

    def create(self, **kwargs):
        role = models.Role(**kwargs)
        self.db.add(role)
        self.db.commit()
        self.db.refresh(role)
        return role


class ActionRepository(BaseRepository):
    def get(self, action_id: int):
        return self.db.query(models.Action).filter(models.Action.id == action_id).first()

    def create(self, **kwargs):
        action = models.Action(**kwargs)
        self.db.add(action)
        self.db.commit()
        self.db.refresh(action)
        return action


class TicketRepository(BaseRepository):
    def get(self, ticket_id: int):
        return self.db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()

    def list(self, skip: int = 0, limit: int = 100) -> List[models.Ticket]:
        return self.db.query(models.Ticket).offset(skip).limit(limit).all()

    def create(self, **kwargs):
        ticket = models.Ticket(**kwargs)
        self.db.add(ticket)
        self.db.commit()
        self.db.refresh(ticket)
        return ticket

    def update_state(self, ticket: models.Ticket, new_state: TicketState):
        ticket.state = new_state
        ticket.update_date = datetime.utcnow()
        self.db.add(ticket)
        self.db.commit()
        self.db.refresh(ticket)
        return ticket


class TicketHistoryRepository(BaseRepository):
    def create(self, **kwargs):
        th = models.TicketHistory(**kwargs)
        self.db.add(th)
        self.db.commit()
        self.db.refresh(th)
        return th
