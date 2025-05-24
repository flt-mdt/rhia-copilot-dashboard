
import React, { createContext, useContext, useState, useEffect } from 'react';
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
    dashboard: {
      title: "Dashboard",
      stats: {
        newApplications: "New Applications",
        totalCandidates: "Total Candidates",
        interviewStage: "Interview Stage",
        activeJobs: "Active Jobs",
      },
      topCandidates: "Top Candidates",
      activeJobs: "Active Job Postings",
      viewAll: "View All",
      noCandidates: "No candidates available",
      noActiveJobs: "No active jobs available",
    },
    candidates: {
      title: "Candidates",
      allCandidates: "All Candidates",
      addNew: "Add New",
      noCandidates: "No candidates found.",
      deleteConfirm: "Are you sure you want to delete this candidate?",
    },
    candidateProfile: {
      title: "Candidate Profile",
      personalInformation: "Personal Information",
      contactInformation: "Contact Information",
      skills: "Skills",
      experience: "Experience",
      education: "Education",
      resume: "Resume",
      notes: "Notes",
      addNote: "Add Note",
      saveNote: "Save Note",
      editNote: "Edit Note",
      deleteNote: "Delete Note",
      deleteConfirm: "Are you sure you want to delete this note?",
      noNotes: "No notes available.",
    },
    jobs: {
      title: "Job Postings",
      allJobs: "All Job Postings",
      addNew: "Add New",
      position: "Position",
      department: "Department",
      candidates: "Candidates",
      posted: "Posted",
      status: "Status",
      actions: "Actions",
      notSpecified: "Not specified",
      noJobs: "No job postings found.",
      deleteConfirm: "Are you sure you want to delete this job posting?",
      showMore: "Show More",
      editJob: "Edit Job Offer",
      duplicateJob: "Duplicate Job Offer",
      deleteConfirmTitle: "Delete Job Offer",
      deleteConfirmMessage: "Are you sure you want to delete '{jobTitle}'? This action will also remove {candidatesCount} associated candidates.",
      deleteWarning: "⚠️ This action is irreversible and will:",
      deleteWarningJob: "Permanently delete the job offer",
      deleteWarningCandidates: "Remove all associated candidates",
      deleteWarningData: "Delete all related data and statistics",
      confirmDelete: "Yes, Delete",
      createDuplicate: "Create Copy",
      contractType: "Contract Type",
      selectContract: "Select contract type",
      experienceLevel: "Experience Level",
      selectExperience: "Select experience level",
      salaryMin: "Minimum Salary (€)",
      salaryMax: "Maximum Salary (€)",
    },
    jobDetail: {
      title: "Job Detail",
      myJobs: "My Jobs",
      backToJobs: "Back to Job Postings",
      location: "Location",
      salary: "Salary",
      type: "Type",
      publishDate: "Publish Date",
      applications: "Applications",
      analyzed: "analyzed",
      averageScore: "Average Score",
      viewCandidates: "View Candidates",
      edit: "Edit",
      duplicate: "Duplicate",
      delete: "Delete",
      actionInProgress: "Action in progress",
      editForm: "Opening the edit form...",
      duplicated: "Job duplicated!",
      copyCreated: "A copy of the job has been created.",
      deleteJob: "Deleting Job",
      irreversible: "This action is irreversible.",
      loading: "Loading job details...",
      notFound: "Job not found.",
    },
    settings: {
      title: "Settings",
      language: "Language",
      languageDescription: "Choose your preferred language",
      account: "Account",
      accountDescription: "Manage your account settings",
      criteria: {
        title: "Evaluation Criteria",
        description: "Configure evaluation criteria for candidates",
        help: "Define the criteria used to evaluate candidates"
      }
    },
    login: {
      title: "RHIA Copilot",
      email: "Email",
      password: "Password",
      name: "Name",
      or: "Or",
      google: "Sign In with Google",
      linkedin: "Sign In with LinkedIn",
      signin: {
        title: "Welcome Back!",
        description: "Sign in to continue to your account.",
        button: "Sign In"
      },
      signup: {
        title: "Create Account",
        description: "Create an account to get started.",
        button: "Sign Up"
      }
    },
    hunter: {
      title: "Candidate Hunter",
      description: "Find potential candidates based on job descriptions.",
      uploadDescription: "Upload a job description to find matching candidates.",
      dropFileHere: "Drop your file here or click to upload",
      supportedFormats: "Supported formats: .pdf, .doc, .docx",
      analyze: "Analyze",
      analyzing: "Analyzing...",
      resultsFound: "Found {count} candidate{s}. ",
      highMatching: "{count} with high matching score{s}.",
      candidateName: "Candidate Name",
      candidateScore: "Match Score",
      candidateExperience: "Experience",
      candidateSkills: "Skills",
      candidateEducation: "Education",
      candidateResume: "Resume",
      noFileUploaded: "No file uploaded",
    },
    brief: {
      title: "Brief",
    },
    success: {
      loginSuccess: "Login successful!",
      signupSuccess: "Signup successful!",
      languageUpdated: "Language updated successfully!",
    },
    common: {
      loading: "Loading...",
      back: "Back",
      save: "Save",
      saving: "Saving...",
      cancel: "Cancel",
      creating: "Creating...",
      deleting: "Deleting...",
    }
  },
  fr: {
    dashboard: {
      title: "Tableau de bord",
      stats: {
        newApplications: "Nouvelles candidatures",
        totalCandidates: "Total des candidats",
        interviewStage: "Étape d'entretien",
        activeJobs: "Offres d'emploi actives",
      },
      topCandidates: "Meilleurs candidats",
      activeJobs: "Offres d'emploi actives",
      viewAll: "Voir tout",
      noCandidates: "Aucun candidat disponible",
      noActiveJobs: "Aucune offre d'emploi active disponible",
    },
    candidates: {
      title: "Candidats",
      allCandidates: "Tous les candidats",
      addNew: "Ajouter un nouveau",
      noCandidates: "Aucun candidat trouvé.",
      deleteConfirm: "Êtes-vous sûr de vouloir supprimer ce candidat ?",
    },
    candidateProfile: {
      title: "Profil du candidat",
      personalInformation: "Informations personnelles",
      contactInformation: "Informations de contact",
      skills: "Compétences",
      experience: "Expérience",
      education: "Éducation",
      resume: "CV",
      notes: "Notes",
      addNote: "Ajouter une note",
      saveNote: "Enregistrer la note",
      editNote: "Modifier la note",
      deleteNote: "Supprimer la note",
      deleteConfirm: "Êtes-vous sûr de vouloir supprimer cette note ?",
      noNotes: "Aucune note disponible.",
    },
    jobs: {
      title: "Offres d'emploi",
      allJobs: "Toutes les offres d'emploi",
      addNew: "Ajouter une nouvelle",
      position: "Poste",
      department: "Département",
      candidates: "Candidats",
      posted: "Publié",
      status: "Statut",
      actions: "Actions",
      notSpecified: "Non spécifié",
      noJobs: "Aucune offre d'emploi trouvée.",
      deleteConfirm: "Êtes-vous sûr de vouloir supprimer cette offre d'emploi ?",
      showMore: "Afficher plus",
      editJob: "Modifier l'offre d'emploi",
      duplicateJob: "Dupliquer l'offre d'emploi",
      deleteConfirmTitle: "Supprimer l'offre d'emploi",
      deleteConfirmMessage: "Êtes-vous sûr de vouloir supprimer '{jobTitle}' ? Cette action supprimera également {candidatesCount} candidats associés.",
      deleteWarning: "⚠️ Cette action est irréversible et va :",
      deleteWarningJob: "Supprimer définitivement l'offre d'emploi",
      deleteWarningCandidates: "Supprimer tous les candidats associés",
      deleteWarningData: "Supprimer toutes les données et statistiques liées",
      confirmDelete: "Oui, Supprimer",
      createDuplicate: "Créer la copie",
      contractType: "Type de contrat",
      selectContract: "Sélectionner le type de contrat",
      experienceLevel: "Niveau d'expérience",
      selectExperience: "Sélectionner le niveau d'expérience",
      salaryMin: "Salaire minimum (€)",
      salaryMax: "Salaire maximum (€)",
    },
    jobDetail: {
      title: "Détail de l'offre d'emploi",
      myJobs: "Mes offres d'emploi",
      backToJobs: "Retour aux offres d'emploi",
      location: "Lieu",
      salary: "Salaire",
      type: "Type",
      publishDate: "Date de publication",
      applications: "Candidatures",
      analyzed: "analysés",
      averageScore: "Score moyen",
      viewCandidates: "Voir les candidats",
      edit: "Modifier",
      duplicate: "Dupliquer",
      delete: "Supprimer",
      actionInProgress: "Action en cours",
      editForm: "Ouverture du formulaire de modification...",
      duplicated: "Offre d'emploi dupliquée !",
      copyCreated: "Une copie de l'offre a été créée.",
      deleteJob: "Suppression de l'offre d'emploi",
      irreversible: "Cette action est irréversible.",
      loading: "Chargement des détails de l'offre d'emploi...",
      notFound: "Offre d'emploi non trouvée.",
    },
    settings: {
      title: "Paramètres",
      language: "Langue",
      languageDescription: "Choisissez votre langue préférée",
      account: "Compte",
      accountDescription: "Gérer les paramètres de votre compte",
      criteria: {
        title: "Critères d'évaluation",
        description: "Configurer les critères d'évaluation pour les candidats",
        help: "Définir les critères utilisés pour évaluer les candidats"
      }
    },
    login: {
      title: "RHIA Copilot",
      email: "Email",
      password: "Mot de passe",
      name: "Nom",
      or: "Ou",
      google: "Se connecter avec Google",
      linkedin: "Se connecter avec LinkedIn",
      signin: {
        title: "Bienvenue !",
        description: "Connectez-vous pour accéder à votre compte.",
        button: "Se connecter"
      },
      signup: {
        title: "Créer un compte",
        description: "Créez un compte pour commencer.",
        button: "S'inscrire"
      }
    },
    hunter: {
      title: "Chasseur de candidats",
      description: "Trouvez des candidats potentiels en fonction des descriptions de poste.",
      uploadDescription: "Téléchargez une description de poste pour trouver les candidats correspondants.",
      dropFileHere: "Déposez votre fichier ici ou cliquez pour télécharger",
      supportedFormats: "Formats pris en charge : .pdf, .doc, .docx",
      analyze: "Analyser",
      analyzing: "Analyse en cours...",
      resultsFound: "Trouvé {count} candidat{s}. ",
      highMatching: "{count} avec un score de correspondance élevé{s}.",
      candidateName: "Nom du candidat",
      candidateScore: "Score de correspondance",
      candidateExperience: "Expérience",
      candidateSkills: "Compétences",
      candidateEducation: "Éducation",
      candidateResume: "CV",
      noFileUploaded: "Aucun fichier téléchargé",
    },
    brief: {
      title: "Brief",
    },
    success: {
      loginSuccess: "Connexion réussie !",
      signupSuccess: "Inscription réussie !",
      languageUpdated: "Langue mise à jour avec succès !",
    },
    common: {
      loading: "Chargement...",
      back: "Retour",
      save: "Enregistrer",
      saving: "Enregistrement...",
      cancel: "Annuler",
      creating: "Création...",
      deleting: "Suppression...",
    }
  },
  es: {
    dashboard: {
      title: "Panel de control",
      stats: {
        newApplications: "Nuevas aplicaciones",
        totalCandidates: "Total de candidatos",
        interviewStage: "Etapa de entrevista",
        activeJobs: "Ofertas de trabajo activas",
      },
      topCandidates: "Mejores candidatos",
      activeJobs: "Ofertas de empleo activas",
      viewAll: "Ver todo",
      noCandidates: "No hay candidatos disponibles",
      noActiveJobs: "No hay ofertas de trabajo activas disponibles",
    },
    candidates: {
      title: "Candidatos",
      allCandidates: "Todos los candidatos",
      addNew: "Agregar nuevo",
      noCandidates: "No se encontraron candidatos.",
      deleteConfirm: "¿Estás seguro de que quieres eliminar este candidato?",
    },
    candidateProfile: {
      title: "Perfil del candidato",
      personalInformation: "Información personal",
      contactInformation: "Información de contacto",
      skills: "Habilidades",
      experience: "Experiencia",
      education: "Educación",
      resume: "Currículum",
      notes: "Notas",
      addNote: "Agregar nota",
      saveNote: "Guardar nota",
      editNote: "Editar nota",
      deleteNote: "Eliminar nota",
      deleteConfirm: "¿Estás seguro de que quieres eliminar esta nota?",
      noNotes: "No hay notas disponibles.",
    },
    jobs: {
      title: "Ofertas de trabajo",
      allJobs: "Todas las ofertas de trabajo",
      addNew: "Agregar nueva",
      position: "Posición",
      department: "Departamento",
      candidates: "Candidatos",
      posted: "Publicado",
      status: "Estado",
      actions: "Acciones",
      notSpecified: "No especificado",
      noJobs: "No se encontraron ofertas de trabajo.",
      deleteConfirm: "¿Estás seguro de que quieres eliminar esta oferta de trabajo?",
      showMore: "Mostrar más",
      editJob: "Editar Oferta de Trabajo",
      duplicateJob: "Duplicar Oferta de Trabajo",
      deleteConfirmTitle: "Eliminar Oferta de Trabajo",
      deleteConfirmMessage: "¿Estás seguro de que quieres eliminar '{jobTitle}'? Esta acción también eliminará {candidatesCount} candidatos asociados.",
      deleteWarning: "⚠️ Esta acción es irreversible y:",
      deleteWarningJob: "Eliminará permanentemente la oferta de trabajo",
      deleteWarningCandidates: "Eliminará todos los candidatos asociados",
      deleteWarningData: "Eliminará todos los datos y estadísticas relacionados",
      confirmDelete: "Sí, Eliminar",
      createDuplicate: "Crear Copia",
      contractType: "Tipo de contrato",
      selectContract: "Seleccionar tipo de contrato",
      experienceLevel: "Nivel de experiencia",
      selectExperience: "Seleccionar nivel de experiencia",
      salaryMin: "Salario mínimo (€)",
      salaryMax: "Salario máximo (€)",
    },
    jobDetail: {
      title: "Detalle de la oferta de trabajo",
      myJobs: "Mis ofertas de trabajo",
      backToJobs: "Volver a las ofertas de trabajo",
      location: "Ubicación",
      salary: "Salario",
      type: "Tipo",
      publishDate: "Fecha de publicación",
      applications: "Aplicaciones",
      analyzed: "analizados",
      averageScore: "Puntuación media",
      viewCandidates: "Ver candidatos",
      edit: "Editar",
      duplicate: "Duplicar",
      delete: "Eliminar",
      actionInProgress: "Acción en curso",
      editForm: "Abriendo el formulario de edición...",
      duplicated: "¡Oferta de trabajo duplicada!",
      copyCreated: "Se ha creado una copia de la oferta.",
      deleteJob: "Eliminando la oferta de trabajo",
      irreversible: "Esta acción es irreversible.",
      loading: "Cargando detalles de la oferta de trabajo...",
      notFound: "Oferta de trabajo no encontrada.",
    },
    settings: {
      title: "Ajustes",
      language: "Idioma",
      languageDescription: "Elige tu idioma preferido",
      account: "Cuenta",
      accountDescription: "Administra la configuración de tu cuenta",
      criteria: {
        title: "Criterios de evaluación",
        description: "Configurar criterios de evaluación para candidatos",
        help: "Definir los criterios utilizados para evaluar candidatos"
      }
    },
    login: {
      title: "RHIA Copilot",
      email: "Correo electrónico",
      password: "Contraseña",
      name: "Nombre",
      or: "O",
      google: "Iniciar sesión con Google",
      linkedin: "Iniciar sesión con LinkedIn",
      signin: {
        title: "¡Bienvenido de nuevo!",
        description: "Inicia sesión para continuar a tu cuenta.",
        button: "Iniciar sesión"
      },
      signup: {
        title: "Crear cuenta",
        description: "Crea una cuenta para empezar.",
        button: "Registrarse"
      }
    },
    hunter: {
      title: "Cazador de candidatos",
      description: "Encuentra candidatos potenciales basados en descripciones de trabajo.",
      uploadDescription: "Carga una descripción de trabajo para encontrar candidatos que coincidan.",
      dropFileHere: "Arrastra tu archivo aquí o haz clic para subirlo",
      supportedFormats: "Formatos admitidos: .pdf, .doc, .docx",
      analyze: "Analizar",
      analyzing: "Analizando...",
      resultsFound: "Encontrados {count} candidato{s}. ",
      highMatching: "{count} con alta puntuación de coincidencia{s}.",
      candidateName: "Nombre del candidato",
      candidateScore: "Puntuación de coincidencia",
      candidateExperience: "Experiencia",
      candidateSkills: "Habilidades",
      candidateEducation: "Educación",
      candidateResume: "Currículum",
      noFileUploaded: "Ningún archivo subido",
    },
    brief: {
      title: "Brief",
    },
    success: {
      loginSuccess: "¡Inicio de sesión exitoso!",
      signupSuccess: "¡Registro exitoso!",
      languageUpdated: "¡Idioma actualizado con éxito!",
    },
    common: {
      loading: "Cargando...",
      back: "Atrás",
      save: "Guardar",
      saving: "Guardando...",
      cancel: "Cancelar",
      creating: "Creando...",
      deleting: "Eliminando...",
    }
  }
};

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
