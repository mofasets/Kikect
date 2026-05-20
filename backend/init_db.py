import os
from pathlib import Path
from dotenv import load_dotenv
from sqlmodel import SQLModel, create_engine, Session

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./backend.db")
engine = create_engine(DATABASE_URL, echo=True)

# Import models so SQLModel metadata includes all table definitions.
from app.models import User, Role, Action, RoleAction, Ticket, TicketHistory  


def get_session():
    with Session(engine) as session:
        yield session


def init_db() -> None:
    """Create database tables from SQLModel models."""
    SQLModel.metadata.create_all(engine)


if __name__ == "__main__":
    init_db()
    print(f"Database initialized using {DATABASE_URL}")
