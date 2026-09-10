# CyberSafe AI: Multi-Agent Architecture

## 1. Autonomous Agent Design Philosophy
Unlike simplistic monolithic LLM chains, CyberSafe AI structures inference through 7 specialized, modular agents. Each agent has an explicit responsibility, isolated error boundary, automated telemetry timer, and reads/writes to a shared state object (`CyberbullyingState`).

```
Input Message
     │
     ▼
DetectionAgent (RoBERTa Transformer)
     │
     ▼
EmotionAgent (VADER & Emotion Lexicon)
     │
     ▼
ContextAgent (LLM Nuance & Threat Parsing)
     │
     ▼
RiskAgent (Deterministic Multi-Signal Synthesis)
     │
     ▼
RAGAgent (Vector Knowledge Retrieval)
     │
     ▼
ExplanationAgent (Factual Grounded Explanations)
     │
     ▼
ResponseAgent (Safe Actionable Guidance)
     │
     ▼
Final Comprehensive Output + Execution Trace
```

---

## 2. Agent Catalog

| Agent | Core Function | Inputs | Outputs |
|---|---|---|---|
| **1. DetectionAgent** | Runs primary RoBERTa classification | Sanitized text | `label`, `confidence`, `probabilities`, `latency_ms` |
| **2. EmotionAgent** | Computes affective sentiment polarity and emotional intensity | Sanitized text | `sentiment` (pos/neu/neg), `emotions` (anger, fear, sadness, neutral, joy) |
| **3. ContextAgent** | Evaluates sarcasm, implicit abuse, threat indicators, and typographical aggression | Sanitized text, RoBERTa prediction | `threat_detected`, `sarcasm_detected`, `high_aggression_signals`, `llm_nuance_assessment` |
| **4. RiskAgent** | Deterministically synthesizes classifier confidence, threat markers, and emotion scores | RoBERTa confidence, emotions, threats | Risk tier (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`), `risk_score` (0.0 - 1.0), `reasons` list |
| **5. RAGAgent** | Retrieves relevant policy, intervention, and platform reporting guidelines from vector store | Text, risk tier, keywords | List of `DocumentChunk` with similarity scores |
| **6. ExplanationAgent** | Synthesizes an objective, grounded natural language explanation | Predictions, confidence, emotions, risk reasons | `explanation` text |
| **7. ResponseAgent** | Formulates non-escalatory, practical safety guidance | Risk tier, retrieved RAG protocols | `recommendations` list (3-4 items), `final_response` |

---

## 3. Graceful Degradation Guarantees
The system is built to maintain partial utility even when external dependencies or services fail:
- **LLM Provider Offline**: If OpenAI / Anthropic / Ollama fails, `llm_service` seamlessly switches to the deterministic `IntelligentLocalProvider`, guaranteeing that explanations, recommendations, and chat replies continue without interruption.
- **RAG / Vector Store Empty**: If the knowledge base is unpopulated, the core RoBERTa detection, emotion analysis, and risk scoring still run successfully.
- **Emotion Analysis Failure**: The pipeline logs the failure in `agent_trace` and continues without failing the primary classification.
