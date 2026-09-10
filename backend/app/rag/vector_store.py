import os
import json
import numpy as np
from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional
from backend.app.config import settings
from backend.app.utils.logging import logger


class BaseVectorStore(ABC):
    """Abstract interface for vector database implementations."""

    @abstractmethod
    def add_documents(self, chunks: List[Dict[str, Any]], embeddings: List[List[float]]) -> int:
        pass

    @abstractmethod
    def search(self, query_embedding: List[float], top_k: int = 3, category: Optional[str] = None) -> List[Dict[str, Any]]:
        pass

    @abstractmethod
    def delete(self, chunk_ids: List[str]) -> bool:
        pass

    @abstractmethod
    def health_check(self) -> Dict[str, Any]:
        pass


class LocalPersistentVectorStore(BaseVectorStore):
    """
    Zero-dependency, cross-platform persistent vector store.
    Stores chunk records, metadata, and normalized embedding matrices to disk.
    Computes exact cosine similarity with lightning-fast vectorized numpy dot-products.
    """

    def __init__(self, storage_dir: Optional[str] = None):
        self.storage_dir = storage_dir or settings.VECTOR_STORE_DIR
        os.makedirs(self.storage_dir, exist_ok=True)
        self.data_file = os.path.join(self.storage_dir, "vector_index.json")
        self.chunks: List[Dict[str, Any]] = []
        self.embeddings_matrix: Optional[np.ndarray] = None
        self._load()

    def _load(self):
        if os.path.exists(self.data_file):
            try:
                with open(self.data_file, "r", encoding="utf-8") as f:
                    stored = json.load(f)
                    self.chunks = stored.get("chunks", [])
                    raw_emb = stored.get("embeddings", [])
                    if raw_emb:
                        self.embeddings_matrix = np.array(raw_emb, dtype=np.float32)
                logger.info(f"Loaded {len(self.chunks)} chunks from local vector store at '{self.data_file}'.")
            except Exception as e:
                logger.error(f"Error loading vector index: {e}")
                self.chunks = []
                self.embeddings_matrix = None

    def _persist(self):
        try:
            stored = {
                "chunks": self.chunks,
                "embeddings": self.embeddings_matrix.tolist() if self.embeddings_matrix is not None else []
            }
            with open(self.data_file, "w", encoding="utf-8") as f:
                json.dump(stored, f, indent=2)
            logger.info(f"Persisted {len(self.chunks)} vector chunks to disk.")
        except Exception as e:
            logger.error(f"Failed to persist vector store: {e}")

    def add_documents(self, chunks: List[Dict[str, Any]], embeddings: List[List[float]]) -> int:
        if not chunks or not embeddings:
            return 0

        new_matrix = np.array(embeddings, dtype=np.float32)

        # Normalize new vectors
        norms = np.linalg.norm(new_matrix, axis=1, keepdims=True)
        norms[norms == 0] = 1e-9
        new_matrix = new_matrix / norms

        if self.embeddings_matrix is None or len(self.chunks) == 0:
            self.chunks = list(chunks)
            self.embeddings_matrix = new_matrix
        else:
            self.chunks.extend(chunks)
            self.embeddings_matrix = np.vstack([self.embeddings_matrix, new_matrix])

        self._persist()
        return len(chunks)

    def search(self, query_embedding: List[float], top_k: int = 3, category: Optional[str] = None) -> List[Dict[str, Any]]:
        if self.embeddings_matrix is None or len(self.chunks) == 0:
            return []

        q_vec = np.array(query_embedding, dtype=np.float32)
        q_norm = np.linalg.norm(q_vec)
        if q_norm > 0:
            q_vec = q_vec / q_norm

        # Cosine similarity is dot product of normalized vectors
        scores = np.dot(self.embeddings_matrix, q_vec)

        results = []
        for idx, score in enumerate(scores):
            chunk = self.chunks[idx]
            if category and chunk.get("category") != category:
                continue

            item = dict(chunk)
            item["score"] = round(float(score), 4)
            results.append(item)

        results.sort(key=lambda x: x["score"], reverse=True)
        return results[:top_k]

    def delete(self, chunk_ids: List[str]) -> bool:
        if not self.chunks:
            return True
        id_set = set(chunk_ids)
        keep_indices = [i for i, c in enumerate(self.chunks) if c["chunk_id"] not in id_set]
        self.chunks = [self.chunks[i] for i in keep_indices]
        if self.embeddings_matrix is not None:
            self.embeddings_matrix = self.embeddings_matrix[keep_indices] if keep_indices else None
        self._persist()
        return True

    def health_check(self) -> Dict[str, Any]:
        return {
            "status": "healthy",
            "type": "LocalPersistentVectorStore",
            "total_chunks": len(self.chunks),
            "storage_path": self.data_file
        }


def get_vector_store() -> BaseVectorStore:
    """Factory creating the active vector store based on environment and system capabilities."""
    return LocalPersistentVectorStore()


vector_store = get_vector_store()
