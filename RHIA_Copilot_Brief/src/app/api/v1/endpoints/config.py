from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.models.user_pref import UserPreferences

router = APIRouter()


class ConfigRequest(UserPreferences):
    session_id: str


@router.post("/config")
async def store_user_preferences(payload: ConfigRequest):
    """
    Enregistre les préférences utilisateur (UI de configuration).
    Stocké en Redis via clé session_id.
    """
    from app.redis_client import set_session_data

    await set_session_data(
        session_id=payload.session_id,
        key="user_preferences",
        value=payload.dict(exclude={"session_id"})
    )

    return {"status": "ok"}
 
