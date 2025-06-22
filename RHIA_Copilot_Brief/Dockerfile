# Image de base optimisée pour Python
FROM python:3.12-slim

# Variables d’environnement
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Création d’un dossier de travail
WORKDIR /app

# Dépendances système utiles
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copie du projet
COPY . .

# Install dépendances
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Port exposé
EXPOSE 8000

# Commande de lancement
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

