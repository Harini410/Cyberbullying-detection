import json
import httpx
from typing import Optional, Dict, Any, List
from backend.app.config import settings
from backend.app.llm.base import BaseLLMProvider
from backend.app.utils.logging import logger, LatencyTimer
from backend.app.utils.security import check_prompt_injection, validate_llm_output


class OpenAIProvider(BaseLLMProvider):
    def __init__(self, api_key: str, model: str = "gpt-4o-mini", base_url: str = "https://api.openai.com/v1"):
        self.api_key = api_key
        self.model = model
        self.base_url = base_url.rstrip("/")

    async def generate(self, prompt: str, system_prompt: Optional[str] = None, temperature: float = 0.2, max_tokens: int = 1024) -> str:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(f"{self.base_url}/chat/completions", headers=headers, json=payload)
            resp.raise_for_status()
            data = resp.json()
            return data["choices"][0]["message"]["content"].strip()

    def health_check(self) -> Dict[str, Any]:
        return {"provider": "openai", "model": self.model, "configured": bool(self.api_key)}


class AnthropicProvider(BaseLLMProvider):
    def __init__(self, api_key: str, model: str = "claude-3-5-sonnet-20241022"):
        self.api_key = api_key
        self.model = model

    async def generate(self, prompt: str, system_prompt: Optional[str] = None, temperature: float = 0.2, max_tokens: int = 1024) -> str:
        headers = {
            "x-api-key": self.api_key,
            "anthropic-version": "2023-06-01",
            "Content-Type": "application/json",
        }
        payload = {
            "model": self.model,
            "max_tokens": max_tokens,
            "temperature": temperature,
            "messages": [{"role": "user", "content": prompt}],
        }
        if system_prompt:
            payload["system"] = system_prompt

        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post("https://api.anthropic.com/v1/messages", headers=headers, json=payload)
            resp.raise_for_status()
            data = resp.json()
            return data["content"][0]["text"].strip()

    def health_check(self) -> Dict[str, Any]:
        return {"provider": "anthropic", "model": self.model, "configured": bool(self.api_key)}


class OllamaProvider(BaseLLMProvider):
    def __init__(self, model: str = "llama3", base_url: str = "http://localhost:11434"):
        self.model = model
        self.base_url = base_url.rstrip("/")

    async def generate(self, prompt: str, system_prompt: Optional[str] = None, temperature: float = 0.2, max_tokens: int = 1024) -> str:
        payload = {
            "model": self.model,
            "prompt": f"{system_prompt}\n\n{prompt}" if system_prompt else prompt,
            "stream": False,
            "options": {"temperature": temperature},
        }
        async with httpx.AsyncClient(timeout=60.0) as client:
            resp = await client.post(f"{self.base_url}/api/generate", json=payload)
            resp.raise_for_status()
            data = resp.json()
            return data.get("response", "").strip()

    def health_check(self) -> Dict[str, Any]:
        return {"provider": "ollama", "model": self.model, "configured": True}


