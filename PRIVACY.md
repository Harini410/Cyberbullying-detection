# CyberSafe AI: Privacy, Differential Privacy & Data Ethics

## 1. Architectural Distinction of Privacy Mechanisms
The platform strictly differentiates between offline research training mechanisms and real-time production inference:

| Stage | Mechanism | Implementation |
|---|---|---|
| **Model Training (Research)** | **Federated Learning (FL)** | Client nodes train locally on edge devices; raw tweets remain decentralized; only encrypted parameter gradients are aggregated centrally. |
| **Model Training (Research)** | **Differential Privacy (DP)** | Calibrated Gaussian noise and gradient clipping (via Opacus) were injected during DP-SGD updates, bounding the privacy budget (epsilon, delta) to ensure individual messages cannot be reverse-engineered. |
| **Live API Inference** | **PII Anonymization** | Pre-inference redaction strips emails, phone numbers, IP addresses, and user handles before messages reach RoBERTa or the multi-agent orchestrator. |
| **LLM Inference** | **Zero Model Retention** | Prompts are processed strictly ephemerally. User messages are not used to train or fine-tune third-party LLMs. |

---

## 2. Real-Time PII Redaction
Implemented in `backend/app/privacy/anonymizer.py`:
- Emails (`user@domain.com` -> `[REDACTED_EMAIL]`)
- Phone numbers (`+1-555-0199` -> `[REDACTED_PHONE]`)
- IP Addresses (`192.168.1.1` -> `[REDACTED_IP]`)
- User Handles (`@victim_account` -> `[REDACTED_USER]`)

## 3. Storage Minimization
- No raw, unsanitized user messages are stored in database records without explicit configuration.
- The SQLite / PostgreSQL database stores only bounded conversation history and analysis metrics (`label`, `confidence`, `risk_score`).
