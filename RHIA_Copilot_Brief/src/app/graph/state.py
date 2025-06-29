from typing import Any, TypedDict


class BriefState(TypedDict, total=False):
    session_id: str
    section_id: str

    user_preferences: dict[str, Any]
    brief_data: dict[str, Any]

    rag_chunks: list[dict[str, Any]] | None
    rag_confidence: float | None
    prompt: str | None
    draft: str | None
    confidence: float | None
    llm_confidence: float | None
    confidence_label: str | None
    fallback_needed: bool | None

    user_feedback: str | None
    previous_output: str | None
