from typing import Any

from app.services.llm_agent import LLMAgent

agent = LLMAgent()


class FeedbackLLMExecutor:
    """Node LangGraph: call the agent to revise a section."""

    async def __call__(self, state: dict[str, Any]) -> dict[str, Any]:
        return await agent.revise_section(state)

