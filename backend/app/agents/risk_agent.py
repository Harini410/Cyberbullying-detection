from typing import List
from backend.app.agents.base import BaseAgent
from backend.app.schemas.agents import CyberbullyingState


class RiskAgent(BaseAgent):
    """
    Synthesizes multi-modal signals into an objective Risk Level:
    LOW, MEDIUM, HIGH, or CRITICAL, with deterministic evidence reasons.
    """

    def __init__(self):
        super().__init__(name="RiskAgent")

    async def process(self, state: CyberbullyingState) -> CyberbullyingState:
        det = state.detection_result or {}
        sent = state.sentiment or {}
        emo = state.emotions or {}
        ctx = state.context or {}

        label = det.get("label", "non_bullying")
        confidence = det.get("confidence", 0.5)

        neg_sentiment = sent.get("details", {}).get("negative", 0.0)
        emotions_list = emo.get("emotions", [])
        anger_score = next((e["score"] for e in emotions_list if e["label"] == "anger"), 0.0)
        fear_score = next((e["score"] for e in emotions_list if e["label"] == "fear"), 0.0)

        threat_detected = ctx.get("threat_detected", False)
        high_aggression = ctx.get("high_aggression_signals", False)

        reasons: List[str] = []
        risk_score = 0.0

        if label == "cyberbullying":
            risk_score += 0.5 * confidence
            reasons.append(f"RoBERTa classifier detected abusive patterns with {round(confidence * 100, 1)}% confidence.")
        else:
            risk_score += 0.1 * (1.0 - confidence)

        if threat_detected:
            risk_score += 0.4
            reasons.append("Identified explicit violent threat or self-harm keywords.")

        if anger_score > 0.4:
            risk_score += 0.15
            reasons.append(f"Elevated affective anger/hostility intensity ({round(anger_score * 100, 1)}%).")

        if neg_sentiment > 0.4:
            risk_score += 0.1
            reasons.append(f"Strong negative sentiment polarity ({round(neg_sentiment * 100, 1)}%).")

        if high_aggression:
            risk_score += 0.05
            reasons.append("Aggressive typographical markers (excessive capitalization or punctuation).")

        risk_score = min(1.0, round(risk_score, 3))

        # Categorize risk level
        if threat_detected or risk_score >= 0.85:
            level = "CRITICAL"
        elif risk_score >= 0.60:
            level = "HIGH"
        elif risk_score >= 0.35:
            level = "MEDIUM"
        else:
            level = "LOW"
            if not reasons:
                reasons.append("Content evaluated as safe and non-threatening.")

        state.risk = {
            "level": level,
            "score": risk_score,
            "reasons": reasons,
        }
        return state


risk_agent = RiskAgent()
