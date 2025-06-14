import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { translations, Language } from '@/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>((localStorage.getItem('language') as Language) || 'fr');
  const { user } = useAuth();

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    const fetchUserLanguage = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('language')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user language:', error);
        }

        if (data?.language) {
          // Validate that the language from database is a valid Language type
          const validLanguages: Language[] = ['en', 'fr', 'es'];
          if (validLanguages.includes(data.language as Language)) {
            setLanguage(data.language as Language);
          }
        }
      }
    };

    fetchUserLanguage();
  }, [user]);

  const setLanguageAndUpdate = async (lang: Language) => {
    setLanguage(lang);

    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({ language: lang })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating user language:', error);
      }
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Log warning for missing translation key
        if (process.env.NODE_ENV === 'development' || true) {
          // always log for now, to debug more easily
          // eslint-disable-next-line no-console
          console.warn(`Missing translation for key "${key}" in language "${language}"`);
        }
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguageAndUpdate, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export type { Language };
