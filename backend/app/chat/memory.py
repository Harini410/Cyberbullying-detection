from typing import List, Dict, Any
from backend.app.database.models import Message


class ConversationMemory:
    """Manages conversational context window, truncation, and formatting."""

    def __init__(self, max_history_messages: int = 8, max_chars_per_message: int = 600):
        self.max_history_messages = max_history_messages
        self.max_chars_per_message = max_chars_per_message

    def format_history_for_prompt(self, messages: List[Message]) -> str:
        """
        Takes recent database Message records, truncates long messages,
        and produces a clean dialogue history string.
        """
        if not messages:
            return ""

        # Take only most recent N messages
        recent = messages[-self.max_history_messages:]

        dialogue = []
        for msg in recent:
            role_label = "User" if msg.role == "user" else "Assistant"
            content = msg.content.strip()
            if len(content) > self.max_chars_per_message:
                content = content[:self.max_chars_per_message] + "... [truncated]"
            dialogue.append(f"{role_label}: {content}")

        return "\n".join(dialogue)


conversation_memory = ConversationMemory()
