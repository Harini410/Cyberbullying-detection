from typing import Dict, Optional
from pydantic import BaseModel, Field


class DetectionRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=2000, description="The message text to evaluate.")
    model: Optional[str] = Field("roberta", description="Target model: roberta, cnn, lstm, etc.")


class DetectionResponse(BaseModel):
    label: str = Field(..., description="Classification label: cyberbullying or non_bullying")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Confidence score between 0.0 and 1.0")
    probabilities: Dict[str, float] = Field(..., description="Probabilities across classes")
    model_name: str = Field("RoBERTa", description="Name of the model utilized")
    model_version: str = Field("1.0.0", description="Model version")
    latency_ms: float = Field(..., description="Inference latency in milliseconds")
    pii_redacted: bool = Field(False, description="Whether PII was detected and redacted prior to inference")
