import os
import uuid
import json
import argparse
from typing import List, Dict
from qdrant_client import QdrantClient
from qdrant_client.http.models import PointStruct, VectorParams, Distance
from app.core.settings import AppSettings
from sentence_transformers import SentenceTransformer

# Initialise le modèle d'embedding localement
_embedder = SentenceTransformer("all-MiniLM-L6-v2")

def embed_text(text: str) -> list[float]:
    """
    Encode un paragraphe en vecteur dense avec SentenceTransformer.
    """
    return _embedder.encode(text).tolist()

# Config collections
COLLECTIONS = ["briefs", "rules"]
VECTOR_DIM = 768  # ou 1536 selon ton modèle (OpenAI, MiniLM...)

# Simule un chunkage naïf par paragraphes
def chunk_text(raw_text: str) -> List[str]:
    return [p.strip() for p in raw_text.split("\n\n") if len(p.strip()) > 30]

# Charge un fichier JSONL où chaque ligne est un doc avec metadata + content
def load_documents(filepath: str) -> List[Dict]:
    with open(filepath, encoding="utf-8") as f:
        return [json.loads(line) for line in f]

def prepare_points(documents: List[Dict], collection_name: str) -> List[PointStruct]:
    points = []

    for doc in documents:
        metadata = doc.get("metadata", {})
        chunks = chunk_text(doc["text"])

        for chunk in chunks:
            vector = embed_text(chunk)  # dépend de ton backend
            point = PointStruct(
                id=str(uuid.uuid4()),
                vector=vector,
                payload={
                    "text": chunk,
                    **metadata,
                    "type": collection_name
                }
            )
            points.append(point)

    return points

def seed_collection(
    qdrant: QdrantClient,
    collection_name: str,
    file_path: str,
    dry_run: bool = False
):
    print(f"\n⏳ Collection: {collection_name} — fichier: {file_path}")

    # Create collection if needed
    if collection_name not in qdrant.get_collections().collections:
        qdrant.recreate_collection(
            collection_name=collection_name,
            vectors_config=VectorParams(size=VECTOR_DIM, distance=Distance.COSINE),
        )
        print(f"✅ Collection créée : {collection_name}")

    documents = load_documents(file_path)
    points = prepare_points(documents, collection_name)

    if dry_run:
        print(f"🧪 Dry-run : {len(points)} points prêts à l'injection.")
    else:
        qdrant.upsert(collection_name=collection_name, points=points)
        print(f"🚀 {len(points)} points injectés dans {collection_name}.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Seed Qdrant avec briefs & rules.")
    parser.add_argument("--briefs", type=str, help="Chemin vers fichier briefs.jsonl", required=True)
    parser.add_argument("--rules", type=str, help="Chemin vers fichier rules.jsonl", required=True)
    parser.add_argument("--dry-run", action="store_true", help="Ne pas injecter, juste afficher.")

    args = parser.parse_args()

    qdrant = QdrantClient(host=AppSettings.qdrant_host, port=AppSettings.qdrant_port)

    seed_collection(qdrant, "briefs", args.briefs, dry_run=args.dry_run)
    seed_collection(qdrant, "rules", args.rules, dry_run=args.dry_run)
 
