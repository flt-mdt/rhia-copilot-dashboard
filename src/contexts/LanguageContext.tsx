
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

export type Language = 'en' | 'fr' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.candidates': 'Candidates',
    'nav.jobPostings': 'Job Postings',
    'nav.hunter': 'Hunter',
    'nav.brief': 'Brief',
    'nav.settings': 'Settings',
    
    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.language.description': 'Select your preferred language',
    'settings.criteria.title': 'Evaluation Criteria Weighting',
    'settings.criteria.description': 'Customize the importance of different criteria used to evaluate candidates',
    'settings.criteria.help': 'Adjust the importance of each criterion by clicking on the stars. Higher ratings will give more weight to that criterion in the candidate\'s overall score.',
    'settings.activity.title': 'Recent Activity',
    'settings.activity.empty': 'No recent activity',
    'settings.logout.title': 'Logout',
    'settings.logout.description': 'Logout from your RHIA Copilot account',
    'settings.logout.button': 'Logout',
    
    // Login
    'login.title': 'RHIA Copilot',
    'login.signin': 'Sign In',
    'login.signup': 'Sign Up',
    'login.signin.title': 'Sign In',
    'login.signin.description': 'Enter your credentials to access your account',
    'login.signup.title': 'Sign Up',
    'login.signup.description': 'Create your RHIA Copilot account',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.name': 'Full Name',
    'login.signin.button': 'Sign In',
    'login.signup.button': 'Sign Up',
    'login.or': 'Or continue with',
    'login.google': 'Google',
    'login.linkedin': 'LinkedIn',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.stats.newApplications': 'New Applications',
    'dashboard.stats.totalCandidates': 'Total Candidates',
    'dashboard.stats.interviewStage': 'Interview Stage',
    'dashboard.stats.activeJobs': 'Active Jobs',
    'dashboard.topCandidates': 'Top Candidates',
    'dashboard.activeJobs': 'Active Job Postings',
    'dashboard.viewAll': 'View all',
    'dashboard.noCandidates': 'No candidates available',
    'dashboard.noActiveJobs': 'No active job postings',
    
    // Hunter
    'hunter.title': 'Hunter',
    'hunter.subtitle': '🔍 Hunter – Find candidates on the web',
    'hunter.description': '✏️ Describe the job criteria',
    'hunter.placeholder': 'Ex: We are looking for a senior React developer, remote, speaking English...',
    'hunter.searchButton': 'Start hunting',
    'hunter.searching': 'Searching...',
    'hunter.advancedFilters': 'Advanced filters',
    'hunter.minMatching': 'Minimum matching',
    'hunter.location': 'Country / Location',
    'hunter.sortBy': 'Sort by',
    'hunter.score': 'Score',
    'hunter.date': 'Date',
    'hunter.popularity': 'Popularity',
    'hunter.resultsFound': 'We found {count} profile{s} closely matching your criteria.',
    'hunter.highMatching': ' The first {count} have a matching rate above 85%.',
    'hunter.noResults': 'No results',
    'hunter.noResultsDesc': 'No candidates match your search criteria. Try modifying your filters or broadening your search.',
    'hunter.searchCompleted': 'Search completed',
    'hunter.candidatesFound': '{count} candidates found matching your criteria',
    'hunter.viewProfile': 'View profile',
    'hunter.save': 'Save',
    'hunter.import': 'Import',
    'hunter.profileSaved': 'Profile saved',
    'hunter.profileImported': 'Profile imported',
    'hunter.addedToShortlist': '{name} has been added to your shortlist',
    'hunter.importedToDatabase': '{name} has been imported to your candidate database',
    'hunter.availability': 'Availability',
    'hunter.new': 'New',
    
    // Job Postings
    'jobs.title': 'Job Postings',
    'jobs.allJobs': 'All Job Postings',
    'jobs.addNew': 'Add New Job',
    'jobs.position': 'POSITION',
    'jobs.department': 'DEPARTMENT',
    'jobs.candidates': 'CANDIDATES',
    'jobs.posted': 'POSTED',
    'jobs.status': 'STATUS',
    'jobs.actions': 'ACTIONS',
    'jobs.showMore': 'Show More',
    'jobs.noJobs': 'No job postings found. Create your first posting!',
    'jobs.notSpecified': 'Not specified',
    'jobs.deleteConfirm': 'Are you sure you want to delete this job posting?',
    
    // Job Detail
    'jobDetail.title': 'Job Detail',
    'jobDetail.myJobs': 'My Job Postings',
    'jobDetail.backToJobs': '← Back to jobs',
    'jobDetail.location': 'Location',
    'jobDetail.salary': 'Salary',
    'jobDetail.type': 'Type',
    'jobDetail.publishDate': 'Published',
    'jobDetail.applications': 'Applications',
    'jobDetail.analyzed': 'analyzed',
    'jobDetail.averageScore': 'Average score',
    'jobDetail.viewCandidates': 'View candidates',
    'jobDetail.edit': 'Edit',
    'jobDetail.duplicate': 'Duplicate',
    'jobDetail.delete': 'Delete',
    'jobDetail.loading': 'Loading...',
    'jobDetail.notFound': 'Job posting not found',
    'jobDetail.actionInProgress': 'Action in progress',
    'jobDetail.editForm': 'Opening edit form',
    'jobDetail.duplicated': 'Job posting duplicated',
    'jobDetail.copyCreated': 'A copy of this job posting has been created',
    'jobDetail.deleteJob': 'Delete this job posting?',
    'jobDetail.irreversible': 'This action is irreversible',
    
    // Candidates
    'candidates.title': 'Candidates',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.clear': 'Clear',
    'common.apply': 'Apply',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.create': 'Create',
    'common.update': 'Update',
    
    // Notifications
    'notifications.newCandidate': 'New candidate added',
    'notifications.statusChange': 'Candidate status updated',
    'notifications.newJob': 'New job posting created',
    
    // Success messages
    'success.languageUpdated': 'Language updated successfully',
    'success.loginSuccess': 'Login successful',
    'success.signupSuccess': 'Registration successful',
    'success.logoutSuccess': 'Logout successful'
  },
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
    'dashboard.topCandidates': 'Top Candidats',
    'dashboard.activeJobs': 'Offres d\'emploi actives',
    'dashboard.viewAll': 'Voir tout',
    'dashboard.noCandidates': 'Aucun candidat disponible',
    'dashboard.noActiveJobs': 'Aucune offre active',
    
    // Hunter
    'hunter.title': 'Hunter',
    'hunter.subtitle': '🔍 Hunter – Trouver des candidats sur le web',
    'hunter.description': '✏️ Décrivez les critères du poste',
    'hunter.placeholder': 'Ex : Nous cherchons un développeur React senior, à distance, parlant anglais...',
    'hunter.searchButton': 'Lancer la chasse',
    'hunter.searching': 'Recherche en cours...',
    'hunter.advancedFilters': 'Filtres avancés',
    'hunter.minMatching': 'Matching minimum',
    'hunter.location': 'Pays / Localisation',
    'hunter.sortBy': 'Trier par',
    'hunter.score': 'Score',
    'hunter.date': 'Date',
    'hunter.popularity': 'Popularité',
    'hunter.resultsFound': 'Nous avons trouvé {count} profil{s} correspondant étroitement à vos critères.',
    'hunter.highMatching': ' Les {count} premier{s} ont un taux de matching supérieur à 85%.',
    'hunter.noResults': 'Aucun résultat',
    'hunter.noResultsDesc': 'Aucun candidat ne correspond à vos critères de recherche. Essayez de modifier vos filtres ou d\'élargir votre recherche.',
    'hunter.searchCompleted': 'Recherche terminée',
    'hunter.candidatesFound': '{count} candidats trouvés correspondant à vos critères',
    'hunter.viewProfile': 'Voir le profil',
    'hunter.save': 'Sauvegarder',
    'hunter.import': 'Importer',
    'hunter.profileSaved': 'Profil sauvegardé',
    'hunter.profileImported': 'Profil importé',
    'hunter.addedToShortlist': '{name} a été ajouté à votre shortlist',
    'hunter.importedToDatabase': '{name} a été importé dans votre base de candidats',
    'hunter.availability': 'Disponibilité',
    'hunter.new': 'Nouveau',
    
    // Job Postings
    'jobs.title': 'Offres d\'emploi',
    'jobs.allJobs': 'Toutes les offres d\'emploi',
    'jobs.addNew': 'Ajouter une nouvelle offre',
    'jobs.position': 'POSTE',
    'jobs.department': 'DÉPARTEMENT',
    'jobs.candidates': 'CANDIDATS',
    'jobs.posted': 'PUBLIÉ',
    'jobs.status': 'STATUT',
    'jobs.actions': 'ACTIONS',
    'jobs.showMore': 'Voir plus',
    'jobs.noJobs': 'Aucune offre d\'emploi trouvée. Créez votre première offre !',
    'jobs.notSpecified': 'Non spécifié',
    'jobs.deleteConfirm': 'Êtes-vous sûr de vouloir supprimer cette offre d\'emploi ?',
    
    // Job Detail
    'jobDetail.title': 'Détail de l\'offre',
    'jobDetail.myJobs': 'Mes Offres d\'emploi',
    'jobDetail.backToJobs': '← Retour aux offres',
    'jobDetail.location': 'Lieu',
    'jobDetail.salary': 'Salaire',
    'jobDetail.type': 'Type',
    'jobDetail.publishDate': 'Date de publication',
    'jobDetail.applications': 'Candidatures',
    'jobDetail.analyzed': 'analysées',
    'jobDetail.averageScore': 'Moyenne score',
    'jobDetail.viewCandidates': 'Voir les candidats',
    'jobDetail.edit': 'Modifier',
    'jobDetail.duplicate': 'Dupliquer',
    'jobDetail.delete': 'Supprimer',
    'jobDetail.loading': 'Chargement...',
    'jobDetail.notFound': 'Offre non trouvée',
    'jobDetail.actionInProgress': 'Action en cours',
    'jobDetail.editForm': 'Ouverture du formulaire de modification',
    'jobDetail.duplicated': 'Offre dupliquée',
    'jobDetail.copyCreated': 'Une copie de cette offre a été créée',
    'jobDetail.deleteJob': 'Supprimer cette offre?',
    'jobDetail.irreversible': 'Cette action est irréversible',
    
    // Candidates
    'candidates.title': 'Candidats',
    
    // Common
    'common.loading': 'Chargement...',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.yes': 'Oui',
    'common.no': 'Non',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.clear': 'Effacer',
    'common.apply': 'Appliquer',
    'common.close': 'Fermer',
    'common.open': 'Ouvrir',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.create': 'Créer',
    'common.update': 'Mettre à jour',
    
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
    'dashboard.topCandidates': 'Top Candidatos',
    'dashboard.activeJobs': 'Ofertas de empleo activas',
    'dashboard.viewAll': 'Ver todo',
    'dashboard.noCandidates': 'No hay candidatos disponibles',
    'dashboard.noActiveJobs': 'No hay ofertas activas',
    
    // Hunter
    'hunter.title': 'Hunter',
    'hunter.subtitle': '🔍 Hunter – Encontrar candidatos en la web',
    'hunter.description': '✏️ Describe los criterios del puesto',
    'hunter.placeholder': 'Ej: Buscamos un desarrollador React senior, remoto, que hable inglés...',
    'hunter.searchButton': 'Iniciar búsqueda',
    'hunter.searching': 'Buscando...',
    'hunter.advancedFilters': 'Filtros avanzados',
    'hunter.minMatching': 'Coincidencia mínima',
    'hunter.location': 'País / Ubicación',
    'hunter.sortBy': 'Ordenar por',
    'hunter.score': 'Puntuación',
    'hunter.date': 'Fecha',
    'hunter.popularity': 'Popularidad',
    'hunter.resultsFound': 'Encontramos {count} perfil{s} que coinciden estrechamente con tus criterios.',
    'hunter.highMatching': ' Los primeros {count} tienen una tasa de coincidencia superior al 85%.',
    'hunter.noResults': 'Sin resultados',
    'hunter.noResultsDesc': 'Ningún candidato coincide con tus criterios de búsqueda. Intenta modificar tus filtros o ampliar tu búsqueda.',
    'hunter.searchCompleted': 'Búsqueda completada',
    'hunter.candidatesFound': '{count} candidatos encontrados que coinciden con tus criterios',
    'hunter.viewProfile': 'Ver perfil',
    'hunter.save': 'Guardar',
    'hunter.import': 'Importar',
    'hunter.profileSaved': 'Perfil guardado',
    'hunter.profileImported': 'Perfil importado',
    'hunter.addedToShortlist': '{name} ha sido añadido a tu lista corta',
    'hunter.importedToDatabase': '{name} ha sido importado a tu base de datos de candidatos',
    'hunter.availability': 'Disponibilidad',
    'hunter.new': 'Nuevo',
    
    // Job Postings
    'jobs.title': 'Ofertas de empleo',
    'jobs.allJobs': 'Todas las ofertas de empleo',
    'jobs.addNew': 'Añadir nueva oferta',
    'jobs.position': 'POSICIÓN',
    'jobs.department': 'DEPARTAMENTO',
    'jobs.candidates': 'CANDIDATOS',
    'jobs.posted': 'PUBLICADO',
    'jobs.status': 'ESTADO',
    'jobs.actions': 'ACCIONES',
    'jobs.showMore': 'Mostrar más',
    'jobs.noJobs': 'No se encontraron ofertas de empleo. ¡Crea tu primera oferta!',
    'jobs.notSpecified': 'No especificado',
    'jobs.deleteConfirm': '¿Estás seguro de que quieres eliminar esta oferta de empleo?',
    
    // Job Detail
    'jobDetail.title': 'Detalle de la oferta',
    'jobDetail.myJobs': 'Mis ofertas de empleo',
    'jobDetail.backToJobs': '← Volver a ofertas',
    'jobDetail.location': 'Ubicación',
    'jobDetail.salary': 'Salario',
    'jobDetail.type': 'Tipo',
    'jobDetail.publishDate': 'Fecha de publicación',
    'jobDetail.applications': 'Candidaturas',
    'jobDetail.analyzed': 'analizadas',
    'jobDetail.averageScore': 'Puntuación promedio',
    'jobDetail.viewCandidates': 'Ver candidatos',
    'jobDetail.edit': 'Editar',
    'jobDetail.duplicate': 'Duplicar',
    'jobDetail.delete': 'Eliminar',
    'jobDetail.loading': 'Cargando...',
    'jobDetail.notFound': 'Oferta no encontrada',
    'jobDetail.actionInProgress': 'Acción en progreso',
    'jobDetail.editForm': 'Abriendo formulario de edición',
    'jobDetail.duplicated': 'Oferta duplicada',
    'jobDetail.copyCreated': 'Se ha creado una copia de esta oferta',
    'jobDetail.deleteJob': '¿Eliminar esta oferta?',
    'jobDetail.irreversible': 'Esta acción es irreversible',
    
    // Candidates
    'candidates.title': 'Candidatos',
    
    // Common
    'common.loading': 'Cargando...',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.yes': 'Sí',
    'common.no': 'No',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.clear': 'Limpiar',
    'common.apply': 'Aplicar',
    'common.close': 'Cerrar',
    'common.open': 'Abrir',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.create': 'Crear',
    'common.update': 'Actualizar',
    
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
  const [language, setLanguageState] = useState<Language>('en');
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
