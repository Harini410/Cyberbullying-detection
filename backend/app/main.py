import time
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from backend.app.config import settings
from backend.app.database.database import init_db
from backend.app.rag.ingestion import ingestion_pipeline
from backend.app.ml.roberta_service import roberta_service
from backend.app.utils.logging import logger
from backend.app.utils.ids import generate_request_id

# Import API routers
from backend.app.api.health import router as health_router
from backend.app.api.detection import router as detection_router
from backend.app.api.analysis import router as analysis_router
from backend.app.api.chat import router as chat_router
from backend.app.api.rag import router as rag_router
from backend.app.api.agents import router as agents_router
from backend.app.api.conversations import router as conversations_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup actions
    logger.info(f"Initializing {settings.PROJECT_NAME} v{settings.VERSION}...")
    init_db()
    logger.info("Database initialized.")

    try:
        ingest_res = ingestion_pipeline.run_ingestion()
        logger.info(f"Knowledge ingestion completed on startup: {ingest_res.get('status')}")
    except Exception as e:
        logger.error(f"Startup knowledge ingestion failed: {e}")

    logger.info("CyberSafe AI backend ready.")
    yield
    # Shutdown actions
    logger.info("Shutting down CyberSafe AI backend.")


app = FastAPI(
    title=f"{settings.PROJECT_NAME} API",
    version=settings.VERSION,
    description="Production-grade AI Platform for Cyberbullying Detection, Affective Analysis, RAG, Multi-Agent Orchestration, and Conversational Support.",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# Configure CORS
origins = settings.cors_origins_list
if "*" not in origins:
    origins.append("*")  # Permissive local dev support

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_process_time_and_request_id(request: Request, call_next):
    req_id = generate_request_id()
    start_time = time.perf_counter()

    response = await call_next(request)

    process_time = round((time.perf_counter() - start_time) * 1000, 2)
    response.headers["X-Process-Time-MS"] = str(process_time)
    response.headers["X-Request-ID"] = req_id
    return response


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global unhandled error for {request.url.path}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred while processing the request."}
    )


# Attach API routers under /api
app.include_router(health_router, prefix="/api")
app.include_router(detection_router, prefix="/api")
app.include_router(analysis_router, prefix="/api")
app.include_router(chat_router, prefix="/api")
app.include_router(rag_router, prefix="/api")
app.include_router(agents_router, prefix="/api")
app.include_router(conversations_router, prefix="/api")


@app.get("/")
def root():
    return {
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "online",
        "docs": "/docs",
        "api_prefix": "/api",
    }
