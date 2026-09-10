import re
from typing import List, Dict, Any
from backend.app.utils.ids import generate_chunk_id


class TextChunker:
    """Splits markdown and text documents into semantically coherent overlapping chunks."""

    def __init__(self, chunk_size: int = 500, chunk_overlap: int = 80):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap

    def chunk_document(self, doc: Dict[str, Any]) -> List[Dict[str, Any]]:
        content = doc.get("content", "").strip()
        if not content:
            return []

        # Split along markdown sections (##) or double newlines
        sections = re.split(r"(?:\n\s*##\s+|\n\n+)", content)

        chunks = []
        current_chunk = ""

        for sec in sections:
            clean_sec = sec.strip()
            if not clean_sec:
                continue

            if len(current_chunk) + len(clean_sec) <= self.chunk_size:
                current_chunk = f"{current_chunk}\n\n{clean_sec}" if current_chunk else clean_sec
            else:
                if current_chunk:
                    chunks.append(current_chunk)
                current_chunk = clean_sec

        if current_chunk:
            chunks.append(current_chunk)

        result = []
        for text in chunks:
            result.append({
                "chunk_id": generate_chunk_id(),
                "text": text.strip(),
                "source": doc.get("source", ""),
                "title": doc.get("title", ""),
                "category": doc.get("category", "general"),
            })

        return result


text_chunker = TextChunker()
