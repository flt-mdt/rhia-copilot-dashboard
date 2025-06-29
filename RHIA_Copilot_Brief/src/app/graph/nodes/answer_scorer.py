from __future__ import annotations

from typing import Any

from app.services.confidence_scoring import combine_confidences, score_answer


class AnswerScorer:
    async def __call__(self, state: dict[str, Any]) -> dict[str, Any]:
        prompt = state.get("prompt", "")
        answer = state.get("draft", "")
        rag_score = state.get("rag_confidence", 0.0)
        llm_base = state.get("confidence", 0.0)

        eval_score = await score_answer(prompt, answer)
        final_conf, label = combine_confidences(rag_score, llm_base, eval_score)

        return {
            **state,
            "llm_confidence": eval_score,
            "confidence": final_conf,
            "confidence_label": label,
        }
