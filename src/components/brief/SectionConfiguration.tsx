
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { UserPreferences } from '@/services/briefBackendApi';

// Les 18 sections canoniques du brief
const SECTION_IDS = [
  "Titre & Job Family",
  "Contexte & Business Case", 
  "Finalité/Mission",
  "Objectifs & KPIs",
  "Responsabilités clés",
  "Périmètre budgétaire & managérial",
  "Environnement & contraintes",
  "Compétences & exigences",
  "Qualifications & expériences",
  "Employee Value Proposition",
  "Perspectives d'évolution",
  "Rémunération & avantages",
  "Cadre contractuel",
  "Mesure de la performance & cadence",
  "Parties prenantes & RACI",
  "Inclusion, conformité & sécurité",
  "Onboarding & développement",
  "Processus de recrutement"
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
    <Card>
      <CardHeader>
        <CardTitle>Configuration du Brief</CardTitle>
        <p className="text-sm text-gray-600">
          Sélectionnez les sections à inclure dans votre brief de poste
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contrôles globaux */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={selectedCount === 18}
                onCheckedChange={toggleAllSections}
              />
              <span className="text-sm font-medium">Tout sélectionner</span>
            </div>
            <p className="text-xs text-gray-500">
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
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>

            <Select 
              value={preferences.seniority} 
              onValueChange={(value: UserPreferences['seniority']) => 
                onPreferencesChange({...preferences, seniority: value})
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Stagiaire">Stagiaire</SelectItem>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
                <SelectItem value="C-level">C-level</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Liste des sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
          {SECTION_IDS.map((section, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 border rounded">
              <Checkbox
                checked={preferences.sections[index] || false}
                onCheckedChange={(checked) => handleSectionToggle(index, Boolean(checked))}
              />
              <span className="text-sm">{section}</span>
            </div>
          ))}
        </div>

        <Button 
          onClick={onNext} 
          disabled={selectedCount === 0}
          className="w-full"
        >
          Continuer vers la saisie des données
        </Button>
      </CardContent>
    </Card>
  );
};

export default SectionConfiguration;
