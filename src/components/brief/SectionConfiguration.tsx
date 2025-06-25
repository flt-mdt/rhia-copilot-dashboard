
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { UserPreferences } from '@/services/briefBackendApi';
import { FileText, Target, Users, Briefcase, Globe, Award, DollarSign, Clock, Shield, TrendingUp } from 'lucide-react';

// Les 18 sections canoniques du brief avec leurs icônes
const SECTION_DATA = [
  { id: "Titre & Job Family", icon: FileText, color: "bg-orange-100 text-orange-600" },
  { id: "Contexte & Business Case", icon: Briefcase, color: "bg-blue-100 text-blue-600" },
  { id: "Finalité/Mission", icon: Target, color: "bg-green-100 text-green-600" },
  { id: "Objectifs & KPIs", icon: TrendingUp, color: "bg-purple-100 text-purple-600" },
  { id: "Responsabilités clés", icon: Users, color: "bg-red-100 text-red-600" },
  { id: "Périmètre budgétaire & managérial", icon: DollarSign, color: "bg-yellow-100 text-yellow-600" },
  { id: "Environnement & contraintes", icon: Globe, color: "bg-cyan-100 text-cyan-600" },
  { id: "Compétences & exigences", icon: Award, color: "bg-indigo-100 text-indigo-600" },
  { id: "Qualifications & expériences", icon: Shield, color: "bg-pink-100 text-pink-600" },
  { id: "Employee Value Proposition", icon: Target, color: "bg-teal-100 text-teal-600" },
  { id: "Perspectives d'évolution", icon: TrendingUp, color: "bg-emerald-100 text-emerald-600" },
  { id: "Rémunération & avantages", icon: DollarSign, color: "bg-amber-100 text-amber-600" },
  { id: "Cadre contractuel", icon: FileText, color: "bg-slate-100 text-slate-600" },
  { id: "Mesure de la performance & cadence", icon: Clock, color: "bg-violet-100 text-violet-600" },
  { id: "Parties prenantes & RACI", icon: Users, color: "bg-rose-100 text-rose-600" },
  { id: "Inclusion, conformité & sécurité", icon: Shield, color: "bg-lime-100 text-lime-600" },
  { id: "Onboarding & développement", icon: Award, color: "bg-sky-100 text-sky-600" },
  { id: "Processus de recrutement", icon: Briefcase, color: "bg-fuchsia-100 text-fuchsia-600" }
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

      {/* Grille des sections avec style moderne */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTION_DATA.map((section, index) => {
          const Icon = section.icon;
          const isSelected = preferences.sections[index] || false;
          
          return (
            <div
              key={index}
              className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                isSelected 
                  ? 'border-blue-300 bg-blue-50 shadow-md' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => handleSectionToggle(index, !isSelected)}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${section.color} flex-shrink-0`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => {}} // Géré par le onClick du parent
                      className="h-5 w-5"
                    />
                    {isSelected && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 leading-tight">
                    {section.id}
                  </h3>
                </div>
              </div>
              
              {/* Bouton + dans le coin */}
              <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                isSelected 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}>
                <span className="text-lg font-light">
                  {isSelected ? '✓' : '+'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bouton de continuation */}
      <div className="flex justify-center pt-6">
        <Button 
          onClick={onNext} 
          disabled={selectedCount === 0}
          size="lg"
          className="px-8 py-4 text-base font-medium bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
        >
          Continuer vers la saisie des données
          <span className="ml-2">→</span>
        </Button>
      </div>
    </div>
  );
};

export default SectionConfiguration;
