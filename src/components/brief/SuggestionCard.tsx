
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SuggestionCardProps {
  suggestion: string;
  onClick: (suggestion: string) => void;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion, onClick }) => {
  return (
    <Card 
      className="cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-colors"
      onClick={() => onClick(suggestion)}
    >
      <CardContent className="p-3">
        <p className="text-sm text-gray-700">{suggestion}</p>
      </CardContent>
    </Card>
  );
};

export default SuggestionCard;
