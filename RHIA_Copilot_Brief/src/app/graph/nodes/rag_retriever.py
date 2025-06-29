from typing import Any

from app.core.constants import THRESHOLD_RAG_SIMILARITY
from app.services.confidence_scoring import (
    compute_rag_score,
    rerank_chunks,
)
from app.services.rag_retriever import retrieve_chunks
from app.telemetry.logging import logger


class RagRetriever:
    async def __call__(self, state: dict[str, Any]) -> dict[str, Any]:
        try:
            section_id = state["current_section"]
            brief_data = state["brief_data"]
            user_preferences = state["user_preferences"]

            # brief_data est maintenant structuré comme {section_slug: {job_function: "..."}}
            section_data = brief_data.get(section_id, {})
            job_function = section_data.get("job_function", "").strip()
            seniority = user_preferences.get("seniority", "").strip()
            language = user_preferences.get("language", "").strip()

            if not job_function:
                raise ValueError(f"Champ 'job_function' manquant dans brief_data[{section_id}]")

            chunks = await retrieve_chunks(
                section=section_id,
                job_function=job_function,
                seniority=seniority,
                language=language,
            )

            query = f"{section_id} {job_function} {seniority} {language}".strip()
            reranked = rerank_chunks(query, chunks)
            filtered = [c for c in reranked if c.get("score", 0.0) >= THRESHOLD_RAG_SIMILARITY]
            context = "\n\n".join([chunk.get("text", "") for chunk in filtered])
            rag_score = compute_rag_score(filtered)

            return {
                **state,
                "rag_context": context,
                "rag_chunks": filtered,
                "rag_confidence": rag_score,
            }

        except Exception as e:
            logger.warning("RagRetriever failed: %s", e)
            return {
                **state,
                "rag_context": "",
                "rag_chunks": [],
                "rag_confidence": 0.0,
                "rag_error": str(e),
            }
