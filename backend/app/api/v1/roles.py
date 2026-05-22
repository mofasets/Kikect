from typing import List

from fastapi import APIRouter, Depends, status
from sqlmodel import Session

from app.db.init_db import get_session
from app.models import Role
from app.schemas.role import RoleCreate, RoleRead, RoleUpdate
from app.api.v1.crud_helpers import get_object_or_404, save, update_and_save
from app.models import User
from app.core.security import get_current_user

router = APIRouter(prefix="/roles", tags=["Roles"])


@router.post("/", response_model=RoleRead, status_code=status.HTTP_201_CREATED)
def create_role(role_create: RoleCreate, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return save(db, Role(**role_create.dict()))


@router.get("/", response_model=List[RoleRead])
def list_roles(skip: int = 0, limit: int = 100, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return db.query(Role).offset(skip).limit(limit).all()


@router.get("/{role_id}", response_model=RoleRead)
def get_role(role_id: int, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return get_object_or_404(db, Role, role_id)


@router.put("/{role_id}", response_model=RoleRead)
def update_role(role_id: int, role_update: RoleUpdate, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    role = get_object_or_404(db, Role, role_id)
    return update_and_save(db, role, role_update.dict(exclude_none=True))


@router.delete("/{role_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_role(role_id: int, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    role = get_object_or_404(db, Role, role_id)
    db.delete(role)
    db.commit()
