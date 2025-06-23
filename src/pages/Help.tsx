
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedTitle } from "@/components/ui/animated-title";
import { AnimatedCard } from "@/components/ui/animated-card";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { 
  Settings, 
  Server, 
  Shield, 
  UserCog, 
  Users, 
  BookOpen,
  MessageSquare
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Help = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitRequest = async () => {
    if (!email || !topic) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call with loading animation
    setTimeout(() => {
      toast({
        title: "Demande envoyée",
        description: "Nous vous contacterons sous peu",
      });
      setEmail("");
      setTopic("");
      setIsSubmitting(false);
    }, 2000);
  };

  const helpCategories = [
    {
      icon: BookOpen,
      title: "Prise en main",
      description: "Tout ce que vous devez savoir pour commencer à utiliser RHIA Copilot efficacement.",
      color: "text-green-600",
      bgColor: "bg-green-100",
      hoverColor: "hover:bg-green-200"
    },
    {
      icon: Settings,
      title: "Configuration Système",
      description: "Apprenez à configurer votre espace de travail et vos préférences utilisateur.",
      color: "text-red-600",
      bgColor: "bg-red-100",
      hoverColor: "hover:bg-red-200"
    },
    {
      icon: Server,
      title: "Intégrations",
      description: "Connectez et automatisez vos outils RH. Découvrez la puissance des intégrations.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      hoverColor: "hover:bg-blue-200"
    },
    {
      icon: UserCog,
      title: "Connexion et Vérification",
      description: "Découvrez comment vous connecter avec votre adresse email ou vos comptes Apple et Google.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      hoverColor: "hover:bg-blue-200"
    },
    {
      icon: Users,
      title: "Configuration du Compte",
      description: "Ajustez vos profils et préférences pour optimiser l'expérience RHIA Copilot.",
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      hoverColor: "hover:bg-pink-200"
    },
    {
      icon: Shield,
      title: "Confiance & Sécurité",
      description: "Découvrez nos mesures de sécurité et comment nous protégeons vos données RH.",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      hoverColor: "hover:bg-orange-200"
    }
  ];

  const supportTopics = [
    "Gestion des candidats",
    "Création d'offres d'emploi", 
    "Hunter de profils",
    "Brief avec l'IA",
    "Analytics et rapports",
    "Intégrations"
  ];

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 transition-all duration-300 ease-in-out relative overflow-hidden"
      style={{ marginLeft: 'var(--sidebar-width, 256px)' }}
    >
      {/* Floating background particles */}
      <FloatingParticles />
      
      <div className="max-w-7xl mx-auto px-8 py-16 relative z-10">
        {/* Contact Section */}
        <div className="grid lg:grid-cols-2 gap-20 mb-24">
          {/* Left Column - Animated Contact Info */}
          <div className="pr-8">
            <AnimatedTitle
              words={["Nous Contacter", "Aide & Support", "Assistance RHIA"]}
              className="text-5xl font-bold text-gray-900 mb-6 leading-tight"
            />
            <div className="animate-fade-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Utilisez RHIA Copilot ? Connectez-vous pour que nous puissions vous aider. 
                Si ce n'est pas possible, envoyez-nous votre demande manuellement.
              </p>
            </div>
          </div>

          {/* Right Column - Animated Form */}
          <AnimatedCard delay={800} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-8 hover:shadow-xl transition-all duration-500">
            <div className="space-y-6">
              <div className="group">
                <Label htmlFor="email" className="text-gray-700 font-medium mb-3 block text-sm transition-colors group-focus-within:text-blue-600">
                  Votre Adresse Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                />
              </div>

              <div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {supportTopics.map((topicOption, index) => (
                    <Button
                      key={topicOption}
                      variant={topic === topicOption ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTopic(topicOption)}
                      className={`text-sm py-3 h-auto whitespace-normal text-left justify-start font-normal transition-all duration-300 hover:scale-105 active:scale-95 ${
                        topic === topicOption 
                          ? "bg-gray-900 text-white hover:bg-gray-800 shadow-lg animate-glow" 
                          : "bg-white/70 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {topicOption}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="text-center text-gray-400 font-medium text-sm relative">
                <span className="bg-white/80 px-4 relative z-10">OU</span>
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
              </div>

              <div className="group">
                <Label htmlFor="custom-topic" className="text-gray-700 font-medium mb-3 block text-sm transition-colors group-focus-within:text-blue-600">
                  Vous ne trouvez pas votre sujet ? Décrivez-le ci-dessous :
                </Label>
                <Textarea
                  id="custom-topic"
                  placeholder="Entrez votre sujet"
                  value={topic.includes("Décrivez votre problème") ? topic : ""}
                  onChange={(e) => setTopic(e.target.value)}
                  className="min-h-[100px] text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 focus:scale-[1.02] focus:shadow-lg resize-none"
                  rows={4}
                />
              </div>

              <Button 
                onClick={handleSubmitRequest}
                disabled={isSubmitting}
                className="w-full bg-gray-900 hover:bg-gray-800 h-12 text-base font-medium rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-lg relative overflow-hidden group"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Envoi en cours...</span>
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">Envoyer votre demande</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                )}
              </Button>
            </div>
          </AnimatedCard>
        </div>

        {/* Help Categories Section */}
        <div className="px-4">
          <AnimatedCard delay={1200}>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Besoin d'Aide ?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Une réponse rapide ? Sélectionnez votre référence ci-dessous pour nos réponses.
              </p>
            </div>
          </AnimatedCard>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {helpCategories.map((category, index) => (
              <AnimatedCard
                key={category.title}
                delay={1400 + (index * 150)}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-8 text-center cursor-pointer group border border-gray-200/50 hover:border-gray-300/70 hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-[1.02]"
              >
                <div className={`w-16 h-16 rounded-full ${category.bgColor} ${category.hoverColor} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500 animate-pulse-slow group-hover:animate-bounce-subtle shadow-lg group-hover:shadow-xl`}>
                  <category.icon className={`h-8 w-8 ${category.color} transition-all duration-300 group-hover:scale-110`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base group-hover:text-gray-700 transition-colors duration-300">
                  {category.description}
                </p>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/30 group-hover:to-purple-50/30 rounded-xl transition-all duration-500 pointer-events-none"></div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>

      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 pointer-events-none animate-pulse-slow"></div>
    </div>
  );
};

export default Help;
