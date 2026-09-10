from typing import Dict, Any, List
from backend.app.schemas.agents import CyberbullyingState
from backend.app.privacy.privacy_service import privacy_service
from backend.app.agents.detection_agent import detection_agent
from backend.app.agents.emotion_agent import emotion_agent
from backend.app.agents.context_agent import context_agent
from backend.app.agents.risk_agent import risk_agent
from backend.app.agents.rag_agent import rag_agent
from backend.app.agents.explanation_agent import explanation_agent
from backend.app.agents.response_agent import response_agent
from backend.app.utils.logging import logger, LatencyTimer


class AgentOrchestrator:
    """
    Coordinates execution across the 7 specialized agents.
    Provides complete graceful degradation: failures in downstream agents (LLM, RAG)
    never prevent core RoBERTa detection from succeeding.
    """

    def __init__(self):
        self.agents = [
            detection_agent,
            emotion_agent,
            context_agent,
            risk_agent,
            rag_agent,
            explanation_agent,
            response_agent,
        ]

    async def run(self, text: str) -> CyberbullyingState:
        with LatencyTimer("orchestrator_pipeline") as timer:
            # 1. Privacy preprocessing
            privacy_res = privacy_service.process_input(text)
            sanitized = privacy_res["processed_text"]

            state = CyberbullyingState(
                input_text=text,
                sanitized_text=sanitized,
                agent_trace=[]
            )

            # 2. Sequential agent execution
            for agent in self.agents:
                try:
                    state = await agent.execute(state)
                except Exception as e:
                    logger.error(f"Unhandled error in agent {agent.name}: {e}")
                    state.agent_trace.append({
                        "agent": agent.name,
                        "status": "error",
                        "latency_ms": 0.0,
                        "summary": f"Unhandled error: {str(e)}"
                    })

            return state


orchestrator = AgentOrchestrator()
