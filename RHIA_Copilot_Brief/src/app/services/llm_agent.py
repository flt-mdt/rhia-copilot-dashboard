from typing import Dict, Any
from app.services.prompt_builder import build_prompt, build_feedback_prompt
from app.services.llm_client import call_llm
from app.core.constants import THRESHOLD_CONFIDENCE_LLM


class LLMAgent:
    def __init__(self):
        pass

    async def generate_section(self, state: Dict[str, Any]) -> Dict[str, Any]:
        prompt = build_prompt(
            section_id=state["section_id"],
            rag_chunks=state.get("rag_chunks", []),
            brief_data=state["brief_data"],
            user_preferences=state["user_preferences"],
        )

        response = await call_llm(prompt, state["section_id"])

        return {
            **state,
            "prompt": prompt,
            "draft": response["output"],
            "confidence": response["confidence"],
            "fallback_needed": response["confidence"] < THRESHOLD_CONFIDENCE_LLM
        }

    async def revise_section(self, state: Dict[str, Any]) -> Dict[str, Any]:
        prompt = build_feedback_prompt(
            section_id=state["section_id"],
            previous_output=state["previous_output"],
            user_feedback=state["user_feedback"],
            brief_data=state["brief_data"],
            user_preferences=state["user_preferences"]
        )

        response = await call_llm(prompt, state["section_id"])

        return {
            **state,
            "prompt": prompt,
            "draft": response["output"],
            "confidence": response["confidence"],
            "fallback_needed": False  # l'humain vient de guider : pas de boucle
        }
