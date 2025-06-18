from difflib import SequenceMatcher
from typing import Optional, Tuple
from app.core.constants import SECTION_IDS

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
