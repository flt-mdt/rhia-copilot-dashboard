import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import IntegrationDiagram from '@/components/IntegrationDiagram';
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
  Rocket
} from 'lucide-react';

const Presentation = () => {
  const navigate = useNavigate();

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
    { name: "TotalEnergies", logo: "/lovable-uploads/65b214d1-d611-4de9-bb66-a774d9117c92.png" },
    { name: "Renault", logo: "/lovable-uploads/7c5623e7-5b59-4a3c-bce7-a32f13222272.png" },
    { name: "Air Liquide", logo: "/lovable-uploads/1ba73bc5-dccc-4e40-9a7b-bf976165a6fc.png" },
    { name: "CY Tech", logo: "/lovable-uploads/9274b791-b401-4ac1-a736-6cc21e124970.png" },
    { name: "Innovatech", logo: "/lovable-uploads/98ca04f1-5f60-4316-92e7-dfd967e16a19.png" }
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
              onClick={() => navigate('/subscription')}
              className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 hover:border-gray-400 font-medium px-6 py-2 rounded-full transition-colors duration-200 text-sm h-10"
            >
              Request a demo
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-full transition-colors duration-200 text-sm h-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-white">
                <path fill="currentColor" d="M5 12l5-5v3h8v4h-8v3l-5-5z"/>
              </svg>
              Sign in
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section - Updated Style */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-geist font-normal text-gray-900 mb-8 leading-tight">
            Bien plus qu'un ATS.
            <br />
            Une IA Copilote pour les 
            <br />
            RH modernes.
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            La plateforme pour automatiser votre processus de recrutement avec notre IA avancée,
            <br />
            connectée à vos outils d'entreprise et alimentée par les meilleurs modèles d'IA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/subscription')}
              className="inline-flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-2xl transition-colors duration-200 text-lg h-12"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-white">
                <path fill="currentColor" d="M5.33 15.929a13.064 13.064 0 0 1-.33-2.93c0-5.087 2.903-9.436 7-11.181C16.099 3.563 19 7.912 19 13c0 1.01-.114 1.991-.33 2.929l2.02 1.795a.5.5 0 0 1 .097.631l-2.457 4.096a.5.5 0 0 1-.782.096l-2.255-2.254a1 1 0 0 0-.707-.293H9.415a1 1 0 0 0-.707.293l-2.255 2.254a.5.5 0 0 1-.782-.096l-2.457-4.096a.5.5 0 0 1 .096-.63l2.02-1.796Zm6.67-2.93a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
              </svg>
              Get started
            </button>
            <button 
              onClick={() => navigate('/subscription')}
              className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 hover:border-gray-400 font-medium px-8 py-3 rounded-2xl transition-colors duration-200 text-lg h-12"
              aria-label="Planifier une démo"
            >
              Planifier une démo
            </button>
          </div>
        </div>
      </section>

      {/* Trusted by Section - Updated Style */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-geist font-normal text-gray-600 mb-8">
              Ils nous font confiance
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            {trustedPartners.map((partner, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center h-16 w-full"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="max-h-12 max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section - New Design */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-geist font-bold text-gray-900 mb-4">
              Quels outils allez-vous utiliser ou créer aujourd'hui ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos trois applications principales qui transforment votre processus de recrutement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Analyse des candidats */}
            <div className="bg-green-50 rounded-2xl p-8 relative overflow-hidden">
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
                Learn more
              </button>
            </div>

            {/* Brief avec l'IA */}
            <div className="bg-pink-50 rounded-2xl p-8 relative overflow-hidden">
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
                Learn more
              </button>
            </div>

            {/* Hunter - Sourcing IA */}
            <div className="bg-blue-50 rounded-2xl p-8 relative overflow-hidden">
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
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section - New Design matching the image */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="mb-6">
                <span className="text-blue-500 font-medium text-lg">RHIA pour le Recrutement</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-geist font-bold text-gray-900 mb-4 leading-tight">
                Automatisez Votre Processus,
                <br />
                Réduisez les Interruptions
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Centralisez l'analyse des candidatures, automatisez la documentation, et gardez votre équipe RH concentrée sur l'essentiel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/subscription')}
                  className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-full transition-colors duration-200 text-base"
                >
                  <Rocket className="h-4 w-4" />
                  Commencer maintenant
                </button>
                <button 
                  onClick={() => navigate('/subscription')}
                  className="inline-flex items-center justify-center gap-2 bg-transparent text-gray-700 hover:bg-gray-100 font-medium px-6 py-3 rounded-full transition-colors duration-200 text-base"
                >
                  Demander une démo
                </button>
              </div>
            </div>
            
            {/* Right Integration Diagram */}
            <div className="relative">
              <IntegrationDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - New Carousel Design */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-12">
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
            <CarouselContent className="-ml-8">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-8 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-gray-50 rounded-2xl p-8 flex flex-col justify-between h-full min-h-[320px] hover:shadow-lg transition-shadow duration-300">
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-geist font-bold mb-6">
            Prêt à révolutionner votre recrutement ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Rejoignez les centaines de RH qui ont déjà adopté l'IA pour recruter plus efficacement
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/subscription')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <Zap className="h-5 w-5 mr-2" />
              Commencer maintenant
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
              onClick={() => navigate('/subscription')}
            >
              Planifier une démo
            </Button>
          </div>
          <p className="text-sm text-blue-200 mt-6">
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
