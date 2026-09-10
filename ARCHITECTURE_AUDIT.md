# Comprehensive Repository & Architecture Audit: Cyberbullying Detection

**Project:** Hybrid Privacy-Preserving Cyberbullying Detection Framework Using RoBERTa  
**Target Platform:** CyberSafe AI (RoBERTa + Affective Analysis + LLM + RAG + Multi-Agent + Chatbot Platform)  
**Date:** September 2026  
**Auditor:** Autonomous Senior AI/Backend Engineer  

---

## 1. Executive Summary

An exhaustive audit of the existing codebase at `Cyberbullying-detection-main` reveals a discrepancy between the academic research documentation (`README.md`) and the repository's concrete source code:

1. **Documented Architecture vs Concrete Implementation**:
   - **Documented**: Python backend (`app.py`, Flask/FastAPI), fine-tuned RoBERTa transformer model on 47,692 tweets, SMOTE balancing, Federated Learning with Differential Privacy (`opacus`), emotion/sentiment feature integration, and baseline comparisons (CNN, RNN, LSTM, BiLSTM, GRU).
   - **Concrete Repository Reality**: The repository contains a Next.js 15 (React 19, TypeScript, Tailwind CSS v4) frontend application. The backend is solely represented by a simulated mock route at `app/api/classify/route.ts` which uses keyword matching and mathematical formulas (`Math.random()` and heuristic modifiers) to simulate RoBERTa, emotion scores, and baseline model outputs.
2. **Missing Production AI/ML Layer**:
   - There was no Python FastAPI backend running live RoBERTa weights.
   - There was no LLM integration, vector database, RAG pipeline, multi-agent orchestration, conversation memory, or conversational chatbot interface.
3. **Audit Verdict**:
   - The Next.js frontend UI (pages for Home, Detect, Dashboard, Features, Research, About, Contact) is well-structured visually and ready for integration.
   - We must construct the entire Python FastAPI backend (`backend/`), real RoBERTa inference service (`RobertaDetectionService`), sentiment and emotion analysis services, RAG knowledge ingestion and vector store, multi-agent orchestrator, AI chatbot API, and wire the Next.js frontend to the real backend.

---

## 2. Current Repository Breakdown

### 2.1 Directory Structure
```
Cyberbullying-detection-main/
├── .gitignore
├── components.json
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md
├── tsconfig.json
├── app/
│   ├── about/page.tsx
│   ├── api/classify/route.ts          <-- Mock API endpoint
│   ├── contact/page.tsx
│   ├── dashboard/page.tsx
│   ├── detect/page.tsx               <-- Detection interface
│   ├── features/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx                      <-- Landing page
│   └── research/page.tsx             <-- Research metrics & charts
├── components/
│   ├── navigation.tsx
│   ├── theme-provider.tsx
│   └── ui/ (button, card, dialog, progress, etc.)
├── lib/
│   └── utils.ts
└── public/
    └── (static assets and placeholders)
```

### 2.2 Analysis of Existing Components

| Component | Status | Findings |
|---|---|---|
| **RoBERTa Model** | Documented / Mocked | Documented as 93% accuracy, 94% precision/F1. Implemented in `app/api/classify/route.ts` via random number generation + keyword checks. Real HuggingFace RoBERTa model (`roberta-base` / fine-tuned classifier) must be instantiated in Python. |
| **Sentiment Analysis** | Mocked | Simulated with emotion calculations; real VADER / TextBlob / HuggingFace RoBERTa sentiment must be integrated. |
| **Emotion Analysis** | Mocked | Heuristically computed for anger, fear, sadness, neutral, joy in TypeScript. Real emotion extraction model needed in Python backend. |
| **Federated Learning & DP** | Documented | Documented in `README.md` and visualized in `app/research/page.tsx`. Python environment has `opacus` (1.5.4) and `torch` (2.0.0). |
| **FastAPI Backend** | Missing | Documented in `README.md` (`python app.py` on port 5000), but missing from file tree. Needs full implementation. |
| **RAG & Vector Store** | Missing | Not implemented. Required: ChromaDB / persistent vector store, chunking, embeddings, cyberbullying safety knowledge base. |
| **LLM & Agents** | Missing | Not implemented. Required: LLM provider abstraction, multi-agent orchestrator (Detection, Emotion, Context, Risk, RAG, Explanation, Response). |
| **Chatbot & Memory** | Missing | Not implemented. Required: Conversation manager, SQLite session memory, grounded answers, API `/api/chat`, and Next.js Chat UI. |
| **Frontend UI** | Working (Needs upgrade) | Next.js 15, Tailwind CSS, Framer Motion, Recharts. Needs connection to real FastAPI backend and dedicated CyberSafe AI Chat interface. |

---

## 3. Data Flow & API Comparison

