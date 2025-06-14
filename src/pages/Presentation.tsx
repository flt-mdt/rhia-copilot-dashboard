
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  LogIn
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
      name: "Marie Dubois",
      role: "Directrice RH - TechCorp",
      comment: "RHIA a révolutionné notre processus de recrutement. Nous gagnons 70% de temps sur l'analyse des candidatures.",
      rating: 5
    },
    {
      name: "Pierre Martin",
      role: "Consultant RH - Talent Solutions",
      comment: "L'IA de sourcing nous a permis de trouver des profils que nous n'aurions jamais découverts autrement.",
      rating: 5
    },
    {
      name: "Sophie Laurent",
      role: "Responsable Recrutement - InnovateCorp",
      comment: "Le matching automatique est d'une précision impressionnante. Nos embauches sont plus pertinentes.",
      rating: 5
    }
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
          <h1 className="text-5xl md:text-6xl font-normal text-gray-900 mb-8 leading-tight">
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

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-blue-600 mb-2">70%</div>
              <div className="text-gray-600">de temps gagné sur l'analyse</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-green-600 mb-2">5x</div>
              <div className="text-gray-600">plus de candidats qualifiés</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">de précision dans le matching</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-orange-600 mb-2">24h</div>
              <div className="text-gray-600">pour sourcer un profil rare</div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section - New Design */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
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

              <h3 className="text-xl font-bold text-gray-900 mb-4">Analyse des candidats</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Analyse intelligente de candidatures automatisée</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Score de matching objectif basé sur l'IA</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Lecture automatique des CV et lettres de motivation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Élimination des biais de recrutement</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/subscription')}
                className="text-green-700 text-sm hover:text-green-800 font-medium"
              >
                En savoir plus
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

              <h3 className="text-xl font-bold text-gray-900 mb-4">Brief avec l'IA</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Génération de briefs ultra-précis avec l'IA</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Conversation intelligente pour affiner vos attentes</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Mise en lumière des soft skills et fit culturel</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Formalisation des besoins avec précision inégalée</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/subscription')}
                className="text-red-700 text-sm hover:text-red-800 font-medium"
              >
                En savoir plus
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

              <h3 className="text-xl font-bold text-gray-900 mb-4">Hunter - Sourcing IA</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">IA qui scanne Internet pour sourcer les meilleurs profils</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Scraping intelligent (LinkedIn, GitHub, portfolios)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Accès aux candidats passifs difficilement accessibles</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Sourcing automatisé et ciblé par l'IA</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/subscription')}
                className="text-blue-700 text-sm hover:text-blue-800 font-medium"
              >
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi RHIA est différent d'un ATS classique ?
            </h2>
            <p className="text-xl text-gray-600">
              Une comparaison claire de nos avantages concurrentiels
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-600 mb-2">RHIA Copilot</h3>
                <p className="text-gray-600">IA Copilote avancée</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-600 mb-2">VS</h3>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-400 mb-2">ATS Classique</h3>
                <p className="text-gray-500">Gestion basique</p>
              </div>
            </div>

            <div className="space-y-4">
              {advantages.map((advantage, index) => (
                <div key={index} className="grid md:grid-cols-3 gap-4 py-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">{advantage.rhia}</span>
                  </div>
                  <div className="text-center">
                    <ArrowRight className="h-5 w-5 text-gray-400 mx-auto" />
                  </div>
                  <div className="flex items-center gap-2 text-red-400">
                    <span className="w-5 h-5 border-2 border-red-400 rounded-full flex items-center justify-center text-xs">✗</span>
                    <span>{advantage.ats}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les témoignages de nos clients satisfaits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.comment}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
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
