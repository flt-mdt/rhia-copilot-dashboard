from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()


class DataRequest(BaseModel):
    session_id: str
    section_id: str
    data: dict[str, Any]


@router.post("/data")
async def update_brief_data(payload: DataRequest):
    """
    Met à jour les données saisies pour une section donnée.
    Merge clé par clé (sémantique PATCH).
    """
    from app.redis_client import get_session_data, set_session_data

    brief_data = await get_session_data(payload.session_id, "brief_data") or {}
    section_data = brief_data.get(payload.section_id, {})
    section_data.update(payload.data)
    brief_data[payload.section_id] = section_data

    await set_session_data(payload.session_id, "brief_data", brief_data)
    return {"status": "updated"}


@router.get("/data/{session_id}/{section_id}")
async def get_brief_section_data(session_id: str, section_id: str):
    """Retourne les données stockées pour une section donnée."""
    from app.redis_client import get_session_data

    brief_data = await get_session_data(session_id, "brief_data") or {}
    section_data = brief_data.get(section_id)
    if section_data is None:
        raise HTTPException(status_code=404, detail="Section data not found")

    return section_data
