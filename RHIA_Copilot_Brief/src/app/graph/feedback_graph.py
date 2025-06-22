from langgraph.graph import StateGraph
from app.graph.state import BriefState
from app.graph.nodes.prompt_builder import PromptBuilder
from app.graph.nodes.llm_executor import LLMExecutor

# Graphe simplifié pour la reformulation après feedback utilisateur

graph = StateGraph(BriefState)

# Étapes
graph.add_node("build_feedback_prompt", PromptBuilder())
graph.add_node("call_llm", LLMExecutor())

# Transitions
graph.set_entry_point("build_feedback_prompt")
graph.add_edge("build_feedback_prompt", "call_llm")
graph.set_finish_point("call_llm")

# Compilation
feedback_graph = graph.compile()