### 3.1 Current Data Flow
```
User (Browser) 
   ──> Next.js Form (/detect)
   ──> POST /api/classify (Next.js serverless route)
   ──> Simulated keyword check + Math.random()
   ──> Mock JSON response { prediction, confidence, emotions }
   ──> Render Recharts bar chart
```

### 3.2 Target Upgraded Data Flow
```
User (Browser / CyberSafe UI)
   │
   ├──> POST /api/analyze (Detection + Multi-Agent Pipeline)
   │         │
   │         ▼
   │     FastAPI Gateway (backend/app/main.py)
   │         │
   │         ▼
   │     Agent Orchestrator
   │         ├──> DetectionAgent (Real RoBERTa Transformer Classifier)
   │         ├──> EmotionAgent (Real Sentiment & Emotion Services)
   │         ├──> ContextAgent (LLM Context & Nuance Analysis)
   │         ├──> RiskAgent (Deterministic Evidence Synthesis: LOW/MED/HIGH/CRITICAL)
   │         ├──> RAGAgent (Vector DB Retrieval from Verified Knowledge Base)
   │         ├──> ExplanationAgent (Grounded Natural Language Explanation)
   │         └──> ResponseAgent (Actionable Safety Recommendations)
   │         │
   │         ▼
   │     Comprehensive Structured Result + Execution Trace (Latencies, IDs)
   │
   └──> POST /api/chat (Conversational AI Assistant)
             │
             ▼
         Conversation Manager (SQLite History + Context Window)
             │
             ▼
         RAG Retrieval (Safety Policies, Escalation Guides, Previous Analyses)
             │
             ▼
         LLM Grounded Synthesis (Prompt Injection Guardrails Active)
             │
             ▼
         Streaming / Grounded Assistant Response with Source Citations
```

---

## 4. Weaknesses of Existing Repository
1. **Zero Real ML Execution**: Predictions are completely simulated via random numbers and 23 negative keywords in TypeScript.
2. **No Explainability**: The user receives a binary label with no causal explanation or risk assessment.
3. **No Support Guidance**: A victim or moderator receiving a "cyberbullying" flag has no actionable guidance on reporting, evidence collection, or safety measures.
4. **No Conversational Interface**: Users cannot ask questions about the result, query safety policies, or seek advice.
5. **No Enterprise API**: Missing validation, structured error handling, OpenAPI/Swagger specifications, health checks, or persistent audit records.

---

## 5. Proposed Architecture & Migration Strategy

### Step 1: Python FastAPI Backend Foundation (`backend/`)
- Establish standard architecture: `api/`, `agents/`, `ml/`, `llm/`, `rag/`, `chat/`, `database/`, `privacy/`, `schemas/`, `utils/`.
- Pydantic v1/v2 compatible schemas, CORS middleware, centralized settings (`config.py`).

### Step 2: Real RoBERTa Service (`RobertaDetectionService`)
- Load genuine HuggingFace RoBERTa sequence classification pipeline (`roberta-base` fine-tuned for hate speech / cyberbullying detection, or local PyTorch checkpoint).
- Provide deterministic probability distribution, inference timing, and GPU/CPU auto-detection.

### Step 3: Affective Analysis Services
- `SentimentService`: VADER / TextBlob / RoBERTa sentiment scores.
- `EmotionService`: Multi-label emotion classifier producing normalized intensities across anger, fear, sadness, neutral, and joy.

### Step 4: RAG & Vector Knowledge Base
- Ingestion pipeline with persistent vector database (ChromaDB with local fallback).
- Curated reference knowledge base in `data/knowledge/` spanning cyberbullying types, platform reporting guidelines, escalation protocols, and research references.

### Step 5: Multi-Agent Orchestrator
- Shared state `CyberbullyingState` flowing sequentially across 7 specialized agents:
  `Detection` -> `Emotion` -> `Context` -> `Risk` -> `RAG` -> `Explanation` -> `Response`.
- Graceful degradation guarantees: System remains fully functional even if LLM or RAG services are temporarily unreachable.

### Step 6: Chatbot System & Conversation Memory
- Conversation manager storing sessions, message histories, and analysis bindings in SQLite via SQLAlchemy.
- Token-conscious context windowing and strict prompt injection defense.

### Step 7: Frontend Integration & Chatbot UI
- Connect Next.js frontend to FastAPI backend (`/api/detect`, `/api/analyze`, `/api/chat`).
- Upgrade `/detect` page to render confidence, probabilities, sentiment, emotions, risk badge, agent execution traces, explanations, recommendations, and source citations.
- Build a dedicated, responsive CyberSafe AI Chatbot interface (`/chat`) with conversation sidebar, sample prompts, and live citations.

### Step 8: Verification, Testing & Containerization
- Unit and integration tests covering RoBERTa, RAG, multi-agent pipeline, chat memory, and API endpoints.
- Dockerfile and docker-compose orchestration.
