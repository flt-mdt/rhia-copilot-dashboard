
from typing import Dict, Any
from app.services.rag_retriever import retrieve_chunks
from app.telemetry.logging import logger
from app.core.constants import THRESHOLD_RAG_SIMILARITY

class RagRetriever:
    async def __call__(self, state: Dict[str, Any]) -> Dict[str, Any]:
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
                raise ValueError(
                    f"Champ 'job_function' manquant dans brief_data[{section_id}]"
                )

            chunks = await retrieve_chunks(
                section=section_id,
                job_function=job_function,
                seniority=seniority,
                language=language
            )

            filtered = [c for c in chunks if c.get("score", 0.0) >= THRESHOLD_RAG_SIMILARITY]
            context = "\n\n".join([chunk["text"] for chunk in filtered if "text" in chunk])

            return {
                **state,
                "rag_context": context,
                "rag_chunks": filtered,
                "rag_confidence": max((chunk.get("score", 0) for chunk in chunks), default=0)
            }

        except Exception as e:
            logger.warning("RagRetriever failed: %s", e)
            return {
                **state,
                "rag_context": "",
                "rag_chunks": [],
                "rag_confidence": 0.0,
                "rag_error": str(e)
            }
