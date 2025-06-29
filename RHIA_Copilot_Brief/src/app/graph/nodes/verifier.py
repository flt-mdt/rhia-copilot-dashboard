from typing import Dict, Any
from app.core.constants import THRESHOLD_CONFIDENCE_LLM, MAX_GRAPH_RETRIES


class Verifier:
    """Stop looping when la confiance reste trop basse."""

    def __init__(self, max_retries: int = MAX_GRAPH_RETRIES):
        self.max_retries = max_retries

    def __call__(self, state: Dict[str, Any]) -> Dict[str, Any]:
        confidence = state.get("confidence", 0.0)
        retries = state.get("retry_count", 0)

        should_retry = confidence < THRESHOLD_CONFIDENCE_LLM and retries < self.max_retries

        if should_retry:
            retries += 1

        return {
            **state,
            "fallback_needed": should_retry,
            "retry_count": retries,
        }
