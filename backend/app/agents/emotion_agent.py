from backend.app.agents.base import BaseAgent
from backend.app.schemas.agents import CyberbullyingState
from backend.app.ml.sentiment_service import sentiment_service
from backend.app.ml.emotion_service import emotion_service


class EmotionAgent(BaseAgent):
    """Computes affective sentiment and multi-dimensional emotion vectors."""

    def __init__(self):
        super().__init__(name="EmotionAgent")

    async def process(self, state: CyberbullyingState) -> CyberbullyingState:
        target_text = state.sanitized_text or state.input_text
        state.sentiment = sentiment_service.analyze(target_text)
        state.emotions = emotion_service.analyze(target_text)
        return state


emotion_agent = EmotionAgent()
