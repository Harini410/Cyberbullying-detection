from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.schemas.analysis import AnalysisRequest, AnalysisResponse, RiskAssessment, AffectiveAnalysis
from backend.app.schemas.rag import DocumentChunk
from backend.app.schemas.agents import AgentTraceItem
from backend.app.database.database import get_db
from backend.app.database.repository import ConversationRepository
from backend.app.agents.orchestrator import orchestrator
from backend.app.utils.ids import generate_request_id
from backend.app.utils.logging import LatencyTimer
from backend.app.utils.security import sanitize_input_text

router = APIRouter(tags=["Analysis"])


@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_message(payload: AnalysisRequest, db: Session = Depends(get_db)):
    """
    Comprehensive multi-agent cyberbullying evaluation.
    Coordinates RoBERTa, emotion/sentiment extraction, contextual threat assessment,
    deterministic risk scoring, RAG knowledge retrieval, and safe recommendations.
    """
    with LatencyTimer("api_analyze") as timer:
        clean_text = sanitize_input_text(payload.text)
        if not clean_text:
            raise HTTPException(status_code=400, detail="Input text cannot be empty.")

        req_id = generate_request_id()

        # Run multi-agent orchestration
        state = await orchestrator.run(clean_text)

        # Parse outputs
        det = state.detection_result or {}
        sent = state.sentiment or {"sentiment": "neutral", "score": 0.5, "details": {}}
        emo = state.emotions or {"emotions": []}
        risk = state.risk or {"level": "LOW", "score": 0.0, "reasons": []}
        ctx = state.context or {}
        explanation = state.explanation or "Analysis completed."
        recommendations = state.recommendations or []

        # Convert chunks to Pydantic models
        chunks = [
            DocumentChunk(
                chunk_id=c.get("chunk_id", ""),
                text=c.get("text", ""),
                source=c.get("source", ""),
                title=c.get("title", ""),
                category=c.get("category", "general"),
                score=c.get("score"),
            )
            for c in state.retrieved_documents
        ]

        # Convert trace items
        trace_items = [
            AgentTraceItem(
                agent=t.get("agent", ""),
                status=t.get("status", "success"),
                latency_ms=t.get("latency_ms", 0.0),
                summary=t.get("summary"),
            )
            for t in state.agent_trace
        ]

        # Persist analysis in database
        try:
            ConversationRepository.save_analysis(
                db=db,
                request_id=req_id,
                sanitized_text=state.sanitized_text,
                label=det.get("label", "non_bullying"),
                confidence=det.get("confidence", 0.5),
                probabilities=det.get("probabilities", {}),
                risk_level=risk.get("level", "LOW"),
                risk_score=risk.get("score", 0.0),
                explanation=explanation,
                recommendations=recommendations,
            )
        except Exception as e:
            # Persistence failure should never block returning real analysis
            pass

        return AnalysisResponse(
            request_id=req_id,
            prediction=det,
            affective_analysis=AffectiveAnalysis(
                sentiment=sent,
                emotions=emo.get("emotions", []),
            ),
            context=ctx,
            risk=RiskAssessment(
                level=risk.get("level", "LOW"),
                score=risk.get("score", 0.0),
                reasons=risk.get("reasons", []),
            ),
            explanation=explanation,
            recommendations=recommendations,
            sources=chunks,
            agent_trace=trace_items if payload.include_trace else [],
            latency_ms=timer.elapsed_ms,
        )


@router.get("/analyses")
def list_analyses(limit: int = 50, db: Session = Depends(get_db)):
    """Returns historical analysis records from the database for the dashboard."""
    records = ConversationRepository.get_all_analyses(db, limit=limit)
    return [
        {
            "id": r.id,
            "request_id": r.request_id,
            "sanitized_text": r.sanitized_text,
            "label": r.label,
            "confidence": r.confidence,
            "risk_level": r.risk_level,
            "risk_score": r.risk_score,
            "explanation": r.explanation,
            "created_at": r.created_at.isoformat() if r.created_at else None,
        }
        for r in records
    ]


@router.delete("/analyses/{analysis_id}")
def delete_analysis(analysis_id: str, db: Session = Depends(get_db)):
    """Deletes an analysis record by id or request_id."""
    deleted = ConversationRepository.delete_analysis(db, analysis_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Analysis record not found.")
    return {"status": "deleted", "id": analysis_id}


@router.get("/analytics")
def get_analytics(db: Session = Depends(get_db)):
    """Aggregates real-time detection telemetry and threat distribution from stored records."""
    return ConversationRepository.get_analytics_summary(db)
