import time
from abc import ABC, abstractmethod
from typing import Dict, Any
from backend.app.schemas.agents import CyberbullyingState
from backend.app.utils.logging import logger, LatencyTimer


class BaseAgent(ABC):
    """Abstract base class for all pipeline agents with automated tracing and telemetry."""

    def __init__(self, name: str):
        self.name = name

    @abstractmethod
    async def process(self, state: CyberbullyingState) -> CyberbullyingState:
        pass

    async def execute(self, state: CyberbullyingState) -> CyberbullyingState:
        """Executes agent processing wrapped in an error boundary and telemetry timer."""
        start_time = time.perf_counter()
        try:
            state = await self.process(state)
            latency = round((time.perf_counter() - start_time) * 1000, 2)
            state.agent_trace.append({
                "agent": self.name,
                "status": "success",
                "latency_ms": latency,
                "summary": f"{self.name} completed successfully."
            })
            return state
        except Exception as e:
            latency = round((time.perf_counter() - start_time) * 1000, 2)
            logger.error(f"Agent {self.name} encountered error: {e}", exc_info=True)
            state.agent_trace.append({
                "agent": self.name,
                "status": "error",
                "latency_ms": latency,
                "summary": f"Failed: {str(e)}"
            })
            # Graceful degradation: return state without crashing whole pipeline
            return state
