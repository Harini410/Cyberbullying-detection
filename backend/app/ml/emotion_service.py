import math
import re
from typing import List, Dict, Any
from backend.app.ml.sentiment_service import sentiment_service

# Lexicon indicators for core affective emotional categories
EMOTION_LEXICON = {
    "anger": [
        "hate", "stupid", "idiot", "loser", "worthless", "kill", "die", "ugly", "fat", "dumb",
        "retard", "freak", "weirdo", "pathetic", "useless", "disgusting", "gross", "annoying",
        "shut up", "punch", "trash", "scum", "despise", "rage", "furious", "mad", "bastard"
    ],
    "fear": [
        "scared", "afraid", "threat", "terrified", "panic", "horror", "stalk", "watch you",
        "find you", "hunt", "harm", "danger", "warning", "afraid", "creep", "intimidate"
    ],
    "sadness": [
        "depressed", "cry", "lonely", "alone", "unwanted", "miserable", "hurts", "pain",
        "grief", "hopeless", "broken", "nobody likes", "failure", "unloved", "sorrow"
    ],
    "joy": [
        "happy", "great", "awesome", "love", "wonderful", "amazing", "kind", "congrats",
        "proud", "friend", "best", "blessed", "glad", "celebrate", "excellent", "beautiful"
    ]
}


class EmotionService:
    """Extracts affective emotion signals across anger, fear, sadness, neutral, and joy."""

    def __init__(self):
        pass

    def analyze(self, text: str) -> Dict[str, Any]:
        cleaned = text.lower()
        sentiment_res = sentiment_service.analyze(text)
        details = sentiment_res["details"]
        compound = details.get("compound", 0.0)

        # Count lexical matches
        counts = {"anger": 0, "fear": 0, "sadness": 0, "joy": 0}
        for emotion, keywords in EMOTION_LEXICON.items():
            for kw in keywords:
                if kw in cleaned:
                    counts[emotion] += 1

        # Calculate base scores from lexicon & sentiment
        raw_scores = {}
        # Anger correlates strongly with negative sentiment and hostile keywords
        raw_scores["anger"] = counts["anger"] * 0.35 + (details.get("negative", 0.0) * 0.5)
        # Fear correlates with negative sentiment, threat cues
        raw_scores["fear"] = counts["fear"] * 0.40 + (details.get("negative", 0.0) * 0.3)
        # Sadness correlates with depression/sorrow cues and negative sentiment
        raw_scores["sadness"] = counts["sadness"] * 0.35 + (details.get("negative", 0.0) * 0.3)
        # Joy correlates with positive sentiment and positive keywords
        raw_scores["joy"] = counts["joy"] * 0.40 + (details.get("positive", 0.0) * 0.6)
        # Neutral correlates with neutral sentiment and lack of extreme cues
        raw_scores["neutral"] = details.get("neutral", 0.0) * 0.5 + (0.3 if max(counts.values()) == 0 else 0.0)

        # Apply softmax / normalization
        exp_scores = {k: math.exp(v * 2.5) for k, v in raw_scores.items()}
        total_exp = sum(exp_scores.values())
        normalized = {k: round(v / total_exp, 3) for k, v in exp_scores.items()}

        emotions_list = [
            {"label": "anger", "score": normalized.get("anger", 0.0)},
            {"label": "fear", "score": normalized.get("fear", 0.0)},
            {"label": "sadness", "score": normalized.get("sadness", 0.0)},
            {"label": "neutral", "score": normalized.get("neutral", 0.0)},
            {"label": "joy", "score": normalized.get("joy", 0.0)},
        ]

        # Sort descending by score
        emotions_list.sort(key=lambda x: x["score"], reverse=True)

        return {"emotions": emotions_list}


emotion_service = EmotionService()
