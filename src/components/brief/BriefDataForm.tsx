import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { briefBackendApi, UserPreferences } from '@/services/briefBackendApi';
import { Save, CheckCircle, ArrowRight, ArrowLeft, Paperclip, Mic, Search } from 'lucide-react';
import { SECTION_LABELS_TO_IDS } from '@/constants/sectionMapping';

// Configuration des sections avec leurs champs spécifiques
const SECTION_CONFIG = {
  "Titre & Job Family": {
    fields: [
      { name: 'job_title', type: 'text', label: 'Titre du poste', required: true, placeholder: 'Ex: Développeur Full Stack Senior', size: 'medium' },
      { name: 'job_family', type: 'select', label: 'Famille de métier', required: true, options: ['Tech', 'Sales', 'Marketing', 'Finance', 'Operations', 'HR'], size: 'medium' },
      { name: 'department', type: 'text', label: 'Département', placeholder: 'Ex: Engineering', size: 'medium' },
      { name: 'reporting_to', type: 'text', label: 'Rattachement hiérarchique', placeholder: 'Ex: CTO', size: 'medium' }
    ]
  },
  "Contexte & Business Case": {
    fields: [
      { name: 'business_context', type: 'textarea', label: 'Contexte business', required: true, placeholder: 'Décrivez le contexte de création du poste...', size: 'large' },
      { name: 'strategic_importance', type: 'select', label: 'Importance stratégique', options: ['Critique', 'Importante', 'Normale'], size: 'medium' },
      { name: 'urgency', type: 'select', label: 'Urgence du recrutement', options: ['Immédiate', 'Normale', 'Flexible'], size: 'medium' }
    ]
  },
  "Finalité/Mission": {
    fields: [
      { name: 'main_purpose', type: 'textarea', label: 'Finalité principale', required: true, placeholder: 'Quelle est la raison d\'être de ce poste ?', size: 'large' },
      { name: 'key_contribution', type: 'textarea', label: 'Contribution clé', placeholder: 'Comment ce poste contribuera au succès de l\'équipe/entreprise ?', size: 'large' }
    ]
  },
  "Objectifs & KPIs": {
    fields: [
      { name: 'objectives', type: 'textarea', label: 'Objectifs principaux', required: true, placeholder: 'Listez les objectifs à 6-12 mois...', size: 'large' },
      { name: 'success_metrics', type: 'textarea', label: 'Indicateurs de succès', placeholder: 'Comment mesurer la réussite ?', size: 'medium' },
      { name: 'performance_timeline', type: 'select', label: 'Délai d\'évaluation', options: ['3 mois', '6 mois', '12 mois'], size: 'small' }
    ]
  },
  "Responsabilités clés": {
    fields: [
      { name: 'daily_tasks', type: 'textarea', label: 'Tâches quotidiennes', required: true, placeholder: 'Décrivez les responsabilités principales...', size: 'large' },
      { name: 'weekly_tasks', type: 'textarea', label: 'Tâches hebdomadaires', placeholder: 'Activités récurrentes...', size: 'medium' },
      { name: 'special_projects', type: 'textarea', label: 'Projets spéciaux', placeholder: 'Missions ponctuelles ou projets transversaux...', size: 'medium' }
    ]
  },
  "Compétences & exigences": {
    fields: [
      { name: 'hard_skills', type: 'textarea', label: 'Compétences techniques', required: true, placeholder: 'Technologies, outils, certifications...', size: 'large' },
      { name: 'soft_skills', type: 'textarea', label: 'Compétences comportementales', required: true, placeholder: 'Leadership, communication, adaptabilité...', size: 'large' },
      { name: 'languages', type: 'text', label: 'Langues requises', placeholder: 'Ex: Français natif, Anglais courant', size: 'medium' }
    ]
  }
};

// Sections par défaut si pas dans la config
const DEFAULT_SECTION_CONFIG = {
  fields: [
    { name: 'content', type: 'textarea', label: 'Contenu', required: true, placeholder: 'Saisissez les informations pour cette section...', size: 'large' }
  ]
};

interface BriefDataFormProps {
  userPreferences: UserPreferences;
  onNext: () => void;
  onBack: () => void;
}

