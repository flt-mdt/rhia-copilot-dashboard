from typing import Dict, Any, List


def format_user_data(section_id: str, data: Dict[str, Any]) -> str:
    """Return a readable string from raw user data for a section."""
    if not data:
        return ""

    templates = {
        "titre_job_family": (
            "Nous recherchons un {job_title} issu de la famille de m\u00e9tier {job_family} "
            "qui sera rattache\u0301 au {reporting_to} au sein du d\u00e9partement {department}."
        ),
        "contexte": (
            "Contexte business : {business_context}. Importance : {strategic_importance}. "
            "Urgence : {urgency}."
        ),
        "finalite_mission": (
            "Mission principale : {main_purpose}. Contribution cl\u00e9 : {key_contribution}."
        ),
        "objectifs_kpis": (
            "Objectifs : {objectives}. Indicateurs : {success_metrics}. Evaluation sous {performance_timeline}."
        ),
        "responsabilites_cles": (
            "T\u00e2ches quotidiennes : {daily_tasks}. Hebdo : {weekly_tasks}. Projets sp\u00e9ciaux : {special_projects}."
        ),
        "competences_exigences": (
            "Comp\u00e9tences techniques : {hard_skills}. Comp\u00e9tences comportementales : {soft_skills}. Langues : {languages}."
        ),
        "perimetre_budgetaire": "P\u00e9rim\u00e8tre budg\u00e9taire et manag\u00e9rial : {content}",
        "environnement_contraintes": "Environnement et contraintes : {content}",
        "qualifications_experiences": "Qualifications et exp\u00e9riences : {content}",
        "employee_value_proposition": "Proposition de valeur employ\u00e9 : {content}",
        "perspectives_evolution": "Perspectives d\u2019\u00e9volution : {content}",
        "remuneration_avantages": "R\u00e9mun\u00e9ration et avantages : {content}",
        "cadre_contractuel": "Cadre contractuel : {content}",
        "performance_cadence": "Mesure de la performance et cadence : {content}",
        "parties_prenantes_raci": "Parties prenantes & RACI : {content}",
        "inclusion_conformite": "Inclusion, conformit\u00e9 et s\u00e9curit\u00e9 : {content}",
        "onboarding_developpement": "Onboarding et d\u00e9veloppement : {content}",
        "processus_recrutement": "Processus de recrutement : {content}",
    }

    template = templates.get(section_id)
    if template:
        try:
            return template.format(**data)
        except Exception:
            pass

    return "; ".join(f"{k}: {v}" for k, v in data.items())

def build_prompt(
    section_id: str,
    rag_context: str | None = None,
    brief_data: Dict[str, Any] | None = None,
    user_preferences: Dict[str, Any] | None = None,
    rag_chunks: List[Dict[str, Any]] | None = None,
) -> str:
    """
    Construit un prompt structuré pour le LLM à partir des données utilisateur + contexte RAG.
    """
    brief_data = brief_data or {}
    user_preferences = user_preferences or {}

    if rag_chunks is not None:
        formatted_chunks = []
        for chunk in rag_chunks:
            text = chunk.get("text", "")
            metadata = chunk.get("metadata", {})
            meta_str = ", ".join(f"{k}: {v}" for k, v in metadata.items() if k != "text")
            if meta_str:
                formatted_chunks.append(f"{text}\n[{meta_str}]")
            else:
                formatted_chunks.append(text)
        rag_context = "\n\n".join(formatted_chunks)
    else:
        rag_context = rag_context or ""

    seniority = user_preferences.get("seniority", "Senior")
    tone = {
        "Stagiaire": "simple et accessible",
        "Junior": "professionnel et pédagogique",
        "Senior": "synthétique et orienté résultats",
        "C-level": "stratégique et orienté business"
    }.get(seniority, "professionnel")

    user_data = brief_data.get(section_id, {})
    user_data_str = format_user_data(section_id, user_data)

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
- Données utilisateur : {user_data_str}
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
    user_data_str = format_user_data(section_id, user_data)

    return f"""
Tu es un assistant RH expert chargé de reformuler une section de brief de poste.

## SECTION À REFORMULER : {section_id}
{previous_output}

## FEEDBACK UTILISATEUR
{user_feedback}

## CONTEXTE UTILISATEUR
- Niveau : {seniority}
- Données supplémentaires : {user_data_str}

## CONSIGNES
- Reformule uniquement cette section
- Style : {tone}
- Réécris dans un format Markdown propre
- Ne jamais sortir du périmètre de la section
- Réponds uniquement par le texte de cette section

Commence la reformulation maintenant.
""".strip()
