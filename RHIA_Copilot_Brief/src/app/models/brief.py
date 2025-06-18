from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any
from datetime import datetime
from app.core.constants import SECTION_IDS


class UserPreferences(BaseModel):
    sections: List[bool] = Field(..., min_items=18, max_items=18)
    language: str = "fr"
    seniority: str


class BriefSection(BaseModel):
    section_id: str  # ex: "Objectifs & KPIs"
    markdown: str
    status: str = "draft"  # draft | approved | revised
    feedbacks: Optional[List[str]] = []


class BriefData(BaseModel):
    """
    Structure dynamique où chaque clé = section_id.
    La valeur est un dict libre selon les champs de formulaire.
    """
    __root__: Dict[str, Dict[str, Any]]


class Brief(BaseModel):
    id: str
    owner: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "in_progress"  # in_progress | validated
    user_preferences: UserPreferences
    brief_data: BriefData
    sections: List[BriefSection] = []

