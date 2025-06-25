
import React from 'react';
import { Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
}

interface ModernChatMessageProps {
  message: Message;
}

const ModernChatMessage: React.FC<ModernChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.isAI ? 'justify-start' : 'justify-end'} mb-6`}>
      <div className={`flex max-w-[80%] ${message.isAI ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${message.isAI ? 'mr-3' : 'ml-3'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            message.isAI 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {message.isAI ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
          </div>
        </div>
        
        {/* Message bubble */}
        <div className={`relative px-6 py-4 rounded-2xl shadow-sm ${
          message.isAI
            ? 'bg-white border border-gray-200 text-gray-800'
            : 'bg-blue-600 text-white'
        }`}>
          {/* Label pour l'IA */}
          {message.isAI && (
            <div className="flex items-center mb-2">
              <span className="text-xs font-medium text-blue-600">🤖 Assistant IA</span>
            </div>
          )}
          
          {/* Contenu du message */}
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </div>
          
          {/* Timestamp */}
          <div className={`text-xs mt-2 ${
            message.isAI ? 'text-gray-400' : 'text-blue-100'
          }`}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          
          {/* Petite flèche pour la bulle */}
          <div className={`absolute top-4 w-3 h-3 transform rotate-45 ${
            message.isAI 
              ? 'bg-white border-l border-t border-gray-200 -left-1.5' 
              : 'bg-blue-600 -right-1.5'
          }`} />
        </div>
      </div>
    </div>
  );
};

export default ModernChatMessage;
