from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.health import router as health_router
from app.core.config import settings
from app.db.database import Base, engine

app = FastAPI(title=settings.app_name, debug=settings.debug)

import logging
import time
from fastapi import Request

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    logger.info(f"{request.method} {request.url.path} - {response.status_code} - {process_time:.4f}s")
    return response

from app.routers import user, course, misc

app.include_router(health_router)
app.include_router(user.router, prefix="/api/v1")
app.include_router(course.router, prefix="/api/v1")
app.include_router(misc.router, prefix="/api/v1")

@app.get("/")
def root():
    return {"message": "Welcome to the Duolingo Clone API"}

@app.on_event("startup")
def on_startup() -> None:
    # Ensure tables are created (dev only)
    Base.metadata.create_all(bind=engine)
