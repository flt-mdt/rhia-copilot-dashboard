
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { UserPreferences, BriefData, briefBackendApi } from '@/services/briefBackendApi';
import SectionConfiguration from '@/components/brief/SectionConfiguration';
import SectionGenerator from '@/components/brief/SectionGenerator';
import FinalBriefPreview from '@/components/brief/FinalBriefPreview';

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

type Step = 'config' | 'generation' | 'preview';

const BriefNew = () => {
  const [currentStep, setCurrentStep] = useState<Step>('config');
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    sections: new Array(18).fill(false),
    language: 'fr',
    seniority: 'Senior'
  });
  const [briefData, setBriefData] = useState<BriefData>({});
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const activeSections = SECTION_IDS.filter((_, index) => userPreferences.sections[index]);
  const progress = (completedSections.size / activeSections.length) * 100;

  const handleConfigurationComplete = async () => {
    try {
      await briefBackendApi.storeUserPreferences(userPreferences);
      setCurrentStep('generation');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des préférences:', error);
    }
  };

  const handleSectionComplete = (sectionId: string, markdown: string) => {
    setCompletedSections(prev => new Set([...prev, sectionId]));
    
    // Passer à la section suivante ou au preview final
    const nextIndex = currentSectionIndex + 1;
    if (nextIndex < activeSections.length) {
      setCurrentSectionIndex(nextIndex);
    } else {
      setCurrentStep('preview');
    }
  };

  const handleDataUpdate = (sectionId: string, data: Record<string, any>) => {
    setBriefData(prev => ({
      ...prev,
      [sectionId]: {
        job_function: data.job_function || data.job_title || "Poste non défini",
        ...data
      }
    }));
  };

  const handleBackToGeneration = () => {
    setCurrentStep('generation');
    setCurrentSectionIndex(Math.max(0, activeSections.length - 1));
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'config':
        return 'Configuration du Brief';
      case 'generation':
        return `Section ${currentSectionIndex + 1}/${activeSections.length}: ${activeSections[currentSectionIndex]}`;
      case 'preview':
        return 'Brief Final';
      default:
        return '';
    }
  };

  return (
    <div className="ml-64 min-h-screen bg-bgLight">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🤖 Assistant Brief IA - Génération Automatique
          </h1>
          <p className="text-gray-600">
            Créez votre brief de poste en quelques minutes avec l'aide de l'IA
          </p>
        </div>

        {/* Barre de progression */}
        {currentStep !== 'config' && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{getStepTitle()}</span>
                <span className="text-sm text-gray-600">
                  {Math.round(progress)}% terminé
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>
        )}

        {/* Étape actuelle */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 'config' && (
            <SectionConfiguration
              preferences={userPreferences}
              onPreferencesChange={setUserPreferences}
              onNext={handleConfigurationComplete}
            />
          )}

          {currentStep === 'generation' && activeSections[currentSectionIndex] && (
            <div className="space-y-6">
              {/* Navigation entre sections */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-2">
                    {activeSections.map((section, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSectionIndex(index)}
                        className={`px-3 py-1 rounded text-xs ${
                          index === currentSectionIndex
                            ? 'bg-blue-500 text-white'
                            : completedSections.has(section)
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {index + 1}. {section}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <SectionGenerator
                sectionId={activeSections[currentSectionIndex]}
                sectionIndex={currentSectionIndex}
                userPreferences={userPreferences}
                briefData={briefData}
                onSectionComplete={handleSectionComplete}
                onDataUpdate={handleDataUpdate}
              />
            </div>
          )}

          {currentStep === 'preview' && (
            <FinalBriefPreview onBack={handleBackToGeneration} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BriefNew;
