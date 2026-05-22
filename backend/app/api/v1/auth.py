from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
import logging
from app.db.init_db import get_session
from app.models.user import User, UserCreate, UserResponse
from app.core.security import get_password_hash, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user_in: UserCreate, db: Session = Depends(get_session)):
    # Verificar si el correo ya existe en la BD
    statement = select(User).where(User.email == user_in.email)
    existing_user = db.exec(statement).first()
    
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Este correo ya está registrado en el sistema."
        )
    logging.info(f"Registrando nuevo usuario con email: {user_in.email} {user_in.password}")
    # Encriptar la contraseña antes de guardarla
    hashed_pass = get_password_hash(user_in.password)
    
    # Crear la instancia del modelo de BD
    new_user = User(email=user_in.email, hashed_password=hashed_pass)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

@router.post("/login")
def login_user(user_in: UserCreate, db: Session = Depends(get_session)):
    # Buscar al usuario por correo
    statement = select(User).where(User.email == user_in.email)
    user = db.exec(statement).first()
    
    # Si no existe o la contraseña no coincide, devolvemos un error genérico (por seguridad)
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Si todo está bien, le fabricamos su Token de acceso
    access_token = create_access_token(data={"sub": user.email, "user_id": user.id})
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }