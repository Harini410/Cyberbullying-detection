from typing import List, Dict, Any, Optional
from backend.app.rag.retriever import rag_retriever
from backend.app.utils.logging import LatencyTimer


class RAGPipeline:
    """End-to-end pipeline connecting retrieval with structured prompt context."""

    def __init__(self):
        pass

    def get_grounded_context(self, query: str, top_k: int = 3, category: Optional[str] = None) -> Dict[str, Any]:
        with LatencyTimer("rag_pipeline") as timer:
            chunks = rag_retriever.retrieve(query, top_k=top_k, category=category)

            # Format context block for LLM prompts with strict isolation fences
            context_blocks = []
            for i, chunk in enumerate(chunks, 1):
                context_blocks.append(
                    f"--- Source [{i}]: {chunk.get('title')} ({chunk.get('source')}) ---\n{chunk.get('text')}"
                )

            formatted_context = "\n\n".join(context_blocks) if context_blocks else "No relevant knowledge sources found."

            return {
                "chunks": chunks,
                "formatted_context": formatted_context,
                "latency_ms": timer.elapsed_ms,
            }


rag_pipeline = RAGPipeline()
