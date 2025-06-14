
import { dashboardTranslations } from './dashboard';
import { candidatesTranslations } from './candidates';
import { candidateProfileTranslations } from './candidateProfile';
import { jobsTranslations } from './jobs';
import { jobDetailTranslations } from './jobDetail';
import { settingsTranslations } from './settings';
import { authTranslations } from './auth';
import { hunterTranslations } from './hunter';
import { briefTranslations } from './brief';
import { commonTranslations } from './common';
import { subscriptionTranslations } from './subscription';

export const frTranslations = {
  dashboard: dashboardTranslations,
  candidates: candidatesTranslations,
  candidateProfile: candidateProfileTranslations,
  jobs: jobsTranslations,
  jobDetail: jobDetailTranslations,
  settings: settingsTranslations,
  login: authTranslations,
  hunter: hunterTranslations,
  brief: briefTranslations,
  subscription: subscriptionTranslations,
  success: commonTranslations.success,
  common: {
    loading: commonTranslations.loading,
    back: commonTranslations.back,
    save: commonTranslations.save,
    saving: commonTranslations.saving,
    cancel: commonTranslations.cancel,
    creating: commonTranslations.creating,
    deleting: commonTranslations.deleting,
  }
};
