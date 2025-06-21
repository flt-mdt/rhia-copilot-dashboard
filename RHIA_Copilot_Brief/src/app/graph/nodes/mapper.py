from difflib import SequenceMatcher
from typing import Optional, Tuple
from app.core.constants import SECTION_IDS

from typing import Literal


class SectionMapper:
    """
    Sert à convertir les `section_id` internes en libellés explicites,
    adaptés au contexte de génération (en particulier RAG et prompts LLM).
    Support multilingue (fr/en) inclus.

    Exemple :
        "kpis" -> "Objectifs & KPIs" (fr)
        "kpis" -> "Objectives & KPIs" (en)
    """

    SUPPORTED_LANGUAGES = ("fr", "en")

    _LABELS_FR = {
        "title": "Titre & Job Family",
        "context": "Contexte & Business Case",
        "mission": "Finalité / Mission",
        "kpis": "Objectifs & KPIs",
        "responsibilities": "Responsabilités clés",
        "budget_scope": "Périmètre budgétaire & managérial",
        "environment": "Environnement & contraintes",
        "skills": "Compétences & exigences",
        "qualifications": "Qualifications & expériences",
        "evp": "Employee Value Proposition",
        "career": "Perspectives d’évolution",
        "compensation": "Rémunération & avantages",
        "contract": "Cadre contractuel",
        "performance": "Mesure de la performance & cadence",
        "stakeholders": "Parties prenantes & RACI",
        "inclusion": "Inclusion, conformité & sécurité",
        "onboarding": "Onboarding & développement",
        "recruitment": "Processus de recrutement",
    }

    _LABELS_EN = {
        "title": "Title & Job Family",
        "context": "Context & Business Case",
        "mission": "Purpose / Mission",
        "kpis": "Objectives & KPIs",
        "responsibilities": "Key Responsibilities",
        "budget_scope": "Budget & Managerial Scope",
        "environment": "Work Environment & Constraints",
        "skills": "Skills & Requirements",
        "qualifications": "Qualifications & Experience",
        "evp": "Employee Value Proposition",
        "career": "Career Growth & Mobility",
        "compensation": "Compensation & Benefits",
        "contract": "Contractual Framework",
        "performance": "Performance & Rhythm",
        "stakeholders": "Stakeholders & RACI",
        "inclusion": "Inclusion, Compliance & Safety",
        "onboarding": "Onboarding & Development",
        "recruitment": "Recruitment Process",
    }

    def __init__(self, language: Literal["fr", "en"] = "fr"):
        if language not in self.SUPPORTED_LANGUAGES:
            raise ValueError(f"Langue non supportée : {language}")
        self.language = language

    def map(self, section_id: str) -> str:
        """
        Renvoie le libellé explicite d'une section à partir de son identifiant technique.
        """
        labels = self._LABELS_FR if self.language == "fr" else self._LABELS_EN
        return labels.get(section_id, section_id.replace("_", " ").capitalize())
    
    def __call__(self, state: dict) -> dict:
        section_id = state.get("current_section")
        section_name = SECTION_IDS[section_id]
        return {**state, "section_id": section_name}


# Aliases connus pour chaque section
SECTION_ALIASES = {
    "Compétences & exigences": ["profil", "compétences", "exigences"],
    "Objectifs & KPIs": ["objectifs", "indicateurs", "résultats attendus"],
    # ... ajouter les 18 ici
}

def fuzzy_match(input_label: str) -> Tuple[Optional[str], float]:
    input_label = input_label.strip().lower()
    best_match = None
    best_score = 0.0

    for canon, aliases in SECTION_ALIASES.items():
        for alias in aliases:
            score = SequenceMatcher(None, input_label, alias.lower()).ratio()
            if score > best_score:
                best_score = score
                best_match = canon

    return (best_match, best_score) if best_score >= 0.85 else (None, best_score)

def map_section(raw_section: str) -> Optional[str]:
    match, _ = fuzzy_match(raw_section)
    return match
