from pydantic import BaseSettings, Field, validator
from functools import lru_cache
from typing import Literal

class AppSettings(BaseSettings):
    # ENV
    environment: Literal["dev", "test", "prod"] = "dev"
    production_guard: bool = False

    # API & Orchestration
    openai_api_key: str = Field(..., env="OPENAI_API_KEY")
    openai_model: str = "gpt-4"
    temperature: float = 0.7
    llm_timeout: int = 20  # seconds

    # Qdrant
    qdrant_host: str = "qdrant"
    qdrant_port: int = 6333
    qdrant_collection_brief: str = "brief"
    qdrant_collection_rules: str = "rules"

    # Redis
    redis_host: str = "redis"
    redis_port: int = 6379

    # Security
    cors_origins: list[str] = []
    enable_rbac: bool = True

    # Tracing / Logs
    enable_otlp: bool = True
    log_format: Literal["json", "plain"] = "json"

    class Config:
        env_file = ".env"
        case_sensitive = True

    @validator("temperature")
    def validate_temperature(cls, v):
        if not 0 <= v <= 1:
            raise ValueError("temperature must be between 0 and 1")
        return v


@lru_cache()
def get_settings() -> AppSettings:
    return AppSettings()
 
