from app.graph.nodes.feedback_llm_executor import FeedbackLLMExecutor
from app.graph.nodes.feedback_prompt_builder import FeedbackPromptBuilder
from app.graph.state import BriefState
from langgraph.graph import StateGraph

# Graphe simplifié pour la reformulation après feedback utilisateur

graph = StateGraph(BriefState)

# Étapes
graph.add_node("build_feedback_prompt", FeedbackPromptBuilder())
graph.add_node("call_llm", FeedbackLLMExecutor())

# Transitions
graph.set_entry_point("build_feedback_prompt")
graph.add_edge("build_feedback_prompt", "call_llm")
graph.set_finish_point("call_llm")

# Compilation
feedback_graph = graph.compile()
