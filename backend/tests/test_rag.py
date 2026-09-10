import pytest
from backend.app.rag.loader import document_loader
from backend.app.rag.chunker import text_chunker
from backend.app.rag.vector_store import LocalPersistentVectorStore
from backend.app.rag.retriever import rag_retriever
from backend.app.rag.pipeline import rag_pipeline


def test_document_loader():
    docs = document_loader.load_documents()
    assert len(docs) >= 5
    categories = {d["category"] for d in docs}
    assert "cyberbullying" in categories or "online_safety" in categories


def test_text_chunker():
    doc = {
        "title": "Test Title",
        "source": "test/path.md",
        "category": "test_cat",
        "content": "## Section 1\nThis is sample text about cyberbullying.\n\n## Section 2\nThis is another section."
    }
    chunks = text_chunker.chunk_document(doc)
    assert len(chunks) >= 1
    assert "chunk_id" in chunks[0]
    assert chunks[0]["title"] == "Test Title"
    assert chunks[0]["category"] == "test_cat"


def test_vector_store_operations(tmp_path):
    store = LocalPersistentVectorStore(storage_dir=str(tmp_path))
    chunks = [
        {"chunk_id": "c1", "text": "Document about reporting harassment", "source": "s1", "title": "T1", "category": "safety"},
        {"chunk_id": "c2", "text": "Document about machine learning models", "source": "s2", "title": "T2", "category": "ml"}
    ]
    # Simple dummy 384-d embeddings
    emb1 = [1.0] + [0.0] * 383
    emb2 = [0.0, 1.0] + [0.0] * 382
    store.add_documents(chunks, [emb1, emb2])

    health = store.health_check()
    assert health["total_chunks"] == 2

    # Query closest to emb1
    results = store.search(query_embedding=emb1, top_k=1)
    assert len(results) == 1
    assert results[0]["chunk_id"] == "c1"

    # Delete
    store.delete(["c1"])
    assert len(store.chunks) == 1


def test_rag_retriever():
    results = rag_retriever.retrieve("reporting online harassment and evidence", top_k=2)
    assert len(results) >= 1
    assert "text" in results[0]
    assert "title" in results[0]
    assert "source" in results[0]


def test_rag_pipeline_context():
    context_data = rag_pipeline.get_grounded_context("how to block cyberbullies", top_k=2)
    assert "chunks" in context_data
    assert "formatted_context" in context_data
    assert len(context_data["chunks"]) >= 1
    assert "Source [1]" in context_data["formatted_context"]
