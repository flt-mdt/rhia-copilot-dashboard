from fastapi import APIRouter
from app.models.section import SectionApproval
from app.redis_client import get_session_data, set_session_data
from app.core.constants import SECTION_SLUGS_TO_LABELS

router = APIRouter()

@router.post("/approval")
async def store_section_approval(payload: SectionApproval):
    approvals = await get_session_data(payload.session_id, "approvals") or {}
    section_name = SECTION_SLUGS_TO_LABELS.get(payload.section_id, payload.section_id)
    approvals[section_name] = {
        "markdown": payload.markdown,
        "status": payload.status,
    }
    await set_session_data(payload.session_id, "approvals", approvals)
    return {"status": "ok"}
