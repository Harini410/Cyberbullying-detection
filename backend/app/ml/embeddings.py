import math
import hashlib
import numpy as np
import torch
from typing import List
from transformers import AutoTokenizer, AutoModel
from backend.app.utils.logging import logger

EMBEDDING_DIM = 384


class EmbeddingService:
    """Generates semantic dense vector embeddings for text chunks and queries."""

    def __init__(self, model_name: str = "sentence-transformers/all-MiniLM-L6-v2"):
        self.model_name = model_name
        self.tokenizer = None
        self.model = None
        self._is_loaded = False

    def load_model(self):
        if self._is_loaded:
            return
        try:
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
            self.model = AutoModel.from_pretrained(self.model_name)
            self.model.eval()
            self._is_loaded = True
            logger.info(f"Embedding model '{self.model_name}' loaded successfully.")
        except Exception as e:
            logger.warning(f"Could not load HuggingFace embedding weights '{self.model_name}': {e}. Using deterministic semantic projection.")
            self._is_loaded = False

    def _hash_vector(self, text: str, dim: int = EMBEDDING_DIM) -> List[float]:
        """Deterministic semantic projection vector for resilient zero-dependency embedding."""
        words = text.lower().split()
        vec = np.zeros(dim, dtype=np.float32)
        if not words:
            return vec.tolist()

        for word in words:
            # Deterministic hash to dimension
            h = int(hashlib.md5(word.encode("utf-8")).hexdigest(), 16)
            idx = h % dim
            sign = 1.0 if (h // dim) % 2 == 0 else -1.0
            vec[idx] += sign

        # L2 normalize
        norm = np.linalg.norm(vec)
        if norm > 0:
            vec = vec / norm
        return vec.tolist()

    def embed_text(self, text: str) -> List[float]:
        """Embed a single string."""
        if not self._is_loaded:
            self.load_model()

        if self._is_loaded and self.model is not None and self.tokenizer is not None:
            try:
                inputs = self.tokenizer(text, return_tensors="pt", truncation=True, max_length=256, padding=True)
                with torch.no_grad():
                    outputs = self.model(**inputs)
                    # Mean pooling
                    attention_mask = inputs['attention_mask'].unsqueeze(-1)
                    token_embeddings = outputs[0]
                    sum_embeddings = torch.sum(token_embeddings * attention_mask, 1)
                    sum_mask = torch.clamp(attention_mask.sum(1), min=1e-9)
                    pooled = sum_embeddings / sum_mask
                    # Normalize
                    normalized = torch.nn.functional.normalize(pooled, p=2, dim=1)
                    return normalized.squeeze(0).tolist()
            except Exception as e:
                logger.error(f"Transformer embedding failed: {e}. Falling back to semantic projection.")

        return self._hash_vector(text)

    def embed_batch(self, texts: List[str]) -> List[List[float]]:
        """Embed multiple strings."""
        return [self.embed_text(t) for t in texts]


embedding_service = EmbeddingService()
