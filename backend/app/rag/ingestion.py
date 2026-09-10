from typing import Dict, Any
from backend.app.rag.loader import document_loader
from backend.app.rag.chunker import text_chunker
from backend.app.ml.embeddings import embedding_service
from backend.app.rag.vector_store import vector_store
from backend.app.utils.logging import logger, LatencyTimer


class IngestionPipeline:
    """Manages full document loading, chunking, embedding, and vector persistence."""

    def __init__(self):
        pass

    def run_ingestion(self, force_reload: bool = False) -> Dict[str, Any]:
        with LatencyTimer("rag_ingestion") as timer:
            # Check existing store
            health = vector_store.health_check()
            if health.get("total_chunks", 0) > 0 and not force_reload:
                logger.info("Vector store already populated. Skipping re-ingestion.")
                return {
                    "status": "already_populated",
                    "documents_ingested": 0,
                    "chunks_created": health.get("total_chunks", 0),
                    "latency_ms": timer.elapsed_ms,
                }

            docs = document_loader.load_documents()
            if not docs:
                logger.warning("No documents found to ingest.")
                return {
                    "status": "no_documents_found",
                    "documents_ingested": 0,
                    "chunks_created": 0,
                    "latency_ms": timer.elapsed_ms,
                }

            all_chunks = []
            for doc in docs:
                chunks = text_chunker.chunk_document(doc)
                all_chunks.extend(chunks)

            if not all_chunks:
                return {
                    "status": "no_chunks_produced",
                    "documents_ingested": len(docs),
                    "chunks_created": 0,
                    "latency_ms": timer.elapsed_ms,
                }

            logger.info(f"Generating embeddings for {len(all_chunks)} chunks...")
            texts = [c["text"] for c in all_chunks]
            embeddings = embedding_service.embed_batch(texts)

            vector_store.add_documents(all_chunks, embeddings)

            logger.info(f"Ingestion finished: {len(docs)} documents, {len(all_chunks)} chunks.")
            return {
                "status": "success",
                "documents_ingested": len(docs),
                "chunks_created": len(all_chunks),
                "latency_ms": timer.elapsed_ms,
            }


ingestion_pipeline = IngestionPipeline()
