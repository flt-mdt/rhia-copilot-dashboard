from typing import Any

from app.services.prompt_builder import build_feedback_prompt


class FeedbackPromptBuilder:
    """Node LangGraph: build feedback prompt."""

    def __call__(self, state: dict[str, Any]) -> dict[str, Any]:
        prompt = build_feedback_prompt(
            section_id=state["section_id"],
            user_feedback=state["user_feedback"],
            previous_output=state["previous_output"],
            brief_data=state.get("brief_data", {}),
            user_preferences=state.get("user_preferences", {}),
        )
        return {**state, "prompt": prompt}

