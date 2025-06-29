from __future__ import annotations

from typing import Any

from langchain.evaluation import ScoreStringEvalChain
from langchain_openai import ChatOpenAI
from sentence_transformers import CrossEncoder

_reranker: CrossEncoder | None = None
_score_chain: ScoreStringEvalChain | None = None


def get_reranker() -> CrossEncoder | None:
    global _reranker
    if _reranker is None:
        try:
            _reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")
        except Exception:
            _reranker = None
    return _reranker


def rerank_chunks(query: str, chunks: list[dict[str, Any]]) -> list[dict[str, Any]]:
    model = get_reranker()
    if model is None:
        return chunks
    pairs = [[query, c.get("text", "")] for c in chunks]
    scores = model.predict(pairs)
    for chunk, score in zip(chunks, scores, strict=False):
        chunk["rerank_score"] = float(score)
    return sorted(chunks, key=lambda c: c.get("rerank_score", 0), reverse=True)


def compute_rag_score(chunks: list[dict[str, Any]]) -> float:
    if not chunks:
        return 0.0
    return sum(c.get("rerank_score", c.get("score", 0.0)) for c in chunks) / len(chunks)


def get_score_chain() -> ScoreStringEvalChain:
    global _score_chain
    if _score_chain is None:
        llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
        _score_chain = ScoreStringEvalChain.from_llm(llm, criteria="relevance")
    return _score_chain


async def score_answer(prompt: str, answer: str) -> float:
    try:
        chain = get_score_chain()
        result = await chain.aevaluate_strings(prediction=answer, input=prompt)
        return float(result.get("score", 0)) / 10.0
    except Exception:
        return 0.0


def combine_confidences(rag_score: float, llm_score: float, eval_score: float) -> tuple[float, str]:
    final = (rag_score + llm_score + eval_score) / 3.0
    if final >= 0.8:
        label = "élevée"
    elif final >= 0.6:
        label = "moyenne"
    else:
        label = "faible"
    return final, label
