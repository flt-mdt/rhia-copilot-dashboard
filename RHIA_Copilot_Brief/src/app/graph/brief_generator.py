from app.graph.nodes.answer_scorer import AnswerScorer
from app.graph.nodes.llm_executor import LLMExecutor
from app.graph.nodes.mapper import SectionMapper
from app.graph.nodes.prompt_builder import PromptBuilder
from app.graph.nodes.rag_retriever import RagRetriever
from app.graph.nodes.verifier import Verifier
from app.graph.state import BriefState
from langgraph.graph import StateGraph

# 1. Créer le graphe
graph = StateGraph(BriefState)

# 2. Ajouter les nœuds
graph.add_node("retrieve_chunks", RagRetriever())
graph.add_node("map_section", SectionMapper())
graph.add_node("build_prompt", PromptBuilder())
graph.add_node("call_llm", LLMExecutor())
graph.add_node("score", AnswerScorer())
graph.add_node("verify", Verifier())

# 3. Définir les transitions
graph.set_entry_point("retrieve_chunks")
graph.add_edge("retrieve_chunks", "map_section")
graph.add_edge("map_section", "build_prompt")
graph.add_edge("build_prompt", "call_llm")
graph.add_edge("call_llm", "score")
graph.add_edge("score", "verify")

# 4. Condition : si confiance faible → reboucler sur build_prompt (clarification UX plus tard)
graph.add_conditional_edges(
    "verify", lambda state: "build_prompt" if state.get("fallback_needed") else "output"
)


# 5. Compiler le graphe avec une limite de récursion explicite
# pour éviter les boucles infinies en cas de confiance trop basse
brief_graph = graph.compile(config={"recursion_limit": 10})
