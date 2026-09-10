import asyncio
from backend.app.schemas.agents import CyberbullyingState
from backend.app.agents.orchestrator import orchestrator
from backend.app.agents.risk_agent import risk_agent


def test_risk_agent_logic():
    async def _run():
        # Severe threat message state
        threat_state = CyberbullyingState(
            input_text="I will find you and kill you.",
            detection_result={"label": "cyberbullying", "confidence": 0.95},
            sentiment={"sentiment": "negative", "details": {"negative": 0.8}},
            emotions={"emotions": [{"label": "anger", "score": 0.85}, {"label": "fear", "score": 0.60}]},
            context={"threat_detected": True, "high_aggression_signals": True},
        )
        result_state = await risk_agent.process(threat_state)
        assert result_state.risk is not None
        assert result_state.risk["level"] in ["HIGH", "CRITICAL"]
        assert len(result_state.risk["reasons"]) >= 1

        # Safe message state
        safe_state = CyberbullyingState(
            input_text="Have a wonderful morning!",
            detection_result={"label": "non_bullying", "confidence": 0.98},
            sentiment={"sentiment": "positive", "details": {"positive": 0.8}},
            emotions={"emotions": [{"label": "joy", "score": 0.90}]},
            context={"threat_detected": False, "high_aggression_signals": False},
        )
        result_safe = await risk_agent.process(safe_state)
        assert result_safe.risk["level"] == "LOW"

    asyncio.run(_run())


def test_full_orchestrator():
    async def _run():
        state = await orchestrator.run("You are a worthless loser and nobody likes you.")
        assert state.detection_result is not None
        assert state.detection_result["label"] == "cyberbullying"
        assert state.sentiment is not None
        assert state.emotions is not None
        assert state.risk is not None
        assert state.explanation is not None
        assert len(state.recommendations) >= 1
        assert len(state.agent_trace) == 7

        # Ensure all agents executed
        agent_names = [t["agent"] for t in state.agent_trace]
        expected = [
            "DetectionAgent", "EmotionAgent", "ContextAgent",
            "RiskAgent", "RAGAgent", "ExplanationAgent", "ResponseAgent"
        ]
        assert agent_names == expected

    asyncio.run(_run())
