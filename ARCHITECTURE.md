# CyberSafe AI: Complete System Architecture

CyberSafe AI is an enterprise-grade cyberbullying detection, affect analysis, explainability, and conversational safety platform. It integrates a fine-tuned RoBERTa transformer sequence classifier with affective NLP (sentiment & emotion modeling), a 7-agent autonomous orchestrator, a dense RAG knowledge retrieval engine, and an interactive AI chatbot with session memory.

---

## 1. High-Level Architecture Diagram

```mermaid
flowchart TD
    User([User / Browser])
    
    subgraph Frontend["React / Next.js 15 UI"]
        Home["Home Landing (/)"]
        DetectorUI["Detector & Multi-Agent Trace (/detect)"]
        ChatUI["CyberSafe AI Chatbot (/chat)"]
        DashUI["Analytics & Benchmarks (/dashboard)"]
    end
    
    subgraph Gateway["FastAPI REST Backend (:8000)"]
        APIRouter["API Gateway & Middleware"]
        CORS["CORS & Origin Validation"]
        RateLimit["Rate Limiting & Sanitization"]
        Telemetry["Telemetry, Trace IDs, Latency Timing"]
    end
    
    subgraph Orchestration["Autonomous Multi-Agent Orchestrator"]
        State["CyberbullyingState (Shared Memory)"]
        A1["1. DetectionAgent (RoBERTa)"]
        A2["2. EmotionAgent (Sentiment & Emotion)"]
        A3["3. ContextAgent (LLM Nuance & Threats)"]
        A4["4. RiskAgent (Deterministic Risk Synthesis)"]
        A5["5. RAGAgent (Vector Retrieval)"]
        A6["6. ExplanationAgent (Grounded Reasoning)"]
        A7["7. ResponseAgent (Actionable Guidance)"]
    end
    
    subgraph ML_Layer["Machine Learning & NLP Services"]
        RoBERTa["RoBERTa Transformer (cardiffnlp/twitter-roberta-base-offensive)"]
        VADER["VADER Sentiment Intensity Analyzer"]
        EmotionEngine["Affective Emotion Lexicon Engine (Plutchik/Ekman)"]
        MiniLM["MiniLM Dense Semantic Embeddings"]
    end
    
    subgraph RAG_Layer["RAG & Knowledge Storage"]
        KB[("data/knowledge/ Markdown Documents")]
        LocalVec[("Local Persistent Vector Store (data/vector_db)")]
        Reranker["Cross-Match Overlap Reranker"]
    end
    
    subgraph Chat_Memory["Conversation Memory & Database"]
        ConvMgr["ConversationManager"]
        SQLite[("SQLAlchemy / SQLite (cyberbullying.db)")]
        ContextBuilder["Chat Context Builder"]
    end
    
    subgraph LLM_Layer["LLM & Guardrails"]
        Security["Prompt Injection Filter & Output Validator"]
        Provider{"LLM Router"}
        OpenAI["OpenAI GPT-4o-mini"]
        Anthropic["Anthropic Claude"]
        Ollama["Local Ollama"]
        LocalSynth["Intelligent Local Synthesizer"]
    end

    User <--> Frontend
    Frontend <--> Gateway
    Gateway --> Orchestration
    Gateway --> ConvMgr
    
    Orchestration --> A1 --> RoBERTa
    Orchestration --> A2 --> VADER & EmotionEngine
    Orchestration --> A3 --> Security
    Orchestration --> A4
    Orchestration --> A5 --> Reranker --> LocalVec
    Orchestration --> A6 --> Security
    Orchestration --> A7 --> Security
    
    KB --> MiniLM --> LocalVec
    
    ConvMgr <--> SQLite
    ConvMgr --> Reranker
    ConvMgr --> ContextBuilder --> Security
    
    Security --> Provider
    Provider --> OpenAI
    Provider --> Anthropic
    Provider --> Ollama
    Provider --> LocalSynth
```

---

## 2. Core Subsystems

### 2.1 Detection & Affective Subsystem
- **RoBERTa Transformer**: Primary classification model running CardiffNLP twitter-roberta-base-offensive (or local fine-tuned checkpoints). Evaluates dense bidirectional representations to compute calibrated non-bullying vs cyberbullying probabilities.
- **Sentiment Service**: Extracts compound, negative, neutral, and positive polarity utilizing VADER.
- **Emotion Engine**: Projects affective markers across 5 core dimensions: Anger, Fear, Sadness, Neutral, and Joy.

### 2.2 Multi-Agent Orchestration Subsystem
Coordinates execution across 7 specialized autonomous agents using a shared structured dataclass (`CyberbullyingState`):
1. **DetectionAgent**: Invokes RoBERTa inference.
2. **EmotionAgent**: Extracts affective sentiment and fine-grained emotion vectors.
3. **ContextAgent**: Evaluates threat keywords, sarcasm, and aggression without overriding RoBERTa.
4. **RiskAgent**: Synthesizes evidence into objective tiers: `LOW`, `MEDIUM`, `HIGH`, or `CRITICAL`.
5. **RAGAgent**: Queries the persistent vector store for domain policy and intervention guidance.
6. **ExplanationAgent**: Synthesizes a factual, grounded natural language explanation of model outputs.
7. **ResponseAgent**: Formulates actionable safety protocols (block, preserve evidence, report, crisis helplines).

### 2.3 RAG Knowledge Retrieval Subsystem
- **Knowledge Categories**:
  - `cyberbullying/`: Taxonomy, behavioral indicators, severity criteria.
  - `online_safety/`: Platform-specific reporting guides (Instagram, X, Discord, TikTok, YouTube).
  - `moderation/`: Content moderation standards and escalation matrices.
  - `intervention/`: Immediate crisis response protocols and hotline numbers.
  - `prevention/`: Active bystander intervention (4Ds framework) and digital civility.
  - `research/`: RoBERTa transformer benchmarks and Federated Learning with Differential Privacy.
- **Vector Store**: High-performance persistent vector database with exact cosine similarity search over MiniLM dense embeddings and cross-attribute re-ranking.

### 2.4 Chatbot & Memory Subsystem
- **Session Memory**: Stores conversation records, messages, and analysis attachments in SQLite via SQLAlchemy.
- **Token Bounding**: Implements sliding window memory with character and message count limits.
- **Prompt Security**: Intercepts jailbreak attempts, command overrides, and leaks before reaching LLMs.
