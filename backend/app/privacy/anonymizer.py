import re
from typing import Tuple, Dict

# Regex patterns for common personally identifiable information (PII)
EMAIL_PATTERN = re.compile(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+")
PHONE_PATTERN = re.compile(r"(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}")
IP_PATTERN = re.compile(r"\b(?:\d{1,3}\.){3}\d{1,3}\b")
USER_HANDLE_PATTERN = re.compile(r"@[a-zA-Z0-9_]{3,25}")


class PIIAnonymizer:
    """Detects and redacts sensitive personally identifiable information."""

    def __init__(self):
        pass

    def redact(self, text: str) -> Tuple[str, Dict[str, int]]:
        """
        Redacts emails, phone numbers, IP addresses, and user handles from text.
        Returns the sanitized text and counts of redacted tokens.
        """
        counts = {"emails": 0, "phones": 0, "ips": 0, "handles": 0}

        def _sub_email(match):
            counts["emails"] += 1
            return "[REDACTED_EMAIL]"

        def _sub_phone(match):
            counts["phones"] += 1
            return "[REDACTED_PHONE]"

        def _sub_ip(match):
            counts["ips"] += 1
            return "[REDACTED_IP]"

        def _sub_handle(match):
            counts["handles"] += 1
            return "[REDACTED_USER]"

        redacted = EMAIL_PATTERN.sub(_sub_email, text)
        redacted = PHONE_PATTERN.sub(_sub_phone, redacted)
        redacted = IP_PATTERN.sub(_sub_ip, redacted)
        redacted = USER_HANDLE_PATTERN.sub(_sub_handle, redacted)

        return redacted, counts


anonymizer = PIIAnonymizer()
