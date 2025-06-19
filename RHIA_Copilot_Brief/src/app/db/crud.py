from sqlmodel import Session, select
from app.db.models import Brief, Feedback


def create_brief(db: Session, brief: Brief) -> Brief:
    db.add(brief)
    db.commit()
    db.refresh(brief)
    return brief


def get_brief_by_id(db: Session, brief_id: str) -> Brief | None:
    return db.exec(select(Brief).where(Brief.id == brief_id)).first()


def save_feedback(db: Session, feedback: Feedback) -> Feedback:
    db.add(feedback)
    db.commit()
    db.refresh(feedback)
    return feedback
 
