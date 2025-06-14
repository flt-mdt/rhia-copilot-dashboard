import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { 
  Brain, 
  Briefcase, 
  MessageSquare, 
  Search, 
  Users, 
  Zap, 
  Clock, 
  Target, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  LogIn,
  ChevronRight,
  Rocket,
  Globe
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Presentation = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const advantages = [
    {
      rhia: "IA intégrée pour analyse automatique",
      ats: "Analyse manuelle chronophage"
    },
    {
      rhia: "Score de matching objectif",
      ats: "Évaluation subjective"
    },
    {
      rhia: "Sourcing IA automatisé",
      ats: "Recherche manuelle limitée"
    },
    {
      rhia: "Assistant copilote personnalisé",
      ats: "Interface statique"
    },
    {
      rhia: "Recommandations intelligentes",
      ats: "Filtres basiques"
    }
  ];

  const testimonials = [
    {
      name: "Jean-Luc Martin",
      role: "Directeur des Talents, TotalEnergies",
      comment: "Avec RHIA, nous avons réduit notre temps de présélection de 75%. L'IA identifie des compétences que nous aurions manquées, nous permettant de nous concentrer sur les meilleurs talents.",
      logo: "/lovable-uploads/65b214d1-d611-4de9-bb66-a774d9117c92.png",
      companyName: "TotalEnergies"
    },
    {
      name: "Isabelle Dubois",
      role: "Responsable Acquisition de Talents, Renault Group",
      comment: "L'outil de brief par IA a transformé notre collaboration avec les managers. Les descriptions de poste sont plus précises, ce qui a un impact direct sur la qualité des candidatures reçues.",
      logo: "/lovable-uploads/7c5623e7-5b59-4a3c-bce7-a32f13222272.png",
      companyName: "Renault"
    },
    {
      name: "David Bernard",
      role: "VP Human Resources, Air Liquide",
      comment: "RHIA n'est pas juste un ATS, c'est un véritable copilote. Le sourcing automatisé nous a ouvert l'accès à un vivier de candidats passifs que nous n'arrivions pas à atteindre.",
      logo: "/lovable-uploads/1ba73bc5-dccc-4e40-9a7b-bf976165a6fc.png",
      companyName: "Air Liquide"
    }
  ];

  const trustedPartners = [
    { name: "1Jeune1Mentor", logo: "/lovable-uploads/3dd94ce0-d520-422d-81b1-7e28aa82ab49.png" },
    { name: "CY Entreprendre", logo: "/lovable-uploads/bb9268b7-d158-436b-9b94-49935c3585ed.png" },
    { name: "Pépite", logo: "/lovable-uploads/e0e7cde3-0c75-4e68-a92a-4bac1e153212.png" },
    { name: "ESSEC Business School", logo: "/lovable-uploads/f3c5e674-6f18-4847-87cc-9831c9a8b2d6.png" },
    { name: "Genius", logo: "/lovable-uploads/ae9428b1-7883-4eea-bc3a-5bbc7ec22126.png" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Sign In */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/fdc4d16b-8516-4b74-b559-2340f062242b.png" 
              alt="RHIA Copilot Logo" 
              className="h-10 w-10 object-contain"
            />
            <span className="font-semibold text-xl text-gray-900">RHIA Copilot</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/schedule-demo')}
              className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 hover:border-gray-400 font-medium px-6 py-2 rounded-full transition-colors duration-200 text-sm h-10"
            >
              {t('common.requestADemo')}
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-full transition-colors duration-200 text-sm h-10"
            >
              {t('common.signIn')}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-geist font-bold text-gray-900 mb-8 leading-tight">
            Bien plus qu&apos;un ATS.
            <br />
            Une IA Copilote pour les 
            <br />
            RH modernes.
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            La plateforme pour automatiser votre processus de recrutement avec notre IA avancée,
            <br />
            connectée à vos outils d&apos;entreprise et alimentée par les meilleurs modèles d&apos;IA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/subscription')}
              className="inline-flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-2xl transition-colors duration-200 text-lg h-12"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-white">
                <path fill="currentColor" d="M5.33 15.929a13.064 13.064 0 0 1-.33-2.93c0-5.087 2.903-9.436 7-11.181C16.099 3.563 19 7.912 19 13c0 1.01-.114 1.991-.33 2.929l2.02 1.795a.5.5 0 0 1 .097.631l-2.457 4.096a.5.5 0 0 1-.782.096l-2.255-2.254a1 1 0 0 0-.707-.293H9.415a1 1 0 0 0-.707.293l-2.255 2.254a.5.5 0 0 1-.782-.096l-2.457-4.096a.5.5 0 0 1 .096-.63l2.02-1.796Zm6.67-2.93a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
              </svg>
              {t('common.getStarted')}
            </button>
            <button 
              onClick={() => navigate('/schedule-demo')}
              className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 hover:border-gray-400 font-medium px-8 py-3 rounded-2xl transition-colors duration-200 text-lg h-12"
              aria-label={t('common.planDemo')}
            >
              {t('common.planDemo')}
            </button>
          </div>
        </div>
      </section>

      {/* Trusted by Section - Updated Style */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-geist font-bold text-gray-900 mb-8">
              Ils nous font confiance
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 items-center justify-items-center">
            {trustedPartners.map((partner, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center h-16 w-full"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="max-h-12 max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 invert"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section - New Design */}
      <section className="py-12 md:py-20 px-2 md:px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-geist font-bold text-gray-900 mb-4">
              Quels outils allez-vous utiliser ou créer aujourd'hui ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos trois applications principales qui transforment votre processus de recrutement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Analyse des candidats */}
            <div className="bg-green-50 rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  @candidateAnalyzer
                </span>
              </div>
              
              <div className="mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-gray-900">RHIA Analyzer</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    "L'IA la plus précise que nous ayons adoptée pour analyser les candidatures"
                  </p>
                </div>
                <div className="text-right">
                  <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                    @smartMatching
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-geist font-bold text-gray-900 mb-4">Analyse des candidats</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Analyse intelligente de candidatures automatisée</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Score de matching objectif basé sur l'IA</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Lecture automatique des CV et lettres de motivation</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Élimination des biais de recrutement</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/subscription')}
                className="text-sm text-gray-600 font-normal hover:text-gray-800 transition-colors duration-200"
              >
                {t('common.learnMore')}
              </button>
            </div>

            {/* Brief avec l'IA */}
            <div className="bg-pink-50 rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  @briefCrafter
                </span>
              </div>
              
              <div className="mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div className="bg-white rounded-lg p-4 mb-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">RHIA Copilot</div>
                  <div className="text-3xl font-bold text-red-600 mb-1">85%</div>
                  <div className="text-sm text-gray-600">de précision dans la définition des besoins</div>
                </div>
                <div className="text-right">
                  <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                    @needsDefinition
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-geist font-bold text-gray-900 mb-4">Brief avec l'IA</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Génération de briefs ultra-précis avec l'IA</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Conversation intelligente pour affiner vos attentes</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Mise en lumière des soft skills et fit culturel</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Formalisation des besoins avec précision inégalée</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/subscription')}
                className="text-sm text-gray-600 font-normal hover:text-gray-800 transition-colors duration-200"
              >
                {t('common.learnMore')}
              </button>
            </div>

            {/* Hunter - Sourcing IA */}
            <div className="bg-blue-50 rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  @hunterAI
                </span>
              </div>
              
              <div className="mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <div className="bg-white rounded-lg p-4 mb-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">RHIA Hunter</div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">92%</div>
                  <div className="text-sm text-gray-600">de profils qualifiés trouvés en moins de 24h</div>
                </div>
                <div className="text-right">
                  <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                    @talentSourcing
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-geist font-bold text-gray-900 mb-4">Hunter - Sourcing IA</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">IA qui scanne Internet pour sourcer les meilleurs profils</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Scraping intelligent (LinkedIn, GitHub, portfolios)</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Accès aux candidats passifs difficilement accessibles</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Sourcing automatisé et ciblé par l'IA</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/subscription')}
                className="text-sm text-gray-600 font-normal hover:text-gray-800 transition-colors duration-200"
              >
                {t('common.learnMore')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section - New Design matching the image */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="mb-4 md:mb-6">
                <span className="text-blue-500 font-medium text-lg">RHIA pour le Recrutement</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-geist font-bold text-gray-900 mb-4 leading-tight">
                Automatisez Votre Processus,
                <br />
                Réduisez les Interruptions
              </h2>
              <p className="text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                Centralisez l'analyse des candidatures, automatisez la documentation, et gardez votre équipe RH concentrée sur l'essentiel.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button 
                  onClick={() => navigate('/subscription')}
                  className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-full transition-colors duration-200 text-base"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-white">
                    <path fill="currentColor" d="M5.33 15.929a13.064 13.064 0 0 1-.33-2.93c0-5.087 2.903-9.436 7-11.181C16.099 3.563 19 7.912 19 13c0 1.01-.114 1.991-.33 2.929l2.02 1.795a.5.5 0 0 1 .097.631l-2.457 4.096a.5.5 0 0 1-.782.096l-2.255-2.254a1 1 0 0 0-.707-.293H9.415a1 1 0 0 0-.707.293l-2.255 2.254a.5.5 0 0 1-.782-.096l-2.457-4.096a.5.5 0 0 1 .096-.63l2.02-1.796Zm6.67-2.93a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                  </svg>
                  Commencer maintenant
                </button>
                <button 
                  onClick={() => navigate('/schedule-demo')}
                  className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 hover:border-gray-400 font-medium px-8 py-3 rounded-2xl transition-colors duration-200 text-lg h-12"
                  aria-label={t('common.planDemo')}
                >
                  {t('common.planDemo')}
                </button>
              </div>
            </div>
            
            {/* Right Integration Diagram */}
            <div className="relative mt-10 md:mt-0">
              <img src="/lovable-uploads/b3542959-ca1f-4f73-bb8d-8b59700980c7.png" alt="Diagramme d'intégration RHIA" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Have AI wherever you work Section */}
      <section className="py-12 md:py-20 px-2 md:px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-geist font-bold text-gray-900 mb-4">
              L'IA, partout où vous travaillez
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Tirez parti de la puissance de l'IA et de vos connaissances là où vous en avez besoin. Fini les allers-retours entre les outils.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
            {/* Column 1: Analyzer */}
            <div className="bg-white rounded-2xl p-4 md:p-6 flex flex-col border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="bg-white rounded-lg mb-6 flex-grow">
                <div className="bg-white rounded-lg shadow-lg p-4 h-56 w-full overflow-hidden border">
                    <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center ring-4 ring-green-50">
                            <Brain className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="ml-3">
                            <div className="font-semibold text-sm text-gray-800">Analyse de CV</div>
                            <div className="text-xs text-gray-500">Rapport pour Jeanne Dupont</div>
                        </div>
                    </div>
                    <div className="space-y-3 mt-4">
                        <div className="text-xs text-gray-600">Adéquation avec le poste :</div>
                        <div>
                            <div className="text-xs font-medium text-gray-500 mb-1 flex justify-between"><span>Compétences</span> <span>95%</span></div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-green-500 h-1.5 rounded-full" style={{width: '95%'}}></div></div>
                        </div>
                        <div>
                           <div className="text-xs font-medium text-gray-500 mb-1 flex justify-between"><span>Expérience</span> <span>88%</span></div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-green-500 h-1.5 rounded-full" style={{width: '88%'}}></div></div>
                        </div>
                        <div>
                            <div className="text-xs font-medium text-gray-500 mb-1 flex justify-between"><span>Savoir-être</span> <span>70%</span></div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-yellow-500 h-1.5 rounded-full" style={{width: '70%'}}></div></div>
                        </div>
                    </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-geist font-bold text-gray-900 mb-2">
                  Analysez depuis votre ATS
                </h3>
                <p className="text-gray-600 text-sm leading-6">
                  Connectez RHIA pour analyser les candidatures et obtenir des scores de matching sans changer d'interface.
                </p>
              </div>
            </div>

            {/* Column 2: Brief */}
            <div className="bg-white rounded-2xl p-4 md:p-6 flex flex-col border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="bg-white rounded-lg mb-6 flex-grow">
                <div className="bg-white rounded-lg shadow-lg p-4 h-56 w-full overflow-hidden border flex flex-col">
                    <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center ring-4 ring-red-50">
                           <MessageSquare className="h-5 w-5 text-red-600" />
                        </div>
                        <div className="ml-3">
                            <div className="font-semibold text-sm text-gray-800">RHIA Copilot</div>
                            <div className="text-xs text-gray-500">Brief de poste via Slack</div>
                        </div>
                    </div>
                    <div className="flex-grow space-y-2 text-xs flex flex-col justify-end">
                        <div className="bg-gray-100 text-gray-800 p-2.5 rounded-xl rounded-br-sm self-end ml-auto max-w-[80%]">
                            Nous cherchons un Chef de Projet Marketing.
                        </div>
                        <div className="bg-blue-500 text-white p-2.5 rounded-xl rounded-bl-sm self-start max-w-[80%]">
                            Entendu. Quelles sont les 3 compétences indispensables ?
                        </div>
                    </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-geist font-bold text-gray-900 mb-2">
                  Collaborez sur Slack
                </h3>
                <p className="text-gray-600 text-sm leading-6">
                  Utilisez l'IA dans vos outils de com' pour créer des fiches de poste précises avec les managers.
                </p>
              </div>
            </div>

            {/* Column 3: Hunter */}
            <div className="bg-white rounded-2xl p-4 md:p-6 flex flex-col border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="bg-white rounded-lg mb-6 flex-grow">
                <div className="bg-white rounded-lg shadow-lg p-4 h-56 w-full overflow-hidden border">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center ring-4 ring-blue-50">
                               <Search className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="ml-3">
                                <h4 className="font-semibold text-sm text-gray-800">Hunter IA</h4>
                                <div className="text-xs text-gray-500">Sourcing en cours...</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-blue-700"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            <Globe className="h-4 w-4 text-gray-500"/>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex items-center p-1.5 bg-gray-50 rounded-lg">
                            <img src="https://i.pravatar.cc/32?u=a" alt="avatar" className="w-7 h-7 rounded-full"/>
                            <div className="ml-2 text-xs font-medium text-gray-700">Alice Martin - Dev Fullstack</div>
                        </div>
                        <div className="flex items-center p-1.5 bg-gray-50 rounded-lg">
                            <img src="https://i.pravatar.cc/32?u=b" alt="avatar" className="w-7 h-7 rounded-full"/>
                            <div className="ml-2 text-xs font-medium text-gray-700">Bob Dupont - Ingénieur Logiciel</div>
                        </div>
                        <div className="flex items-center p-1.5 bg-gray-50 rounded-lg">
                            <img src="https://i.pravatar.cc/32?u=c" alt="avatar" className="w-7 h-7 rounded-full"/>
                            <div className="ml-2 text-xs font-medium text-gray-700">Clara Petit - Spécialiste React</div>
                        </div>
                         <div className="flex items-center p-1.5 bg-gray-50 rounded-lg opacity-60">
                            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold">42+</div>
                            <div className="ml-2 text-xs font-medium text-gray-500">autres profils sourcés...</div>
                        </div>
                    </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-geist font-bold text-gray-900 mb-2">
                  Automatisez votre sourcing
                </h3>
                <p className="text-gray-600 text-sm leading-6">
                  Découvrez des talents cachés en déclenchant des actions de sourcing IA pour automatiser les tâches répétitives.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section - New Carousel Design */}
      <section className="py-12 md:py-20 px-2 md:px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-geist font-bold text-gray-900 mb-4 md:mb-0">
              Conçu pour les équipes RH qui visent l'excellence
            </h2>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-0 md:-ml-8">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-0 md:pl-8 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-gray-50 rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full min-h-[320px] hover:shadow-lg transition-shadow duration-300">
                    <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
                      "{testimonial.comment}"
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                      </div>
                      <img src={testimonial.logo} alt={testimonial.companyName} className="h-8 max-w-[120px] object-contain"/>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex gap-2 items-center absolute -top-20 right-0">
               <CarouselPrevious className="static translate-y-0 bg-white border-gray-200 hover:bg-gray-100 text-gray-600 hover:text-gray-900" />
               <CarouselNext className="static translate-y-0 bg-white border-gray-200 hover:bg-gray-100 text-gray-600 hover:text-gray-900" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 bg-white/90 bg-gradient-to-b from-blue-100/60 via-white/90 to-white/100 transition-all duration-500"
        // On conserve mobile-friendliness et fondu avec le reste du site grâce à un dégradé doux et de l'opacité
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-geist font-bold mb-6 text-gray-900">
            Prêt à révolutionner votre recrutement ?
          </h2>
          <p className="text-xl mb-8 text-blue-500">
            Rejoignez les centaines de RH qui ont déjà adopté l'IA pour recruter plus efficacement
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/subscription')}
              className="inline-flex items-center justify-center gap-3 bg-white text-blue-600 border border-blue-500 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600 font-semibold px-8 py-4 rounded-2xl shadow transition-colors duration-200 text-lg h-12"
            >
              <Zap className="h-5 w-5 mr-2" />
              {t('common.getStarted')}
            </button>
            <button
              onClick={() => navigate('/schedule-demo')}
              className="inline-flex items-center justify-center gap-2 border border-blue-500 text-blue-600 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600 font-semibold px-8 py-4 rounded-2xl shadow transition-colors duration-200 text-lg h-12"
            >
              {t('common.planDemo')}
            </button>
          </div>
          <p className="text-sm text-blue-400 mt-6">
            Essai gratuit • Sans engagement • Support dédié
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="/lovable-uploads/fdc4d16b-8516-4b74-b559-2340f062242b.png" 
              alt="RHIA Copilot Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="font-semibold text-lg">RHIA Copilot</span>
          </div>
          <p className="text-gray-400 mb-6">
            L'IA Copilote qui révolutionne le recrutement moderne
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-400">
            <button onClick={() => navigate('/subscription')} className="hover:text-white">
              Plans & Tarifs
            </button>
            <button onClick={() => navigate('/login')} className="hover:text-white">
              Connexion
            </button>
            <span>Contact</span>
            <button onClick={() => navigate('/privacy')} className="hover:text-white">
              Confidentialité
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Presentation;
