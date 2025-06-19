from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class Brief(SQLModel, table=True):
    id: str = Field(primary_key=True)
    owner: str
    status: str = "validated"
    markdown: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Feedback(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    session_id: str
    section_id: str
    user_feedback: str
    raw_response: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
