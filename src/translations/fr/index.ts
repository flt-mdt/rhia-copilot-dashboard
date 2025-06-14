
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
  subscription: {
    title: "Choisissez votre forfait d'abonnement",
    subtitle: "Automatisez votre processus de recrutement avec notre IA avancée. Payez seulement ce que vous utilisez.",
    noCommitment: "Sans engagement • Résiliable à tout moment",
    mostPopular: "Le plus populaire",
    subscribe: "S'abonner",
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
        description: "Parfait pour commencer avec l'IA RH",
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
          prioritySupport: "Support prioritaire",
          platformAccess: "Accès à la plateforme",
          apiIntegration: "Intégration API",
          dedicatedSupport: "Support dédié"
        }
      },
      enterprise: {
        name: "Enterprise",
        description: "Solution complète pour les grandes entreprises",
        features: {
          requests: "Requêtes illimitées",
          accounts: "Jusqu'à 10 comptes RH",
          apiWebhooks: "Intégration API & Webhooks",
          dedicatedSupport: "Support dédié & onboarding",
          hrReports: "Génération de rapports RH",
          prioritySupport: "Support prioritaire",
          platformAccess: "Accès à la plateforme"
        }
      }
    },
    faq: {
      title: "Questions fréquemment posées",
      changePlan: {
        question: "Puis-je changer de forfait à tout moment ?",
        answer: "Oui, vous pouvez mettre à niveau ou rétrograder votre forfait à tout moment. Les changements prennent effet immédiatement."
      },
      exceedQuota: {
        question: "Que se passe-t-il si je dépasse mon quota ?",
        answer: "Nous vous préviendrons avant d'atteindre la limite. Vous pouvez mettre à niveau votre forfait ou attendre le mois suivant."
      },
      freeTrial: {
        question: "Y a-t-il un essai gratuit ?",
        answer: "Chaque forfait inclut une garantie de remboursement de 14 jours si vous n'êtes pas satisfait."
      },
      dataSecure: {
        question: "Les données sont-elles sécurisées ?",
        answer: "Oui, toutes vos données sont chiffrées et hébergées en Europe en conformité avec le RGPD."
      },
      integration: {
        question: "L'intégration avec nos outils RH actuels (SIRH/ATS) sera-t-elle complexe ?",
        answer: "Absolument pas. Nous avons conçu RHIA Copilot pour qu'il s'intègre en douceur à votre écosystème. Notre plan Enterprise inclut une intégration complète via API et webhooks, gérée par nos équipes pour une transition sans effort. Le plan Pro vous donne également un accès API pour connecter vos outils clés. L'objectif est de centraliser vos données, pas de les disperser."
      },
      aiModel: {
        question: "Comment garantissez-vous la sécurité de nos données et de celles des candidats ?",
        answer: "La sécurité est notre priorité absolue. Nous utilisons des modèles IA propriétaires, entraînés spécifiquement pour les RH, et non des modèles publics. Toutes vos données sont chiffrées, hébergées en Europe en stricte conformité avec le RGPD. Nous garantissons une confidentialité totale : vos données ne sont jamais utilisées pour entraîner d'autres modèles. C'est votre coffre-fort de données RH, sécurisé et intelligent."
      },
      supportOnboarding: {
        question: "Comment allez-vous nous aider à prendre en main l'outil et à assurer son adoption par l'équipe ?",
        answer: "Nous ne vous laissons pas seul. Chaque plan inclut un support pour garantir votre succès. Le plan Pro vous donne un accès prioritaire à nos experts. Avec le plan Enterprise, nous allons plus loin : un gestionnaire de compte dédié et un programme d'onboarding personnalisé sont inclus pour former votre équipe, intégrer vos processus et assurer un retour sur investissement dès le premier jour."
      }
    },
    cta: {
      needHelp: "Besoin d'aide pour choisir le bon forfait ?",
      contactTeam: "Contactez notre équipe"
    },
    security: {
      title: "Sécurité & conformité",
      cards: {
        privacy: {
          title: "Confidentialité des données",
          description: "Vos données sont vos données. Jamais utilisées pour l'entraînement de modèles."
        },
        access: {
          title: "Contrôle d'accès",
          description: "Permissions granulaires avec des Espaces pour les informations sensibles."
        },
        compliance: {
          title: "Conformité",
          description: "Certifié SOC2 Type II, conforme HIPAA et RGPD."
        }
      }
    }
  },
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