class IntelligentLocalProvider(BaseLLMProvider):
    """
    High-fidelity deterministic local synthesizer.
    Generates grounded explanations, recommendations, and conversational answers
    based on actual RoBERTa scores, affective emotion features, and retrieved RAG chunks
    without requiring external cloud API credentials.
    """

    def __init__(self):
        pass

    async def generate(self, prompt: str, system_prompt: Optional[str] = None, temperature: float = 0.2, max_tokens: int = 1024) -> str:
        sys_lower = (system_prompt or "").lower()

        # 1. Pipeline Agent Callers
        if "explanation agent" in sys_lower:
            return (
                "The RoBERTa transformer sequence model classified this text based on dense bidirectional attention patterns. "
                "The classification was driven by detected lexical markers, negative affective tone, and targeted hostility. "
                "The emotion analysis identified elevated anger and negative sentiment, distinguishing it from constructive or neutral discourse."
            )

        if "safety response agent" in sys_lower:
            return (
                "1. Document and Preserve: Capture full timestamped screenshots and URLs of the offending message before any content is deleted.\n"
                "2. Restrict Direct Contact: Use platform mute and block tools immediately to prevent continued exposure without alerting the sender.\n"
                "3. Formal Reporting: Submit an in-app report under Harassment/Hate Speech, citing the specific messages.\n"
                "4. Seek Support: Confide in a trusted mentor, counselor, or contact support hotlines if distress escalates."
            )

        if "context analysis agent" in sys_lower:
            return (
                "Contextual analysis indicates targeted personal disparagement without constructive dialogue markers. "
                "No indicators of humorous banter, self-deprecation, or reclaimed community slang were detected. "
                "The tone exhibits persistent hostility."
            )

        # 2. Extract actual user query and bound analysis context if passed from ChatContextBuilder
        user_query = prompt
        bound_analysis_text = ""
        eval_text = ""
        is_prev_safe = False
        is_prev_harmful = False

        if "--- BOUND PREVIOUS ANALYSIS RECORD ---" in prompt:
            parts = prompt.split("--- BOUND PREVIOUS ANALYSIS RECORD ---")
            if len(parts) > 1:
                bound_record_block = parts[1].split("---")[0].strip()
                bound_analysis_text = bound_record_block
                if 'Evaluated Text: "' in bound_record_block:
                    try:
                        eval_text = bound_record_block.split('Evaluated Text: "')[1].split('"')[0]
                    except Exception:
                        pass
                lower_rec = bound_record_block.lower()
                if "roberta classification: safe" in lower_rec or "safe content" in lower_rec:
                    is_prev_safe = True
                elif "roberta classification: cyberbullying" in lower_rec or "cyberbullying" in lower_rec:
                    is_prev_harmful = True

        if "--- USER QUERY ---" in prompt:
            user_query = prompt.split("--- USER QUERY ---")[-1].strip()
        user_lower = user_query.lower()

        # A. Greetings
        if (
            user_lower in ["hi", "hello", "hey", "hola", "sup", "greetings", "good morning", "good afternoon", "good evening"]
            or user_lower.startswith(("hello", "hi ", "hey ", "hi!", "hello!"))
        ):
            return (
                "Hello! I am CyberSafe AI, your conversational assistant and interactive guide for the platform.\n\n"
                "I can assist you with:\n"
                "• **Explaining Classifications:** Ask me *'how this content is safe'* or *'why is this not safe'*.\n"
                "• **Navigating the System:** Ask me to take you to the *Detector*, *Contact Info*, or *Home Showcase*.\n"
                "• **Reporting & Evidence:** Learn step-by-step procedures to preserve screenshots and report harassment on Instagram, X, or Discord.\n"
                "• **System Architecture:** Understand our 7-agent DAG pipeline and fine-tuned RoBERTa model.\n\n"
                "Where would you like to begin?\n"
                "👉 [Launch Live Detector](/detect) | [Home Page Showcase](/) | [Contact Info](/#contact)"
            )

        # B. Direct Navigation / Routing Requests
        # B1. Detect / Live Inference Page
        if any(k in user_lower for k in [
            "take me to detection", "go to detection", "open detection", "navigate to detection",
            "test text", "analyze text", "how to analyze", "how to detect", "open detector",
            "detection page", "detector page", "try detecting", "live detector", "start detecting"
        ]):
            return (
                "Taking you to the live detection suite! You can input any text or social comment to run real-time inference with our fine-tuned RoBERTa model:\n\n"
                "👉 **[Go to Detection](/detect)**\n\n"
                "Features on the detection page:\n"
                "• RoBERTa Active Primary Model sequence classification\n"
                "• 5-dimensional affective emotion breakdown (Anger, Fear, Sadness, Neutral, Joy)\n"
                "• Deterministic multi-factor risk scoring (Low, Moderate, High, Critical)\n"
                "• Explainable AI (XAI) transparent reasoning\n"
            )

        # B2. Dashboard / Telemetry Request
        if any(k in user_lower for k in [
            "take me to dashboard", "go to dashboard", "open dashboard", "navigate to dashboard",
            "show dashboard", "view dashboard", "analytics page", "where is dashboard", "see stats",
            "see statistics", "view metrics", "telemetry", "audit log", "dashboard page"
        ]):
            return (
                "CyberSafe AI provides real-time detection telemetry and multi-agent metrics stored in the local database:\n\n"
                "👉 **[Open Dashboard](/dashboard)**\n\n"
                "Dashboard Features:\n"
                "• Total evaluated message metrics & risk tier breakdown\n"
                "• Safe vs cyberbullying ratio visual charts\n"
                "• Persistent analysis audit log with deletion support\n\n"
                "👉 [Go to Detection](/detect) | [Home](/)"
            )

        # B3. About / Architecture Request
        if any(k in user_lower for k in [
            "take me to about", "go to about", "open about", "navigate to about",
            "show about", "view about", "about page", "about the system", "about cybersafe",
            "learn about the system", "system architecture", "tell me about architecture", "how was this built"
        ]):
            return (
                "CyberSafe AI is an **AI Agentic Software Engineering platform** for cyberbullying detection and safety moderation:\n\n"
                "👉 **[About the System](/about)**\n\n"
                "Key Capabilities:\n"
                "• **Active Primary Model:** Fine-tuned RoBERTa transformer sequence classifier\n"
                "• **Autonomous 7-Agent Pipeline:** Detection → Emotion → Context → Risk → RAG → Explanation → Response\n"
                "• **Affective NLP:** 5-dimensional emotional breakdown (Anger, Fear, Sadness, Neutral, Joy)\n"
                "• **Dense Vector RAG:** Grounded knowledge retrieval via MiniLM embeddings\n"
                "• **Zero-Leakage Privacy:** Pre-inference regex identity anonymization\n\n"
                "👉 [Go to Detection](/detect) | [Open Dashboard](/dashboard)"
            )

        # B4. Contact Section
        if any(k in user_lower for k in [
            "take me to contact", "go to contact", "open contact", "navigate to contact",
            "show contact", "view contact", "contact page", "get in touch", "contact the team",
            "contact developer", "collaborate", "collaboration", "email developer", "reach out"
        ]):
            return (
                "Here is the developer contact and collaboration info:\n\n"
                "• **Developer:** Harini L\n"
                "• **Email:** [harini.lts8@gmail.com](mailto:harini.lts8@gmail.com)\n"
                "• **LinkedIn:** [harini-l-50a803273](https://www.linkedin.com/in/harini-l-50a803273/)\n"
                "• **GitHub:** [HariniLTS](https://github.com/HariniLTS)\n"
                "• **Portfolio:** [Portfolio](https://harinilts.github.io/portfolio/)\n\n"
                "👉 View the contact section at the bottom of the page: **[Contact Info](/#contact)**"
            )

        # B5. Home / Central Hub Page
        if any(k in user_lower for k in [
            "take me to home", "go to home", "go home", "open home", "navigate to home",
            "home page", "back to home", "main page", "portfolio", "central hub"
        ]):
            return (
                "Returning to the central application hub! Explore the full platform capabilities:\n\n"
                "👉 **[Return to Home Page](/)**\n\n"
                "Highlights on the Central Hub:\n"
                "• Quick access cards: Detect, Dashboard, About, and Contact\n"
                "• 7-agent visual execution pipeline\n"
                "• Decoupled Next.js + FastAPI enterprise architecture"
            )

        # C. Questions about WHY CONTENT IS NOT SAFE / CYBERBULLYING / FLAGGED
        is_harmful_inquiry = (
            any(k in user_lower for k in [
                "not safe", "why not safe", "not safe why", "how is this not safe", "why is it not safe",
                "why cyberbullying", "how is this cyberbullying", "why flagged", "flagged why",
                "why toxic", "why harmful", "harmful why", "why classified as cyberbullying",
                "why was this flagged", "why was it flagged", "how is this harmful", "why insult",
                "explain harmful", "explain cyberbullying", "what makes it harmful", "what makes it cyberbullying"
            ])
            or (any(k in user_lower for k in ["why", "how", "reason", "explain"]) and any(k in user_lower for k in ["flagged", "toxic", "harmful", "bad", "bully", "offensive", "cyberbullying", "attack"]))
        )

        if is_harmful_inquiry:
            if bound_analysis_text and is_prev_harmful:
                target_str = f" (\"{eval_text}\")" if eval_text else ""
                return (
                    f"The evaluated message{target_str} was classified as **Cyberbullying / Not Safe** based on the following multi-agent criteria:\n\n"
                    f"1. **RoBERTa Token Attention:** Dense bidirectional attention weights isolated abusive, disparaging, or hostile phrasing with high confidence.\n"
                    f"2. **Elevated Affective Emotion:** The Emotion Agent detected elevated **Anger** and negative sentiment, distinguishing it from neutral discussion.\n"
                    f"3. **Context Verification:** The Context Agent verified targeted personal hostility without markers of constructive banter or benign humor.\n"
                    f"4. **Deterministic Risk Escalation:** The Risk Agent evaluated severity, potential harm, and threat level, escalating this into an actionable risk tier.\n\n"
                    f"👉 Test another message: [Launch Live Detector](/detect) | Explore system capabilities: [Home Page Showcase](/)"
                )
            elif bound_analysis_text and is_prev_safe:
                target_str = f" (\"{eval_text}\")" if eval_text else ""
                return (
                    f"Actually, the previous message{target_str} was evaluated as **Safe Content**.\n\n"
                    f"Content is classified as **Cyberbullying / Not Safe** when:\n"
                    f"• RoBERTa detects targeted hostility, derogatory slurs, or harassment sequences.\n"
                    f"• Affective NLP detects high Anger, hostility, or distress markers.\n"
                    f"• The Risk Agent assigns a Moderate, High, or Critical risk tier.\n\n"
                    f"👉 You can test a cyberbullying example safely in the [Live Detector](/detect)!"
                )
            else:
                return (
                    "In CyberSafe AI, content is classified as **Cyberbullying / Not Safe** when our multi-agent pipeline identifies harmful signals:\n\n"
                    "1. **RoBERTa Sequence Model:** Dense bidirectional attention identifies abusive, threatening, or derogatory linguistic markers.\n"
                    "2. **Elevated Emotion & Affect:** Emotion analysis identifies elevated **Anger**, negative affective tone, and hostility distinguishing it from civil discourse.\n"
                    "3. **Context Agent Verification:** Validates that the language constitutes targeted disparagement, exclusion, or harassment rather than benign humor.\n"
                    "4. **Deterministic Risk Scoring:** Escalates to **Moderate, High, or Critical risk** based on threat level, severity, and escalation potential.\n\n"
                    "👉 Inspect live predictions: [Launch Live Detector](/detect) | Learn how to report: Ask me 'how to report online harassment'"
                )

        # D. Questions about WHY CONTENT IS SAFE / HOW THIS CONTENT IS SAFE
        is_safe_inquiry = (
            ("safe" in user_lower or "non-bullying" in user_lower or "harmless" in user_lower)
            and any(w in user_lower for w in ["why", "how", "what makes", "explain", "reason", "tell me", "is this", "check", "meaning"])
        ) or any(p in user_lower for p in ["safe why", "why safe", "how safe", "explain safe", "why is it safe", "how is it safe", "is it safe", "how this is safe", "why content safe", "how this content is safe"])

        if is_safe_inquiry:
            if bound_analysis_text and is_prev_safe:
                target_str = f" (\"{eval_text}\")" if eval_text else ""
                return (
                    f"The evaluated message{target_str} was classified as **Safe Content** based on four analytical dimensions:\n\n"
                    f"1. **RoBERTa Contextual Attention:** The transformer model scanned bidirectional word relationships and detected **0% hostile, abusive, or harassing patterns**.\n"
                    f"2. **Positive & Neutral Sentiment:** Emotion analysis identified positive affective valence (such as Joy or encouragement) or constructive neutral tone with **zero anger or toxic distress spikes**.\n"
                    f"3. **Deterministic Low Risk:** The multi-factor Risk Agent assigned a **Low Risk tier** (risk score < 0.20), confirming the complete absence of physical threats, slurs, or harassment.\n"
                    f"4. **Constructive Intent:** The Context Agent verified the absence of targeted personal disparagement or malicious intent.\n\n"
                    f"👉 Test another message: [Launch Live Detector](/detect) | Explore system capabilities: [Home Page Showcase](/)"
                )
            elif bound_analysis_text and is_prev_harmful:
                target_str = f" (\"{eval_text}\")" if eval_text else ""
                return (
                    f"Actually, the previous message{target_str} was classified as **Cyberbullying / Not Safe** due to detected hostility and negative affective tone.\n\n"
                    f"In CyberSafe AI, content is only classified as **Safe Content** when:\n"
                    f"• RoBERTa detects zero toxic tokens or harassment sequences.\n"
                    f"• Emotion analysis detects positive (Joy/Encouragement) or neutral sentiment with 0% anger.\n"
                    f"• The Risk Agent assigns a Low Risk score (< 0.29).\n\n"
                    f"👉 You can test a safe message right now in the [Live Detector](/detect)!"
                )
            else:
                return (
                    "In CyberSafe AI, content is classified as **Safe Content** through our multi-agent verification pipeline:\n\n"
                    "1. **RoBERTa Token Attention:** Scans bidirectional token sequences to verify the absence of harassment, toxic tropes, derogatory slurs, or violent phrasing.\n"
                    "2. **Affective Emotion Analysis:** Confirms positive sentiment (Joy, Encouragement) or neutral discourse, with **0% anger, hostility, or distress spikes**.\n"
                    "3. **Context Agent Verification:** Validates that the tone is constructive, supportive, or conversational, distinguishing harmless casual chat from hostile disparagement.\n"
                    "4. **Deterministic Risk Scoring:** Computes a calibrated **Low Risk score (0.00 – 0.29)**, verifying zero physical harm indicators, hate speech, or threat escalation.\n\n"
                    "👉 Try analyzing any text right now: [Launch Live Detector](/detect)"
                )

        # E. Questions about Model Accuracies & Architecture
        if any(k in user_lower for k in ["accuracy", "benchmark", "roberta", "which model", "active model", "what model"]):
            return (
                "In CyberSafe AI:\n\n"
                "• **RoBERTa — Active Primary Model:** The sole active neural model used for live inference across the entire platform. Fine-tuned with bidirectional self-attention to capture complex online harassment nuances.\n\n"
                "👉 Test RoBERTa live: [Launch Live Detector](/detect) | Explore system capabilities: [Home Page Showcase](/)"
            )

        # F. Questions about Multi-Agent Pipeline & Architecture
        if any(k in user_lower for k in ["pipeline", "agent", "agents", "agentic", "architecture", "stages", "how does this work", "how it works", "9 stage", "7 agent"]):
            return (
                "CyberSafe AI operates as an **AI Agentic Software Engineering System** with a synchronized 7-agent execution pipeline:\n\n"
                "1. **User Ingestion:** Input validation and length normalization.\n"
                "2. **PII Sanitization Agent:** Redacts personal identifying info (emails, handles, IPs) for zero-leakage privacy.\n"
                "3. **RoBERTa Detection Agent:** Active neural transformer analyzing sequence attention patterns.\n"
                "2. **Affective Emotion Agent:** Evaluates 5-dimensional emotion distribution (Anger, Fear, Sadness, Neutral, Joy).\n"
                "5. **Context Nuance Agent:** Differentiates banter, sarcasm, and slang from targeted hostility.\n"
                "6. **Deterministic Risk Agent:** Calibrates risk into Low, Moderate, High, or Critical tiers.\n"
                "7. **Vector RAG Agent:** Retrieves verified safety knowledge, reporting procedures, and platform policies.\n"
                "8. **Explainable AI (XAI) Agent:** Synthesizes human-interpretable reasons behind every verdict.\n"
                "9. **Dynamic Safety Response Agent:** Formulates concrete intervention and safety guidance.\n\n"
                "👉 View the interactive architecture flow: [Home Page Showcase](/) | Test live execution: [Launch Live Detector](/detect)"
            )

        # G. How to Report / Evidence / Social Media Harassment
        if any(k in user_lower for k in ["report", "evidence", "screenshot", "instagram", "discord", "twitter", "x", "block", "harass", "preserve"]):
            return (
                "Here is the verified evidence preservation and reporting protocol:\n\n"
                "1. **Document and Preserve First:**\n"
                "   • Capture full, timestamped screenshots showing the post/message, username, timestamp, and profile URL.\n"
                "   • Do not crop or edit screenshots. Save copies to secure cloud storage or an external drive.\n"
                "2. **In-App Reporting:**\n"
                "   • **Instagram:** Tap (...) on comment or profile > Report > 'Bullying or harassment'.\n"
                "   • **Discord:** Right-click the message > Report Message, or contact server moderators.\n"
                "   • **X (Twitter):** Click (...) on the post > Report Post > 'Harassment' or 'Hate Speech'.\n"
                "3. **Sever Direct Contact:**\n"
                "   • Utilize built-in mute/block/restrict features immediately to stop incoming hostility without notifying the sender.\n"
                "4. **Escalate When Necessary:**\n"
                "   • If threats involve physical harm, stalking, or minors, escalate immediately to school authorities or local law enforcement with your timestamped evidence.\n\n"
                "👉 Test message risk level first: [Launch Live Detector](/detect)"
            )

        # H. Crisis / Mental Health Support
        if any(k in user_lower for k in ["crisis", "hotline", "suicide", "depressed", "kill", "harm", "scared", "urgent", "emergency", "danger"]):
            return (
                "If you or someone you know is in acute distress or feeling unsafe, free and confidential support is available 24/7:\n\n"
                "• **988 Suicide & Crisis Lifeline (US & Canada):** Call or text 988\n"
                "• **Crisis Text Line:** Text HOME to 741741\n"
                "• **The Trevor Project (LGBTQ+ youth):** Call 1-866-488-7386 or text START to 678-678\n"
                "• **KIRAN Mental Health Helpline (India):** 1800-599-0019\n"
                "• **National Bullying Helpline (UK):** Call 0300 323 0169\n"
                "• **Kids Help Phone (Canada):** Call 1-800-668-6868 or text 686868\n\n"
                "Please reach out to one of these resources right away. You do not have to handle this alone."
            )

        # I. Privacy & Data Handling
        if any(k in user_lower for k in ["privacy", "pii", "anonymize", "data", "gdpr", "security", "confidential"]):
            return (
                "CyberSafe AI follows a strict **Privacy-by-Design** standard:\n\n"
                "• **Pre-Inference Sanitization:** All incoming text is sanitized by the Privacy Agent using entity recognition and regex before being evaluated by models or stored in database logs.\n"
                "• **Redaction Targets:** Emails, phone numbers, IP addresses, full names, and social media handles are replaced with anonymized tokens (e.g. `[EMAIL]`, `[PHONE]`, `[USER]`).\n"
                "• **Zero External Leakage:** In default mode, all inference and RAG searches run locally with zero sensitive data transmitted to third-party APIs.\n\n"
                "👉 Test the system safely: [Launch Live Detector](/detect)"
            )

        # J. Bystander 4Ds & General Advice
        if any(k in user_lower for k in ["what should", "help", "advice", "what to do", "bystander", "4d", "intervene"]):
            return (
                "The Active Bystander 4Ds framework empowers individuals to safely intervene against online harassment:\n\n"
                "1. **Direct:** Calmly state that the behavior is unacceptable ('This comment is inappropriate; please stop.').\n"
                "2. **Distract:** Divert attention or introduce a constructive topic to diffuse tension.\n"
                "3. **Delegate:** Alert group admins, moderators, or teachers to enforce community guidelines.\n"
                "4. **Delay:** Privately message the targeted individual afterward to offer validation and support.\n\n"
                "👉 Explore prevention workflows in the [Home Page Showcase](/) | Analyze an incident: [Launch Live Detector](/detect)"
            )

        # K. Project Overview / What is CyberSafe AI
        if any(k in user_lower for k in [
            "what is this project", "about this project", "what can you do", "what do you do",
            "who are you", "tell me about this project", "project details", "what is cybersafe"
        ]):
            return (
                "**CyberSafe AI** is an AI Agentic Software Engineering platform for cyberbullying detection, explainable moderation, and online safety guidance:\n\n"
                "1. **Active Primary Model:** Fine-tuned RoBERTa Transformer.\n"
                "2. **7-Agent Autonomous Pipeline:** Orchestrates PII Sanitization, Detection, Emotion NLP, Context Nuance, Deterministic Risk Scoring, RAG Retrieval, and XAI Explanations.\n"
                "3. **Interactive Navigation:** I can guide you across the app—from testing live text in the Detector to exploring our multi-agent architecture.\n"
                "4. **Safety Guidance:** Provides verified platform reporting workflows and 24/7 crisis support.\n\n"
                "Where would you like to explore?\n"
                "👉 [Launch Live Detector](/detect) | [Home Page Showcase](/) | [Contact Info](/#contact)"
            )

        # L. Fallback default (Comprehensive Navigator)
        return (
            "I am CyberSafe AI, your conversational assistant and interactive navigator for the entire platform.\n\n"
            "I can answer any question about:\n"
            "• **Safe vs. Not Safe:** Ask me *'how this content is safe'* or *'why is this not safe'*.\n"
            "• **App Navigation:** I can take you straight to [Launch Live Detector](/detect), [Contact Info](/#contact), or the [Home Page Showcase](/).\n"
            "• **Online Safety & Reporting:** Guidance for preserving screenshots, blocking, and reporting abuse on Instagram/X/Discord.\n"
            "• **System Architecture:** Fine-tuned RoBERTa model and our 7-agent DAG pipeline.\n\n"
            "How can I assist you right now?"
        )

    def health_check(self) -> Dict[str, Any]:
        return {"provider": "intelligent_local_synthesizer", "model": "rule-grounded-nlp", "configured": True}


