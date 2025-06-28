import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw,
  Eye,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { briefBackendApi, UserPreferences, BriefData } from '@/services/briefBackendApi';
import { SECTION_LABELS_TO_IDS } from '@/constants/sectionMapping';

interface BriefGenerationStepProps {
  userPreferences: UserPreferences;
  onNext: () => void;
  onBack: () => void;
}

interface GeneratedSection {
  markdown: string;
  confidence: number;
  fallback_needed: boolean;
  isApproved: boolean;
}

const BriefGenerationStep: React.FC<BriefGenerationStepProps> = ({ 
  userPreferences, 
  onNext, 
  onBack 
}) => {
  const { toast } = useToast();
  
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

  const [generatedSections, setGeneratedSections] = useState<Record<string, GeneratedSection>>({});
  const [loadingSections, setLoadingSections] = useState<Set<string>>(new Set());
  const [feedbackTexts, setFeedbackTexts] = useState<Record<string, string>>({});

  const handleGenerateSection = async (sectionName: string) => {
    setLoadingSections(prev => new Set([...prev, sectionName]));
    
    try {
      // Récupérer l'identifiant technique de la section
      const sectionId = SECTION_LABELS_TO_IDS[sectionName];
      
      if (!sectionId) {
        throw new Error(`Section ID non trouvé pour: ${sectionName}`);
      }

      // Récupérer le job_function depuis les données sauvegardées
      const titleSectionData = await briefBackendApi.getSectionData("Titre & Job Family");
      const jobFunction = titleSectionData?.job_function || titleSectionData?.job_title || "Poste non défini";

      // Préparer brief_data avec la structure exacte attendue
      const briefData = {
        job_function: jobFunction
      };
      
      console.log('Génération de section:', {
        sectionName,
        sectionId,
        userPreferences,
        briefData
      });
      
      const response = await briefBackendApi.generateSection(
        sectionId,
        userPreferences,
        briefData
      );
      
      setGeneratedSections(prev => ({
        ...prev,
        [sectionName]: {
          markdown: response.markdown,
          confidence: response.confidence,
          fallback_needed: response.fallback_needed,
          isApproved: false
        }
      }));
      
      toast({
        title: "Section générée",
        description: `Le contenu de "${sectionName}" a été généré avec succès.`,
      });
      
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
      toast({
        title: "Erreur de génération",
        description: "Impossible de générer cette section. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoadingSections(prev => {
        const newSet = new Set(prev);
        newSet.delete(sectionName);
        return newSet;
      });
    }
  };

  const handleProvideFeedback = async (sectionName: string) => {
    const feedback = feedbackTexts[sectionName];
    if (!feedback?.trim()) return;

    const currentSection = generatedSections[sectionName];
    if (!currentSection) return;

    setLoadingSections(prev => new Set([...prev, sectionName]));
    
    try {
      // Récupérer l'identifiant technique de la section
      const sectionId = SECTION_LABELS_TO_IDS[sectionName];
      
      if (!sectionId) {
        throw new Error(`Section ID non trouvé pour: ${sectionName}`);
      }

      // Récupérer le job_function depuis les données sauvegardées
      const titleSectionData = await briefBackendApi.getSectionData("Titre & Job Family");
      const jobFunction = titleSectionData?.job_function || titleSectionData?.job_title || "Poste non défini";

      // Préparer brief_data avec la même structure
      const briefData = {
        job_function: jobFunction
      };
      
      const response = await briefBackendApi.provideFeedback(
        sectionId,
        feedback,
        currentSection.markdown,
        userPreferences,
        briefData
      );
      
      setGeneratedSections(prev => ({
        ...prev,
        [sectionName]: {
          ...prev[sectionName],
          markdown: response.markdown,
          confidence: response.confidence,
          fallback_needed: false
        }
      }));
      
      setFeedbackTexts(prev => ({
        ...prev,
        [sectionName]: ''
      }));
      
      toast({
        title: "Section reformulée",
        description: `Le contenu de "${sectionName}" a été mis à jour selon vos commentaires.`,
      });
      
    } catch (error) {
      console.error('Erreur lors de la reformulation:', error);
      toast({
        title: "Erreur de reformulation",
        description: "Impossible de reformuler cette section. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoadingSections(prev => {
        const newSet = new Set(prev);
        newSet.delete(sectionName);
        return newSet;
      });
    }
  };

  const handleApproveSection = async (sectionName: string) => {
    const section = generatedSections[sectionName];
    if (!section) return;

    try {
      // Récupérer l'identifiant technique de la section
      const sectionId = SECTION_LABELS_TO_IDS[sectionName];
      
      if (!sectionId) {
        throw new Error(`Section ID non trouvé pour: ${sectionName}`);
      }

      await briefBackendApi.storeSectionApproval(sectionId, section.markdown);
      
      setGeneratedSections(prev => ({
        ...prev,
        [sectionName]: {
          ...prev[sectionName],
          isApproved: true
        }
      }));
      
      toast({
        title: "Section approuvée",
        description: `Le contenu de "${sectionName}" a été approuvé.`,
      });
      
    } catch (error) {
      console.error('Erreur lors de l\'approbation:', error);
      toast({
        title: "Erreur d'approbation",
        description: "Impossible d'approuver cette section. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-500';
    if (confidence >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return 'Élevée';
    if (confidence >= 0.6) return 'Moyenne';
    return 'Faible';
  };

  const approvedSections = Object.values(generatedSections).filter(section => section.isApproved).length;
  const totalSections = selectedSections.length;
  const progressPercentage = totalSections > 0 ? (approvedSections / totalSections) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* En-tête avec progression */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Génération des sections</h2>
        <p className="text-lg text-gray-600">
          Générez et validez le contenu de chaque section sélectionnée
        </p>
        <div className="max-w-md mx-auto">
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-sm text-gray-500 mt-2">
            {approvedSections} sur {totalSections} sections approuvées
          </p>
        </div>
      </div>

      {/* Liste des sections */}
      <div className="space-y-6">
        {selectedSections.map((sectionName, index) => {
          const generatedSection = generatedSections[sectionName];
          const isLoading = loadingSections.has(sectionName);
          const feedbackText = feedbackTexts[sectionName] || '';

          return (
            <Card key={sectionName} className="border-2 border-gray-100 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {sectionName}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    {generatedSection?.isApproved && (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approuvée
                      </Badge>
                    )}
                    {generatedSection && !generatedSection.isApproved && (
                      <Badge variant="outline" className="border-blue-200 text-blue-700">
                        <Eye className="h-4 w-4 mr-1" />
                        En révision
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Bouton de génération */}
                {!generatedSection && (
                  <Button 
                    onClick={() => handleGenerateSection(sectionName)}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-3"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Génération en cours...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Générer cette section
                      </>
                    )}
                  </Button>
                )}

                {/* Contenu généré */}
                {generatedSection && (
                  <div className="space-y-4">
                    {/* Indicateur de confiance */}
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-700">Confiance :</span>
                      <div className="flex items-center space-x-2">
                        <div className={`w-20 h-2 rounded-full ${getConfidenceColor(generatedSection.confidence)}`} />
                        <span className="text-sm font-medium">
                          {getConfidenceLabel(generatedSection.confidence)} ({Math.round(generatedSection.confidence * 100)}%)
                        </span>
                      </div>
                      {generatedSection.fallback_needed && (
                        <Badge variant="destructive" className="flex items-center space-x-1">
                          <AlertTriangle className="h-3 w-3" />
                          <span>Révision suggérée</span>
                        </Badge>
                      )}
                    </div>

                    {/* Aperçu du contenu */}
                    <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                      <div className="prose prose-sm max-w-none">
                        <div className="whitespace-pre-wrap text-sm text-gray-800">
                          {generatedSection.markdown}
                        </div>
                      </div>
                    </div>

                    {/* Actions pour la section */}
                    {!generatedSection.isApproved && (
                      <div className="space-y-3">
                        {/* Zone de feedback */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Commentaires pour améliorer cette section :
                          </label>
                          <Textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackTexts(prev => ({
                              ...prev,
                              [sectionName]: e.target.value
                            }))}
                            placeholder="Ajoutez des précisions ou demandez des modifications..."
                            className="rounded-xl border-2 border-gray-200 focus:border-blue-400"
                            rows={3}
                          />
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex space-x-3">
                          <Button 
                            variant="outline"
                            onClick={() => handleProvideFeedback(sectionName)}
                            disabled={!feedbackText.trim() || isLoading}
                            className="flex items-center space-x-2 rounded-xl"
                          >
                            <RefreshCw className="h-4 w-4" />
                            <span>{isLoading ? 'Reformulation...' : 'Reformuler'}</span>
                          </Button>
                          
                          <Button 
                            onClick={() => handleApproveSection(sectionName)}
                            className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl"
                          >
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Approuver cette section
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Navigation globale */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-200">
        <Button variant="outline" onClick={onBack} className="px-6 py-3 rounded-xl">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la saisie
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={approvedSections === 0}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-medium"
        >
          Finaliser le brief ({approvedSections} sections)
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default BriefGenerationStep;
