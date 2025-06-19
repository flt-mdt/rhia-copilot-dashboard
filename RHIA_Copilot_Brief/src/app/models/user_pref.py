from pydantic import BaseModel, Field, validator
from typing import List, Literal
from app.core.constants import SECTION_IDS, LANGUAGES, SENIORITY_LEVELS


class UserPreferences(BaseModel):
    sections: List[bool] = Field(..., min_items=18, max_items=18)
    language: Literal["fr", "en"] = "fr"
    seniority: Literal["Stagiaire", "Junior", "Senior", "C-level"]

    @validator("sections")
    def validate_sections_length(cls, v):
        if len(v) != len(SECTION_IDS):
            raise ValueError("La liste des sections doit contenir exactement 18 éléments.")
        return v
 
