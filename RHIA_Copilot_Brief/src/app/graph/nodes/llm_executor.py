from typing import Dict, Any
from app.services.llm_agent import LLMAgent

agent = LLMAgent()


class LLMExecutor:
    """Node LangGraph : appelle l'agent LLM pour générer le draft d'une section."""

    async def __call__(self, state: Dict[str, Any]) -> Dict[str, Any]:
        return await agent.generate_section(state)
