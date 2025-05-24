
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

  const features = [
    {
      icon: Brain,
      title: "Analyse intelligente de candidatures",
      description: "L'IA lit, comprend et analyse automatiquement CV, lettres de motivation et vidéos pour calculer un score de matching objectif.",
      impact: "Gagnez du temps, objectivisez vos choix, éliminez les biais",
      color: "bg-blue-500"
    },
    {
      icon: Briefcase,
      title: "Gestion d'offres et candidatures",
      description: "Créez des fiches de poste, associez des candidats et suivez leur évolution dans un dashboard personnalisé centralisé.",
      impact: "Tout est centralisé, fluide, simple et connecté",
      color: "bg-green-500"
    },
    {
      icon: MessageSquare,
      title: "RHIA Copilot - Assistant personnel RH",
      description: "Générez des briefs ultra-précis avec l'IA, affinez vos attentes et mettez en lumière les soft skills et fit culturel.",
      impact: "Formalisez vos besoins avec une précision inégalée",
      color: "bg-purple-500"
    },
    {
      icon: Search,
      title: "Hunter - Sourcing IA avancé",
      description: "L'IA scanne Internet pour sourcer les meilleurs profils via un scraping intelligent (LinkedIn, GitHub, portfolios).",
      impact: "Trouvez des candidats passifs difficilement accessibles",
      color: "bg-orange-500"
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with Sign In */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/fdc4d16b-8516-4b74-b559-2340f062242b.png" 
              alt="RHIA Copilot Logo" 
              className="h-10 w-10 object-contain"
            />
            <span className="font-semibold text-xl text-gray-900">RHIA Copilot</span>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/login')}
            className="flex items-center gap-2"
          >
            <LogIn className="h-4 w-4" />
            Se connecter
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Bien plus qu'un ATS.
            <span className="block text-blue-600 mt-2">Une IA Copilote pour les RH modernes.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 animate-fade-in">
            Automatisez votre processus de recrutement avec notre IA avancée. 
            Analysez, sourcez et décidez avec une précision inégalée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button 
              size="lg" 
              onClick={() => navigate('/subscription')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
            >
              <Zap className="h-5 w-5 mr-2" />
              Testez gratuitement maintenant
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/subscription')}
              className="px-8 py-4 text-lg font-semibold"
            >
              Voir les plans tarifaires
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
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

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités révolutionnaires
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment RHIA transforme chaque étape de votre processus de recrutement
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 animate-fade-in border-l-4" style={{borderLeftColor: feature.color.replace('bg-', '#')}}>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">Impact : {feature.impact}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi RHIA est différent d'un ATS classique ?
            </h2>
            <p className="text-xl text-gray-600">
              Une comparaison claire de nos avantages concurrentiels
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
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
      <section className="py-20 px-4">
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
            <span>Confidentialité</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Presentation;
