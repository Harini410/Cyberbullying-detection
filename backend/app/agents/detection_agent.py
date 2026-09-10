from backend.app.agents.base import BaseAgent
from backend.app.schemas.agents import CyberbullyingState
from backend.app.ml.roberta_service import roberta_service


class DetectionAgent(BaseAgent):
    """Executes primary RoBERTa classification on the input message."""

    def __init__(self):
        super().__init__(name="DetectionAgent")

    async def process(self, state: CyberbullyingState) -> CyberbullyingState:
        target_text = state.sanitized_text or state.input_text
        result = roberta_service.predict(target_text)
        state.detection_result = result
        return state


detection_agent = DetectionAgent()
