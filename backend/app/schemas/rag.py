from typing import List, Optional
from pydantic import BaseModel, Field


class DocumentChunk(BaseModel):
    chunk_id: str = Field(..., description="Unique identifier for the chunk")
    text: str = Field(..., description="Text content of the chunk")
    source: str = Field(..., description="Document source path or URL")
    title: str = Field(..., description="Document title")
    category: str = Field(..., description="Category: cyberbullying, online_safety, moderation, etc.")
    score: Optional[float] = Field(None, description="Similarity or relevance score")


class RAGSearchRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=500, description="Search query string")
    top_k: Optional[int] = Field(3, ge=1, le=10, description="Number of results to retrieve")
    category: Optional[str] = Field(None, description="Optional category filter")


class RAGSearchResponse(BaseModel):
    query: str
    total_results: int
    results: List[DocumentChunk]
    latency_ms: float


class IngestRequest(BaseModel):
    force_reload: bool = Field(False, description="Re-read knowledge base files and overwrite store")


class IngestResponse(BaseModel):
    status: str
    documents_ingested: int
    chunks_created: int
    latency_ms: float
