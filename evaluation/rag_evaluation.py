"""RAG evaluation module measuring retrieval relevance and context coverage."""

from typing import List, Dict, Any
from backend.app.rag.retriever import rag_retriever

RAG_BENCHMARK_QUERIES = [
    {
        "query": "How do I report harassment on Instagram and preserve evidence?",
        "expected_categories": ["online_safety"],
        "key_terms": ["screenshot", "report", "instagram"]
    },
    {
        "query": "What are the common types of cyberbullying like doxxing and flaming?",
        "expected_categories": ["cyberbullying"],
        "key_terms": ["doxxing", "harassment", "flaming"]
    },
    {
        "query": "What crisis hotline can someone call if being bullied?",
        "expected_categories": ["intervention"],
        "key_terms": ["988", "crisis", "helpline"]
    },
    {
        "query": "How does the active bystander 4Ds framework work?",
        "expected_categories": ["prevention"],
        "key_terms": ["direct", "distract", "delegate", "delay"]
    }
]


def evaluate_rag_retrieval() -> Dict[str, Any]:
    query_scores = []

    for test_case in RAG_BENCHMARK_QUERIES:
        query = test_case["query"]
        expected_cats = test_case["expected_categories"]
        terms = test_case["key_terms"]

        chunks = rag_retriever.retrieve(query, top_k=3)

        category_match = any(c.get("category") in expected_cats for c in chunks)
        combined_text = " ".join([c.get("text", "").lower() for c in chunks])
        term_hits = sum(1 for t in terms if t in combined_text)
        precision = round(term_hits / max(1, len(terms)), 2)

        query_scores.append({
            "query": query,
            "chunks_retrieved": len(chunks),
            "category_relevance": category_match,
            "term_coverage_score": precision,
            "top_score": chunks[0].get("score", 0.0) if chunks else 0.0
        })

    avg_coverage = round(sum(q["term_coverage_score"] for q in query_scores) / len(query_scores), 3)

    return {
        "benchmark": "CyberSafe RAG Evaluation Suite",
        "queries_tested": len(RAG_BENCHMARK_QUERIES),
        "mean_term_coverage": avg_coverage,
        "category_accuracy": round(sum(1 for q in query_scores if q["category_relevance"]) / len(query_scores), 2),
        "results": query_scores
    }


if __name__ == "__main__":
    import pprint
    pprint.pprint(evaluate_rag_retrieval())
