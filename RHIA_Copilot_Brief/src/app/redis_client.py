import redis.asyncio as redis
import json
from typing import Any
import os

r = redis.Redis(
    host=os.getenv("REDIS_HOST"),
    port=int(os.getenv("REDIS_PORT")),
    password=os.getenv("REDIS_PASSWORD"),
    decode_responses=True
)


async def set_session_data(session_id: str, key: str, value: Any):
    redis_key = f"brief:{session_id}:{key}"
    await r.set(redis_key, json.dumps(value))

async def get_session_data(session_id: str, key: str) -> Any:
    redis_key = f"brief:{session_id}:{key}"
    data = await r.get(redis_key)
    return json.loads(data) if data else None
