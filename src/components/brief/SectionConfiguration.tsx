import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { UserPreferences, briefBackendApi } from '@/services/briefBackendApi';
import { FileText, Target, Users, Briefcase, Globe, Award, DollarSign, Clock, Shield, TrendingUp, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Les 18 sections canoniques du brief avec leurs icônes et couleurs
const SECTION_DATA = [
  { id: "Titre & Job Family", icon: FileText, bgColor: "bg-orange-100", iconColor: "text-orange-600" },
  { id: "Contexte & Business Case", icon: Briefcase, bgColor: "bg-blue-100", iconColor: "text-blue-600" },
  { id: "Finalité/Mission", icon: Target, bgColor: "bg-green-100", iconColor: "text-green-600" },
  { id: "Objectifs & KPIs", icon: TrendingUp, bgColor: "bg-purple-100", iconColor: "text-purple-600" },
  { id: "Responsabilités clés", icon: Users, bgColor: "bg-red-100", iconColor: "text-red-600" },
  { id: "Périmètre budgétaire & managérial", icon: DollarSign, bgColor: "bg-yellow-100", iconColor: "text-yellow-600" },
  { id: "Environnement & contraintes", icon: Globe, bgColor: "bg-cyan-100", iconColor: "text-cyan-600" },
  { id: "Compétences & exigences", icon: Award, bgColor: "bg-indigo-100", iconColor: "text-indigo-600" },
  { id: "Qualifications & expériences", icon: Shield, bgColor: "bg-pink-100", iconColor: "text-pink-600" },
  { id: "Employee Value Proposition", icon: Target, bgColor: "bg-teal-100", iconColor: "text-teal-600" },
  { id: "Perspectives d'évolution", icon: TrendingUp, bgColor: "bg-emerald-100", iconColor: "text-emerald-600" },
  { id: "Rémunération & avantages", icon: DollarSign, bgColor: "bg-amber-100", iconColor: "text-amber-600" },
  { id: "Cadre contractuel", icon: FileText, bgColor: "bg-slate-100", iconColor: "text-slate-600" },
  { id: "Mesure de la performance & cadence", icon: Clock, bgColor: "bg-violet-100", iconColor: "text-violet-600" },
  { id: "Parties prenantes & RACI", icon: Users, bgColor: "bg-rose-100", iconColor: "text-rose-600" },
  { id: "Inclusion, conformité & sécurité", icon: Shield, bgColor: "bg-lime-100", iconColor: "text-lime-600" },
  { id: "Onboarding & développement", icon: Award, bgColor: "bg-sky-100", iconColor: "text-sky-600" },
  { id: "Processus de recrutement", icon: Briefcase, bgColor: "bg-fuchsia-100", iconColor: "text-fuchsia-600" }
];

interface SectionConfigurationProps {
  preferences: UserPreferences;
  onPreferencesChange: (preferences: UserPreferences) => void;
  onNext: () => void;
}

const SectionConfiguration: React.FC<SectionConfigurationProps> = ({
  preferences,
  onPreferencesChange,
  onNext
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSectionToggle = (index: number, checked: boolean) => {
    const newSections = [...preferences.sections];
    newSections[index] = checked;
    onPreferencesChange({
      ...preferences,
      sections: newSections
    });
  };

  const toggleAllSections = (checked: boolean) => {
    onPreferencesChange({
      ...preferences,
      sections: new Array(18).fill(checked)
    });
  };

  const handleNext = async () => {
    setIsLoading(true);
    try {
      // Sauvegarder les préférences vers l'API
      await briefBackendApi.sendUserPreferences(preferences);
      
      toast({
        title: "Configuration sauvegardée",
        description: "Vos préférences ont été enregistrées avec succès.",
      });
      
      onNext();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la configuration. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedCount = preferences.sections.filter(Boolean).length;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Configuration du Brief</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Sélectionnez les sections à inclure dans votre brief de poste personnalisé
        </p>
      </div>

      {/* Contrôles globaux */}
      <Card className="border-2 border-gray-100 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedCount === 18}
                  onCheckedChange={toggleAllSections}
                  className="h-5 w-5"
                />
                <span className="text-base font-medium text-gray-900">Tout sélectionner</span>
              </div>
              <p className="text-sm text-gray-500 ml-8">
                {selectedCount} section{selectedCount > 1 ? 's' : ''} sélectionnée{selectedCount > 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Select 
                value={preferences.language} 
                onValueChange={(value: 'fr' | 'en') => 
                  onPreferencesChange({...preferences, language: value})
                }
              >
                <SelectTrigger className="w-36 h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">🇫🇷 Français</SelectItem>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={preferences.seniority} 
                onValueChange={(value: UserPreferences['seniority']) => 
                  onPreferencesChange({...preferences, seniority: value})
                }
              >
                <SelectTrigger className="w-44 h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Stagiaire">👶 Stagiaire</SelectItem>
                  <SelectItem value="Junior">🌱 Junior</SelectItem>
                  <SelectItem value="Senior">⭐ Senior</SelectItem>
                  <SelectItem value="C-level">👑 C-level</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grille des sections avec le style exact de l'image de référence */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {SECTION_DATA.map((section, index) => {
          const Icon = section.icon;
          const isSelected = preferences.sections[index] || false;
          
          return (
            <div
              key={index}
              className={`relative bg-white rounded-2xl border border-gray-200 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg group ${
                isSelected ? 'ring-2 ring-blue-500 shadow-md' : 'hover:border-gray-300'
              }`}
              onClick={() => handleSectionToggle(index, !isSelected)}
            >
              {/* Contenu de la carte avec alignement identique à l'image */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Icône avec arrière-plan coloré */}
                  <div className={`w-12 h-12 rounded-xl ${section.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-6 w-6 ${section.iconColor}`} />
                  </div>
                  
                  {/* Titre de la section */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 leading-tight">
                      {section.id}
                    </h3>
                  </div>
                </div>
                
                {/* Bouton + avec style exact de l'image */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  isSelected 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                }`}>
                  {isSelected ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bouton de continuation avec gestion du loading */}
      <div className="flex justify-center pt-6">
        <Button 
          onClick={handleNext} 
          disabled={selectedCount === 0 || isLoading}
          size="lg"
          className="px-8 py-4 text-base font-medium bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Sauvegarde...
            </>
          ) : (
            <>
              Continuer vers la saisie des données
              <span className="ml-2">→</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SectionConfiguration;
