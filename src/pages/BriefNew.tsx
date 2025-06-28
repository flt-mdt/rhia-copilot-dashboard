import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { UserPreferences, BriefData, briefBackendApi } from '@/services/briefBackendApi';
import SectionConfiguration from '@/components/brief/SectionConfiguration';
import BriefDataForm from '@/components/brief/BriefDataForm';
import BriefGenerationStep from '@/components/brief/BriefGenerationStep';
import FinalBriefPreview from '@/components/brief/FinalBriefPreview';

type Step = 'config' | 'data' | 'generation' | 'preview';

const BriefNew = () => {
  const [currentStep, setCurrentStep] = useState<Step>('config');
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    sections: new Array(18).fill(false),
    language: 'fr',
    seniority: 'Senior'
  });
  const [briefData, setBriefData] = useState<BriefData>({});

  const handleConfigurationComplete = async () => {
    console.log('=== handleConfigurationComplete called ===');
    console.log('Session ID:', briefBackendApi.getSessionId());
    console.log('User preferences:', userPreferences);
    
    try {
      console.log('Calling briefBackendApi.storeUserPreferences...');
      await briefBackendApi.storeUserPreferences(userPreferences);
      
      console.log('Configuration stored successfully, moving to data step');
      setCurrentStep('data');
    } catch (error) {
      console.error('=== ERROR IN handleConfigurationComplete ===');
      console.error('Error details:', error);
      
      // Re-throw l'erreur pour que SectionConfiguration puisse la gérer
      throw error;
    }
  };

  const handleDataFormComplete = () => {
    setCurrentStep('generation');
  };

  const handleGenerationComplete = () => {
    setCurrentStep('preview');
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

  const handleBackToConfig = () => {
    setCurrentStep('config');
  };

  const handleBackToData = () => {
    setCurrentStep('data');
  };

  const handleBackToGeneration = () => {
    setCurrentStep('generation');
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'config':
        return 'Configuration du Brief';
      case 'data':
        return 'Saisie des données';
      case 'generation':
        return 'Génération des sections';
      case 'preview':
        return 'Brief Final';
      default:
        return '';
    }
  };

  const getStepNumber = () => {
    switch (currentStep) {
      case 'config': return 1;
      case 'data': return 2;
      case 'generation': return 3;
      case 'preview': return 4;
      default: return 1;
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

        {/* Barre de progression globale */}
        {currentStep !== 'config' && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Étape {getStepNumber()}/4 : {getStepTitle()}
                </span>
                <span className="text-sm text-gray-600">
                  {Math.round((getStepNumber() / 4) * 100)}% terminé
                </span>
              </div>
              <Progress value={(getStepNumber() / 4) * 100} className="h-2" />
            </CardContent>
          </Card>
        )}

        {/* Étapes */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 'config' && (
            <SectionConfiguration
              preferences={userPreferences}
              onPreferencesChange={setUserPreferences}
              onNext={handleConfigurationComplete}
            />
          )}

          {currentStep === 'data' && (
            <BriefDataForm
              userPreferences={userPreferences}
              onNext={handleDataFormComplete}
              onBack={handleBackToConfig}
            />
          )}

          {currentStep === 'generation' && (
            <BriefGenerationStep
              userPreferences={userPreferences}
              onNext={handleGenerationComplete}
              onBack={handleBackToData}
            />
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
