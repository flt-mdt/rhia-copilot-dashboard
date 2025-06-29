 
from typing import Final

# 18 sections canoniques dans l’ordre contractuel
SECTION_IDS: Final[list[str]] = [
    "Titre & Job Family",
    "Contexte & Business Case",
    "Finalité/Mission",
    "Objectifs & KPIs",
    "Responsabilités clés",
    "Périmètre budgétaire & managérial",
    "Environnement & contraintes",
    "Compétences & exigences",
    "Qualifications & expériences",
    "Employee Value Proposition",
    "Perspectives d’évolution",
    "Rémunération & avantages",
    "Cadre contractuel",
    "Mesure de la performance & cadence",
    "Parties prenantes & RACI",
    "Inclusion, conformité & sécurité",
    "Onboarding & développement",
    "Processus de recrutement"
]

# Correspondance entre libellés visibles et identifiants techniques
SECTION_LABELS_TO_SLUGS: Final[dict[str, str]] = {
    "Titre & Job Family": "titre_job_family",
    "Contexte & Business Case": "contexte",
    "Finalité/Mission": "finalite_mission",
    "Objectifs & KPIs": "objectifs_kpis",
    "Responsabilités clés": "responsabilites_cles",
    "Périmètre budgétaire & managérial": "perimetre_budgetaire",
    "Environnement & contraintes": "environnement_contraintes",
    "Compétences & exigences": "competences_exigences",
    "Qualifications & expériences": "qualifications_experiences",
    "Employee Value Proposition": "employee_value_proposition",
    "Perspectives d’évolution": "perspectives_evolution",
    "Rémunération & avantages": "remuneration_avantages",
    "Cadre contractuel": "cadre_contractuel",
    "Mesure de la performance & cadence": "performance_cadence",
    "Parties prenantes & RACI": "parties_prenantes_raci",
    "Inclusion, conformité & sécurité": "inclusion_conformite",
    "Onboarding & développement": "onboarding_developpement",
    "Processus de recrutement": "processus_recrutement",
}

# Mapping inverse pour retrouver le libellé à partir de l'identifiant technique
SECTION_SLUGS_TO_LABELS: Final[dict[str, str]] = {
    slug: label for label, slug in SECTION_LABELS_TO_SLUGS.items()
}

# Langues supportées
LANGUAGES: Final[list[str]] = ["fr", "en"]

# Niveaux de séniorité disponibles
SENIORITY_LEVELS: Final[list[str]] = [
    "Stagiaire", "Junior", "Senior", "C-level"
]

# Qdrant collections
QDRANT_COLLECTION_BRIEF: Final[str] = "brief"
QDRANT_COLLECTION_RULES: Final[str] = "rules"

# Seuils critiques (ReAct / RAG / Validation)
THRESHOLD_MAPPING: Final[float] = 0.85
THRESHOLD_RAG_SIMILARITY: Final[float] = 0.83
THRESHOLD_CONFIDENCE_LLM: Final[float] = 0.85
MIN_SKILLS_REQUIRED: Final[int] = 3

# Nombre maximum de tentatives de génération avant d'arrêter les boucles
MAX_GRAPH_RETRIES: Final[int] = 3
