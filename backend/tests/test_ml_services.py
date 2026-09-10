import pytest
import numpy as np
from backend.app.ml.roberta_service import roberta_service
from backend.app.ml.sentiment_service import sentiment_service
from backend.app.ml.emotion_service import emotion_service
from backend.app.ml.embeddings import embedding_service


def test_roberta_detection_structure():
    result = roberta_service.predict("You are worthless and nobody likes you.")
    assert "label" in result
    assert result["label"] in ["cyberbullying", "non_bullying"]
    assert "confidence" in result
    assert 0.0 <= result["confidence"] <= 1.0
    assert "probabilities" in result
    assert "cyberbullying" in result["probabilities"]
    assert "non_bullying" in result["probabilities"]
    assert "model_name" in result
    assert "model_version" in result


def test_roberta_detection_accuracy():
    # Abusive message
    harmful_result = roberta_service.predict("Kill yourself, loser. The world would be better without you.")
    assert harmful_result["label"] == "cyberbullying"
    assert harmful_result["probabilities"]["cyberbullying"] > 0.5

    # Safe message
    safe_result = roberta_service.predict("Great job on your presentation! You did amazing work.")
    assert safe_result["label"] == "non_bullying"
    assert safe_result["probabilities"]["non_bullying"] > 0.5


def test_sentiment_service():
    pos_res = sentiment_service.analyze("Thank you so much, this is wonderful and helpful!")
    assert pos_res["sentiment"] == "positive"
    assert pos_res["details"]["positive"] > 0

    neg_res = sentiment_service.analyze("I hate you, you are disgusting and horrible.")
    assert neg_res["sentiment"] == "negative"
    assert neg_res["details"]["negative"] > 0


def test_emotion_service():
    res = emotion_service.analyze("You are so stupid and I hate your ugly face!")
    emotions = res["emotions"]
    assert len(emotions) == 5
    labels = {e["label"] for e in emotions}
    assert labels == {"anger", "fear", "sadness", "neutral", "joy"}

    # Anger should be among the top emotions for hostile text
    top_emotion = emotions[0]["label"]
    assert top_emotion in ["anger", "fear", "sadness"]


def test_embedding_service():
    vec = embedding_service.embed_text("cyberbullying detection framework")
    assert isinstance(vec, list)
    assert len(vec) == 384
    norm = np.linalg.norm(vec)
    assert np.isclose(norm, 1.0, atol=1e-3)
