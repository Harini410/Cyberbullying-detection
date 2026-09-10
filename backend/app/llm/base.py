from abc import ABC, abstractmethod
from typing import Optional, Dict, Any


class BaseLLMProvider(ABC):
    """Abstract interface for large language model service providers."""

    @abstractmethod
    async def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: float = 0.2,
        max_tokens: int = 1024,
    ) -> str:
        """Asynchronously generate a completion from the LLM."""
        pass

    @abstractmethod
    def health_check(self) -> Dict[str, Any]:
        """Verify provider availability and credentials."""
        pass
