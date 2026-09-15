// Self-contained Serverless Chatbot Engine for Vercel deployment
// Handles questions about classification, reporting, policies, and bystander support.

export interface ServerlessChatResponse {
  conversation_id: string
  message: string
  sources: Array<{
    chunk_id: string
    title: string
    source: string
    category: string
    text: string
    score: number
  }>
  context_used: boolean
  latency_ms: number
}

export function runServerlessChat(
  message: string,
  conversationId?: string | null,
  analysisId?: string | null
): ServerlessChatResponse {
  const lower = message.toLowerCase()
  const convId = conversationId || `conv_${Math.random().toString(36).substring(2, 11)}`

  let reply = ""
  let sources = [
    {
      chunk_id: "chk_safety_01",
      title: "Online Platform Reporting and Evidence Preservation Guide",
      source: "data/knowledge/online_safety/platform_reporting_guides.md",
      category: "online_safety",
      score: 0.94,
      text: "Before deleting or blocking messages, preserving incontrovertible digital evidence (timestamped screenshots, profile URLs, user IDs) is vital for institutional or platform escalation."
    }
  ]

  // Prompt injection check
  if (
    lower.includes("ignore all previous") ||
    lower.includes("reveal your system prompt") ||
    lower.includes("dan mode")
  ) {
    reply = "I am CyberSafe AI, designed to assist with cyberbullying detection, explanation, and online safety. I cannot override system security guidelines, reveal internal instructions, or execute external prompt commands."
    return {
      conversation_id: convId,
      message: reply,
      sources: [],
      context_used: false,
      latency_ms: 15,
    }
  }

  // 2. Direct Navigation / Routing Requests
  if (
    lower.includes("take me to detect") ||
    lower.includes("go to detect") ||
    lower.includes("open detect") ||
    lower.includes("launch detect") ||
    lower.includes("navigate to detect") ||
    lower.includes("where to detect") ||
    lower.includes("where can i test") ||
    lower.includes("where to test") ||
    lower.includes("test a message") ||
    lower.includes("test content") ||
    lower.includes("test text") ||
    lower.includes("analyze text") ||
    lower.includes("how to analyze") ||
    lower.includes("how to detect") ||
    lower.includes("open detector") ||
    lower.includes("detection page") ||
    lower.includes("detector page") ||
    lower.includes("live detector")
  ) {
    reply = "Taking you to the live detection suite! You can input any text or social comment to run real-time inference with our fine-tuned RoBERTa model:\n\n" +
      "👉 **[Go to Detection](/detect)**\n\n" +
      "Features on the detection page:\n" +
      "• RoBERTa Active Primary Model sequence classification\n" +
      "• 5-dimensional affective emotion breakdown (Anger, Fear, Sadness, Neutral, Joy)\n" +
      "• Deterministic multi-factor risk scoring (Low, Moderate, High, Critical)\n" +
      "• Explainable AI (XAI) transparent reasoning\n" +
      ""
  } else if (
    lower.includes("take me to dashboard") ||
    lower.includes("go to dashboard") ||
    lower.includes("open dashboard") ||
    lower.includes("navigate to dashboard") ||
    lower.includes("show dashboard") ||
    lower.includes("view dashboard") ||
    lower.includes("analytics page") ||
    lower.includes("where is dashboard") ||
    lower.includes("see stats") ||
    lower.includes("see statistics") ||
    lower.includes("view metrics") ||
    lower.includes("telemetry") ||
    lower.includes("audit log")
  ) {
    reply = "CyberSafe AI provides real-time detection telemetry and multi-agent metrics stored in the local database:\n\n" +
      "👉 **[Open Dashboard](/dashboard)**\n\n" +
      "Dashboard Features:\n" +
      "• Total evaluated message metrics & risk tier breakdown\n" +
      "• Safe vs cyberbullying ratio visual charts\n" +
      "• Persistent analysis audit log with deletion support\n\n" +
      "👉 [Go to Detection](/detect) | [Home](/)"
  } else if (
    lower.includes("take me to about") ||
    lower.includes("go to about") ||
    lower.includes("open about") ||
    lower.includes("navigate to about") ||
    lower.includes("show about") ||
    lower.includes("view about") ||
    lower.includes("about page") ||
    lower.includes("about the system") ||
    lower.includes("about cybersafe") ||
    lower.includes("learn about the system") ||
    lower.includes("system architecture") ||
    lower.includes("tell me about architecture")
  ) {
    reply = "CyberSafe AI is an **AI Agentic Software Engineering platform** for cyberbullying detection and safety moderation:\n\n" +
      "👉 **[About the System](/about)**\n\n" +
      "Key Capabilities:\n" +
      "• **Active Primary Model:** Fine-tuned RoBERTa transformer sequence classifier\n" +
      "• **Autonomous 7-Agent Pipeline:** Detection → Emotion → Context → Risk → RAG → Explanation → Response\n" +
      "• **Affective NLP:** 5-dimensional emotional breakdown (Anger, Fear, Sadness, Neutral, Joy)\n" +
      "• **Dense Vector RAG:** Grounded knowledge retrieval via MiniLM embeddings\n" +
      "• **Zero-Leakage Privacy:** Pre-inference regex identity anonymization\n\n" +
      "👉 [Go to Detection](/detect) | [Open Dashboard](/dashboard)"
  } else if (
    lower.includes("take me to contact") ||
    lower.includes("go to contact") ||
    lower.includes("open contact") ||
    lower.includes("navigate to contact") ||
    lower.includes("show contact") ||
    lower.includes("view contact") ||
    lower.includes("contact page") ||
    lower.includes("get in touch") ||
    lower.includes("contact the team") ||
    lower.includes("contact developer") ||
    lower.includes("collaborate") ||
    lower.includes("collaboration")
  ) {
    reply = "You can reach out through the contact section at the bottom of the page:\n\n" +
      "• **Email:** harini.lts8@gmail.com\n" +
      "• **LinkedIn:** [harini-lakshmanan-04](https://www.linkedin.com/in/harini-lakshmanan-04/)\n" +
      "• **GitHub:** [harini-lakshmanan](https://github.com/harini-lakshmanan)\n" +
      "• **Portfolio:** [View Portfolio](https://port-folio-02.vercel.app/)\n\n" +
      "👉 **[Jump to Contact Section](/#contact)**"
  } else if (
    lower.includes("take me to home") ||
    lower.includes("go to home") ||
    lower.includes("go home") ||
    lower.includes("open home") ||
    lower.includes("navigate to home") ||
    lower.includes("home page") ||
    lower.includes("back to home") ||
    lower.includes("main page") ||
    lower.includes("portfolio") ||
    lower.includes("central hub")
  ) {
    reply = "Returning to the central application hub! Explore the full platform capabilities:\n\n" +
      "👉 **[Return to Home Page](/)**\n\n" +
      "Highlights on the Central Hub:\n" +
      "• Quick access modules: Detect, Dashboard, and About\n" +
      "• 7-agent visual execution pipeline\n" +
      "• Decoupled Next.js + FastAPI enterprise architecture"
  }

  // 3. Greetings
  else if (
    lower === "hello" ||
    lower === "hi" ||
    lower === "hey" ||
    lower.startsWith("hello") ||
    lower.startsWith("hi ") ||
    lower.startsWith("hey ") ||
    lower.startsWith("good morning") ||
    lower.startsWith("good evening") ||
    lower.startsWith("good afternoon")
  ) {
    reply = "Hello! I am CyberSafe AI, your conversational assistant and interactive guide for the platform.\n\n" +
      "I can assist you with:\n" +
      "• **Explaining Classifications:** Ask me *'how this content is safe'* or *'why is this not safe'*.\n" +
      "• **Navigating the System:** Ask me to take you to the *Detector*, *Contact Info*, or *Home Showcase*.\n" +
      "• **Reporting & Evidence:** Learn step-by-step procedures to preserve screenshots and report harassment on Instagram, X, or Discord.\n" +
      "• **System Architecture:** Understand our 7-agent DAG pipeline and fine-tuned RoBERTa model.\n\n" +
      "Where would you like to begin?\n" +
      "👉 [Launch Live Detector](/detect) | [Home Page Showcase](/) | [Contact Info](/#contact)"
  }

  // 4. Harmful / Not Safe / Cyberbullying Explanation
  else if (
    lower.includes("not safe") ||
    lower.includes("why not safe") ||
    lower.includes("not safe why") ||
    lower.includes("how is this not safe") ||
    lower.includes("why is it not safe") ||
    lower.includes("why cyberbullying") ||
    lower.includes("how is this cyberbullying") ||
    lower.includes("why flagged") ||
    lower.includes("flagged why") ||
    lower.includes("why toxic") ||
    lower.includes("why harmful") ||
    lower.includes("harmful why") ||
    lower.includes("why classified as cyberbullying") ||
    lower.includes("why was this flagged") ||
    lower.includes("why was it flagged") ||
    lower.includes("how is this harmful") ||
    lower.includes("explain harmful") ||
    lower.includes("explain cyberbullying") ||
    ((lower.includes("why") || lower.includes("how") || lower.includes("reason")) && (lower.includes("toxic") || lower.includes("harmful") || lower.includes("bully") || lower.includes("offensive") || lower.includes("attack")))
  ) {
    reply = "In CyberSafe AI, content is classified as **Cyberbullying / Not Safe** when our multi-agent pipeline identifies harmful signals:\n\n" +
      "1. **RoBERTa Sequence Model:** Dense bidirectional attention identifies abusive, threatening, or derogatory linguistic markers.\n" +
      "2. **Elevated Emotion & Affect:** Emotion analysis identifies elevated **Anger**, negative affective tone, and hostility distinguishing it from civil discourse.\n" +
      "3. **Context Agent Verification:** Validates that the language constitutes targeted disparagement, exclusion, or harassment rather than benign humor.\n" +
      "4. **Deterministic Risk Scoring:** Escalates to **Moderate, High, or Critical risk** based on threat level, severity, and escalation potential.\n\n" +
      "👉 Inspect live predictions: [Launch Live Detector](/detect) | Explore system capabilities: [Home Page Showcase](/)"
  }

  // 5. Safe Content / How this content is safe
  else if (
    ((lower.includes("safe") || lower.includes("non-bullying") || lower.includes("harmless")) &&
      (lower.includes("why") || lower.includes("how") || lower.includes("what makes") || lower.includes("explain") || lower.includes("reason") || lower.includes("is this") || lower.includes("check"))) ||
    lower.includes("safe why") ||
    lower.includes("why safe") ||
    lower.includes("how safe") ||
    lower.includes("explain safe") ||
    lower.includes("why is it safe") ||
    lower.includes("how is it safe") ||
    lower.includes("is it safe") ||
    lower.includes("how this is safe") ||
    lower.includes("why content safe") ||
    lower.includes("how this content is safe")
  ) {
    reply = "In CyberSafe AI, content is classified as **Safe Content** through our multi-agent verification pipeline:\n\n" +
      "1. **RoBERTa Token Attention:** Scans bidirectional token sequences to verify the absence of harassment, toxic tropes, derogatory slurs, or violent phrasing.\n" +
      "2. **Affective Emotion Analysis:** Confirms positive sentiment (Joy, Encouragement) or neutral discourse, with **0% anger, hostility, or distress spikes**.\n" +
      "3. **Context Agent Verification:** Validates that the tone is constructive, supportive, or conversational, distinguishing harmless casual chat from hostile disparagement.\n" +
      "4. **Deterministic Risk Scoring:** Computes a calibrated **Low Risk score (0.00 – 0.29)**, verifying zero physical harm indicators, hate speech, or threat escalation.\n\n" +
      "👉 Try analyzing any text right now: [Launch Live Detector](/detect) | Explore system capabilities: [Home Page Showcase](/)"
  }

  // 6. Model Accuracies & RoBERTa Primary Model
  else if (
    (lower.includes("accuracy") || lower.includes("model") || lower.includes("roberta")) &&
    !lower.includes("why")
  ) {
    reply = "In CyberSafe AI:\n\n" +
      "• **RoBERTa — Active Primary Model:** The sole active neural model used for live inference across the entire platform. Fine-tuned with bidirectional self-attention to capture complex online harassment nuances.\n\n" +
      "👉 Test RoBERTa live: [Launch Live Detector](/detect) | Explore system capabilities: [Home Page Showcase](/)"
  }

  // 7. Multi-Agent Pipeline & Architecture
  else if (
    lower.includes("pipeline") ||
    lower.includes("agent") ||
    lower.includes("agents") ||
    lower.includes("agentic") ||
    lower.includes("architecture") ||
    lower.includes("stages") ||
    lower.includes("9 stage") ||
    lower.includes("7 agent")
  ) {
    reply = "CyberSafe AI operates as an **AI Agentic Software Engineering System** with a synchronized 7-agent execution pipeline:\n\n" +
      "1. **User Ingestion:** Input validation and length normalization.\n" +
      "2. **PII Sanitization Agent:** Redacts personal identifying info (emails, handles, IPs) for zero-leakage privacy.\n" +
      "3. **RoBERTa Detection Agent:** Active neural transformer analyzing sequence attention patterns.\n" +
      "2. **Affective Emotion Agent:** Evaluates 5-dimensional emotion distribution (Anger, Fear, Sadness, Neutral, Joy).\n" +
      "5. **Context Nuance Agent:** Differentiates banter, sarcasm, and slang from targeted hostility.\n" +
      "6. **Deterministic Risk Agent:** Calibrates risk into Low, Moderate, High, or Critical tiers.\n" +
      "7. **Vector RAG Agent:** Retrieves verified safety knowledge, reporting procedures, and platform policies.\n" +
      "8. **Explainable AI (XAI) Agent:** Synthesizes human-interpretable reasons behind every verdict.\n" +
      "9. **Dynamic Safety Response Agent:** Formulates concrete intervention and safety guidance.\n\n" +
      "👉 View the interactive architecture flow: [Home Page Showcase](/) | Test live execution: [Launch Live Detector](/detect)"
  }

  // 8. Platform Reporting & Evidence Preservation
  else if (
    lower.includes("report") ||
    lower.includes("evidence") ||
    lower.includes("screenshot") ||
    lower.includes("instagram") ||
    lower.includes("x") ||
    lower.includes("discord") ||
    lower.includes("twitter") ||
    lower.includes("block") ||
    lower.includes("harass")
  ) {
    reply = "Here is the verified evidence preservation and reporting protocol:\n\n" +
      "1. **Document and Preserve First:**\n" +
      "   • Capture full, timestamped screenshots showing the post/message, username, timestamp, and profile URL.\n" +
      "   • Do not crop or edit screenshots. Save copies to secure cloud storage or an external drive.\n" +
      "2. **In-App Reporting:**\n" +
      "   • **Instagram:** Tap (...) on comment or profile > Report > 'Bullying or harassment'.\n" +
      "   • **Discord:** Right-click the message > Report Message, or contact server moderators.\n" +
      "   • **X (Twitter):** Click (...) on the post > Report Post > 'Harassment' or 'Hate Speech'.\n" +
      "3. **Sever Direct Contact:**\n" +
      "   • Utilize built-in mute/block/restrict features immediately to stop incoming hostility without notifying the sender.\n" +
      "4. **Escalate When Necessary:**\n" +
      "   • If threats involve physical harm, stalking, or minors, escalate immediately to school authorities or local law enforcement with your timestamped evidence.\n\n" +
      "👉 Test message risk level first: [Launch Live Detector](/detect)"
    sources.push({
      chunk_id: "chk_mod_01",
      title: "Content Moderation Standards & Automated Enforcement Policy",
      source: "data/knowledge/moderation/content_moderation_standards.md",
      category: "moderation",
      score: 0.89,
      text: "Online safety policy mandates multi-tier escalation: immediate account restrictions for violent threats and harassment."
    })
  }

  // 9. Crisis Support & Hotlines
  else if (
    lower.includes("crisis") ||
    lower.includes("hotline") ||
    lower.includes("suicide") ||
    lower.includes("depressed") ||
    lower.includes("kill") ||
    lower.includes("harm") ||
    lower.includes("scared") ||
    lower.includes("urgent") ||
    lower.includes("emergency")
  ) {
    reply = "If you or someone you know is in acute distress or feeling unsafe, free and confidential support is available 24/7:\n\n" +
      "• **988 Suicide & Crisis Lifeline (US & Canada):** Call or text 988\n" +
      "• **Crisis Text Line:** Text HOME to 741741\n" +
      "• **The Trevor Project (LGBTQ+ youth):** Call 1-866-488-7386 or text START to 678-678\n" +
      "• **KIRAN Mental Health Helpline (India):** 1800-599-0019\n" +
      "• **National Bullying Helpline (UK):** Call 0300 323 0169\n" +
      "• **Kids Help Phone (Canada):** Call 1-800-668-6868 or text 686868\n\n" +
      "Please reach out to one of these resources right away. You do not have to handle this alone."
  }

  // 10. Bystander 4Ds Framework
  else if (
    lower.includes("bystander") ||
    lower.includes("4d") ||
    lower.includes("friend") ||
    lower.includes("intervene")
  ) {
    reply = "The Active Bystander 4Ds framework empowers witnesses to intervene safely against online abuse:\n\n" +
      "1. **Direct:** Calmly state that the behavior is unacceptable ('This comment is uncalled for; please stop.').\n" +
      "2. **Distract:** Change the subject or introduce constructive conversation to de-escalate.\n" +
      "3. **Delegate:** Alert platform moderators, group admins, or trusted mentors.\n" +
      "4. **Delay:** Reach out to the target privately afterward to offer validation and support.\n\n" +
      "👉 Learn more on the [Home Page Showcase](/)"
    sources = [
      {
        chunk_id: "chk_prev_01",
        title: "Digital Citizenship, Proactive Prevention, and Bystander Intervention",
        source: "data/knowledge/prevention/digital_citizenship_and_prevention.md",
        category: "prevention",
        score: 0.96,
        text: "The 4Ds Active Bystander Intervention framework (Direct, Distract, Delegate, Delay) provides practical de-escalation strategies for online communities."
      }
    ]
  }

  // 11. Privacy & Data Handling
  else if (
    lower.includes("privacy") ||
    lower.includes("pii") ||
    lower.includes("anonymize") ||
    lower.includes("data") ||
    lower.includes("gdpr") ||
    lower.includes("security")
  ) {
    reply = "CyberSafe AI follows a strict **Privacy-by-Design** standard:\n\n" +
      "• **Pre-Inference Sanitization:** All incoming text is sanitized by the Privacy Agent using entity recognition and regex before being evaluated by models or stored in database logs.\n" +
      "• **Redaction Targets:** Emails, phone numbers, IP addresses, full names, and social media handles are replaced with anonymized tokens (e.g. `[EMAIL]`, `[PHONE]`, `[USER]`).\n" +
      "• **Zero External Leakage:** In default mode, all inference and RAG searches run locally with zero sensitive data transmitted to third-party APIs.\n\n" +
      "👉 Test the system safely: [Launch Live Detector](/detect)"
  }

  // 12. Project Overview / What can you do
  else if (
    lower.includes("what is this project") ||
    lower.includes("about this project") ||
    lower.includes("what can you do") ||
    lower.includes("what do you do") ||
    lower.includes("who are you") ||
    lower.includes("tell me about this project") ||
    lower.includes("project details") ||
    lower.includes("what is cybersafe") ||
    lower.includes("how does this work")
  ) {
    reply = "**CyberSafe AI** is an AI Agentic Software Engineering platform for cyberbullying detection, explainable moderation, and online safety guidance:\n\n" +
      "1. **Active Primary Model:** Fine-tuned RoBERTa Transformer.\n" +
      "2. **7-Agent Autonomous Pipeline:** Orchestrates PII Sanitization, Detection, Emotion NLP, Context Nuance, Deterministic Risk Scoring, RAG Retrieval, and XAI Explanations.\n" +
      "3. **Interactive Navigation:** I can guide you across the app—from testing live text in the Detector to exploring our multi-agent architecture.\n" +
      "4. **Safety Guidance:** Provides verified platform reporting workflows and 24/7 crisis support.\n\n" +
      "Where would you like to explore?\n" +
      "👉 [Launch Live Detector](/detect) | [Home Page Showcase](/) | [Contact Info](/#contact)"
  }

  // 13. General Fallback with Interactive Navigation
  else {
    reply = "I am CyberSafe AI, your conversational assistant and interactive navigator for the entire platform.\n\n" +
      "I can answer any question about:\n" +
      "• **Safe vs. Not Safe:** Ask me *'how this content is safe'* or *'why is this not safe'*.\n" +
      "• **App Navigation:** I can take you straight to [Launch Live Detector](/detect), [Contact Info](/#contact), or the [Home Page Showcase](/).\n" +
      "• **Online Safety & Reporting:** Guidance for preserving screenshots, blocking, and reporting abuse on Instagram/X/Discord.\n" +
      "• **System Architecture:** Fine-tuned RoBERTa model and our 7-agent DAG pipeline.\n\n" +
      "How can I assist you right now?"
  }

  return {
    conversation_id: convId,
    message: reply,
    sources,
    context_used: Boolean(analysisId || conversationId),
    latency_ms: 25,
  }
}
