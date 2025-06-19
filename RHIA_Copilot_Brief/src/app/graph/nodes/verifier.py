from typing import Dict, Any
from app.core.constants import THRESHOLD_CONFIDENCE_LLM


class Verifier:
    """
    Node LangGraph : vérifie si la génération est assez fiable pour sortir du graphe.
    """
    def __call__(self, state: Dict[str, Any]) -> Dict[str, Any]:
        confidence = state.get("confidence", 0.0)
        fallback_needed = confidence < THRESHOLD_CONFIDENCE_LLM
        return {**state, "fallback_needed": fallback_needed}
