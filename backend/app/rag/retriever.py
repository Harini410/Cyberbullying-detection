from typing import List, Dict, Any, Optional
from backend.app.ml.embeddings import embedding_service
from backend.app.ml.reranker import reranker
from backend.app.rag.vector_store import vector_store
from backend.app.config import settings
from backend.app.utils.logging import LatencyTimer


class RAGRetriever:
    """Retrieves and re-ranks grounded knowledge passages for queries."""

    def __init__(self):
        self.default_top_k = settings.RAG_TOP_K
        self.threshold = settings.RAG_SIMILARITY_THRESHOLD

    def retrieve(self, query: str, top_k: Optional[int] = None, category: Optional[str] = None) -> List[Dict[str, Any]]:
        k = top_k or self.default_top_k
        with LatencyTimer("retrieval") as timer:
            # 1. Embed user query
            query_embedding = embedding_service.embed_text(query)

            # 2. Vector search with expanded candidate pool
            candidates = vector_store.search(query_embedding, top_k=k * 2, category=category)

            # 3. Filter candidates below threshold
            filtered = [c for c in candidates if c.get("score", 0.0) >= self.threshold]
            if not filtered and candidates:
                # If threshold is strict, keep top candidate
                filtered = [candidates[0]]

            # 4. Re-rank
            reranked = reranker.rerank(query, filtered, top_k=k)
            return reranked


rag_retriever = RAGRetriever()
