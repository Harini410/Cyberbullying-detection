from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field
from backend.app.schemas.agents import AgentTraceItem
from backend.app.schemas.rag import DocumentChunk


class AnalysisRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=2000, description="Text to comprehensively analyze")
    include_trace: bool = Field(True, description="Whether to include agent execution latency trace")


class RiskAssessment(BaseModel):
    level: str = Field(..., description="Risk tier: LOW, MEDIUM, HIGH, or CRITICAL")
    score: float = Field(..., ge=0.0, le=1.0, description="Aggregated risk score between 0 and 1")
    reasons: List[str] = Field(..., description="Deterministic evidence-based rationales")


class AffectiveAnalysis(BaseModel):
    sentiment: Dict[str, Any] = Field(..., description="Sentiment polarity and scores")
    emotions: List[Dict[str, Any]] = Field(..., description="Fine-grained emotion scores")


class AnalysisResponse(BaseModel):
    request_id: str = Field(..., description="Unique trace identifier")
    prediction: Dict[str, Any] = Field(..., description="RoBERTa classification result")
    affective_analysis: AffectiveAnalysis = Field(..., description="Sentiment and emotion outputs")
    context: Dict[str, Any] = Field(..., description="Contextual nuances, implicit abuse, and ambiguity markers")
    risk: RiskAssessment = Field(..., description="Risk level and driving indicators")
    explanation: str = Field(..., description="Grounded explanation of the classification")
    recommendations: List[str] = Field(..., description="Actionable safety recommendations")
    sources: List[DocumentChunk] = Field(..., description="Retrieved grounding knowledge sources")
    agent_trace: List[AgentTraceItem] = Field(default_factory=list, description="Agent execution telemetry")
    latency_ms: float = Field(..., description="Total pipeline latency in milliseconds")
