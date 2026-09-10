from typing import Optional, Dict, Any
from sqlalchemy.orm import Session
from backend.app.schemas.chat import ChatMessageResponse
from backend.app.schemas.rag import DocumentChunk
from backend.app.database.repository import ConversationRepository
from backend.app.privacy.privacy_service import privacy_service
from backend.app.rag.pipeline import rag_pipeline
from backend.app.chat.context import chat_context_builder
from backend.app.llm.service import llm_service
from backend.app.llm.prompts import CHATBOT_SYSTEM_PROMPT
from backend.app.utils.logging import LatencyTimer, logger
from backend.app.utils.security import sanitize_input_text


class ConversationManager:
    """Manages the full lifecycle of interactive user chats."""

    def __init__(self):
        pass

    async def handle_message(
        self,
        db: Session,
        message: str,
        conversation_id: Optional[str] = None,
        analysis_id: Optional[str] = None,
    ) -> ChatMessageResponse:
        with LatencyTimer("chat_turn") as timer:
            # 1. Sanitize and anonymize input
            clean_text = sanitize_input_text(message)
            sanitized_res = privacy_service.process_input(clean_text)
            sanitized_input = sanitized_res["processed_text"]

            # 2. Retrieve or initialize conversation record
            conv = ConversationRepository.get_or_create_conversation(db, conversation_id=conversation_id)
            current_conv_id = conv.id

            # 3. Retrieve relevant history
            history = ConversationRepository.get_messages(db, conversation_id=current_conv_id, limit=8)

            # 4. Check for bound analysis
            analysis_record = None
            if analysis_id:
                analysis_record = ConversationRepository.get_analysis_by_id(db, analysis_id)
            if not analysis_record:
                # Check latest analysis bound to this conversation
                analysis_record = ConversationRepository.get_latest_analysis_for_conversation(db, current_conv_id)

            # 5. RAG Retrieval for grounding
            rag_res = rag_pipeline.get_grounded_context(query=sanitized_input, top_k=3)
            chunks = rag_res["chunks"]
            formatted_rag = rag_res["formatted_context"]

            # 6. Assemble complete grounded prompt
            composite_prompt = chat_context_builder.build_prompt(
                current_message=sanitized_input,
                history=history,
                analysis=analysis_record,
                rag_context=formatted_rag,
            )

            # 7. Generate assistant response
            assistant_reply = await llm_service.generate(
                prompt=composite_prompt,
                system_prompt=CHATBOT_SYSTEM_PROMPT,
            )

            # 8. Persist turn in database
            # Save user message
            ConversationRepository.add_message(db, conversation_id=current_conv_id, role="user", content=clean_text)

            # Save assistant message with chunk citations
            source_payloads = [
                {
                    "chunk_id": c.get("chunk_id"),
                    "text": c.get("text")[:200] + "...",
                    "title": c.get("title"),
                    "source": c.get("source"),
                    "category": c.get("category"),
                    "score": c.get("score"),
                }
                for c in chunks
            ]
            ConversationRepository.add_message(
                db,
                conversation_id=current_conv_id,
                role="assistant",
                content=assistant_reply,
                sources=source_payloads,
            )

            chunk_models = [
                DocumentChunk(
                    chunk_id=c.get("chunk_id", ""),
                    text=c.get("text", ""),
                    source=c.get("source", ""),
                    title=c.get("title", ""),
                    category=c.get("category", "general"),
                    score=c.get("score"),
                )
                for c in chunks
            ]

            return ChatMessageResponse(
                conversation_id=current_conv_id,
                message=assistant_reply,
                sources=chunk_models,
                context_used=bool(analysis_record or history or chunks),
                latency_ms=timer.elapsed_ms,
            )


conversation_manager = ConversationManager()
