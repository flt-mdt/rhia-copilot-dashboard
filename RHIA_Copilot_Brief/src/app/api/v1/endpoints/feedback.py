from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, Any
from app.graph.brief_generator import brief_graph
from app.models.user_pref import UserPreferences

router = APIRouter()

class FeedbackRequest(BaseModel):
    session_id: str
    section_id: str
    user_feedback: str
    previous_markdown: str
    user_preferences: UserPreferences
    brief_data: Dict[str, Any]

class FeedbackResponse(BaseModel):
    markdown: str
    confidence: float

@router.post("/feedback", response_model=FeedbackResponse)
async def revise_section(payload: FeedbackRequest):
    """
    Appelle le graphe LangGraph pour reformuler une section à partir d’un feedback.
    """
    state = {
        "session_id": payload.session_id,
        "section_id": payload.section_id,
        "user_feedback": payload.user_feedback,
        "previous_output": payload.previous_markdown,
        "user_preferences": payload.user_preferences.dict(),
        "brief_data": payload.brief_data
    }

    result = await brief_graph.ainvoke(state)

    return FeedbackResponse(
        markdown=result["draft"],
        confidence=result["confidence"]
    )
