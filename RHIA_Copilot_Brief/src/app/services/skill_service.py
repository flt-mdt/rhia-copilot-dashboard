from typing import List, Dict, Any
from app.graph.nodes.rag_retriever import retrieve_chunks

DEFAULT_HARD_SKILLS = {
    "Product Manager": ["Gestion de backlog", "UX/UI", "Méthodologies Agile"],
    "Data Analyst": ["SQL", "Python", "Power BI"]
}

DEFAULT_SOFT_SKILLS = {
    "Product Manager": ["Leadership", "Communication", "Empathie"],
    "Data Analyst": ["Rigueur", "Esprit critique", "Autonomie"]
}


class SkillService:
    @staticmethod
    async def get_skills(
        job_function: str,
        seniority: str,
        language: str = "fr"
    ) -> Dict[str, Any]:
        """
        Retourne les hard/soft skills associés à un poste.
        Privilégie les chunks RAG, fallback sur référentiel statique.
        """
        query = f"compétences clés pour un poste de {job_function} niveau {seniority}"
        chunks = await retrieve_chunks(query=query, top_k=5, filters={"section": "Compétences"})

        for chunk in chunks:
            text = chunk["text"]
            if "soft skills" in text.lower() or "compétences comportementales" in text:
                hard = extract_skills(text, type="hard")
                soft = extract_skills(text, type="soft")
                return {
                    "hard_skills": hard,
                    "soft_skills": soft,
                    "source": "RAG",
                    "confidence": chunk.get("score", 0.75)
                }

        # Fallback
        return {
            "hard_skills": DEFAULT_HARD_SKILLS.get(job_function, []),
            "soft_skills": DEFAULT_SOFT_SKILLS.get(job_function, []),
            "source": "fallback",
            "confidence": 0.5
        }


def extract_skills(text: str, type: str) -> List[str]:
    """
    Parse le chunk texte et extrait une liste de compétences.
    Simplifié (à améliorer avec NLP ou regex si besoin).
    """
    lines = text.splitlines()
    skills = []
    for line in lines:
        if type == "hard" and ("hard" in line.lower() or "technique" in line.lower()):
            skills += [s.strip("•- ") for s in line.split(",")]
        if type == "soft" and ("soft" in line.lower() or "comportementales" in line.lower()):
            skills += [s.strip("•- ") for s in line.split(",")]
    return [s for s in skills if len(s) > 2]
 
