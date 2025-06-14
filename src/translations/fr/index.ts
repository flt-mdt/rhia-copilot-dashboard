import { subscriptionTranslations } from './subscription';
import { authTranslations } from './auth';
import { commonTranslations } from './common';

// À terme importer tous les modules thématiques ici : dashboard, candidates, jobs, etc.
export const frTranslations = {
  subscription: subscriptionTranslations,
  login: authTranslations,
  // dashboard: dashboardTranslations,
  // ... pareil pour les autres modules (une ligne par fichier thématique)
  common: commonTranslations,
};
