
import React from 'react';

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-md p-3 rounded-lg ${
          message.isAI
            ? 'bg-gray-100 text-gray-700'
            : 'bg-primary text-white'
        }`}
      >
        {message.isAI && (
          <div className="flex items-center mb-2">
            <span className="text-xs font-medium">🤖 Assistant IA</span>
          </div>
        )}
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.content}
        </div>
        <div className={`text-xs mt-2 ${message.isAI ? 'text-gray-500' : 'text-blue-100'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
