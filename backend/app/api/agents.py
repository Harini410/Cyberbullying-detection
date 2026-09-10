from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict, Any
from backend.app.agents.orchestrator import orchestrator
from backend.app.schemas.agents import AgentTraceItem
from backend.app.utils.security import sanitize_input_text

router = APIRouter(tags=["Multi-Agent"])


class AgentRunRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=2000, description="Message to process via multi-agent system")


class AgentRunResponse(BaseModel):
    input_text: str
    detection_label: str
    risk_level: str
    agent_trace: List[AgentTraceItem]


@router.post("/agents/run", response_model=AgentRunResponse)
async def run_multi_agent_pipeline(payload: AgentRunRequest):
    """Executes the multi-agent orchestrator pipeline and outputs individual agent execution traces."""
    clean_text = sanitize_input_text(payload.text)
    if not clean_text:
        raise HTTPException(status_code=400, detail="Input text cannot be empty.")

    state = await orchestrator.run(clean_text)

    det = state.detection_result or {}
    risk = state.risk or {}

    trace_items = [
        AgentTraceItem(
            agent=t.get("agent", ""),
            status=t.get("status", "success"),
            latency_ms=t.get("latency_ms", 0.0),
            summary=t.get("summary"),
        )
        for t in state.agent_trace
    ]

    return AgentRunResponse(
        input_text=clean_text,
        detection_label=det.get("label", "unknown"),
        risk_level=risk.get("level", "LOW"),
        agent_trace=trace_items,
    )
