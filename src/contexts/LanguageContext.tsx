
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

export type Language = 'fr' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.candidates': 'Candidats',
    'nav.jobPostings': 'Offres d\'emploi',
    'nav.hunter': 'Hunter',
    'nav.brief': 'Brief',
    'nav.settings': 'Paramètres',
    
    // Settings
    'settings.title': 'Paramètres',
    'settings.language': 'Langue',
    'settings.language.description': 'Sélectionnez votre langue préférée',
    'settings.criteria.title': 'Pondération des critères d\'évaluation',
    'settings.criteria.description': 'Personnalisez l\'importance des différents critères utilisés pour évaluer les candidats',
    'settings.criteria.help': 'Ajustez l\'importance de chaque critère en cliquant sur les étoiles. Des notes plus élevées donneront plus de poids à ce critère dans le score global du candidat.',
    'settings.activity.title': 'Activité récente',
    'settings.activity.empty': 'Aucune activité récente',
    'settings.logout.title': 'Déconnexion',
    'settings.logout.description': 'Déconnectez-vous de votre compte RHIA Copilot',
    'settings.logout.button': 'Déconnexion',
    
    // Login
    'login.title': 'RHIA Copilot',
    'login.signin': 'Se connecter',
    'login.signup': 'S\'inscrire',
    'login.signin.title': 'Se connecter',
    'login.signin.description': 'Entrez vos identifiants pour accéder à votre compte',
    'login.signup.title': 'S\'inscrire',
    'login.signup.description': 'Créez votre compte RHIA Copilot',
    'login.email': 'Email',
    'login.password': 'Mot de passe',
    'login.name': 'Nom complet',
    'login.signin.button': 'Se connecter',
    'login.signup.button': 'S\'inscrire',
    'login.or': 'Ou continuer avec',
    'login.google': 'Google',
    'login.linkedin': 'LinkedIn',
    
    // Dashboard
    'dashboard.title': 'Tableau de bord',
    'dashboard.stats.newApplications': 'Nouvelles candidatures',
    'dashboard.stats.totalCandidates': 'Total candidats',
    'dashboard.stats.interviewStage': 'En entretien',
    'dashboard.stats.activeJobs': 'Postes actifs',
    
    // Common
    'common.loading': 'Chargement...',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    
    // Notifications
    'notifications.newCandidate': 'Nouveau candidat ajouté',
    'notifications.statusChange': 'Statut candidat modifié',
    'notifications.newJob': 'Nouvelle offre créée',
    
    // Success messages
    'success.languageUpdated': 'Langue mise à jour avec succès',
    'success.loginSuccess': 'Connexion réussie',
    'success.signupSuccess': 'Inscription réussie',
    'success.logoutSuccess': 'Déconnexion réussie'
  },
  es: {
    // Navigation
    'nav.dashboard': 'Panel de control',
    'nav.candidates': 'Candidatos',
    'nav.jobPostings': 'Ofertas de empleo',
    'nav.hunter': 'Hunter',
    'nav.brief': 'Brief',
    'nav.settings': 'Configuración',
    
    // Settings
    'settings.title': 'Configuración',
    'settings.language': 'Idioma',
    'settings.language.description': 'Selecciona tu idioma preferido',
    'settings.criteria.title': 'Ponderación de criterios de evaluación',
    'settings.criteria.description': 'Personaliza la importancia de los diferentes criterios utilizados para evaluar candidatos',
    'settings.criteria.help': 'Ajusta la importancia de cada criterio haciendo clic en las estrellas. Calificaciones más altas darán más peso a ese criterio en la puntuación general del candidato.',
    'settings.activity.title': 'Actividad reciente',
    'settings.activity.empty': 'No hay actividad reciente',
    'settings.logout.title': 'Cerrar sesión',
    'settings.logout.description': 'Cierra sesión de tu cuenta RHIA Copilot',
    'settings.logout.button': 'Cerrar sesión',
    
    // Login
    'login.title': 'RHIA Copilot',
    'login.signin': 'Iniciar sesión',
    'login.signup': 'Registrarse',
    'login.signin.title': 'Iniciar sesión',
    'login.signin.description': 'Ingresa tus credenciales para acceder a tu cuenta',
    'login.signup.title': 'Registrarse',
    'login.signup.description': 'Crea tu cuenta RHIA Copilot',
    'login.email': 'Correo electrónico',
    'login.password': 'Contraseña',
    'login.name': 'Nombre completo',
    'login.signin.button': 'Iniciar sesión',
    'login.signup.button': 'Registrarse',
    'login.or': 'O continuar con',
    'login.google': 'Google',
    'login.linkedin': 'LinkedIn',
    
    // Dashboard
    'dashboard.title': 'Panel de control',
    'dashboard.stats.newApplications': 'Nuevas candidaturas',
    'dashboard.stats.totalCandidates': 'Total candidatos',
    'dashboard.stats.interviewStage': 'En entrevista',
    'dashboard.stats.activeJobs': 'Puestos activos',
    
    // Common
    'common.loading': 'Cargando...',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    
    // Notifications
    'notifications.newCandidate': 'Nuevo candidato añadido',
    'notifications.statusChange': 'Estado de candidato modificado',
    'notifications.newJob': 'Nueva oferta creada',
    
    // Success messages
    'success.languageUpdated': 'Idioma actualizado exitosamente',
    'success.loginSuccess': 'Inicio de sesión exitoso',
    'success.signupSuccess': 'Registro exitoso',
    'success.logoutSuccess': 'Cierre de sesión exitoso'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('fr');
  const { user } = useAuth();

  useEffect(() => {
    const loadUserLanguage = async () => {
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('language')
          .eq('id', user.id)
          .single();
        
        if (profile?.language) {
          setLanguageState(profile.language as Language);
        }
      }
    };

    loadUserLanguage();
  }, [user]);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    
    if (user) {
      await supabase
        .from('profiles')
        .update({ language: lang })
        .eq('id', user.id);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
