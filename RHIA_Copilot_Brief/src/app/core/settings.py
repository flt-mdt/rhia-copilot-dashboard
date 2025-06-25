from pydantic_settings import BaseSettings
from pydantic import Field, validator
from functools import lru_cache
from typing import Literal
import logging
logging.basicConfig(level=logging.DEBUG)



class AppSettings(BaseSettings):
    # ENV
    environment: Literal["dev", "test", "prod"] = "dev"
    production_guard: bool = False

    # API & Orchestration
    openai_api_key: str = Field(..., alias="OPENAI_API_KEY")
    openai_model: str = "gpt-4"
    temperature: float = 0.7
    llm_timeout: int = 20

    # Qdrant
    qdrant_host: str = "qdrant"
    qdrant_port: int = 6333
    qdrant_collection_brief: str = "brief"
    qdrant_collection_rules: str = "rules"

    # Redis
    redis_host: str = "redis"
    redis_port: int = 6379

    # Database
    supabase_url: str = Field(..., alias="SUPABASE_URL")

    # Security
    cors_origins: list[str] = []
    enable_rbac: bool = True
    JWT_SECRET_KEY: str = Field(..., alias="JWT_SECRET_KEY")

    # Tracing / Logs
    enable_otlp: bool = True
    log_format: Literal["json", "plain"] = "json"

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": True
    }

    @validator("temperature")
    def validate_temperature(cls, v):
        if not 0 <= v <= 1:
            raise ValueError("temperature must be between 0 and 1")
        return v


@lru_cache()
def get_settings() -> AppSettings:
    return AppSettings()
