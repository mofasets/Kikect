from typing import List

from fastapi import APIRouter, Depends, status
from sqlmodel import Session

from app.db.init_db import get_session
from app.models import Action, User
from app.schemas.action import ActionCreate, ActionRead, ActionUpdate
from app.api.v1.crud_helpers import get_object_or_404, save, update_and_save
from app.core.security import get_current_user

router = APIRouter(prefix="/actions", tags=["Actions"])


@router.post("/", response_model=ActionRead, status_code=status.HTTP_201_CREATED)
def create_action(action_create: ActionCreate, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return save(db, Action(**action_create.dict()))


@router.get("/", response_model=List[ActionRead])
def list_actions(skip: int = 0, limit: int = 100, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return db.query(Action).offset(skip).limit(limit).all()


@router.get("/{action_id}", response_model=ActionRead)
def get_action(action_id: int, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return get_object_or_404(db, Action, action_id)


@router.put("/{action_id}", response_model=ActionRead)
def update_action(action_id: int, action_update: ActionUpdate, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    action = get_object_or_404(db, Action, action_id)
    return update_and_save(db, action, action_update.dict(exclude_none=True))


@router.delete("/{action_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_action(action_id: int, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    action = get_object_or_404(db, Action, action_id)
    db.delete(action)
    db.commit()
