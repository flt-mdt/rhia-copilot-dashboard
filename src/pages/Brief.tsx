import React, { useState, useRef, useEffect } from 'react';
import { Send, Lightbulb, FileText, Briefcase, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { useNavigate, useParams } from 'react-router-dom';
import InteractiveBriefSummary from '@/components/brief/InteractiveBriefSummary';
import ChatMessage from '@/components/brief/ChatMessage';
import SuggestionCard from '@/components/brief/SuggestionCard';
import { useAIBriefs } from '@/hooks/useAIBriefs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const API_BASE = import.meta.env.VITE_API_URL || 'https://hunter-backend-w5ju.onrender.com/api';

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
}

interface BriefData {
  missions: string[];
  hardSkills: string[];
  softSkills: string[];
  context: string;
  location: string;
  constraints: string[];
}

interface BriefCompletionState {
  missions: boolean;
  hardSkills: boolean;
  softSkills: boolean;
  context: boolean;
  location: boolean;
  constraints: boolean;
}

const Brief = () => {
  const navigate = useNavigate();
  const { briefId } = useParams();
  const { session } = useAuth();
  const { toast } = useToast();
  const { saveBrief, generateJobPosting, fetchBrief } = useAIBriefs();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Bonjour ! Je suis votre assistant IA spécialisé en recrutement. Je vais vous aider à définir précisément le profil que vous recherchez. Pour commencer, pouvez-vous me parler de votre besoin de recrutement ? Même si vous n'êtes pas encore sûr des détails, décrivez-moi simplement la situation.",
      isAI: true,
      timestamp: new Date()
    }
  ]);
  
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentBriefId, setCurrentBriefId] = useState<string | null>(briefId || null);
  
  const [briefData, setBriefData] = useState<BriefData>({
    missions: [],
    hardSkills: [],
    softSkills: [],
    context: '',
    location: '',
    constraints: []
  });

  const [completionState, setCompletionState] = useState<BriefCompletionState>({
    missions: false,
    hardSkills: false,
    softSkills: false,
    context: false,
    location: false,
    constraints: false
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load existing brief if briefId is provided
  useEffect(() => {
    const loadBrief = async () => {
      if (currentBriefId && fetchBrief) {
        const brief = await fetchBrief(currentBriefId);
        if (brief) {
          // Populate messages from conversation_data
          if (brief.conversation_data && Array.isArray(brief.conversation_data)) {
            setMessages(brief.conversation_data);
          }
          
          // Populate briefData
          setBriefData({
            missions: brief.missions || [],
            hardSkills: brief.hard_skills || [],
            softSkills: brief.soft_skills || [],
            context: brief.project_context || '',
            location: brief.location || '',
            constraints: brief.constraints || []
          });
          
          // Populate completionState
          if (brief.brief_summary) {
            setCompletionState(brief.brief_summary);
          }
        }
      }
    };

    loadBrief();
  }, [currentBriefId, fetchBrief]);

  const suggestions = [
    "Quel est le niveau d'expérience requis pour ce poste ?",
    "Avez-vous défini une fourchette salariale pour ce recrutement ?",
    "Souhaitez-vous explorer plusieurs profils différents ?",
    "Dans quel contexte cette personne va-t-elle évoluer au quotidien ?",
    "Y a-t-il des contraintes particulières à prendre en compte ?",
    "Quelles sont vos attentes en termes de disponibilité ?"
  ];

  const handleCompletionChange = (section: keyof BriefCompletionState, completed: boolean) => {
    setCompletionState(prev => ({
      ...prev,
      [section]: completed
    }));
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      isAI: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      // If no currentBriefId, create a brief first
      if (!currentBriefId) {
        const briefToSave = {
          title: 'Nouveau brief',
          missions: briefData.missions,
          hard_skills: briefData.hardSkills,
          soft_skills: briefData.softSkills,
          project_context: briefData.context,
          location: briefData.location,
          constraints: briefData.constraints,
          conversation_data: [...messages, userMessage],
          brief_summary: completionState,
          is_complete: false
        };

        const savedBrief = await saveBrief(briefToSave);
        if (savedBrief) {
          setCurrentBriefId(savedBrief.id);
        }
      }

      // Send message to chat endpoint and handle response
      const token = session?.access_token;
      const response = await fetch(`${API_BASE}/chat/${currentBriefId || 'temp'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: currentMessage })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle response as text stream
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      let aiMessageContent = '';
      const aiMessageId = (Date.now() + 1).toString();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data && data !== '[DONE]') {
                aiMessageContent += data;
                
                // Update the AI message in real-time
                setMessages(prev => {
                  const existingAIMessageIndex = prev.findIndex(m => m.id === aiMessageId);
                  const aiMessage: Message = {
                    id: aiMessageId,
                    content: aiMessageContent,
                    isAI: true,
                    timestamp: new Date()
                  };

                  if (existingAIMessageIndex >= 0) {
                    const updated = [...prev];
                    updated[existingAIMessageIndex] = aiMessage;
                    return updated;
                  } else {
                    return [...prev, aiMessage];
                  }
                });
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
        setIsLoading(false);
        updateBriefData(currentMessage);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      
      // Fallback response if API fails
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Je vous remercie pour ces informations. Pouvez-vous me donner plus de détails sur vos attentes pour ce poste ?",
        isAI: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMessage]);
      
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message",
        variant: "destructive"
      });
    }
  };

  const updateBriefData = (userInput: string) => {
    // Simple parsing - in real app, this would use AI to extract structured data
    setBriefData(prev => {
      const updated = { ...prev };
      
      if (userInput.toLowerCase().includes('développeur')) {
        updated.missions = ['Développement logiciel', 'Maintenance du code'];
        updated.hardSkills = ['JavaScript', 'React', 'Node.js'];
      }
      
      if (userInput.toLowerCase().includes('product')) {
        updated.missions = ['Gestion de produit', 'Définition de roadmap'];
        updated.softSkills = ['Communication', 'Leadership'];
      }
      
      if (userInput.toLowerCase().includes('remote') || userInput.toLowerCase().includes('télétravail')) {
        updated.location = 'Télétravail possible';
      }
      
      return updated;
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCurrentMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isBriefComplete = Object.values(completionState).every(Boolean);

  const handleSaveBrief = async () => {
    const briefToSave = {
      id: currentBriefId,
      title: briefData.missions[0] || 'Nouveau brief',
      missions: briefData.missions,
      hard_skills: briefData.hardSkills,
      soft_skills: briefData.softSkills,
      project_context: briefData.context,
      location: briefData.location,
      constraints: briefData.constraints,
      conversation_data: messages,
      brief_summary: completionState,
      is_complete: isBriefComplete
    };

    const savedBrief = await saveBrief(briefToSave);
    if (savedBrief) {
      setCurrentBriefId(savedBrief.id);
    }
  };

  const handleGenerateJobPosting = async () => {
    if (!currentBriefId) {
      await handleSaveBrief();
    }

    if (currentBriefId) {
      const jobPosting = await generateJobPosting(currentBriefId);
      if (jobPosting) {
        navigate('/job-postings');
      }
    }
  };

  return (
    <TooltipProvider>
      <div className="ml-64 min-h-screen bg-bgLight">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🤖 Brief avec l'IA – Définissons votre besoin
            </h1>
            <p className="text-gray-600">
              L'IA vous aide à préciser votre besoin, même si vous ne savez pas encore exactement ce que vous cherchez.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-2 flex flex-col space-y-4">
              <Card className="flex-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Conversation avec l'IA</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col">
                  {/* Messages Container with fixed height */}
                  <div className="h-[400px] overflow-y-auto space-y-4 pr-2 mb-4">
                    {messages.map((message) => (
                      <ChatMessage
                        key={message.id}
                        message={message}
                      />
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg p-3 max-w-md">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Section */}
                  <div className="border-t pt-4">
                    <div className="flex space-x-2">
                      <Textarea
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Décrivez vos attentes, vos contraintes ou dites juste 'Je ne sais pas'..."
                        className="flex-1"
                        rows={2}
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!currentMessage.trim() || isLoading}
                        className="px-4"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Suggestions - Now display only as reference */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-700 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Questions pour vous aider à réfléchir
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {suggestions.map((suggestion, index) => (
                      <Card key={index} className="border-gray-200">
                        <CardContent className="p-3">
                          <p className="text-sm text-gray-700">{suggestion}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Brief Summary */}
            <div className="space-y-6">
              <InteractiveBriefSummary 
                briefData={briefData}
                completionState={completionState}
                onCompletionChange={handleCompletionChange}
              />
              
              {/* Tools */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Outils d'aide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => navigate('/job-templates')}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Bibliothèque de postes types
                  </Button>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start opacity-50 cursor-not-allowed"
                        disabled
                      >
                        🔍 Analyser une fiche existante
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Fonctionnalité à venir prochainement</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start opacity-50 cursor-not-allowed"
                        disabled
                      >
                        📈 Benchmark marché
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Fonctionnalité à venir prochainement</p>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleSaveBrief}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  💾 Sauvegarder le brief
                </Button>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  disabled={!isBriefComplete}
                  onClick={handleGenerateJobPosting}
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Générer la fiche de poste
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Brief;
