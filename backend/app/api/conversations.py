from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.schemas.chat import ConversationHistoryResponse, ConversationHistoryItem
from backend.app.database.database import get_db
from backend.app.database.repository import ConversationRepository

router = APIRouter(tags=["Conversations"])


@router.get("/conversations/{conversation_id}", response_model=ConversationHistoryResponse)
def get_conversation_history(conversation_id: str, db: Session = Depends(get_db)):
    """Retrieves chronological chat history for a conversation session."""
    messages = ConversationRepository.get_messages(db, conversation_id=conversation_id, limit=30)
    items = [
        ConversationHistoryItem(
            role=m.role,
            content=m.content,
            created_at=m.created_at.isoformat() if m.created_at else "",
        )
        for m in messages
    ]

    return ConversationHistoryResponse(
        conversation_id=conversation_id,
        messages=items,
    )
