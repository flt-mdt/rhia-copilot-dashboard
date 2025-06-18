from typing import Dict, Any
from app.agents.llm_agent import LLMAgent

agent = LLMAgent()


class LLMExecutor:
    """
    Node LangGraph : appelle l'agent LLM pour générer le draft d'une section.
    """
    def __call__(self, state: Dict[str, Any]) -> Dict[str, Any]:
        return agent.generate_section(state)
