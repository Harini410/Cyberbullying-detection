# CyberSafe AI: REST API Documentation

Base URL: `http://localhost:8000/api`  
Interactive Swagger UI: `http://localhost:8000/docs`  
ReDoc UI: `http://localhost:8000/redoc`  

All requests and responses use `application/json`. Responses include custom headers:
- `X-Request-ID`: Unique tracking identifier for tracing.
- `X-Process-Time-MS`: Backend processing latency in milliseconds.

---

## 1. System Endpoints

### `GET /api/health`
Checks overall platform health and component readiness.
- **Response `200 OK`**:
```json
{
  "status": "healthy",
  "service": "CyberSafe AI",
  "version": "2.0.0",
  "uptime_seconds": 142.5,
  "environment": "development",
  "components": {
    "roberta_service": {
      "loaded": true,
      "model_name": "cardiffnlp/twitter-roberta-base-offensive",
      "device": "cpu"
    },
    "vector_store": {
      "status": "healthy",
      "type": "LocalPersistentVectorStore",
      "total_chunks": 50
    },
    "llm_service": {
      "provider": "openai",
      "model": "gpt-4o-mini",
      "configured": true
    }
  },
  "privacy_guarantees": {
    "training_privacy": "Federated Learning with Differential Privacy...",
    "inference_privacy": "Real-time PII anonymization applied...",
    "storage_policy": "No raw user messages logged without consent..."
  }
}
```

### `GET /api/models`
Returns information on active RoBERTa and historical benchmarked baselines.

### `GET /api/metrics`
Returns dataset metrics and evaluation benchmark scores.

---

## 2. Detection & Analysis Endpoints

### `POST /api/detect`
Fast sequence classification using RoBERTa.
- **Request Body**:
```json
{
  "text": "You are worthless and nobody likes you.",
  "model": "roberta"
}
```
- **Response `200 OK`**:
```json
{
  "label": "cyberbullying",
  "confidence": 0.849,
  "probabilities": {
    "non_bullying": 0.151,
    "cyberbullying": 0.849
  },
  "model_name": "RoBERTa (cardiffnlp/twitter-roberta-base-offensive)",
  "model_version": "1.0.0",
  "latency_ms": 38.2,
  "pii_redacted": false
}
```

### `POST /api/analyze`
Comprehensive multi-agent evaluation.
- **Request Body**:
```json
{
  "text": "Kill yourself, loser. The world would be better without you.",
  "include_trace": true
}
```
- **Response `200 OK`**:
```json
{
  "request_id": "req_a1b2c3d4e5f6",
  "prediction": {
    "label": "cyberbullying",
    "confidence": 0.9753,
    "probabilities": {
      "non_bullying": 0.0247,
      "cyberbullying": 0.9753
    },
    "model_name": "RoBERTa"
  },
  "affective_analysis": {
    "sentiment": {
      "sentiment": "negative",
      "score": 0.82,
      "details": {
        "compound": -0.85,
        "positive": 0.0,
        "neutral": 0.18,
        "negative": 0.82
      }
    },
    "emotions": [
      {"label": "anger", "score": 0.72},
      {"label": "fear", "score": 0.14},
      {"label": "sadness", "score": 0.10},
      {"label": "neutral", "score": 0.03},
      {"label": "joy", "score": 0.01}
    ]
  },
  "context": {
    "sarcasm_detected": false,
    "threat_detected": true,
    "high_aggression_signals": true,
    "llm_nuance_assessment": "Explicit death threat and harassment."
  },
  "risk": {
    "level": "CRITICAL",
    "score": 0.95,
    "reasons": [
      "RoBERTa classifier detected abusive patterns with 97.5% confidence.",
      "Identified explicit violent threat or self-harm keywords.",
      "Elevated affective anger/hostility intensity."
    ]
  },
  "explanation": "The RoBERTa sequence classifier identified severe hostility and incitement of self-harm...",
  "recommendations": [
    "Document and preserve: Capture timestamped screenshots, URLs, and account IDs immediately.",
    "Enforce digital boundary: Block and restrict the sender across all communication platforms.",
    "Official escalation: Submit a report to platform Trust & Safety and alert community administrators.",
    "Prioritize well-being: Disengage and contact the 988 Crisis Lifeline if in distress."
  ],
  "sources": [
    {
      "chunk_id": "chk_102",
      "title": "Online Platform Reporting and Evidence Preservation Guide",
      "source": "data/knowledge/online_safety/platform_reporting_guides.md",
      "category": "online_safety",
      "score": 0.89,
      "text": "Before deleting or blocking messages, preserving incontrovertible digital evidence..."
    }
  ],
  "agent_trace": [
    {"agent": "DetectionAgent", "status": "success", "latency_ms": 35.1, "summary": "DetectionAgent completed successfully."},
    {"agent": "EmotionAgent", "status": "success", "latency_ms": 4.2, "summary": "EmotionAgent completed successfully."},
    {"agent": "ContextAgent", "status": "success", "latency_ms": 12.0, "summary": "ContextAgent completed successfully."},
    {"agent": "RiskAgent", "status": "success", "latency_ms": 0.5, "summary": "RiskAgent completed successfully."},
    {"agent": "RAGAgent", "status": "success", "latency_ms": 18.3, "summary": "RAGAgent completed successfully."},
    {"agent": "ExplanationAgent", "status": "success", "latency_ms": 25.1, "summary": "ExplanationAgent completed successfully."},
    {"agent": "ResponseAgent", "status": "success", "latency_ms": 8.4, "summary": "ResponseAgent completed successfully."}
  ],
  "latency_ms": 103.6
}
```

---

## 3. Chatbot & Memory Endpoints

### `POST /api/chat`
Conversational assistant with session memory, bound analysis support, and RAG grounding.
- **Request Body**:
```json
{
  "message": "Why was the previous message classified as cyberbullying?",
  "conversation_id": "conv_9f8e7d6c5b4a",
  "analysis_id": "req_a1b2c3d4e5f6"
}
```
- **Response `200 OK`**:
```json
{
  "conversation_id": "conv_9f8e7d6c5b4a",
  "message": "The message was classified as cyberbullying because the RoBERTa model identified targeted hostile language with high confidence (97.5%). This was coupled with strong negative sentiment and elevated anger markers...",
  "sources": [
    {
      "chunk_id": "chk_102",
      "title": "Cyberbullying Taxonomy, Indicators, and Behavioral Patterns",
      "source": "data/knowledge/cyberbullying/types_and_taxonomy.md",
      "category": "cyberbullying",
      "score": 0.94,
      "text": "Direct Harassment: Repeated transmission of offensive, derogatory, or threatening messages..."
    }
  ],
  "context_used": true,
  "latency_ms": 45.3
}
```

### `GET /api/conversations/{conversation_id}`
Retrieves chronological message history for a conversation session.

---

## 4. RAG Endpoints

### `POST /api/rag/search`
Vector similarity search over verified knowledge passages.
- **Request Body**:
```json
{
  "query": "how to report harassment on instagram",
  "top_k": 3
}
```

### `POST /api/rag/ingest`
Triggers document parsing, chunking, embedding generation, and vector database persistence.
- **Request Body**:
```json
{
  "force_reload": false
}
```
