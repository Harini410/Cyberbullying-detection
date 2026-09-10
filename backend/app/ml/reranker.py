from typing import List, Dict, Any


class Reranker:
    """Re-ranks retrieved candidate chunks to maximize relevance to user query."""

    def __init__(self):
        pass

    def rerank(self, query: str, chunks: List[Dict[str, Any]], top_k: int = 3) -> List[Dict[str, Any]]:
        if not chunks:
            return []

        query_terms = set(query.lower().split())

        scored_chunks = []
        for chunk in chunks:
            base_score = chunk.get("score", 0.5)
            text_lower = chunk.get("text", "").lower()
            title_lower = chunk.get("title", "").lower()

            # Exact keyword overlap boost
            matches = sum(1 for term in query_terms if term in text_lower or term in title_lower)
            boost = min(0.3, matches * 0.05)
            final_score = round(min(1.0, base_score + boost), 4)

            scored_chunk = dict(chunk)
            scored_chunk["score"] = final_score
            scored_chunks.append(scored_chunk)

        # Sort descending by score
        scored_chunks.sort(key=lambda x: x["score"], reverse=True)
        return scored_chunks[:top_k]


reranker = Reranker()
