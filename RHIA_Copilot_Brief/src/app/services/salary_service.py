import re
from typing import Any

from app.core.constants import THRESHOLD_RAG_SIMILARITY
from app.graph.nodes.rag_retriever import retrieve_chunks


class SalaryService:
    """
    Service chargé d’estimer une fourchette salariale à partir du RAG,
    avec fallback vers des valeurs par défaut métier.
    """

    async def get_salary_range(
        self,
        job_function: str,
        seniority: str,
        contract_type: str,
        language: str = "fr"
    ) -> dict[str, Any]:
        chunks = await retrieve_chunks(
            section="Rémunération & avantages",
            job_function=job_function,
            seniority=seniority,
            language=language,
        )

        for chunk in chunks:
            score = chunk.get("score", 0.0)
            if score >= THRESHOLD_RAG_SIMILARITY:
                min_sal, max_sal = extract_salary_range(chunk["text"])
                if min_sal and max_sal:
                    return {
                        "min_salary": min_sal,
                        "max_salary": max_sal,
                        "currency": "EUR",
                        "source_used": "RAG",
                        "confidence": score
                    }

        # Fallback métier si aucun chunk fiable
        return {
            "min_salary": 32000,
            "max_salary": 40000,
            "currency": "EUR",
            "source_used": "default_range",
            "confidence": 0.5
        }


def extract_salary_range(text: str) -> tuple[int | None, int | None]:
    """
    Extraction naïve d'une fourchette 30-40k à partir d’un texte en langage naturel.
    """
    matches = re.findall(r"(\d{2})\s?k", text.lower())  # capture 30, 45, 60 etc.
    values = sorted([int(m) * 1000 for m in matches])
    if len(values) >= 2:
        return values[0], values[-1]
    elif len(values) == 1:
        return values[0], values[0] + 10000
    return None, None
