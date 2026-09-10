import json
from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from backend.app.database.models import Conversation, Message, AnalysisRecord
from backend.app.utils.ids import generate_conversation_id, generate_id


class ConversationRepository:

    @staticmethod
    def get_or_create_conversation(db: Session, conversation_id: Optional[str] = None, title: str = "New CyberSafe Chat") -> Conversation:
        if conversation_id:
            conv = db.query(Conversation).filter(Conversation.id == conversation_id).first()
            if conv:
                return conv

        new_id = conversation_id or generate_conversation_id()
        conv = Conversation(id=new_id, title=title)
        db.add(conv)
        db.commit()
        db.refresh(conv)
        return conv

    @staticmethod
    def add_message(db: Session, conversation_id: str, role: str, content: str, sources: Optional[List[Dict[str, Any]]] = None) -> Message:
        sources_json = json.dumps(sources) if sources else None
        msg = Message(
            id=generate_id("msg"),
            conversation_id=conversation_id,
            role=role,
            content=content,
            sources_json=sources_json,
        )
        db.add(msg)
        db.commit()
        db.refresh(msg)
        return msg

    @staticmethod
    def get_messages(db: Session, conversation_id: str, limit: int = 15) -> List[Message]:
        return (
            db.query(Message)
            .filter(Message.conversation_id == conversation_id)
            .order_by(Message.created_at.desc())
            .limit(limit)
            .all()
        )[::-1]  # Return in chronological order

    @staticmethod
    def save_analysis(
        db: Session,
        request_id: str,
        sanitized_text: str,
        label: str,
        confidence: float,
        probabilities: Dict[str, float],
        risk_level: str,
        risk_score: float,
        explanation: Optional[str] = None,
        recommendations: Optional[List[str]] = None,
        conversation_id: Optional[str] = None,
    ) -> AnalysisRecord:
        record = AnalysisRecord(
            id=generate_id("ana"),
            request_id=request_id,
            conversation_id=conversation_id,
            sanitized_text=sanitized_text,
            label=label,
            confidence=confidence,
            probabilities_json=json.dumps(probabilities),
            risk_level=risk_level,
            risk_score=risk_score,
            explanation=explanation,
            recommendations_json=json.dumps(recommendations or []),
        )
        db.add(record)
        db.commit()
        db.refresh(record)
        return record

    @staticmethod
    def get_analysis_by_id(db: Session, analysis_id: str) -> Optional[AnalysisRecord]:
        return db.query(AnalysisRecord).filter((AnalysisRecord.id == analysis_id) | (AnalysisRecord.request_id == analysis_id)).first()

    @staticmethod
    def get_latest_analysis_for_conversation(db: Session, conversation_id: str) -> Optional[AnalysisRecord]:
        return (
            db.query(AnalysisRecord)
            .filter(AnalysisRecord.conversation_id == conversation_id)
            .order_by(AnalysisRecord.created_at.desc())
            .first()
        )
