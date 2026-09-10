import uuid


def generate_id(prefix: str = "id") -> str:
    """Generate a prefixed unique UUID4 string."""
    return f"{prefix}_{uuid.uuid4().hex[:12]}"


def generate_request_id() -> str:
    return generate_id("req")


def generate_conversation_id() -> str:
    return generate_id("conv")


def generate_analysis_id() -> str:
    return generate_id("ana")


def generate_chunk_id() -> str:
    return generate_id("chk")
