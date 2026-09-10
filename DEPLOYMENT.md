# CyberSafe AI: Production Deployment Guide

## 1. Local Development Setup

### Prerequisites
- Python 3.9+ with `pip`
- Node.js 18+ with `pnpm` or `npm`

### Step 1: Start the FastAPI Backend
```bash
# From repository root
$env:PYTHONPATH="." # On Windows PowerShell (or export PYTHONPATH="." on Linux/Mac)
python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
```
- API Base: `http://localhost:8000/api`
- Interactive Swagger Docs: `http://localhost:8000/docs`

### Step 2: Start the Next.js Frontend
```bash
# In a second terminal window
pnpm dev
# or: npm run dev
```
- Web Application: `http://localhost:3000`
- Detector UI: `http://localhost:3000/detect`
- AI Chatbot: `http://localhost:3000/chat`
- Dashboard: `http://localhost:3000/dashboard`

---

## 2. Docker Compose Deployment

Run both services simultaneously in containers with persistent volumes:
```bash
docker compose up --build
```
- Frontend will be available at `http://localhost:3000`
- Backend will be available at `http://localhost:8000`
- SQLite database and vector embeddings persist in mounted volumes.

---

## 3. Cloud Production Architecture

Recommended topology:

```
[ Next.js Frontend ] ──> Vercel
         │
         ▼
[ FastAPI Backend ]  ──> Cloud Container (AWS ECS / GCP Cloud Run / Render / Fly.io)
         │
         ├──> [ Vector Store / Local DB ] (Persistent EBS / Managed Volume)
         ├──> [ Database ] (Managed PostgreSQL via DATABASE_URL)
         └──> [ LLM Provider ] (OpenAI / Anthropic / Local Inference)
```

### Environment Variables Checklist for Cloud:
```ini
HOST=0.0.0.0
PORT=8000
ENVIRONMENT=production
CORS_ORIGINS=https://your-frontend-domain.vercel.app
DATABASE_URL=postgresql://user:pass@host:5432/cybersafe
LLM_PROVIDER=openai
LLM_MODEL=gpt-4o-mini
LLM_API_KEY=sk-...
ROBERTA_MODEL_NAME=cardiffnlp/twitter-roberta-base-offensive
VECTOR_STORE_TYPE=local
VECTOR_STORE_DIR=/data/vector_db
ANONYMIZE_PII=true
LOG_RAW_PROMPTS=false
```
