
import { dashboardTranslations } from './dashboard';
import { jobsTranslations } from './jobs';
import { jobDetailTranslations } from './jobDetail';
import { hunterTranslations } from './hunter';
import { settingsTranslations } from './settings';
import { subscriptionTranslations } from './subscription';
import { authTranslations } from './auth';
import { commonTranslations } from './common';
import { trackingTranslations } from './tracking';

// Tous les modules thématiques sont maintenant importés et exposés.
export const frTranslations = {
  dashboard: dashboardTranslations,
  jobs: jobsTranslations,
  jobDetail: jobDetailTranslations,
  hunter: hunterTranslations,
  settings: settingsTranslations,
  subscription: subscriptionTranslations,
  login: authTranslations,
  common: commonTranslations,
  tracking: trackingTranslations,
};
