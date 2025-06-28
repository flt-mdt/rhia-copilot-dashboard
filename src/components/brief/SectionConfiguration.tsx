import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Target, Users, Building, Zap, CheckCircle, Lock, Loader2, AlertCircle } from 'lucide-react';
import { UserPreferences } from '@/services/briefBackendApi';
import { useToast } from '@/hooks/use-toast';

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
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');

  const SECTION_NAMES = [
    "Titre & Job Family", "Contexte & Business Case", "Finalité/Mission", "Objectifs & KPIs",
    "Responsabilités clés", "Périmètre budgétaire & managérial", "Environnement & contraintes",
    "Compétences & exigences", "Qualifications & expériences", "Employee Value Proposition",
    "Perspectives d'évolution", "Rémunération & avantages", "Cadre contractuel",
    "Mesure de la performance & cadence", "Parties prenantes & RACI",
    "Inclusion, conformité & sécurité", "Onboarding & développement", "Processus de recrutement"
  ];

  const SECTION_CATEGORIES = {
    "Définition du poste": [0, 1, 2, 3, 4],
    "Profil recherché": [5, 6, 7, 8],
    "Environnement & Culture": [9, 10, 11, 12],
    "Process & Suivi": [13, 14, 15, 16, 17]
  };

  // S'assurer que la première section est toujours cochée
  useEffect(() => {
    if (!preferences.sections[0]) {
      const newSections = [...preferences.sections];
      newSections[0] = true;
      onPreferencesChange({
        ...preferences,
        sections: newSections
      });
    }
  }, [preferences, onPreferencesChange]);

  const handleSectionChange = (index: number, checked: boolean) => {
    // Empêcher de décocher la première section
    if (index === 0 && !checked) {
      return;
    }

    const newSections = [...preferences.sections];
    newSections[index] = checked;
    onPreferencesChange({
      ...preferences,
      sections: newSections
    });
  };

  const handleLanguageChange = (language: 'fr' | 'en') => {
    onPreferencesChange({
      ...preferences,
      language
    });
  };

  const handleSeniorityChange = (seniority: 'Stagiaire' | 'Junior' | 'Senior' | 'C-level') => {
    onPreferencesChange({
      ...preferences,
      seniority
    });
  };

  const handleNextClick = async () => {
    console.log('=== CONFIGURATION SAVE PROCESS STARTED ===');
    console.log('Current preferences:', preferences);
    
    setIsLoading(true);
    setDebugInfo('Début de la sauvegarde...');
    
    try {
      setDebugInfo('Appel de onNext()...');
      await onNext();
      
      setDebugInfo('Configuration sauvegardée avec succès !');
      console.log('=== CONFIGURATION SAVED SUCCESSFULLY ===');
      
      toast({
        title: "Configuration sauvegardée",
        description: "Vos préférences ont été enregistrées avec succès.",
      });
    } catch (error) {
      console.error('=== ERROR SAVING CONFIGURATION ===');
      console.error('Error details:', error);
      
      setDebugInfo(`Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
      
      toast({
        title: "Erreur de sauvegarde",
        description: error instanceof Error ? error.message : "Impossible de sauvegarder la configuration. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedCount = preferences.sections.filter(Boolean).length;
  const canProceed = selectedCount >= 1;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Debug Info Panel (développement) */}
      {debugInfo && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-yellow-800">Debug: {debugInfo}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* En-tête */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Configuration de votre brief</h2>
        <p className="text-lg text-gray-600">
          Personnalisez les sections à inclure dans votre brief de recrutement
        </p>
        <div className="max-w-md mx-auto">
          <Progress value={(selectedCount / SECTION_NAMES.length) * 100} className="h-2" />
          <p className="text-sm text-gray-500 mt-2">
            {selectedCount} section{selectedCount > 1 ? 's' : ''} sélectionnée{selectedCount > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Paramètres généraux */}
      <Card className="border-2 border-blue-100 bg-blue-50/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>Paramètres généraux</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Langue du brief</label>
              <div className="flex space-x-2">
                <Button
                  variant={preferences.language === 'fr' ? 'default' : 'outline'}
                  onClick={() => handleLanguageChange('fr')}
                  className="rounded-xl"
                  disabled={isLoading}
                >
                  Français
                </Button>
                <Button
                  variant={preferences.language === 'en' ? 'default' : 'outline'}
                  onClick={() => handleLanguageChange('en')}
                  className="rounded-xl"
                  disabled={isLoading}
                >
                  English
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Niveau de séniorité</label>
              <div className="grid grid-cols-2 gap-2">
                {['Stagiaire', 'Junior', 'Senior', 'C-level'].map((level) => (
                  <Button
                    key={level}
                    variant={preferences.seniority === level ? 'default' : 'outline'}
                    onClick={() => handleSeniorityChange(level as any)}
                    className="rounded-xl text-sm"
                    disabled={isLoading}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sections par catégorie */}
      <div className="space-y-6">
        {Object.entries(SECTION_CATEGORIES).map(([category, sectionIndices]) => (
          <Card key={category} className="border-2 border-gray-100 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <Building className="h-5 w-5 text-blue-600" />
                <span>{category}</span>
                <Badge variant="outline" className="ml-auto">
                  {sectionIndices.filter(i => preferences.sections[i]).length}/{sectionIndices.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sectionIndices.map((sectionIndex) => (
                  <div 
                    key={sectionIndex}
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all ${
                      preferences.sections[sectionIndex] 
                        ? 'border-blue-200 bg-blue-50' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    } ${sectionIndex === 0 ? 'opacity-100' : ''}`}
                  >
                    <div className="relative">
                      <Checkbox
                        id={`section-${sectionIndex}`}
                        checked={preferences.sections[sectionIndex]}
                        onCheckedChange={(checked) => handleSectionChange(sectionIndex, checked as boolean)}
                        disabled={sectionIndex === 0 || isLoading}
                        className="h-5 w-5"
                      />
                      {sectionIndex === 0 && (
                        <Lock className="h-3 w-3 text-blue-600 absolute -top-1 -right-1" />
                      )}
                    </div>
                    <div className="flex-1">
                      <label 
                        htmlFor={`section-${sectionIndex}`}
                        className={`text-sm font-medium cursor-pointer ${
                          sectionIndex === 0 ? 'text-blue-700' : 'text-gray-900'
                        }`}
                      >
                        {SECTION_NAMES[sectionIndex]}
                        {sectionIndex === 0 && (
                          <Badge variant="default" className="ml-2 bg-blue-100 text-blue-800 text-xs">
                            Obligatoire
                          </Badge>
                        )}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-end pt-6">
        <Button 
          onClick={handleNextClick}
          disabled={!canProceed || isLoading}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-medium"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Sauvegarde en cours...
            </>
          ) : (
            <>
              Continuer vers la saisie
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SectionConfiguration;
