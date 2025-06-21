from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from typing import List
import jwt

from app.core.settings import get_settings

settings = get_settings()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")  # à adapter si reverse proxy

ALGORITHM = "HS256"  # symétrique pour simplifier ici
JWT_SECRET_KEY = settings.JWT_SECRET_KEY


class UserIdentity:
    def __init__(self, sub: str, roles: List[str]):
        self.sub = sub
        self.roles = roles

    def has_role(self, required: str) -> bool:
        return required in self.roles


async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserIdentity:
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        return UserIdentity(sub=payload["sub"], roles=payload.get("roles", []))
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Token invalide ou expiré.")


def require_role(role: str):
    async def verifier(user: UserIdentity = Depends(get_current_user)):
        if not user.has_role(role):
            raise HTTPException(status_code=403, detail=f"Accès interdit : rôle '{role}' requis.")
        return user
    return verifier