const BriefDataForm: React.FC<BriefDataFormProps> = ({ userPreferences, onNext, onBack }) => {
  const { toast } = useToast();
  
  // Mémoriser les sections sélectionnées pour éviter la recalculation à chaque rendu
  const SECTION_NAMES = useMemo(() => [
    "Titre & Job Family", "Contexte & Business Case", "Finalité/Mission", "Objectifs & KPIs",
    "Responsabilités clés", "Périmètre budgétaire & managérial", "Environnement & contraintes",
    "Compétences & exigences", "Qualifications & expériences", "Employee Value Proposition",
    "Perspectives d'évolution", "Rémunération & avantages", "Cadre contractuel",
    "Mesure de la performance & cadence", "Parties prenantes & RACI",
    "Inclusion, conformité & sécurité", "Onboarding & développement", "Processus de recrutement"
  ], []);

  const selectedSections = useMemo(() => 
    SECTION_NAMES.filter((_, index) => userPreferences.sections[index]),
    [SECTION_NAMES, userPreferences.sections]
  );
  
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sectionData, setSectionData] = useState<Record<string, Record<string, any>>>({});
  const [savedSections, setSavedSections] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const currentSection = selectedSections[currentSectionIndex];
  const sectionConfig = SECTION_CONFIG[currentSection as keyof typeof SECTION_CONFIG] || DEFAULT_SECTION_CONFIG;
  const currentData = sectionData[currentSection] || {};

  // Initialiser les données des sections une seule fois
  useEffect(() => {
    const initialData: Record<string, Record<string, any>> = {};
    selectedSections.forEach(section => {
      initialData[section] = {};
    });
    setSectionData(initialData);
    console.log('Sections initialisées:', selectedSections);
  }, [selectedSections]);

  const updateFieldValue = (fieldName: string, value: any) => {
    console.log('Mise à jour du champ:', fieldName, 'avec la valeur:', value);
    setSectionData(prev => ({
      ...prev,
      [currentSection]: {
        ...prev[currentSection],
        [fieldName]: value
      }
    }));
  };

  const validateSection = () => {
    const requiredFields = sectionConfig.fields.filter(field => field.required);
    for (const field of requiredFields) {
      if (!currentData[field.name] || currentData[field.name].toString().trim() === '') {
        toast({
          title: "Champ requis manquant",
          description: `Le champ "${field.label}" est obligatoire.`,
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const saveCurrentSection = async () => {
    if (!validateSection()) return;

    setIsLoading(true);
    try {
      // Utiliser l'identifiant technique de la section pour l'API
      const sectionId = SECTION_LABELS_TO_IDS[currentSection];
      
      if (!sectionId) {
        throw new Error(`Section ID non trouvé pour: ${currentSection}`);
      }

      let dataToSave = { ...currentData };
      
      // Pour la section "Titre & Job Family", s'assurer que job_function est défini
      if (currentSection === "Titre & Job Family" && currentData.job_title) {
        dataToSave.job_function = currentData.job_title;
      }
      
      console.log('Sauvegarde section:', sectionId, dataToSave);
      
      await briefBackendApi.updateBriefData(sectionId, dataToSave);
      setSavedSections(prev => new Set([...prev, currentSection]));
      toast({
        title: "Section sauvegardée",
        description: `Les données de "${currentSection}" ont été enregistrées.`,
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur de sauvegarde",
        description: "Impossible de sauvegarder cette section. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goToNextSection = () => {
    if (currentSectionIndex < selectedSections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    }
  };

  const goToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const getInputSize = (size: string) => {
    switch (size) {
      case 'small': return 'h-10';
      case 'medium': return 'h-12';
      case 'large': return 'min-h-[120px]';
      default: return 'h-12';
    }
  };

  const getCharacterCount = (value: string, size: string) => {
    const maxChars = size === 'large' ? 3000 : size === 'medium' ? 1000 : 500;
    return { current: value.length, max: maxChars };
  };

  const renderField = (field: any) => {
    const value = currentData[field.name] || '';
    const charCount = getCharacterCount(value, field.size || 'medium');

    switch (field.type) {
      case 'text':
        return (
          <div className="relative">
            <input
              value={value}
              onChange={(e) => updateFieldValue(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={`w-full ${getInputSize(field.size || 'medium')} px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-0 transition-colors`}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <button type="button" className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <Paperclip className="h-4 w-4 text-gray-400" />
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <Mic className="h-4 w-4 text-gray-400" />
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <Search className="h-4 w-4 text-gray-400" />
              </button>
            </div>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
              <span>Appuyez sur Entrée pour envoyer</span>
              <span>{charCount.current} / {charCount.max}</span>
            </div>
          </div>
        );
      
      case 'textarea':
        return (
          <div className="relative">
            <textarea
              value={value}
              onChange={(e) => updateFieldValue(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={`w-full ${getInputSize(field.size || 'large')} px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-0 transition-colors resize-none`}
            />
            <div className="absolute right-3 bottom-3 flex items-center space-x-2">
              <button type="button" className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <Paperclip className="h-4 w-4 text-gray-400" />
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <Mic className="h-4 w-4 text-gray-400" />
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <Search className="h-4 w-4 text-gray-400" />
              </button>
            </div>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
              <span>Appuyez sur Entrée pour envoyer</span>
              <span>{charCount.current} / {charCount.max}</span>
            </div>
          </div>
        );
      
      case 'select':
        return (
          <div className="relative">
            <select
              value={value}
              onChange={(e) => updateFieldValue(field.name, e.target.value)}
              className={`w-full ${getInputSize(field.size || 'medium')} px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:border-blue-400 focus:outline-none focus:ring-0 transition-colors appearance-none`}
            >
              <option value="">Sélectionnez...</option>
              {field.options?.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const progressPercentage = ((savedSections.size) / selectedSections.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* En-tête avec progression */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Saisie des données</h2>
        <p className="text-lg text-gray-600">
          Section {currentSectionIndex + 1} sur {selectedSections.length}
        </p>
        <div className="max-w-md mx-auto">
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-sm text-gray-500 mt-2">
            {savedSections.size} section{savedSections.size > 1 ? 's' : ''} sauvegardée{savedSections.size > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Formulaire de la section courante */}
      <Card className="border-2 border-gray-100 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900">
              {currentSection}
            </CardTitle>
            {savedSections.has(currentSection) && (
              <Badge variant="default" className="bg-green-100 text-green-800">
                <CheckCircle className="h-4 w-4 mr-1" />
                Sauvegardée
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {sectionConfig.fields.map((field) => (
            <div key={field.name} className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}

          {/* Actions de la section */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={goToPreviousSection}
                disabled={currentSectionIndex === 0}
                className="rounded-xl"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Section précédente
              </Button>
              
              <Button 
                variant="outline" 
                onClick={goToNextSection}
                disabled={currentSectionIndex === selectedSections.length - 1}
                className="rounded-xl"
              >
                Section suivante
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <Button 
              onClick={saveCurrentSection}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder cette section
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Navigation globale */}
      <div className="flex justify-between items-center pt-6">
        <Button variant="outline" onClick={onBack} className="px-6 py-3 rounded-xl">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la configuration
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={savedSections.size === 0}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-medium"
        >
          Continuer vers la génération
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default BriefDataForm;
