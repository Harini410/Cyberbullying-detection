from typing import List, Optional, Dict, Any
from dataclasses import dataclass, field
from pydantic import BaseModel, Field


class AgentTraceItem(BaseModel):
    agent: str = Field(..., description="Name of the agent (e.g. DetectionAgent)")
    status: str = Field(..., description="Execution status: success, fallback, or error")
    latency_ms: float = Field(..., description="Execution time in milliseconds")
    summary: Optional[str] = Field(None, description="Brief summary of the agent outcome")


@dataclass
class CyberbullyingState:
    input_text: str
    sanitized_text: str = ""
    detection_result: Optional[Dict[str, Any]] = None
    sentiment: Optional[Dict[str, Any]] = None
    emotions: Optional[Dict[str, Any]] = None
    context: Optional[Dict[str, Any]] = None
    risk: Optional[Dict[str, Any]] = None
    retrieved_documents: List[Dict[str, Any]] = field(default_factory=list)
    explanation: Optional[str] = None
    recommendations: List[str] = field(default_factory=list)
    final_response: Optional[str] = None
    agent_trace: List[Dict[str, Any]] = field(default_factory=list)
