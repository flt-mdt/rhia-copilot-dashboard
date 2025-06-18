from pydantic import BaseModel, Field
from typing import Optional, List


class DraftSectionRequest(BaseModel):
    session_id: str
    current_section: str  # ex: "Profil"
    user_preferences: dict  # temporaire (Pydantic model acceptable)
    brief_data: dict        # idem


class DraftSectionResponse(BaseModel):
    section_id: str
    markdown: str
    confidence: float
    fallback_needed: bool


class FeedbackRequest(BaseModel):
    session_id: str
    section_id: str
    previous_markdown: str
    user_feedback: str
    user_preferences: dict
    brief_data: dict


class FeedbackResponse(BaseModel):
    markdown: str
    confidence: float


class SectionApproval(BaseModel):
    session_id: str
    section_id: str
    markdown: str
    status: str = Field(default="approved")  # approved | rejected
 
