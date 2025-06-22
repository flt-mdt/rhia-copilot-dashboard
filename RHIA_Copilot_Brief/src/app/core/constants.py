 
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
