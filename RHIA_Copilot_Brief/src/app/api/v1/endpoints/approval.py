from fastapi import APIRouter
from app.models.section import SectionApproval
from app.redis_client import get_session_data, set_session_data

router = APIRouter()

@router.post("/approval")
async def store_section_approval(payload: SectionApproval):
    approvals = await get_session_data(payload.session_id, "approvals") or {}
    approvals[payload.section_id] = {
        "markdown": payload.markdown,
        "status": payload.status,
    }
    await set_session_data(payload.session_id, "approvals", approvals)
    return {"status": "ok"}
