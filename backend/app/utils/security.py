import re
from typing import Tuple

# Common prompt injection triggers and jailbreak patterns
PROMPT_INJECTION_PATTERNS = [
    r"ignore\s+(all\s+)?(previous|prior|above)\s+instructions",
    r"reveal\s+(your\s+)?(system\s+prompt|instructions|initial\s+prompt)",
    r"you\s+are\s+now\s+in\s+DAN\s+mode",
    r"jailbreak",
    r"disregard\s+all\s+rules",
    r"bypass\s+safety\s+filter",
    r"what\s+is\s+your\s+secret\s+key",
    r"output\s+the\s+prompt\s+above",
    r"print\s+(your\s+)?system\s+message",
]

INJECTION_REGEX = re.compile("|".join(PROMPT_INJECTION_PATTERNS), re.IGNORECASE)


def sanitize_input_text(text: str, max_chars: int = 2000) -> str:
    """Sanitize user text input by stripping null bytes and truncating length."""
    if not text:
        return ""
    # Strip null characters and terminal escape codes
    cleaned = text.replace("\x00", "").strip()
    return cleaned[:max_chars]


def check_prompt_injection(text: str) -> Tuple[bool, str]:
    """
    Examine text for known prompt injection or jailbreak patterns.
    Returns (is_injection, reason).
    """
    if INJECTION_REGEX.search(text):
        return True, "Potential prompt injection or instruction override attempt detected."
    return False, ""


def validate_llm_output(output: str) -> str:
    """
    Ensure the LLM does not inadvertently echo internal system prompt headers or credentials.
    """
    redacted = output
    forbidden_terms = ["SYSTEM_PROMPT:", "AGENT_INSTRUCTIONS:", "OPENAI_API_KEY", "ANTHROPIC_API_KEY"]
    for term in forbidden_terms:
        if term in redacted:
            redacted = redacted.replace(term, "[REDACTED]")
    return redacted
