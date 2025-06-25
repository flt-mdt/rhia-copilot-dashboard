
import React from 'react';
import { Brain, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SuggestionCard from './SuggestionCard';

const SmartSuggestionsAI: React.FC = () => {
  const suggestions = [
    {
      id: '1',
      title: 'Victor M. termine sa période d\'essai dans 2 semaines',
      description: 'Ajouter un point RH pour valider sa confirmation ?',
      icon: '📌',
      priority: 'high' as const
    },
    {
      id: '2',
      title: 'Clara n\'a pas encore programmé son entretien annuel',
      description: 'Relancer pour planifier avant fin janvier ?',
      icon: '📅',
      priority: 'medium' as const
    },
    {
      id: '3',
      title: '3 collaborateurs éligibles à une formation',
      description: 'Consulter le budget formation disponible ?',
      icon: '🎓',
      priority: 'low' as const
    }
  ];

  return (
    <div className="bg-lavender/20 rounded-2xl p-6 border border-lavender/30">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="h-5 w-5 text-sage" />
        <h2 className="text-lg font-bold text-charcoal">Suggestions IA</h2>
      </div>
      
      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <SuggestionCard
            key={suggestion.id}
            suggestion={suggestion}
            onAddToTasks={(suggestion) => {
              console.log('Adding to tasks:', suggestion);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SmartSuggestionsAI;
