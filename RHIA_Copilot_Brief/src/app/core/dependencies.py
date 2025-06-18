from fastapi import HTTPException
from app.redis_client import get_session_data
from app.models.schemas import UserPreferences


async def load_user_preferences(session_id: str) -> UserPreferences:
    """
    Charge les préférences utilisateur depuis Redis.
    À utiliser dans les endpoints ou services.
    """
    prefs = await get_session_data(session_id, "user_preferences")
    if not prefs:
        raise HTTPException(status_code=400, detail="Préférences non initialisées.")
    return UserPreferences(**prefs)
