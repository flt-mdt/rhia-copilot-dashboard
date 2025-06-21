import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
import uvicorn
import logging
import structlog

from app.api.v1.router import router_v1
from app.core.settings import get_settings

settings = get_settings()

def create_app() -> FastAPI:
    app = FastAPI(
        title="Job Brief Builder API",
        version="1.0.0",
        docs_url="/docs",
        redoc_url=None,
        openapi_url="/openapi.json"
    )

    # === Middleware sécurité ===
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["https://preview--rhia-copilot.lovable.app, https://dashboard.rekrut.pro"],  # CORS fermé
        allow_credentials=True,
        allow_methods=["POST", "GET"],
        allow_headers=["Authorization", "Content-Type"],
    )

    # === Observabilité ===
    FastAPIInstrumentor.instrument_app(app)

    # === Logging structuré ===
    structlog.configure(
        processors=[
            structlog.processors.add_log_level,
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.dict_tracebacks,
            structlog.processors.JSONRenderer()
        ]
    )
    logging.basicConfig(level=logging.INFO)

    # === Routes ===
    app.include_router(router_v1, prefix="/v1")

    return app


app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # ← CORRECTION ICI
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)
