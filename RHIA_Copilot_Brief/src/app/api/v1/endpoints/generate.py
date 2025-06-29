from typing import Any

from app.graph.brief_generator import brief_graph
from app.models.user_pref import UserPreferences
from fastapi import APIRouter, HTTPException
from langgraph.errors import GraphRecursionError
from pydantic import BaseModel

router = APIRouter()


class GenerateRequest(BaseModel):
    """Payload for the /generate endpoint.

    * ``brief_data`` is a mapping where each key is a section slug and the value
      is an object containing the data for that section (e.g. {"job_function": "..."}).
    """

    session_id: str
    section_id: str
    user_preferences: UserPreferences
    brief_data: dict[str, dict[str, Any]]


class GenerateResponse(BaseModel):
    markdown: str
    confidence: float
    confidence_label: str
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
        "brief_data": payload.brief_data,
        "retry_count": 0,
    }

    try:
        result = await brief_graph.ainvoke(state)  # ← version asynchrone !
    except GraphRecursionError as exc:
        raise HTTPException(
            status_code=500,
            detail=(
                "Generation loop exceeded limits. "
                "Please check the provided data or try again."
            ),
        ) from exc

    return GenerateResponse(
        markdown=result["draft"],
        confidence=result["confidence"],
        confidence_label=result.get("confidence_label", ""),
        fallback_needed=result.get("fallback_needed", False),
    )
