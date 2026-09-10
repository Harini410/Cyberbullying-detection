from fastapi import APIRouter, HTTPException
from backend.app.schemas.detection import DetectionRequest, DetectionResponse
from backend.app.privacy.privacy_service import privacy_service
from backend.app.ml.roberta_service import roberta_service
from backend.app.utils.security import sanitize_input_text

router = APIRouter(tags=["Detection"])


@router.post("/detect", response_model=DetectionResponse)
def detect_cyberbullying(payload: DetectionRequest):
    """
    Primary endpoint for raw RoBERTa cyberbullying detection.
    Processes input text, redacts PII, and returns sequence classification probabilities.
    """
    clean_text = sanitize_input_text(payload.text)
    if not clean_text:
        raise HTTPException(status_code=400, detail="Text input cannot be empty.")

    privacy_res = privacy_service.process_input(clean_text)
    target_text = privacy_res["processed_text"]

    result = roberta_service.predict(target_text)

    return DetectionResponse(
        label=result["label"],
        confidence=result["confidence"],
        probabilities=result["probabilities"],
        model_name=result.get("model_name", "RoBERTa"),
        model_version=result.get("model_version", "1.0.0"),
        latency_ms=result.get("latency_ms", 0.0),
        pii_redacted=privacy_res.get("pii_detected", False),
    )
