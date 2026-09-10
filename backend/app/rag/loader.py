import os
from typing import List, Dict, Any
from backend.app.config import settings
from backend.app.utils.logging import logger


class DocumentLoader:
    """Discovers and parses markdown and text files from the knowledge directory."""

    def __init__(self, knowledge_dir: str = settings.KNOWLEDGE_BASE_DIR):
        self.knowledge_dir = knowledge_dir

    def load_documents(self) -> List[Dict[str, Any]]:
        documents = []
        if not os.path.exists(self.knowledge_dir):
            logger.warning(f"Knowledge directory '{self.knowledge_dir}' does not exist.")
            return documents

        for root, _, files in os.walk(self.knowledge_dir):
            for file in files:
                if file.endswith((".md", ".txt")):
                    filepath = os.path.join(root, file)
                    rel_dir = os.path.relpath(root, self.knowledge_dir)
                    category = "general" if rel_dir == "." else os.path.basename(rel_dir)

                    try:
                        with open(filepath, "r", encoding="utf-8") as f:
                            content = f.read()

                        # Extract title from first markdown header
                        title = file
                        for line in content.splitlines():
                            if line.startswith("# "):
                                title = line.replace("# ", "").strip()
                                break

                        documents.append({
                            "title": title,
                            "source": os.path.relpath(filepath, os.path.dirname(self.knowledge_dir)),
                            "category": category,
                            "content": content,
                        })
                    except Exception as e:
                        logger.error(f"Error reading knowledge file '{filepath}': {e}")

        logger.info(f"Loaded {len(documents)} documents from '{self.knowledge_dir}'.")
        return documents


document_loader = DocumentLoader()
