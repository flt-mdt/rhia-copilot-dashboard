
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

  const handleSubmitRequest = () => {
    if (!email || !topic) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Demande envoyée",
      description: "Nous vous contacterons sous peu",
    });
    setEmail("");
    setTopic("");
  };

  const helpCategories = [
    {
      icon: BookOpen,
      title: "Prise en main",
      description: "Tout ce que vous devez savoir pour commencer à utiliser RHIA Copilot efficacement.",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Settings,
      title: "Configuration Système",
      description: "Apprenez à configurer votre espace de travail et vos préférences utilisateur.",
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      icon: Server,
      title: "Intégrations",
      description: "Connectez et automatisez vos outils RH. Découvrez la puissance des intégrations.",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: UserCog,
      title: "Connexion et Vérification",
      description: "Découvrez comment vous connecter avec votre adresse email ou vos comptes Apple et Google.",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Users,
      title: "Configuration du Compte",
      description: "Ajustez vos profils et préférences pour optimiser l'expérience RHIA Copilot.",
      color: "text-pink-600",
      bgColor: "bg-pink-100"
    },
    {
      icon: Shield,
      title: "Confiance & Sécurité",
      description: "Découvrez nos mesures de sécurité et comment nous protégeons vos données RH.",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
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
      className="min-h-screen bg-white transition-all duration-300 ease-in-out"
      style={{ marginLeft: 'var(--sidebar-width, 256px)' }}
    >
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Contact Section */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Left Column - Contact Form */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Nous Contacter</h1>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Utilisez RHIA Copilot ? Connectez-vous pour que nous puissions vous aider. 
              Si ce n'est pas possible, envoyez-nous votre demande manuellement.
            </p>
          </div>

          {/* Right Column - Form */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium mb-2 block">Votre Adresse Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base"
              />
            </div>

            <div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {supportTopics.map((topicOption) => (
                  <Button
                    key={topicOption}
                    variant={topic === topicOption ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTopic(topicOption)}
                    className="text-sm py-2 h-auto whitespace-normal"
                  >
                    {topicOption}
                  </Button>
                ))}
              </div>
            </div>

            <div className="text-center text-gray-400 font-medium">OU</div>

            <div>
              <Label htmlFor="custom-topic" className="text-gray-700 font-medium mb-2 block">
                Vous ne trouvez pas votre sujet ? Décrivez-le ci-dessous :
              </Label>
              <Textarea
                id="custom-topic"
                placeholder="Entrez votre sujet"
                value={topic.includes("Décrivez votre problème") ? topic : ""}
                onChange={(e) => setTopic(e.target.value)}
                className="min-h-[80px] text-base"
                rows={3}
              />
            </div>

            <Button 
              onClick={handleSubmitRequest}
              className="w-full bg-gray-800 hover:bg-gray-900 h-12 text-base font-medium"
            >
              Envoyer votre demande
            </Button>
          </div>
        </div>

        {/* Help Categories Section */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Besoin d'Aide ?</h2>
          <p className="text-gray-600 mb-12 text-lg">
            Une réponse rapide ? Sélectionnez votre référence ci-dessous pour nos réponses.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCategories.map((category) => (
              <div key={category.title} className="text-center cursor-pointer group">
                <div className={`w-16 h-16 rounded-full ${category.bgColor} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <category.icon className={`h-8 w-8 ${category.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
