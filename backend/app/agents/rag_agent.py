from backend.app.agents.base import BaseAgent
from backend.app.schemas.agents import CyberbullyingState
from backend.app.rag.retriever import rag_retriever


class RAGAgent(BaseAgent):
    """Retrieves authoritative safety, moderation, and legal guidelines from the vector knowledge base."""

    def __init__(self):
        super().__init__(name="RAGAgent")

    async def process(self, state: CyberbullyingState) -> CyberbullyingState:
        target_text = state.sanitized_text or state.input_text
        risk_level = state.risk.get("level", "LOW") if state.risk else "LOW"

        # Formulate query focused on risk and intervention
        query = f"{target_text} cyberbullying reporting intervention {risk_level}"
        chunks = rag_retriever.retrieve(query=query, top_k=3)
        state.retrieved_documents = chunks
        return state


rag_agent = RAGAgent()
