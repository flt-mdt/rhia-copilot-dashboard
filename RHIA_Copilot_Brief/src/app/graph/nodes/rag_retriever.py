from qdrant_client import QdrantClient
from qdrant_client.models import Filter, FieldCondition, MatchValue, SearchParams
from sentence_transformers import SentenceTransformer
from app.core.constants import QDRANT_COLLECTION_BRIEF

qdrant = QdrantClient(host="qdrant", port=6333)
embedder = SentenceTransformer("all-MiniLM-L6-v2")

async def query_chunks(section: str, job_function: str, seniority: str, language: str) -> list[dict]:
    query = f"{section} pour un rôle de {job_function} niveau {seniority}"
    vector = embedder.encode(query).tolist()

    filters = Filter(
        must=[
            FieldCondition(key="type", match=MatchValue(value="brief")),
            FieldCondition(key="section", match=MatchValue(value=section)),
            FieldCondition(key="job_function", match=MatchValue(value=job_function)),
            FieldCondition(key="seniority_level", match=MatchValue(value=seniority)),
            FieldCondition(key="language", match=MatchValue(value=language))
        ]
    )

    results = qdrant.search(
        collection_name=QDRANT_COLLECTION_BRIEF,
        query_vector=vector,
        query_filter=filters,
        limit=6,
        search_params=SearchParams(hnsw_ef=64)
    )

    return [{"text": r.payload.get("text"), "metadata": r.payload} for r in results]
