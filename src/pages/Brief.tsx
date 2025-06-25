
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Send, 
  ArrowLeft, 
  FileText, 
  Clock, 
  CheckCircle,
  Users,
  Target,
  Lightbulb,
  Bot,
  User,
  Sparkles,
  Download,
  Share2,
  Edit3,
  Save,
  RefreshCw
} from 'lucide-react';
import Header from '@/components/layout/Header';
import { useToast } from '@/hooks/use-toast';
import BriefSummary from '@/components/brief/BriefSummary';
import SectionConfiguration from '@/components/brief/SectionConfiguration';
import SectionGenerator from '@/components/brief/SectionGenerator';
import ModernChatMessage from '@/components/brief/ModernChatMessage';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserPreferences } from '@/services/briefBackendApi';

type WorkflowStep = 'config' | 'data-entry' | 'generation' | 'final';

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

const Brief = () => {
  const { briefId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('config');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Bonjour ! Je suis votre assistant IA pour créer des briefs de recrutement personnalisés. Pour commencer, pouvez-vous me parler du poste que vous souhaitez pourvoir ?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [briefData, setBriefData] = useState({
    missions: [] as string[],
    hardSkills: [] as string[],
    softSkills: [] as string[],
    context: '',
    location: '',
    constraints: [] as string[]
  });
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    sections: new Array(18).fill(false),
    language: 'fr',
    seniority: 'Junior'
  });
  const [generatedSections, setGeneratedSections] = useState({});
  const [progress, setProgress] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "Merci pour ces informations ! Je comprends que vous recherchez un développeur senior. Pouvez-vous me donner plus de détails sur les technologies spécifiques requises et l'équipe avec laquelle cette personne travaillera ?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleStepChange = (step: WorkflowStep) => {
    setCurrentStep(step);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'config':
        return (
          <SectionConfiguration 
            preferences={userPreferences}
            onPreferencesChange={setUserPreferences}
            onNext={() => handleStepChange('data-entry')} 
          />
        );
      case 'data-entry':
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header de la section */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">Assistant IA - Collecte d'informations</h2>
              <p className="text-lg text-gray-600">
                Discutez avec l'IA pour affiner les détails du poste
              </p>
            </div>

            {/* Chat Container avec style moderne */}
            <Card className="border-2 border-gray-100 shadow-lg">
              <div className="p-6">
                {/* En-tête du chat */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Chat avec l'Assistant IA</h3>
                    <p className="text-sm text-gray-500">Décrivez le poste, les compétences requises, l'équipe...</p>
                  </div>
                </div>

                {/* Zone des messages */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-6 max-h-96 overflow-y-auto">
                  <div className="space-y-1">
                    {messages.map((message) => (
                      <ModernChatMessage 
                        key={message.id} 
                        message={{ 
                          ...message, 
                          isAI: message.type === 'ai' 
                        }} 
                      />
                    ))}
                    {isGenerating && (
                      <div className="flex justify-start mb-6">
                        <div className="flex flex-row max-w-[80%]">
                          <div className="flex-shrink-0 mr-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                              <Bot className="h-5 w-5" />
                            </div>
                          </div>
                          <div className="relative px-6 py-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3">
                              <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
                              <span className="text-sm text-gray-600">L'IA réfléchit...</span>
                            </div>
                            <div className="absolute top-4 w-3 h-3 transform rotate-45 bg-white border-l border-t border-gray-200 -left-1.5" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Zone de saisie moderne */}
                <div className="relative">
                  <Textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Tapez votre message ici..."
                    className="pr-16 min-h-[100px] resize-none border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:ring-0"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isGenerating}
                    className="absolute bottom-3 right-3 h-10 w-10 p-0 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Boutons de navigation */}
            <div className="flex justify-between items-center pt-6">
              <Button 
                variant="outline" 
                onClick={() => handleStepChange('config')}
                className="px-6 py-3 rounded-xl"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <Button 
                onClick={() => handleStepChange('generation')}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-medium"
              >
                Générer le brief
                <Sparkles className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        );
      case 'generation':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Génération du brief</h2>
            <p className="text-gray-600">Les sections sont en cours de génération...</p>
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => handleStepChange('data-entry')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <Button 
                onClick={() => handleStepChange('final')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Terminer
              </Button>
            </div>
          </div>
        );
      case 'final':
        return <BriefSummary briefData={briefData} />;
      default:
        return null;
    }
  };

  const getStepStatus = (step: WorkflowStep) => {
    const steps: WorkflowStep[] = ['config', 'data-entry', 'generation', 'final'];
    const currentIndex = steps.indexOf(currentStep);
    const stepIndex = steps.indexOf(step);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="transition-all duration-300 ease-in-out p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen"
         style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
      <Header title="Brief IA" />
      
      <div className="max-w-7xl mx-auto">
        {/* Progress Steps avec style moderne */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full z-0"></div>
            <div 
              className="absolute top-5 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full z-10 transition-all duration-500"
              style={{ width: `${((['config', 'data-entry', 'generation', 'final'].indexOf(currentStep)) / 3) * 100}%` }}
            ></div>
            
            {[
              { step: 'config' as WorkflowStep, icon: Target, label: 'Configuration' },
              { step: 'data-entry' as WorkflowStep, icon: MessageSquare, label: 'Collecte' },
              { step: 'generation' as WorkflowStep, icon: Sparkles, label: 'Génération' },
              { step: 'final' as WorkflowStep, icon: CheckCircle, label: 'Finalisation' }
            ].map(({ step, icon: Icon, label }, index) => {
              const status = getStepStatus(step);
              return (
                <div key={step} className="flex flex-col items-center relative z-20">
                  <button
                    onClick={() => handleStepChange(step)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                      status === 'completed' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                        : status === 'current'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white ring-4 ring-blue-200'
                        : 'bg-white text-gray-400 border-2 border-gray-200'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                  <span className={`mt-3 text-sm font-medium ${
                    status === 'current' ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {renderStepContent()}
      </div>
    </div>
  );
};

export default Brief;
