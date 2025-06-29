from typing import List, Dict, Any
from app.models.user_pref import UserPreferences
from app.services.prompt_builder import build_prompt
from app.services.llm_client import call_llm


async def generate_section(
    section_id: str,
    chunks: List[Dict[str, Any]],
    brief_data: Dict[str, Any],
    user_preferences: UserPreferences
) -> Dict[str, Any]:
    """
    Orchestration de la génération d’une section de brief.
    Retourne le markdown + score de confiance + log.
    """

    # 1. Construit le prompt dynamique (template v3)
    prompt = build_prompt(
        section_id=section_id,
        rag_chunks=chunks,
        brief_data=brief_data,
        user_preferences=user_preferences,
    )

    # 3. Appel LLM (OpenAI ou autre orchestrateur)
    response = await call_llm(prompt=prompt, section_id=section_id)

    return {
        "markdown": response["output"],
        "confidence": response["confidence"],  # score ∈ [0.0, 1.0]
        "raw": response  # pour logging/debug si besoin
    }
