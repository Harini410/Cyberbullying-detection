import time
from fastapi import APIRouter
from backend.app.config import settings
from backend.app.ml.roberta_service import roberta_service
from backend.app.rag.vector_store import vector_store
from backend.app.llm.service import llm_service
from backend.app.privacy.privacy_service import privacy_service

router = APIRouter(tags=["System"])

SERVER_START_TIME = time.time()


@router.get("/health")
def get_health():
    """System health check endpoint verifying component operational status."""
    uptime_seconds = round(time.time() - SERVER_START_TIME, 1)
    vector_health = vector_store.health_check()
    llm_health = llm_service.health_check()

    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "uptime_seconds": uptime_seconds,
        "environment": settings.ENVIRONMENT,
        "components": {
            "roberta_service": {
                "loaded": roberta_service._is_loaded,
                "model_name": roberta_service.model_name,
                "device": str(roberta_service.device),
            },
            "vector_store": vector_health,
            "llm_service": llm_health,
        },
        "privacy_guarantees": privacy_service.get_privacy_declarations(),
    }


@router.get("/models")
def list_models():
    """Returns information on active and benchmarked models."""
    return {
        "active_primary_model": {
            "name": "RoBERTa",
            "identifier": roberta_service.model_name,
            "architecture": "Transformer Sequence Classification",
            "features": ["Bidirectional Context", "Affective Integration", "Differential Privacy Guarantees"],
            "reported_accuracy": 0.93,
            "reported_f1": 0.94,
        },
        "benchmarked_baselines": [
            {"name": "CNN", "accuracy": 0.89, "f1": 0.88},
            {"name": "RNN", "accuracy": 0.80, "f1": 0.78},
            {"name": "LSTM", "accuracy": 0.87, "f1": 0.86},
            {"name": "Bi-LSTM", "accuracy": 0.90, "f1": 0.89},
            {"name": "GRU", "accuracy": 0.88, "f1": 0.87},
        ],
    }


@router.get("/metrics")
def get_system_metrics():
    """Returns high-level runtime telemetry and evaluation benchmark summaries."""
    vector_health = vector_store.health_check()
    return {
        "total_knowledge_chunks": vector_health.get("total_chunks", 0),
        "research_benchmarks": {
            "dataset": "47,692 Tweets (Multi-Class & Binary)",
            "roberta_accuracy": 0.93,
            "roberta_precision": 0.94,
            "roberta_recall": 0.93,
            "roberta_f1": 0.94,
            "training_framework": "Federated Learning with Differential Privacy (Opacus)",
        },
    }
