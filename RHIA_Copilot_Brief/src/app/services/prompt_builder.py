from typing import Dict, Any

def build_prompt(section_id: str, rag_context: str, brief_data: Dict[str, Any], user_preferences: Dict[str, Any]) -> str:
    """
    Construit un prompt structuré pour le LLM à partir des données utilisateur + contexte RAG.
    """
    seniority = user_preferences.get("seniority", "Senior")
    tone = {
        "Stagiaire": "simple et accessible",
        "Junior": "professionnel et pédagogique",
        "Senior": "synthétique et orienté résultats",
        "C-level": "stratégique et orienté business"
    }.get(seniority, "professionnel")

    user_data = brief_data.get(section_id, {})

    return f"""
Tu es un expert RH en charge de rédiger une seule section de brief de poste.
Respecte les bonnes pratiques RH : clarté, inclusivité, précision.

## CONTEXTE SEMANTIQUE (issu de documents similaires)
{rag_context}

## INSTRUCTIONS
- Section : {section_id}
- Langue : {user_preferences.get('language', 'fr')}
- Ton attendu : {tone}
- Niveau : {seniority}
- Données utilisateur : {user_data}
- Réponds uniquement par le texte de cette section

## CONTRAINTES
- Si une information est manquante, indique-la entre parenthèses : (à compléter)
- Ne génère aucune autre section
- Utilise un format strictement Markdown

Commence la rédaction maintenant.
""".strip()


def build_feedback_prompt(section_id: str, user_feedback: str, previous_output: str, brief_data: Dict[str, Any], user_preferences: Dict[str, Any]) -> str:
    """
    Construit un prompt pour reformuler une section en fonction du feedback utilisateur.
    """
    seniority = user_preferences.get("seniority", "Senior")
    tone = {
        "Stagiaire": "simple et pédagogique",
        "Junior": "pédagogique",
        "Senior": "précis et synthétique",
        "C-level": "stratégique"
    }.get(seniority, "professionnel")

    user_data = brief_data.get(section_id, {})

    return f"""
Tu es un assistant RH expert chargé de reformuler une section de brief de poste.

## SECTION À REFORMULER : {section_id}
{previous_output}

## FEEDBACK UTILISATEUR
{user_feedback}

## CONTEXTE UTILISATEUR
- Niveau : {seniority}
- Données supplémentaires : {user_data}

## CONSIGNES
- Reformule uniquement cette section
- Style : {tone}
- Réécris dans un format Markdown propre
- Ne jamais sortir du périmètre de la section
- Réponds uniquement par le texte de cette section

Commence la reformulation maintenant.
""".strip()
