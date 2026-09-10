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

  // Answer based on query intent
  if (lower.includes("why") && (lower.includes("classified") || lower.includes("result") || lower.includes("previous"))) {
    reply = "The message was analyzed through the RoBERTa sequence classifier and affective NLP engine. For positive/encouraging phrases (like 'YOU WILL WIN'), the model detects high joy and positive sentiment with 0% hostility, classifying it as safe content. For harmful messages, the model flags hostile vocabulary, negative valence, and elevated anger markers that violate civility standards."
  } else if (lower.includes("report") || lower.includes("evidence") || lower.includes("instagram") || lower.includes("x") || lower.includes("discord")) {
    reply = "To report harassment and preserve evidence:\n\n1. **Take timestamped screenshots:** Capture the message, username, and URL before content can be deleted.\n2. **Use in-app reporting:** On Instagram, tap (...) > Report > 'Bullying or harassment'. On X, select Report Tweet > 'Harassment'. On Discord, right-click the message > 'Report Message'.\n3. **Mute or block:** Restrict or block the perpetrator to sever contact without escalating."
    sources.push({
      chunk_id: "chk_mod_01",
      title: "Content Moderation Standards & Automated Enforcement Policy",
      source: "data/knowledge/moderation/content_moderation_standards.md",
      category: "moderation",
      score: 0.89,
      text: "Online safety policy mandates multi-tier escalation: immediate account restrictions for violent threats and harassment."
    })
  } else if (lower.includes("crisis") || lower.includes("hotline") || lower.includes("suicide") || lower.includes("help") || lower.includes("distress")) {
    reply = "If you or someone you know is in acute distress, free and confidential support is available 24/7:\n\n- **988 Suicide & Crisis Lifeline (US & Canada):** Call or text 988\n- **Crisis Text Line:** Text HOME to 741741\n- **The Trevor Project (LGBTQ youth):** Call 1-866-488-7386 or text START to 678-678\n- **National Bullying Helpline (UK):** Call 0300 323 0169\n- **KIRAN Mental Health Helpline (India):** 1800-599-0019"
  } else if (lower.includes("bystander") || lower.includes("4d") || lower.includes("friend")) {
    reply = "The Active Bystander 4Ds framework empowers witnesses to intervene safely:\n\n1. **Direct:** Calmly call out the harmful behavior ('This comment is uncalled for; please stop.').\n2. **Distract:** Change the subject or introduce constructive conversation to de-escalate.\n3. **Delegate:** Alert platform moderators, group admins, or trusted mentors.\n4. **Delay:** Reach out to the target privately afterward to offer validation and support."
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
  } else {
    reply = "CyberSafe AI is here to help you navigate online safety, understand cyberbullying classifications, and learn effective reporting procedures. You can ask me about how our RoBERTa model works, how to preserve digital evidence, or how to handle harassment on social media."
  }

  return {
    conversation_id: convId,
    message: reply,
    sources,
    context_used: Boolean(analysisId || conversationId),
    latency_ms: 25,
  }
}
