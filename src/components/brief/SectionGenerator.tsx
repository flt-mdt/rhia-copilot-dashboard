
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Check, RefreshCw } from 'lucide-react';
import { UserPreferences, BriefData, GenerateResponse, briefBackendApi } from '@/services/briefBackendApi';

interface SectionGeneratorProps {
  sectionId: string;
  sectionIndex: number;
  userPreferences: UserPreferences;
  briefData: BriefData;
  onSectionComplete: (sectionId: string, markdown: string) => void;
  onDataUpdate: (sectionId: string, data: Record<string, any>) => void;
}

const SectionGenerator: React.FC<SectionGeneratorProps> = ({
  sectionId,
  sectionIndex,
  userPreferences,
  briefData,
  onSectionComplete,
  onDataUpdate
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReforming, setIsReforming] = useState(false);
  const [generatedMarkdown, setGeneratedMarkdown] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);
  const [fallbackNeeded, setFallbackNeeded] = useState<boolean>(false);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [sectionData, setSectionData] = useState<Record<string, any>>(
    briefData[sectionId] || {}
  );

  const handleDataChange = (key: string, value: any) => {
    const newData = { ...sectionData, [key]: value };
    setSectionData(newData);
    onDataUpdate(sectionId, newData);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Sauvegarder les données d'abord
      await briefBackendApi.updateBriefData(sectionId, sectionData);
      
      // Générer la section
      const response: GenerateResponse = await briefBackendApi.generateSection(
        sectionId,
        userPreferences,
        briefData
      );
      
      setGeneratedMarkdown(response.markdown);
      setConfidence(response.confidence);
      setFallbackNeeded(response.fallback_needed);
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReformulate = async () => {
    if (!feedback.trim() || !generatedMarkdown) return;
    
    setIsReforming(true);
    try {
      const response = await briefBackendApi.provideFeedback(
        sectionId,
        feedback,
        generatedMarkdown,
        userPreferences,
        briefData
      );
      
      setGeneratedMarkdown(response.markdown);
      setConfidence(response.confidence);
      setFeedback('');
      setFallbackNeeded(false);
    } catch (error) {
      console.error('Erreur lors de la reformulation:', error);
    } finally {
      setIsReforming(false);
    }
  };

  const handleValidate = () => {
    setIsValidated(true);
    onSectionComplete(sectionId, generatedMarkdown);
  };

  const getConfidenceColor = (conf: number) => {
    if (conf >= 0.8) return 'bg-green-500';
    if (conf >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{sectionId}</span>
          {isValidated && <Check className="h-5 w-5 text-green-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Formulaire de saisie simple */}
        <div className="space-y-3">
          <Textarea
            placeholder={`Saisissez les informations pour "${sectionId}"...`}
            value={sectionData.content || ''}
            onChange={(e) => handleDataChange('content', e.target.value)}
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button 
            onClick={handleGenerate}
            disabled={isGenerating || isValidated}
            className="flex-1"
          >
            {isGenerating ? 'Génération...' : 'Générer'}
          </Button>
        </div>

        {/* Résultat généré */}
        {generatedMarkdown && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Confiance :</span>
              <div className="flex items-center space-x-2">
                <div className={`w-16 h-2 rounded ${getConfidenceColor(confidence)}`} />
                <span className="text-sm">{Math.round(confidence * 100)}%</span>
              </div>
              {fallbackNeeded && (
                <Badge variant="destructive" className="flex items-center space-x-1">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Révision suggérée</span>
                </Badge>
              )}
            </div>

            <div className="p-3 bg-gray-50 rounded border">
              <pre className="whitespace-pre-wrap text-sm">{generatedMarkdown}</pre>
            </div>

            {!isValidated && (
              <div className="space-y-2">
                <Textarea
                  placeholder="Commentaires pour améliorer cette section..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={2}
                />
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    onClick={handleReformulate}
                    disabled={!feedback.trim() || isReforming}
                    className="flex items-center space-x-1"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>{isReforming ? 'Reformulation...' : 'Reformuler'}</span>
                  </Button>
                  <Button 
                    onClick={handleValidate}
                    className="flex-1"
                  >
                    Valider cette section
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SectionGenerator;
