import os
from pathlib import Path
from collections.abc import Generator

from dotenv import load_dotenv
from sqlmodel import SQLModel, create_engine, Session
from app import models  # noqa: F401

# Resuelve la ruta absoluta hacia el archivo .env de forma dinámica
BASE_DIR = Path(__file__).resolve().parents[2]
ENV_PATH = BASE_DIR / ".env"

load_dotenv(dotenv_path=ENV_PATH)

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./backend.db")

connect_args = {"check_same_thread": False} if "sqlite" in DATABASE_URL else {}

engine = create_engine(
    DATABASE_URL, 
    echo=False,
    connect_args=connect_args
)

def get_session() -> Generator[Session, None, None]:
    """
    Inyecta la sesión de base de datos en los endpoints de FastAPI.
    El 'with' garantiza que la conexión se libere al terminar la petición.
    """
    with Session(engine) as session:
        yield session

def init_db() -> None:
    """
    Lee los modelos y crea las tablas que NO existan en la base de datos.
    No sobrescribe ni elimina datos existentes.
    """
    
    SQLModel.metadata.create_all(engine)