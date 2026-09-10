import re
from backend.app.agents.base import BaseAgent
from backend.app.schemas.agents import CyberbullyingState
from backend.app.llm.service import llm_service
from backend.app.llm.prompts import CONTEXT_AGENT_SYSTEM_PROMPT


class ContextAgent(BaseAgent):
    """
    Evaluates subtle conversational context, implicit abuse, and ambiguity.
    Guaranteed not to override the primary RoBERTa classification.
    """

    def __init__(self):
        super().__init__(name="ContextAgent")

    async def process(self, state: CyberbullyingState) -> CyberbullyingState:
        text = state.sanitized_text or state.input_text

        # Heuristic markers
        has_threat_keyword = bool(re.search(r"\b(kill|die|punch|beat|hurt|stalk|destroy|slit)\b", text, re.I))
        has_all_caps = len([c for c in text if c.isupper()]) > len(text) * 0.4 and len(text) > 10
        has_excessive_punctuation = bool(re.search(r"[!?]{3,}", text))

        prompt = (
            f"Analyze the following text for sarcasm, targeted harassment, threat indicators, and ambiguity:\n"
            f"Text: \"{text}\"\n"
            f"Primary RoBERTa prediction: {state.detection_result.get('label') if state.detection_result else 'Unknown'}"
        )

        llm_analysis = await llm_service.generate(prompt=prompt, system_prompt=CONTEXT_AGENT_SYSTEM_PROMPT)

        state.context = {
            "sarcasm_detected": False,
            "threat_detected": has_threat_keyword,
            "high_aggression_signals": has_all_caps or has_excessive_punctuation,
            "llm_nuance_assessment": llm_analysis,
        }
        return state


context_agent = ContextAgent()
