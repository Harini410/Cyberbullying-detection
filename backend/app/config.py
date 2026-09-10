"""Application configuration module using Pydantic Settings."""

import os
from typing import List

os.environ.setdefault("PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION", "python")
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # App
    PROJECT_NAME: str = "CyberSafe AI"
    VERSION: str = "2.0.0"
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = False
    ENVIRONMENT: str = "development"

    # CORS
    CORS_ORIGINS: str = "http://localhost:3000,http://127.0.0.1:3000,https://cyberbullying-detection-eta.vercel.app"

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    # Database
    DATABASE_URL: str = "sqlite:///./cyberbullying.db"

    # LLM Settings
    LLM_PROVIDER: str = "mock"  # "openai", "anthropic", "ollama", "mock"
    LLM_MODEL: str = "gpt-4o-mini"
    LLM_API_KEY: str = ""
    LLM_BASE_URL: str = "https://api.openai.com/v1"
    LLM_TEMPERATURE: float = 0.2
    LLM_MAX_TOKENS: int = 1024

    # RoBERTa Model Settings
    ROBERTA_MODEL_NAME: str = "cardiffnlp/twitter-roberta-base-offensive"
    USE_GPU: bool = False
    INFERENCE_BATCH_SIZE: int = 1

    # RAG and Vector Store
    VECTOR_STORE_TYPE: str = "local"  # "local", "chroma"
    VECTOR_STORE_DIR: str = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data", "vector_db"))
    KNOWLEDGE_BASE_DIR: str = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data", "knowledge"))
    EMBEDDINGS_MODEL: str = "all-MiniLM-L6-v2"
    RAG_TOP_K: int = 3
    RAG_SIMILARITY_THRESHOLD: float = 0.30

    # Privacy & Safety
    ANONYMIZE_PII: bool = True
    LOG_RAW_PROMPTS: bool = False
    RATE_LIMIT_PER_MINUTE: int = 60

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()
