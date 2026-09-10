from typing import Dict, Any
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from backend.app.utils.logging import logger


class SentimentService:
    """Computes real affective sentiment polarity using VADER analysis."""

    def __init__(self):
        try:
            self.analyzer = SentimentIntensityAnalyzer()
            self.available = True
        except Exception as e:
            logger.error(f"Failed to initialize VADER SentimentAnalyzer: {e}")
            self.available = False

    def analyze(self, text: str) -> Dict[str, Any]:
        if not self.available or not text.strip():
            return {
                "sentiment": "neutral",
                "score": 0.5,
                "details": {"compound": 0.0, "positive": 0.0, "neutral": 1.0, "negative": 0.0}
            }

        scores = self.analyzer.polarity_scores(text)
        compound = scores["compound"]

        if compound >= 0.05:
            sentiment = "positive"
            score = round(scores["pos"], 4)
        elif compound <= -0.05:
            sentiment = "negative"
            score = round(scores["neg"], 4)
        else:
            sentiment = "neutral"
            score = round(scores["neu"], 4)

        return {
            "sentiment": sentiment,
            "score": score,
            "details": {
                "compound": round(compound, 4),
                "positive": round(scores["pos"], 4),
                "neutral": round(scores["neu"], 4),
                "negative": round(scores["neg"], 4),
            }
        }


sentiment_service = SentimentService()
