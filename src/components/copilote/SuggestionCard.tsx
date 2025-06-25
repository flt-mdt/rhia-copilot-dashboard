
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  icon: string;
  priority: 'high' | 'medium' | 'low';
}

interface SuggestionCardProps {
  suggestion: Suggestion;
  onAddToTasks: (suggestion: Suggestion) => void;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion, onAddToTasks }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-400';
      case 'medium':
        return 'border-l-yellow-400';
      case 'low':
        return 'border-l-green-400';
      default:
        return 'border-l-gray-400';
    }
  };

  return (
    <div className={`bg-white rounded-lg p-4 border-l-4 ${getPriorityColor(suggestion.priority)} hover:shadow-sm transition-shadow`}>
      <div className="flex items-start space-x-3">
        <span className="text-lg">{suggestion.icon}</span>
        <div className="flex-1">
          <h3 className="text-base font-medium text-charcoal mb-1">
            {suggestion.title}
          </h3>
          <p className="text-sm text-mist mb-3">
            {suggestion.description}
          </p>
          <Button
            size="sm"
            onClick={() => onAddToTasks(suggestion)}
            className="bg-sage hover:bg-sage/90 text-white"
          >
            <Plus className="h-3 w-3 mr-1" />
            Ajouter à mes tâches
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;
