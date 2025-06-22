from typing import TypedDict, Optional, List, Dict, Any

class BriefState(TypedDict, total=False):
    session_id: str
    section_id: str

    user_preferences: Dict[str, Any]
    brief_data: Dict[str, Any]

    rag_chunks: Optional[List[Dict[str, Any]]]
    prompt: Optional[str]
    draft: Optional[str]
    confidence: Optional[float]
    fallback_needed: Optional[bool]

    user_feedback: Optional[str]
    previous_output: Optional[str]
