
import { enTranslations } from './en';
import { frTranslations } from './fr';
import { esTranslations } from './es';

export const translations = {
  en: enTranslations,
  fr: frTranslations,
  es: esTranslations
};

export type Language = 'en' | 'fr' | 'es';
