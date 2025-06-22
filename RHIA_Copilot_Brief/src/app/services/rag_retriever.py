from sentence_transformers import SentenceTransformer
from qdrant_client.models import Filter, FieldCondition, MatchValue, SearchParams
from app.services.qdrant_client import get_qdrant_client
from app.core.constants import QDRANT_COLLECTION_BRIEF

qdrant = get_qdrant_client()

def get_embedder():
    if not hasattr(get_embedder, "_model"):
        get_embedder._model = SentenceTransformer("all-MiniLM-L6-v2")
    return get_embedder._model

def retrieve_chunks(section: str, job_function: str, seniority: str, language: str) -> list[dict]:
    """
    Interroge Qdrant pour retrouver les meilleurs chunks contextuels selon
    la section, le rôle, la séniorité et la langue.
    """
    query = f"{section} pour un rôle de {job_function} niveau {seniority}"
    embedder = get_embedder()
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

    return [{"text": r.payload.get("text"), "score": r.score, "metadata": r.payload} for r in results]
