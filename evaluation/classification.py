"""Evaluation script for the cyberbullying classification pipeline."""

from typing import List, Dict, Any
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from backend.app.ml.roberta_service import roberta_service

# Standard reference test suite representing varied linguistic patterns
BENCHMARK_TEST_CASES = [
    # Explicit cyberbullying
    {"text": "You are worthless and nobody likes you.", "ground_truth": 1},
    {"text": "Kill yourself, loser. The world would be better without you.", "ground_truth": 1},
    {"text": "You are so disgusting and ugly, get off the internet.", "ground_truth": 1},
    {"text": "Nobody wants you here, you complete idiot and failure.", "ground_truth": 1},
    {"text": "Shut up you freak, go away and die.", "ground_truth": 1},
    # Safe / Non-bullying content
    {"text": "I went to the store today and bought some groceries.", "ground_truth": 0},
    {"text": "Great job on your presentation! You did amazing work.", "ground_truth": 0},
    {"text": "Looking forward to working together on this project.", "ground_truth": 0},
    {"text": "Could you please share the documentation link with me?", "ground_truth": 0},
    {"text": "Have a wonderful weekend and enjoy your time off.", "ground_truth": 0},
]


def evaluate_classifier() -> Dict[str, Any]:
    """Runs evaluation over the benchmark test suite and calculates objective metrics."""
    y_true = []
    y_pred = []
    results_detail = []

    for item in BENCHMARK_TEST_CASES:
        prediction = roberta_service.predict(item["text"])
        pred_binary = 1 if prediction["label"] == "cyberbullying" else 0

        y_true.append(item["ground_truth"])
        y_pred.append(pred_binary)

        results_detail.append({
            "text": item["text"],
            "ground_truth": "cyberbullying" if item["ground_truth"] == 1 else "non_bullying",
            "predicted": prediction["label"],
            "confidence": prediction["confidence"],
            "correct": item["ground_truth"] == pred_binary
        })

    acc = accuracy_score(y_true, y_pred)
    prec = precision_score(y_true, y_pred, zero_division=0)
    rec = recall_score(y_true, y_pred, zero_division=0)
    f1 = f1_score(y_true, y_pred, zero_division=0)
    cm = confusion_matrix(y_true, y_pred).tolist()

    return {
        "evaluation_dataset": "Curated CyberSafe Test Suite (10 Samples)",
        "sample_size": len(BENCHMARK_TEST_CASES),
        "accuracy": round(float(acc), 4),
        "precision": round(float(prec), 4),
        "recall": round(float(rec), 4),
        "f1_score": round(float(f1), 4),
        "confusion_matrix": cm,
        "details": results_detail,
        "historical_project_benchmark": {
            "dataset": "47,692 Annotated Social Media Posts",
            "reported_accuracy": 0.93,
            "reported_precision": 0.94,
            "reported_recall": 0.93,
            "reported_f1": 0.94,
            "note": "Reported metrics achieved on Harini L's offline research dataset with federated RoBERTa fine-tuning."
        }
    }


if __name__ == "__main__":
    import pprint
    metrics = evaluate_classifier()
    pprint.pprint(metrics)
