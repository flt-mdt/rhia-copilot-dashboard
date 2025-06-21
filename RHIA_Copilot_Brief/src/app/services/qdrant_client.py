import os
from qdrant_client import QdrantClient

def get_qdrant_client() -> QdrantClient:
    qdrant_host = os.getenv("QDRANT_HOST", "http://qdrant:6333")
    qdrant_api_key = os.getenv("QDRANT_API_KEY", "")

    if qdrant_api_key:
        return QdrantClient(url=qdrant_host, api_key=qdrant_api_key)
    else:
        # Connexion locale sans authentification
        return QdrantClient(host=qdrant_host.replace("http://", "").replace("https://", ""))