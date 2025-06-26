
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
import BriefDataForm from '@/components/brief/BriefDataForm';
import BriefGenerationStep from '@/components/brief/BriefGenerationStep';
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
          <BriefDataForm 
            userPreferences={userPreferences}
            onNext={() => handleStepChange('generation')}
            onBack={() => handleStepChange('config')}
          />
        );
      case 'generation':
        return (
          <BriefGenerationStep 
            userPreferences={userPreferences}
            onNext={() => handleStepChange('final')}
            onBack={() => handleStepChange('data-entry')}
          />
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
