import pytest
from dotenv import load_dotenv
from pathlib import Path
import os
from sqlalchemy import create_engine

BASE_DIR = Path(__file__).resolve().parents[2]
ENV_PATH = BASE_DIR / ".env"

load_dotenv(ENV_PATH=ENV_PATH)

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./backend.db")

@pytest.fixture(scope="session")
def db_engine():
    engine = create_engine(DATABASE_URL)
    return engine

@pytest.fixture(scope="function")
def db_session(db_engine):
    connection = db_engine.connect()
    transaction = connection.begin()
    
    yield connection
    
    transaction.rollback()
    connection.close()