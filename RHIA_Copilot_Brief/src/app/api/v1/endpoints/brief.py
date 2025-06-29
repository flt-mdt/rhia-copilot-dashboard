from fastapi import APIRouter, HTTPException
from fastapi.responses import PlainTextResponse
from app.redis_client import get_session_data
from app.services.brief_template import render_final_brief
from app.core.constants import SECTION_IDS  # en haut du fichier

router = APIRouter()


@router.get("/brief/{session_id}", response_class=PlainTextResponse)
async def get_final_brief(session_id: str):
    """
    Génère le brief final si toutes les sections ont été approuvées.
    """
    user_preferences = await get_session_data(session_id, "user_preferences")
    brief_data = await get_session_data(session_id, "brief_data")
    approvals = await get_session_data(session_id, "approvals") or {}

    if not user_preferences or not brief_data:
        raise HTTPException(status_code=400, detail="Données incomplètes pour ce brief.")

    # Vérifie si toutes les sections togglées sont validées
    for idx, included in enumerate(user_preferences["sections"]):
        if included:
            section_name = SECTION_IDS[idx]
            if not approvals.get(section_name):
                raise HTTPException(status_code=409, detail=f"Section '{section_name}' non validée.")

    validated_sections = {
        idx: approvals[SECTION_IDS[idx]]["markdown"]
        for idx, included in enumerate(user_preferences["sections"])
        if included and approvals.get(SECTION_IDS[idx])
    }

    markdown = render_final_brief(
        validated_sections=validated_sections,
        sections_enabled=user_preferences["sections"],
        seniority=user_preferences.get("seniority", "Senior"),
        language=user_preferences.get("language", "fr"),
    )

    return markdown

