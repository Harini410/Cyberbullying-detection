from fastapi import APIRouter, HTTPException
from backend.app.schemas.rag import RAGSearchRequest, RAGSearchResponse, IngestRequest, IngestResponse, DocumentChunk
from backend.app.rag.retriever import rag_retriever
from backend.app.rag.ingestion import ingestion_pipeline
from backend.app.utils.logging import LatencyTimer
from backend.app.utils.security import sanitize_input_text

router = APIRouter(tags=["RAG & Knowledge"])


@router.post("/rag/search", response_model=RAGSearchResponse)
def search_knowledge_base(payload: RAGSearchRequest):
    """Semantic vector search across cyberbullying safety and moderation documents."""
    clean_query = sanitize_input_text(payload.query)
    if not clean_query:
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    with LatencyTimer("rag_api_search") as timer:
        raw_chunks = rag_retriever.retrieve(
            query=clean_query,
            top_k=payload.top_k or 3,
            category=payload.category,
        )

        results = [
            DocumentChunk(
                chunk_id=c.get("chunk_id", ""),
                text=c.get("text", ""),
                source=c.get("source", ""),
                title=c.get("title", ""),
                category=c.get("category", "general"),
                score=c.get("score"),
            )
            for c in raw_chunks
        ]

        return RAGSearchResponse(
            query=clean_query,
            total_results=len(results),
            results=results,
            latency_ms=timer.elapsed_ms,
        )


@router.post("/rag/ingest", response_model=IngestResponse)
def ingest_knowledge_documents(payload: IngestRequest):
    """Triggers loading, chunking, embedding, and vector persistence for knowledge documents."""
    res = ingestion_pipeline.run_ingestion(force_reload=payload.force_reload)
    return IngestResponse(
        status=res.get("status", "unknown"),
        documents_ingested=res.get("documents_ingested", 0),
        chunks_created=res.get("chunks_created", 0),
        latency_ms=res.get("latency_ms", 0.0),
    )
