from openai import AsyncOpenAI
from app.core.settings import get_settings

settings = get_settings()

client = AsyncOpenAI(
    api_key=settings.openai_api_key,
    timeout=settings.llm_timeout
)

async def call_llm(prompt: str) -> dict:
    """
    Envoie un prompt au LLM (OpenAI) et renvoie la réponse + estimation de confiance.
    """
    try:
        response = await client.chat.completions.create(
            model=settings.openai_model,
            messages=[
                {"role": "system", "content": "Tu es un expert RH chargé de rédiger des briefs de poste précis, inclusifs et adaptés au niveau de séniorité."},
                {"role": "user", "content": prompt}
            ],
            temperature=settings.temperature,
            max_tokens=800
        )

        output = response.choices[0].message.content.strip()

        # Heuristique simple : si contenu incomplet, baisse de confiance
        confidence = 0.95 if "(à compléter)" not in output else 0.75

        return {"output": output, "confidence": confidence}

    except Exception as e:
        raise RuntimeError(f"[LLM error] {str(e)}")
