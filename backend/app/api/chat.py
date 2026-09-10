from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.schemas.chat import ChatMessageRequest, ChatMessageResponse
from backend.app.database.database import get_db
from backend.app.chat.conversation import conversation_manager
from backend.app.utils.security import sanitize_input_text

router = APIRouter(tags=["Chatbot"])


@router.post("/chat", response_model=ChatMessageResponse)
async def chat_turn(payload: ChatMessageRequest, db: Session = Depends(get_db)):
    """
    Interactive conversational endpoint for CyberSafe AI assistant.
    Maintains session history, leverages RAG retrieval, respects bound prior analyses,
    and defends against prompt injections.
    """
    clean_msg = sanitize_input_text(payload.message)
    if not clean_msg:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    response = await conversation_manager.handle_message(
        db=db,
        message=clean_msg,
        conversation_id=payload.conversation_id,
        analysis_id=payload.analysis_id,
    )

    return response
