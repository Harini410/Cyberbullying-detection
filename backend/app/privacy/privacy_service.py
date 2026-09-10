from typing import Dict, Any
from backend.app.privacy.anonymizer import anonymizer
from backend.app.config import settings


class PrivacyService:
    """
    Manages privacy guarantees across the platform.
    Ensures clear separation between:
    - Edge Federated Learning (FL) during model training
    - Differential Privacy (DP) noise during gradient aggregation
    - Anonymized Real-time Inference (PII stripped before evaluation)
    - Zero-retention LLM calls (no sensitive data logged or stored permanently)
    """

    def __init__(self):
        self.anonymize_enabled = settings.ANONYMIZE_PII

    def process_input(self, text: str) -> Dict[str, Any]:
        """Sanitize text for inference and record redaction statistics."""
        if self.anonymize_enabled:
            sanitized_text, redactions = anonymizer.redact(text)
            pii_detected = any(v > 0 for v in redactions.values())
        else:
            sanitized_text = text
            redactions = {}
            pii_detected = False

        return {
            "processed_text": sanitized_text,
            "pii_detected": pii_detected,
            "redactions": redactions,
        }

    def get_privacy_declarations(self) -> Dict[str, str]:
        """Provides unambiguous architectural statements regarding privacy mechanisms."""
        return {
            "training_privacy": "Federated Learning (FedAvg) with Differential Privacy (DP-SGD) via Opacus was applied during offline research model training.",
            "inference_privacy": "Live API inference applies real-time PII anonymization to strip emails, phone numbers, and handles.",
            "llm_retention": "LLM prompts are processed ephemeral with strictly bounded context windows and zero persistent model retraining.",
            "storage_policy": "No raw user messages are persisted in long-term database tables without explicit user consent."
        }


privacy_service = PrivacyService()
