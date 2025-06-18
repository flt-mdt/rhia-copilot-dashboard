#!/bin/bash

set -e  # Exit on error

echo "🔍 Lint Python (ruff + mypy)"
ruff check src/ tests/
mypy src/ --strict

echo "🔐 Vérification sécurité (bandit + semgrep)"
bandit -r src/ -ll
semgrep scan --config auto

echo "🎨 Formatage code (black)"
black src/ tests/

echo "🧪 Tests + couverture"
pytest --cov=src --cov-fail-under=95

echo "✅ Pré-commit terminé avec succès."
 
