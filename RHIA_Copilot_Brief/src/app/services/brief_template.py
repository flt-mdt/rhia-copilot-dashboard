from typing import Dict, List
from app.core.constants import SECTION_LABELS


SENIORITY_TONE = {
    "Stagiaire": "simple et pédagogique",
    "Junior": "encadrant mais autonome",
    "Senior": "précis, impactant",
    "C-level": "stratégique et synthétique"
}


def render_final_brief(
    validated_sections: Dict[int, str],
    sections_enabled: List[bool],
    seniority: str = "Senior",
    language: str = "fr"
) -> str:
    """
    Génère le brief final en Markdown à partir des sections validées.
    Les sections exclues sont commentées avec <!-- OMITTED -->
    """

    assert len(sections_enabled) == 18, "Le tableau sections_enabled doit contenir 18 booléens"

    tone = SENIORITY_TONE.get(seniority, "standard")
    md_output = [f"> **Style rédactionnel :** {tone}\n"]

    for idx, enabled in enumerate(sections_enabled):
        label = SECTION_LABELS[idx]

        if enabled and idx in validated_sections:
            md_output.append(f"## {label}\n\n{validated_sections[idx].strip()}\n")
        else:
            md_output.append(f"<!-- OMITTED : {label} -->\n")

    return "\n".join(md_output).strip()
