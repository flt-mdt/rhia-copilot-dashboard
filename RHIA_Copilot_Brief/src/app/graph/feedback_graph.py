from app.graph.nodes.answer_scorer import AnswerScorer
from app.graph.nodes.feedback_llm_executor import FeedbackLLMExecutor
from app.graph.nodes.feedback_prompt_builder import FeedbackPromptBuilder
from app.graph.state import BriefState
from langgraph.graph import StateGraph

# Graphe simplifié pour la reformulation après feedback utilisateur

graph = StateGraph(BriefState)

# Étapes
graph.add_node("build_feedback_prompt", FeedbackPromptBuilder())
graph.add_node("call_llm", FeedbackLLMExecutor())
graph.add_node("score", AnswerScorer())

# Transitions
graph.set_entry_point("build_feedback_prompt")
graph.add_edge("build_feedback_prompt", "call_llm")
graph.add_edge("call_llm", "score")
graph.set_finish_point("score")

# Compilation
feedback_graph = graph.compile()
