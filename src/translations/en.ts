export const enTranslations = {
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
    },
    activity: {
      title: "Recent Activity",
      empty: "No recent activity"
    },
    logout: {
      title: "Logout",
      description: "Sign out of your account",
      button: "Logout"
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
    subtitle: "Find Your Perfect Candidate",
    description: "Find potential candidates based on job descriptions.",
    placeholder: "Describe the ideal candidate profile (skills, experience, location, etc.)",
    searchButton: "Search Candidates",
    uploadDescription: "Upload a job description to find matching candidates.",
    dropFileHere: "Drop your file here or click to upload",
    supportedFormats: "Supported formats: .pdf, .doc, .docx",
    analyze: "Analyze",
    analyzing: "Analyzing...",
    searching: "Searching...",
    searchCompleted: "Search completed",
    candidatesFound: "Found {count} potential candidates",
    resultsFound: "Found {count} candidate{s}. ",
    highMatching: "{count} with high matching score{s}.",
    candidateName: "Candidate Name",
    candidateScore: "Match Score",
    candidateExperience: "Experience",
    candidateSkills: "Skills",
    candidateEducation: "Education",
    candidateResume: "Resume",
    noFileUploaded: "No file uploaded",
    noResults: "No candidates found",
    noResultsDesc: "Try adjusting your search criteria or filters.",
  },
  brief: {
    title: "AI Brief",
    subtitle: "Let's Define Your Need",
    description: "AI helps you clarify your need, even if you don't know exactly what you're looking for yet.",
    chatTitle: "Conversation with AI",
    suggestionsTitle: "Questions to help you think",
    summaryTitle: "Brief Summary",
    summaryDescription: "Real-time updated synthesis",
    progress: "Progress",
    toolsTitle: "Helper Tools",
    saveBrief: "Save Brief",
    generateJobPosting: "Generate Job Posting",
    jobLibrary: "Job Templates Library",
    analyzeExisting: "Analyze Existing Job Description",
    marketBenchmark: "Market Benchmark",
    comingSoon: "Feature coming soon",
    placeholder: "Describe your expectations, constraints, or just say 'I don't know'...",
    missions: "Main Missions",
    hardSkills: "Required Hard Skills",
    softSkills: "Expected Soft Skills",
    context: "Project Context",
    location: "Location",
    constraints: "Constraints",
    toDefine: "To be defined in conversation"
  },
  subscription: {
    title: "Choose your subscription plan",
    subtitle: "Automate your recruitment process with our advanced AI. Pay only for what you use.",
    noCommitment: "No commitment • Cancel anytime",
    mostPopular: "Most Popular",
    subscribe: "Subscribe",
    comparison: {
      title: "Detailed feature comparison",
      features: "Features",
      aiRequests: "Monthly AI requests",
      hrAccounts: "HR accounts",
      hrReports: "HR reports",
      apiWebhooks: "API & Webhooks",
      support: "Support"
    },
    plans: {
      starter: {
        name: "Starter",
        description: "Perfect to get started with HR AI",
        features: {
          requests: "100 AI requests",
          accounts: "1 HR account",
          emailSupport: "Email support",
          platformAccess: "Platform access",
          hrReports: "HR report generation",
          apiIntegration: "API integration",
          dedicatedSupport: "Dedicated support"
        }
      },
      pro: {
        name: "Pro",
        description: "For growing HR teams",
        features: {
          requests: "1000 AI requests",
          accounts: "Up to 3 HR accounts",
          hrReports: "HR report generation",
          prioritySupport: "Priority support",
          platformAccess: "Platform access",
          apiIntegration: "API integration",
          dedicatedSupport: "Dedicated support"
        }
      },
      enterprise: {
        name: "Enterprise",
        description: "Complete solution for large companies",
        features: {
          requests: "Unlimited requests",
          accounts: "Up to 10 HR accounts",
          apiWebhooks: "API & Webhooks integration",
          dedicatedSupport: "Dedicated support & onboarding",
          hrReports: "HR report generation",
          prioritySupport: "Priority support",
          platformAccess: "Platform access"
        }
      }
    },
    faq: {
      title: "Frequently asked questions",
      changePlan: {
        question: "Can I change my plan anytime?",
        answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
      },
      exceedQuota: {
        question: "What happens if I exceed my quota?",
        answer: "We'll notify you before reaching the limit. You can upgrade your plan or wait for the next month."
      },
      freeTrial: {
        question: "Is there a free trial?",
        answer: "Each plan includes a 14-day money-back guarantee if you're not satisfied."
      },
      dataSecure: {
        question: "Is data secure?",
        answer: "Yes, all your data is encrypted and hosted in Europe in compliance with GDPR."
      }
    },
    cta: {
      needHelp: "Need help choosing the right plan?",
      contactTeam: "Contact our team"
    }
  },
  success: {
    loginSuccess: "Login successful!",
    signupSuccess: "Signup successful!",
    languageUpdated: "Language updated successfully!",
    logoutSuccess: "Logout successful!"
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
};
