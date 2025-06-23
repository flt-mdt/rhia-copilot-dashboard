
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Settings, 
  Server, 
  Shield, 
  UserCog, 
  Users, 
  HelpCircle,
  MessageSquare,
  BookOpen,
  Wrench
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
      bgColor: "bg-green-50"
    },
    {
      icon: Settings,
      title: "Configuration Système",
      description: "Apprenez à configurer votre espace de travail et vos préférences utilisateur.",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Server,
      title: "Intégrations",
      description: "Connectez et automatisez vos outils RH. Découvrez la puissance des intégrations.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: UserCog,
      title: "Gestion des Comptes",
      description: "Authentification, gestion des utilisateurs et configuration des équipes.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Users,
      title: "Gestion des Candidats",
      description: "Ajustez vos profils et préférences pour optimiser l'expérience candidat.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Shield,
      title: "Sécurité & Confidentialité",
      description: "Découvrez nos mesures de sécurité et comment nous protégeons vos données RH.",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const supportTopics = [
    "Gestion des candidats",
    "Création d'offres d'emploi", 
    "Hunter de profils",
    "Brief avec l'IA",
    "Analytics et rapports",
    "Intégrations",
    "Facturation",
    "Sécurité des données"
  ];

  return (
    <div 
      className="min-h-screen bg-gray-50 transition-all duration-300 ease-in-out"
      style={{ marginLeft: 'var(--sidebar-width, 256px)' }}
    >
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Centre d'Aide</h1>
          <p className="text-gray-600">
            Utilisez RHIA Copilot ? Connectez-vous pour que nous puissions vous aider. 
            Si ce n'est pas possible, envoyez-nous votre demande manuellement.
          </p>
        </div>

        {/* Contact Form */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Nous Contacter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Votre Adresse Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div></div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Sélectionnez votre sujet :</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {supportTopics.map((topicOption) => (
                  <Button
                    key={topicOption}
                    variant={topic === topicOption ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTopic(topicOption)}
                    className="text-xs"
                  >
                    {topicOption}
                  </Button>
                ))}
              </div>
            </div>

            <div className="text-center text-gray-500 text-sm">OU</div>

            <div>
              <Label htmlFor="custom-topic">Vous ne trouvez pas votre sujet ? Décrivez-le ci-dessous :</Label>
              <Textarea
                id="custom-topic"
                placeholder="Décrivez votre problème ou question..."
                value={topic.includes("Décrivez votre problème") ? topic : ""}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>

            <Button 
              onClick={handleSubmitRequest}
              className="w-full bg-gray-800 hover:bg-gray-900"
            >
              Envoyer votre demande
            </Button>
          </CardContent>
        </Card>

        {/* Help Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Besoin d'Aide ?</h2>
          <p className="text-gray-600 mb-6">
            Une réponse rapide ? Sélectionnez votre référence ci-dessous pour nos réponses.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category) => (
              <Card key={category.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center mb-3`}>
                    <category.icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {category.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Actions Rapides
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Documentation API</div>
                <div className="text-sm text-gray-500">Intégrez RHIA Copilot à vos outils</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Tutoriels Vidéo</div>
                <div className="text-sm text-gray-500">Guides pas à pas</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Planifier une Démo</div>
                <div className="text-sm text-gray-500">Session personnalisée</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
