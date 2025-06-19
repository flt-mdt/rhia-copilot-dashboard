import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Check, RefreshCw, Send, Download, Copy } from 'lucide-react';
import { UserPreferences, BriefData, briefBackendApi } from '@/services/briefBackendApi';
import ChatMessage from '@/components/brief/ChatMessage';

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

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
  component?: React.ReactNode;
}

type WorkflowStep = 'config' | 'data-entry' | 'generation' | 'final';

const Brief = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('config');
  
  // Configuration
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    sections: new Array(18).fill(false),
    language: 'fr',
    seniority: 'Senior'
  });
  
  // Données du brief
  const [briefData, setBriefData] = useState<BriefData>({});
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  
  // Génération
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMarkdown, setGeneratedMarkdown] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);
  const [fallbackNeeded, setFallbackNeeded] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isReforming, setIsReforming] = useState(false);
  
  // Brief final
  const [finalBrief, setFinalBrief] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);

  const activeSections = SECTION_IDS.filter((_, index) => userPreferences.sections[index]);
  const progress = activeSections.length > 0 ? (completedSections.size / activeSections.length) * 100 : 0;

  const addMessage = (content: string, isAI: boolean = false, component?: React.ReactNode) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isAI,
      timestamp: new Date(),
      component
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSectionToggle = (index: number, checked: boolean) => {
    const newSections = [...userPreferences.sections];
    newSections[index] = checked;
    setUserPreferences({
      ...userPreferences,
      sections: newSections
    });
  };

  const handleLanguageChange = (language: 'fr' | 'en') => {
    setUserPreferences({
      ...userPreferences,
      language
    });
  };

  const handleSeniorityChange = (seniority: UserPreferences['seniority']) => {
    setUserPreferences({
      ...userPreferences,
      seniority
    });
  };

  const handleConfigSubmit = async () => {
    const selectedCount = userPreferences.sections.filter(Boolean).length;
    if (selectedCount === 0) {
      addMessage("Veuillez sélectionner au moins une section avant de continuer.", true);
      return;
    }

    try {
      console.log('Saving user preferences:', userPreferences);
      await briefBackendApi.storeUserPreferences(userPreferences);
      addMessage(`Configuration sauvegardée ! ${selectedCount} section(s) sélectionnée(s). Passons maintenant à la saisie des données.`, true);
      setCurrentStep('data-entry');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des préférences:', error);
      addMessage("Erreur lors de la sauvegarde des préférences. Veuillez vérifier votre connexion et réessayer.", true);
    }
  };

  const handleDataUpdate = async (sectionId: string, data: Record<string, any>) => {
    setBriefData(prev => ({
      ...prev,
      [sectionId]: data
    }));
    
    try {
      await briefBackendApi.updateBriefData(sectionId, data);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données:', error);
    }
  };

  const handleGenerate = async () => {
    if (activeSections.length === 0 || currentSectionIndex >= activeSections.length) return;
    
    const currentSection = activeSections[currentSectionIndex];
    setIsGenerating(true);
    
    try {
      const response = await briefBackendApi.generateSection(
        currentSection,
        userPreferences,
        briefData
      );
      
      setGeneratedMarkdown(response.markdown);
      setConfidence(response.confidence);
      setFallbackNeeded(response.fallback_needed);
      
      addMessage(`Section "${currentSection}" générée avec un niveau de confiance de ${Math.round(response.confidence * 100)}%`, true);
      
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
      addMessage("Erreur lors de la génération. Veuillez réessayer.", true);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReformulate = async () => {
    if (!feedbackText.trim() || !generatedMarkdown) return;
    
    const currentSection = activeSections[currentSectionIndex];
    setIsReforming(true);
    
    try {
      const response = await briefBackendApi.provideFeedback(
        currentSection,
        feedbackText,
        generatedMarkdown,
        userPreferences,
        briefData
      );
      
      setGeneratedMarkdown(response.markdown);
      setConfidence(response.confidence);
      setFeedbackText('');
      setFallbackNeeded(false);
      
      addMessage("Section reformulée selon vos commentaires.", true);
      
    } catch (error) {
      console.error('Erreur lors de la reformulation:', error);
      addMessage("Erreur lors de la reformulation. Veuillez réessayer.", true);
    } finally {
      setIsReforming(false);
    }
  };

  const handleValidateSection = () => {
    const currentSection = activeSections[currentSectionIndex];
    setCompletedSections(prev => new Set([...prev, currentSection]));
    
    const nextIndex = currentSectionIndex + 1;
    if (nextIndex < activeSections.length) {
      setCurrentSectionIndex(nextIndex);
      setGeneratedMarkdown('');
      setConfidence(0);
      setFallbackNeeded(false);
      addMessage(`Section "${currentSection}" validée ! Passons à la section suivante : "${activeSections[nextIndex]}"`, true);
    } else {
      setCurrentStep('final');
      loadFinalBrief();
    }
  };

  const loadFinalBrief = async () => {
    try {
      const markdown = await briefBackendApi.getFinalBrief();
      setFinalBrief(markdown);
      addMessage("Excellent ! Votre brief est maintenant complet. Vous pouvez le consulter, le copier ou le télécharger.", true);
    } catch (error) {
      console.error('Erreur lors du chargement du brief final:', error);
      addMessage("Erreur lors de la génération du brief final.", true);
    }
  };

  const handleCopyFinalBrief = async () => {
    try {
      await navigator.clipboard.writeText(finalBrief);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
    }
  };

  const handleDownloadFinalBrief = () => {
    const blob = new Blob([finalBrief], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brief-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderConfigurationForm = () => (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="font-medium">Configuration du Brief</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Langue</label>
          <Select value={userPreferences.language} onValueChange={handleLanguageChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Niveau de séniorité</label>
          <Select value={userPreferences.seniority} onValueChange={handleSeniorityChange}>
            <SelectTrigger>
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

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Sections à inclure :</h4>
        <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
          {SECTION_IDS.map((section, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id={`section-${index}`}
                checked={userPreferences.sections[index]}
                onCheckedChange={(checked) => handleSectionToggle(index, Boolean(checked))}
              />
              <label htmlFor={`section-${index}`} className="text-xs cursor-pointer">
                {section}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-2">
        {userPreferences.sections.filter(Boolean).length} section(s) sélectionnée(s)
      </div>

      <Button 
        onClick={handleConfigSubmit} 
        disabled={userPreferences.sections.filter(Boolean).length === 0}
        className="w-full"
      >
        Confirmer la configuration
      </Button>
    </div>
  );

  const renderDataEntryForm = () => {
    if (activeSections.length === 0) return null;
    
    const currentSection = activeSections[currentSectionIndex];
    const sectionData = briefData[currentSection] || {};

    return (
      <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
        <h3 className="font-medium">Section : {currentSection}</h3>
        
        <Textarea
          placeholder={`Saisissez les informations pour "${currentSection}"...`}
          value={sectionData.content || ''}
          onChange={(e) => handleDataUpdate(currentSection, { content: e.target.value })}
          rows={3}
        />

        <div className="flex space-x-2">
          <Button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex-1"
          >
            {isGenerating ? 'Génération...' : 'Générer'}
          </Button>
        </div>

        {generatedMarkdown && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Confiance :</span>
              <div className="flex items-center space-x-2">
                <div className={`w-16 h-2 rounded ${confidence >= 0.8 ? 'bg-green-500' : confidence >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                <span className="text-sm">{Math.round(confidence * 100)}%</span>
              </div>
              {fallbackNeeded && (
                <Badge variant="destructive" className="flex items-center space-x-1">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Révision suggérée</span>
                </Badge>
              )}
            </div>

            <div className="p-3 bg-white rounded border">
              <pre className="whitespace-pre-wrap text-sm">{generatedMarkdown}</pre>
            </div>

            <div className="space-y-2">
              <Textarea
                placeholder="Commentaires pour améliorer cette section..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                rows={2}
              />
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  onClick={handleReformulate}
                  disabled={!feedbackText.trim() || isReforming}
                  className="flex items-center space-x-1"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>{isReforming ? 'Reformulation...' : 'Reformuler'}</span>
                </Button>
                <Button 
                  onClick={handleValidateSection}
                  className="flex-1"
                >
                  Valider cette section
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderFinalBrief = () => (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Brief Final</h3>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleCopyFinalBrief} size="sm">
            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {isCopied ? 'Copié!' : 'Copier'}
          </Button>
          <Button variant="outline" onClick={handleDownloadFinalBrief} size="sm">
            <Download className="h-4 w-4" />
            Télécharger
          </Button>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto p-4 bg-white rounded border">
        <pre className="whitespace-pre-wrap text-sm">{finalBrief}</pre>
      </div>
    </div>
  );

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    addMessage(inputMessage, false);
    setInputMessage('');
  };

  // Initialisation avec le formulaire de configuration directement
  React.useEffect(() => {
    if (messages.length === 0 && currentStep === 'config') {
      addMessage("Bienvenue ! Configurons votre brief de poste en sélectionnant les sections et paramètres souhaités :", true, renderConfigurationForm());
    }
  }, []);

  return (
    <div className="ml-64 min-h-screen bg-bgLight">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🤖 Assistant Brief IA
          </h1>
          <p className="text-gray-600">
            Créez votre brief de poste en quelques minutes avec l'aide de l'IA
          </p>
        </div>

        {/* Barre de progression */}
        {currentStep !== 'config' && activeSections.length > 0 && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {currentStep === 'data-entry' && `Section ${currentSectionIndex + 1}/${activeSections.length}: ${activeSections[currentSectionIndex]}`}
                  {currentStep === 'final' && 'Brief Final Généré'}
                </span>
                <span className="text-sm text-gray-600">
                  {Math.round(progress)}% terminé
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat principal */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Conversation avec l'IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    <ChatMessage message={message} />
                    {message.component && (
                      <div className="mt-2">
                        {message.component}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Interface de saisie selon l'étape */}
              {currentStep === 'data-entry' && renderDataEntryForm()}
              {currentStep === 'final' && renderFinalBrief()}

              <div className="flex space-x-2 mt-4">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Tapez votre message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Panneau latéral - Navigation des sections */}
          <Card>
            <CardHeader>
              <CardTitle>Progression</CardTitle>
            </CardHeader>
            <CardContent>
              {activeSections.length > 0 && (
                <div className="space-y-2">
                  {activeSections.map((section, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded text-xs ${
                        index === currentSectionIndex && currentStep === 'data-entry'
                          ? 'bg-blue-100 text-blue-800'
                          : completedSections.has(section)
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {index + 1}. {section}
                      {completedSections.has(section) && (
                        <Check className="h-3 w-3 inline ml-1" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Brief;
