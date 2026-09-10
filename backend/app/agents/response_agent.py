from backend.app.agents.base import BaseAgent
from backend.app.schemas.agents import CyberbullyingState
from backend.app.llm.service import llm_service
from backend.app.llm.prompts import RESPONSE_AGENT_SYSTEM_PROMPT


class ResponseAgent(BaseAgent):
    """Formulates non-escalatory, practical safety guidance and intervention steps."""

    def __init__(self):
        super().__init__(name="ResponseAgent")

    async def process(self, state: CyberbullyingState) -> CyberbullyingState:
        det = state.detection_result or {}
        risk = state.risk or {}
        label = det.get("label", "non_bullying")
        risk_level = risk.get("level", "LOW")

        if label == "non_bullying":
            state.recommendations = [
                "Content appears safe and does not violate digital civility norms.",
                "Continue practicing constructive and empathetic online communication.",
                "No moderation intervention or report required."
            ]
            state.final_response = "Message verified as safe."
            return state

        # High or Critical severity guidance
        if risk_level in ["HIGH", "CRITICAL"]:
            state.recommendations = [
                "Document and preserve: Capture timestamped screenshots, URLs, and account IDs immediately.",
                "Enforce digital boundary: Block and restrict the sender across all communication platforms.",
                "Official escalation: Submit a report to platform Trust & Safety and alert community administrators.",
                "Prioritize well-being: Disengage from the interaction and contact trusted support or the 988 Crisis Lifeline if in distress."
            ]
        else:
            state.recommendations = [
                "Mute and disengage: Avoid responding or retaliating to incendiary comments.",
                "Capture screenshot evidence if comments are part of repeated unwanted contact.",
                "Use in-app flagging to request community moderator review."
            ]

        prompt = (
            f"Given a cyberbullying violation at risk tier {risk_level} with retrieved guidance: "
            f"{[d.get('title') for d in state.retrieved_documents]}, generate a concise supportive closing advice statement."
        )
        closing = await llm_service.generate(prompt=prompt, system_prompt=RESPONSE_AGENT_SYSTEM_PROMPT)
        state.final_response = closing
        return state


response_agent = ResponseAgent()
