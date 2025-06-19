from sqlmodel import create_engine, Session
from contextlib import contextmanager
from app.core.settings import get_settings

settings = get_settings()

DATABASE_URL = settings.supabase_url

engine = create_engine(DATABASE_URL, echo=(settings.environment == "dev"))


@contextmanager
def get_db():
    db = Session(engine)
    try:
        yield db
    finally:
        db.close()
 
