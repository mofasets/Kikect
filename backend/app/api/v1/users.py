from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from app.db.init_db import get_session
from app.models import User
from app.schemas.user import UserCreate, UserRead, UserUpdate
from app.api.v1.crud_helpers import get_object_or_404, save, update_and_save
from app.core.security import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(user_create: UserCreate, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return save(db, User(**user_create.dict()))


@router.get("/", response_model=List[UserRead])
def list_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return db.query(User).offset(skip).limit(limit).all()


@router.get("/{user_id}", response_model=UserRead)
def get_user(user_id: int, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return get_object_or_404(db, User, user_id)


@router.put("/{user_id}", response_model=UserRead)
def update_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    user = get_object_or_404(db, User, user_id)
    return update_and_save(db, user, user_update.dict(exclude_none=True))


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    user = get_object_or_404(db, User, user_id)
    db.delete(user)
    db.commit()
