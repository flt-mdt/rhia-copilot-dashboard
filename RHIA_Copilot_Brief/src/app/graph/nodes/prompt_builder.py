from typing import Dict, Any
from app.services.prompt_builder import build_prompt


class PromptBuilder:
    """
    Node LangGraph : construit le prompt final à injecter dans le LLM.
    """
    def __call__(self, state: Dict[str, Any]) -> Dict[str, Any]:
        prompt = build_prompt(
            section_id=state["section_id"],
            rag_context="\n\n".join([chunk["text"] for chunk in state.get("rag_chunks", [])]),
            brief_data=state.get("brief_data", {}),
            user_preferences=state.get("user_preferences", {})
        )
        return {**state, "prompt": prompt}