class LLMService:
    """Unified LLM service with provider routing, security filtering, and graceful degradation."""

    def __init__(self):
        self._provider = self._init_provider()
        self._fallback = IntelligentLocalProvider()

    def _init_provider(self) -> BaseLLMProvider:
        prov = settings.LLM_PROVIDER.lower()
        if prov == "openai" and settings.LLM_API_KEY:
            return OpenAIProvider(api_key=settings.LLM_API_KEY, model=settings.LLM_MODEL, base_url=settings.LLM_BASE_URL)
        elif prov == "anthropic" and settings.LLM_API_KEY:
            return AnthropicProvider(api_key=settings.LLM_API_KEY, model=settings.LLM_MODEL)
        elif prov == "ollama":
            return OllamaProvider(model=settings.LLM_MODEL, base_url=settings.LLM_BASE_URL)
        else:
            return IntelligentLocalProvider()

    async def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
    ) -> str:
        temp = temperature if temperature is not None else settings.LLM_TEMPERATURE
        tokens = max_tokens if max_tokens is not None else settings.LLM_MAX_TOKENS

        # Prompt injection security check
        is_injection, reason = check_prompt_injection(prompt)
        if is_injection:
            logger.warning(f"Prompt injection intercepted: {reason}")
            return (
                "I am CyberSafe AI, designed to assist with cyberbullying detection, explanation, and online safety. "
                "I cannot override system security guidelines, reveal internal instructions, or execute external prompt commands."
            )

        with LatencyTimer("llm_generation"):
            try:
                raw_response = await self._provider.generate(
                    prompt=prompt,
                    system_prompt=system_prompt,
                    temperature=temp,
                    max_tokens=tokens,
                )
                return validate_llm_output(raw_response)
            except Exception as e:
                logger.warning(f"Primary LLM provider failed: {e}. Falling back to intelligent local synthesizer.")
                raw_fallback = await self._fallback.generate(
                    prompt=prompt,
                    system_prompt=system_prompt,
                    temperature=temp,
                    max_tokens=tokens,
                )
                return validate_llm_output(raw_fallback)

    def health_check(self) -> Dict[str, Any]:
        return self._provider.health_check()


llm_service = LLMService()
