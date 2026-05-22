from typing import List

from fastapi import APIRouter, Depends, status
from sqlmodel import Session

from app.db.init_db import get_session
from app.models import RoleAction
from app.schemas.role_action import RoleActionCreate, RoleActionRead, RoleActionUpdate
from app.api.v1.crud_helpers import get_object_or_404, save, update_and_save
from app.models import User
from app.core.security import get_current_user

router = APIRouter(prefix="/role-actions", tags=["RoleActions"])


@router.post("/", response_model=RoleActionRead, status_code=status.HTTP_201_CREATED)
def create_role_action(role_action_create: RoleActionCreate, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return save(db, RoleAction(**role_action_create.dict()))


@router.get("/", response_model=List[RoleActionRead])
def list_role_actions(skip: int = 0, limit: int = 100, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return db.query(RoleAction).offset(skip).limit(limit).all()


@router.get("/{role_action_id}", response_model=RoleActionRead)
def get_role_action(role_action_id: int, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return get_object_or_404(db, RoleAction, role_action_id)


@router.put("/{role_action_id}", response_model=RoleActionRead)
def update_role_action(role_action_id: int, role_action_update: RoleActionUpdate, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    role_action = get_object_or_404(db, RoleAction, role_action_id)
    return update_and_save(db, role_action, role_action_update.dict(exclude_none=True))


@router.delete("/{role_action_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_role_action(role_action_id: int, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    role_action = get_object_or_404(db, RoleAction, role_action_id)
    db.delete(role_action)
    db.commit()
