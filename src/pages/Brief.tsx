
import React, { useState, useRef, useEffect } from 'react';
import { Send, Lightbulb, FileText, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BriefSummary from '@/components/brief/BriefSummary';
import ChatMessage from '@/components/brief/ChatMessage';
import SuggestionCard from '@/components/brief/SuggestionCard';

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

const Brief = () => {
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
  const [briefData, setBriefData] = useState<BriefData>({
    missions: [],
    hardSkills: [],
    softSkills: [],
    context: '',
    location: '',
    constraints: []
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestions = [
    "Souhaitez-vous préciser le niveau d'expérience souhaité ?",
    "Voulez-vous qu'on parle du budget / salaire ?",
    "Devons-nous explorer plusieurs scénarios de profils ?",
    "Quel est le contexte du projet ou de l'équipe ?"
  ];

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

    // Simulate AI response (in real app, this would call OpenAI API)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(currentMessage),
        isAI: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      updateBriefData(currentMessage);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    // Simple simulation - in real app, this would use OpenAI
    if (userInput.toLowerCase().includes('développeur') || userInput.toLowerCase().includes('dev')) {
      return "Parfait ! Vous cherchez un développeur. Pouvez-vous me préciser :\n\n• Quel niveau d'expérience : junior (0-2 ans), confirmé (3-5 ans), ou senior (5+ ans) ?\n• Quelles technologies sont prioritaires pour votre projet ?\n• S'agit-il d'un poste en CDI, freelance, ou stage ?\n• Le télétravail est-il possible ?";
    }
    
    if (userInput.toLowerCase().includes('product') || userInput.toLowerCase().includes('produit')) {
      return "Excellent ! Un profil Product. Aidez-moi à comprendre :\n\n• Cherchez-vous plutôt un Product Manager (stratégie, roadmap) ou un Product Owner (collaboration équipe tech) ?\n• Quelle est la taille de l'équipe produit actuelle ?\n• Sur quel type de produit : B2B, B2C, SaaS, mobile app ?\n• Y a-t-il des méthodes de travail spécifiques (Agile, Scrum) ?";
    }

    return "Merci pour ces précisions ! Pour mieux cerner votre besoin, pouvez-vous me parler :\n\n• Du contexte de votre équipe actuelle\n• Des principales missions que cette personne devra accomplir\n• Des contraintes particulières (budget, timing, localisation)\n\nN'hésitez pas à détailler, même les aspects qui vous semblent évidents !";
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

  const isBriefComplete = briefData.missions.length > 0 && briefData.hardSkills.length > 0;

  return (
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

            {/* Suggestions - Now separated from chat */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-700 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Suggestions pour approfondir
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {suggestions.map((suggestion, index) => (
                    <SuggestionCard
                      key={index}
                      suggestion={suggestion}
                      onClick={handleSuggestionClick}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Brief Summary */}
          <div className="space-y-6">
            <BriefSummary briefData={briefData} />
            
            {/* Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Outils d'aide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  📚 Bibliothèque de postes types
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  🔍 Analyser une fiche existante
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  📈 Benchmark marché
                </Button>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button 
              className="w-full" 
              size="lg"
              disabled={!isBriefComplete}
            >
              <FileText className="h-5 w-5 mr-2" />
              Générer la fiche de poste
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brief;
