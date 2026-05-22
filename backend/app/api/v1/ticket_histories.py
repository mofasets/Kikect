from typing import List

from fastapi import APIRouter, Depends, status
from sqlmodel import Session

from app.db.init_db import get_session
from app.models import TicketHistory
from app.schemas.ticket_history import TicketHistoryCreate, TicketHistoryRead, TicketHistoryUpdate
from app.api.v1.crud_helpers import get_object_or_404, save, update_and_save
from app.models import User
from app.core.security import get_current_user

router = APIRouter(prefix="/ticket-histories", tags=["TicketHistories"])


@router.post("/", response_model=TicketHistoryRead, status_code=status.HTTP_201_CREATED)
def create_ticket_history(ticket_history_create: TicketHistoryCreate, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return save(db, TicketHistory(**ticket_history_create.dict()))


@router.get("/", response_model=List[TicketHistoryRead])
def list_ticket_histories(skip: int = 0, limit: int = 100, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return db.query(TicketHistory).offset(skip).limit(limit).all()


@router.get("/{ticket_history_id}", response_model=TicketHistoryRead)
def get_ticket_history(ticket_history_id: int, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return get_object_or_404(db, TicketHistory, ticket_history_id)


@router.put("/{ticket_history_id}", response_model=TicketHistoryRead)
def update_ticket_history(ticket_history_id: int, ticket_history_update: TicketHistoryUpdate, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    ticket_history = get_object_or_404(db, TicketHistory, ticket_history_id)
    return update_and_save(db, ticket_history, ticket_history_update.dict(exclude_none=True))


@router.delete("/{ticket_history_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_ticket_history(ticket_history_id: int, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    ticket_history = get_object_or_404(db, TicketHistory, ticket_history_id)
    db.delete(ticket_history)
    db.commit()
