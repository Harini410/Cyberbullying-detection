from backend.app.agents.base import BaseAgent
from backend.app.schemas.agents import CyberbullyingState
from backend.app.llm.service import llm_service
from backend.app.llm.prompts import EXPLANATION_AGENT_SYSTEM_PROMPT


class ExplanationAgent(BaseAgent):
    """Generates grounded natural-language explanations reflecting actual RoBERTa outputs and affective metrics."""

    def __init__(self):
        super().__init__(name="ExplanationAgent")

    async def process(self, state: CyberbullyingState) -> CyberbullyingState:
        det = state.detection_result or {}
        emo = state.emotions or {}
        sent = state.sentiment or {}
        risk = state.risk or {}

        label = det.get("label", "non_bullying")
        confidence = det.get("confidence", 0.0)
        risk_level = risk.get("level", "LOW")
        sentiment_label = sent.get("sentiment", "neutral")

        prompt = (
            f"Please explain this classification result for the message: \"{state.sanitized_text or state.input_text}\"\n"
            f"- Model Prediction: {label} (Confidence: {round(confidence * 100, 1)}%)\n"
            f"- Sentiment Polarity: {sentiment_label}\n"
            f"- Risk Assessment: {risk_level} (Score: {risk.get('score', 0.0)})\n"
            f"- Dominant Emotions: {emo.get('emotions', [])[:2]}\n"
            f"- Risk Rationale: {risk.get('reasons', [])}\n"
            f"Explain clearly why this was classified as {label} based on the linguistic and affective factors above."
        )

        explanation = await llm_service.generate(prompt=prompt, system_prompt=EXPLANATION_AGENT_SYSTEM_PROMPT)
        state.explanation = explanation
        return state


explanation_agent = ExplanationAgent()
