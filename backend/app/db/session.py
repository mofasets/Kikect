import os
from pathlib import Path
from dotenv import load_dotenv
from sqlmodel import create_engine, Session

BASE_DIR = Path(__file__).resolve().parents[2]
ENV_PATH = BASE_DIR / ".env"

load_dotenv(dotenv_path=ENV_PATH)

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./backend.db")

engine = create_engine(DATABASE_URL, echo=False)

def get_db():
    db = Session(engine)
    try:
        yield db
    finally:
        db.close()
