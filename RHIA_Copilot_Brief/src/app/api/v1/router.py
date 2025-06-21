from fastapi import APIRouter
from app.api.v1.endpoints import config, data, generate, feedback, brief

router_v1 = APIRouter()

router_v1.include_router(config.router, tags=["config"])
router_v1.include_router(data.router, tags=["data"])
router_v1.include_router(generate.router, tags=["generate"])
router_v1.include_router(feedback.router, tags=["feedback"])
router_v1.include_router(brief.router, tags=["brief"])