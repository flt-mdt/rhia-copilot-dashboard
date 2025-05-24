export const frTranslations = {
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
    },
    activity: {
      title: "Activité récente",
      empty: "Aucune activité récente"
    },
    logout: {
      title: "Déconnexion",
      description: "Se déconnecter de votre compte",
      button: "Se déconnecter"
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
    subtitle: "Trouvez votre candidat idéal",
    description: "Trouvez des candidats potentiels en fonction des descriptions de poste.",
    placeholder: "Décrivez le profil de candidat idéal (compétences, expérience, localisation, etc.)",
    searchButton: "Rechercher des candidats",
    uploadDescription: "Téléchargez une description de poste pour trouver les candidats correspondants.",
    dropFileHere: "Déposez votre fichier ici ou cliquez pour télécharger",
    supportedFormats: "Formats pris en charge : .pdf, .doc, .docx",
    analyze: "Analyser",
    analyzing: "Analyse en cours...",
    searching: "Recherche en cours...",
    searchCompleted: "Recherche terminée",
    candidatesFound: "Trouvé {count} candidats potentiels",
    resultsFound: "Trouvé {count} candidat{s}. ",
    highMatching: "{count} avec un score de correspondance élevé{s}.",
    candidateName: "Nom du candidat",
    candidateScore: "Score de correspondance",
    candidateExperience: "Expérience",
    candidateSkills: "Compétences",
    candidateEducation: "Éducation",
    candidateResume: "CV",
    noFileUploaded: "Aucun fichier téléchargé",
    noResults: "Aucun candidat trouvé",
    noResultsDesc: "Essayez d'ajuster vos critères de recherche ou filtres.",
  },
  brief: {
    title: "Brief avec l'IA",
    subtitle: "Définissons votre besoin",
    description: "L'IA vous aide à préciser votre besoin, même si vous ne savez pas encore exactement ce que vous cherchez.",
    chatTitle: "Conversation avec l'IA",
    suggestionsTitle: "Questions pour vous aider à réfléchir",
    summaryTitle: "Résumé du brief",
    summaryDescription: "Synthèse mise à jour en temps réel",
    progress: "Progression",
    toolsTitle: "Outils d'aide",
    saveBrief: "Sauvegarder le brief",
    generateJobPosting: "Générer la fiche de poste",
    jobLibrary: "Bibliothèque de postes types",
    analyzeExisting: "Analyser une fiche existante",
    marketBenchmark: "Benchmark marché",
    comingSoon: "Fonctionnalité à venir prochainement",
    placeholder: "Décrivez vos attentes, vos contraintes ou dites juste 'Je ne sais pas'...",
    missions: "Missions principales",
    hardSkills: "Hard skills requis",
    softSkills: "Soft skills attendus",
    context: "Contexte projet",
    location: "Localisation",
    constraints: "Contraintes",
    toDefine: "À définir dans la conversation"
  },
  subscription: {
    title: "Choisissez votre plan d'abonnement",
    subtitle: "Automatisez votre processus de recrutement avec notre IA avancée. Payez uniquement pour ce que vous utilisez.",
    noCommitment: "Sans engagement • Résiliable à tout moment",
    mostPopular: "Le plus populaire",
    subscribe: "Souscrire",
    comparison: {
      title: "Comparaison détaillée des fonctionnalités",
      features: "Fonctionnalités",
      aiRequests: "Requêtes IA mensuelles",
      hrAccounts: "Comptes RH",
      hrReports: "Rapports RH",
      apiWebhooks: "API & Webhooks",
      support: "Support"
    },
    plans: {
      starter: {
        name: "Starter",
        description: "Parfait pour débuter avec l'IA RH",
        features: {
          requests: "100 requêtes IA",
          accounts: "1 compte RH",
          emailSupport: "Support par email",
          platformAccess: "Accès à la plateforme",
          hrReports: "Génération de rapports RH",
          apiIntegration: "Intégration API",
          dedicatedSupport: "Support dédié"
        }
      },
      pro: {
        name: "Pro",
        description: "Pour les équipes RH en croissance",
        features: {
          requests: "1000 requêtes IA",
          accounts: "Jusqu'à 3 comptes RH",
          hrReports: "Génération de rapports RH",
          prioritySupport: "Priorité support",
          platformAccess: "Accès à la plateforme",
          apiIntegration: "Intégration API",
          dedicatedSupport: "Support dédié"
        }
      },
      enterprise: {
        name: "Enterprise",
        description: "Solution complète pour grandes entreprises",
        features: {
          requests: "Requêtes illimitées",
          accounts: "Jusqu'à 10 comptes RH",
          apiWebhooks: "Intégration API & Webhooks",
          dedicatedSupport: "Support dédié & onboarding",
          hrReports: "Génération de rapports RH",
          prioritySupport: "Priorité support",
          platformAccess: "Accès à la plateforme"
        }
      }
    },
    faq: {
      title: "Questions fréquentes",
      changePlan: {
        question: "Puis-je changer de plan à tout moment ?",
        answer: "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement."
      },
      exceedQuota: {
        question: "Que se passe-t-il si je dépasse mon quota ?",
        answer: "Nous vous préviendrons avant d'atteindre la limite. Vous pourrez upgrader votre plan ou attendre le mois suivant."
      },
      freeTrial: {
        question: "Y a-t-il une période d'essai gratuite ?",
        answer: "Chaque plan inclut une garantie de remboursement de 14 jours si vous n'êtes pas satisfait."
      },
      dataSecure: {
        question: "Les données sont-elles sécurisées ?",
        answer: "Oui, toutes vos données sont chiffrées et hébergées en Europe conformément au RGPD."
      }
    },
    cta: {
      needHelp: "Besoin d'aide pour choisir le bon plan ?",
      contactTeam: "Contactez notre équipe"
    }
  },
  success: {
    loginSuccess: "Connexion réussie !",
    signupSuccess: "Inscription réussie !",
    languageUpdated: "Langue mise à jour avec succès !",
    logoutSuccess: "Déconnexion réussie !"
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
};
