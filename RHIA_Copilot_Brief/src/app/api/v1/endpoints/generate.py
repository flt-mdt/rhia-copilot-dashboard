from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
from app.graph.brief_generator import brief_graph
from app.models.user_pref import UserPreferences

router = APIRouter()

class GenerateRequest(BaseModel):
    """Payload for the /generate endpoint.

    * ``brief_data`` is a mapping where each key is a section slug and the value
      is the data saved for that section.
    """

    session_id: str
    section_id: str
    user_preferences: UserPreferences
    brief_data: Dict[str, Any]

class GenerateResponse(BaseModel):
    markdown: str
    confidence: float
    fallback_needed: bool

@router.post("/generate", response_model=GenerateResponse)
async def generate_section(payload: GenerateRequest):
    """
    Appelle le graphe LangGraph pour générer une section complète.
    """
    state = {
        "session_id": payload.session_id,
        "current_section": payload.section_id,  # ← clé correcte
        # Pydantic → dict pour le prompt builder
        "user_preferences": payload.user_preferences.dict(),
        "brief_data": payload.brief_data
    }

    result = await brief_graph.ainvoke(state)  # ← version asynchrone !

    return GenerateResponse(
        markdown=result["draft"],
        confidence=result["confidence"],
        fallback_needed=result.get("fallback_needed", False)
    )
