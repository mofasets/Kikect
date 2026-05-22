from typing import List

from fastapi import APIRouter, Depends, status
from sqlmodel import Session

from app.db.init_db import get_session
from app.models import Ticket
from app.schemas.ticket import TicketCreate, TicketRead, TicketUpdate
from app.api.v1.crud_helpers import get_object_or_404, save, update_and_save
from app.models import User
from app.core.security import get_current_user

router = APIRouter(prefix="/tickets", tags=["Tickets"])


@router.post("/", response_model=TicketRead, status_code=status.HTTP_201_CREATED)
def create_ticket(ticket_create: TicketCreate, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return save(db, Ticket(**ticket_create.dict()))


@router.get("/", response_model=List[TicketRead])
def list_tickets(skip: int = 0, limit: int = 100, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return db.query(Ticket).offset(skip).limit(limit).all()


@router.get("/{ticket_id}", response_model=TicketRead)
def get_ticket(ticket_id: int, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return get_object_or_404(db, Ticket, ticket_id)


@router.put("/{ticket_id}", response_model=TicketRead)
def update_ticket(ticket_id: int, ticket_update: TicketUpdate, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    ticket = get_object_or_404(db, Ticket, ticket_id)
    return update_and_save(db, ticket, ticket_update.dict(exclude_none=True))


@router.delete("/{ticket_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_ticket(ticket_id: int, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    ticket = get_object_or_404(db, Ticket, ticket_id)
    db.delete(ticket)
    db.commit()
