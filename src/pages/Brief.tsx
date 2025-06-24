import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Check, RefreshCw, Send, Download, Copy, FileText, Settings, Bot } from 'lucide-react';
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

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    addMessage(inputMessage, false);
    setInputMessage('');
  };

  // Quick action cards for configuration
  const quickActionCards = [
    {
      icon: FileText,
      title: "Créer un brief complet",
      description: "Toutes les sections pour un brief détaillé",
      color: "bg-orange-100 text-orange-700",
      onClick: () => {
        const newSections = new Array(18).fill(true);
        setUserPreferences({ ...userPreferences, sections: newSections });
      }
    },
    {
      icon: Settings,
      title: "Brief personnalisé",
      description: "Sélectionnez vos sections préférées",
      color: "bg-blue-100 text-blue-700",
      onClick: () => {
        // Keep current selection
      }
    },
    {
      icon: Bot,
      title: "Brief IA recommandé",
      description: "Sections essentielles sélectionnées par l'IA",
      color: "bg-green-100 text-green-700",
      onClick: () => {
        const recommendedSections = new Array(18).fill(false);
        [0, 1, 2, 3, 4, 7, 8].forEach(i => recommendedSections[i] = true);
        setUserPreferences({ ...userPreferences, sections: recommendedSections });
      }
    }
  ];

  // Initialisation avec le formulaire de configuration directement
  React.useEffect(() => {
    if (messages.length === 0 && currentStep === 'config') {
      addMessage("Bienvenue ! Configurons votre brief de poste. Commencez par choisir une option ci-dessous ou personnalisez vos sections :", true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100/50 transition-all duration-300 ease-in-out"
         style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header modernisé */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
            Assistant Brief IA
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Créez votre brief de poste en quelques minutes avec l'aide de l'IA
          </p>
        </div>

        {/* Barre de progression moderne */}
        {currentStep !== 'config' && activeSections.length > 0 && (
          <div className="mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  {currentStep === 'data-entry' && `Section ${currentSectionIndex + 1}/${activeSections.length}: ${activeSections[currentSectionIndex]}`}
                  {currentStep === 'final' && 'Brief Final Généré'}
                </span>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {Math.round(progress)}% terminé
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        )}

        {/* Configuration moderne */}
        {currentStep === 'config' && (
          <div className="space-y-8">
            {/* Quick actions cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {quickActionCards.map((card, index) => (
                <button
                  key={index}
                  onClick={card.onClick}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200/50 hover:shadow-md hover:scale-[1.02] transition-all duration-300 text-left"
                >
                  <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </button>
              ))}
            </div>

            {/* Configuration détaillée */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200/50">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Configuration détaillée</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Langue</label>
                      <Select value={userPreferences.language} onValueChange={handleLanguageChange}>
                        <SelectTrigger className="bg-white/80">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Niveau de séniorité</label>
                      <Select value={userPreferences.seniority} onValueChange={handleSeniorityChange}>
                        <SelectTrigger className="bg-white/80">
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

                  <div className="bg-gray-50/80 rounded-xl p-4">
                    <div className="text-sm font-medium text-gray-700 mb-3">
                      {userPreferences.sections.filter(Boolean).length} section(s) sélectionnée(s)
                    </div>
                    <Button 
                      onClick={handleConfigSubmit} 
                      disabled={userPreferences.sections.filter(Boolean).length === 0}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl h-12 font-medium transition-all duration-300 hover:scale-[1.02]"
                    >
                      Commencer la création du brief
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Sections à inclure :</h4>
                  <div className="bg-gray-50/80 rounded-xl p-4 max-h-80 overflow-y-auto space-y-2">
                    {SECTION_IDS.map((section, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/60 transition-colors">
                        <Checkbox
                          id={`section-${index}`}
                          checked={userPreferences.sections[index]}
                          onCheckedChange={(checked) => handleSectionToggle(index, Boolean(checked))}
                          className="rounded"
                        />
                        <label htmlFor={`section-${index}`} className="text-sm cursor-pointer flex-1">
                          {section}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interface de génération moderne */}
        {currentStep !== 'config' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Zone principale */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {currentStep === 'data-entry' ? 'Génération avec l\'IA' : 'Brief Final'}
                  </h2>
                </div>

                <div className="p-6">
                  {/* Messages de chat */}
                  <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
                    {messages.map((message) => (
                      <div key={message.id}>
                        <ChatMessage message={message} />
                      </div>
                    ))}
                  </div>

                  {/* Interface de saisie selon l'étape */}
                  {currentStep === 'data-entry' && (
                    <div className="space-y-4">
                      <div className="bg-gray-50/80 rounded-xl p-4">
                        <h3 className="font-medium text-gray-900 mb-3">Section : {activeSections[currentSectionIndex]}</h3>
                        
                        <Textarea
                          placeholder={`Saisissez les informations pour "${activeSections[currentSectionIndex]}"...`}
                          value={briefData[activeSections[currentSectionIndex]]?.content || ''}
                          onChange={(e) => handleDataUpdate(activeSections[currentSectionIndex], { content: e.target.value })}
                          rows={3}
                          className="bg-white/80 border-0 rounded-xl"
                        />

                        <Button 
                          onClick={handleGenerate}
                          disabled={isGenerating}
                          className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl h-12 font-medium"
                        >
                          {isGenerating ? 'Génération en cours...' : 'Générer avec l\'IA'}
                        </Button>
                      </div>

                      {generatedMarkdown && (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 p-3 bg-gray-50/80 rounded-xl">
                            <span className="text-sm font-medium text-gray-700">Confiance :</span>
                            <div className="flex items-center space-x-2">
                              <div className={`w-16 h-2 rounded-full ${confidence >= 0.8 ? 'bg-green-500' : confidence >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                              <span className="text-sm font-medium">{Math.round(confidence * 100)}%</span>
                            </div>
                            {fallbackNeeded && (
                              <Badge variant="destructive" className="flex items-center space-x-1">
                                <AlertTriangle className="h-3 w-3" />
                                <span>Révision suggérée</span>
                              </Badge>
                            )}
                          </div>

                          <div className="bg-white rounded-xl p-4 border border-gray-200">
                            <pre className="whitespace-pre-wrap text-sm text-gray-800">{generatedMarkdown}</pre>
                          </div>

                          <div className="space-y-3">
                            <Textarea
                              placeholder="Commentaires pour améliorer cette section..."
                              value={feedbackText}
                              onChange={(e) => setFeedbackText(e.target.value)}
                              rows={2}
                              className="bg-white/80 border-0 rounded-xl"
                            />
                            <div className="flex space-x-3">
                              <Button 
                                variant="outline"
                                onClick={handleReformulate}
                                disabled={!feedbackText.trim() || isReforming}
                                className="flex items-center space-x-2 rounded-xl"
                              >
                                <RefreshCw className="h-4 w-4" />
                                <span>{isReforming ? 'Reformulation...' : 'Reformuler'}</span>
                              </Button>
                              <Button 
                                onClick={handleValidateSection}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl"
                              >
                                Valider cette section
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {currentStep === 'final' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Brief Final</h3>
                        <div className="flex space-x-2">
                          <Button variant="outline" onClick={handleCopyFinalBrief} size="sm" className="rounded-xl">
                            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            {isCopied ? 'Copié!' : 'Copier'}
                          </Button>
                          <Button variant="outline" onClick={handleDownloadFinalBrief} size="sm" className="rounded-xl">
                            <Download className="h-4 w-4" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                      
                      <div className="max-h-96 overflow-y-auto bg-white rounded-xl p-4 border border-gray-200">
                        <pre className="whitespace-pre-wrap text-sm text-gray-800">{finalBrief}</pre>
                      </div>
                    </div>
                  )}

                  {/* Zone de saisie de message */}
                  <div className="flex space-x-3 mt-6 p-4 bg-gray-50/80 rounded-xl">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Tapez votre message..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="bg-white/80 border-0 rounded-xl"
                    />
                    <Button onClick={handleSendMessage} className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-6">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Panneau latéral moderne */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 h-fit">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Progression</h3>
              </div>
              <div className="p-6">
                {currentStep === 'config' && (
                  <div className="text-sm text-gray-600">
                    Commencez par configurer votre brief avec les sections et paramètres souhaités.
                  </div>
                )}
                {activeSections.length > 0 && currentStep !== 'config' && (
                  <div className="space-y-2">
                    {activeSections.map((section, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-xl text-sm transition-all duration-200 ${
                          index === currentSectionIndex && currentStep === 'data-entry'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : completedSections.has(section)
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{index + 1}. {section}</span>
                          {completedSections.has(section) && (
                            <Check className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brief;
