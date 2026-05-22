from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.db.init_db import init_db
from app.api.v1 import router as api_router
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting backend server...")
    init_db()
    logger.info("Database connection initialized and models mapped to tables.")
    yield
    logger.info("Stopping backend server...")

app = FastAPI(
    title="Kikect API",
    version="1.0.0",
    lifespan=lifespan
)

app.include_router(api_router)