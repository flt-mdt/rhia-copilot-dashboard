from typing import Dict, Any
from app.services.rag_retriever import retrieve_chunks
from app.telemetry.logging import logger

class RagRetriever:
    async def __call__(self, state: Dict[str, Any]) -> Dict[str, Any]:
        try:
            section_id = state["current_section"]
            brief_data = state["brief_data"]
            user_preferences = state["user_preferences"]

            job_function = brief_data.get("job_function", "").strip()
            seniority = user_preferences.seniority.strip()
            language = user_preferences.language.strip()

            if not job_function:
                raise ValueError("Champ 'job_function' manquant dans brief_data")

            chunks = await retrieve_chunks(
                section=section_id,
                job_function=job_function,
                seniority=seniority,
                language=language
            )

            context = "\n\n".join([chunk["text"] for chunk in chunks if "text" in chunk])

            return {
                **state,
                "rag_context": context,
                "rag_chunks": chunks,
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
