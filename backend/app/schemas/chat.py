from typing import List, Optional
from pydantic import BaseModel, Field
from backend.app.schemas.rag import DocumentChunk


class ChatMessageRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000, description="User question or query")
    conversation_id: Optional[str] = Field(None, description="Existing conversation identifier, if any")
    analysis_id: Optional[str] = Field(None, description="Reference ID of a previous analysis to bind context")


class ChatMessageResponse(BaseModel):
    conversation_id: str = Field(..., description="Conversation identifier")
    message: str = Field(..., description="CyberSafe AI assistant response")
    sources: List[DocumentChunk] = Field(default_factory=list, description="Grounding knowledge references")
    context_used: bool = Field(False, description="Whether previous analysis or conversation history was utilized")
    latency_ms: float = Field(..., description="Response latency in milliseconds")


class ConversationHistoryItem(BaseModel):
    role: str
    content: str
    created_at: str


class ConversationHistoryResponse(BaseModel):
    conversation_id: str
    messages: List[ConversationHistoryItem]
