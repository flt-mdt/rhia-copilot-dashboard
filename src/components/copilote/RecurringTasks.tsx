
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Repeat, Clock, CheckCircle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

const RecurringTasks: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const recurringTasks = [
    {
      id: '1',
      title: 'Vérifier période d\'essai de Victor',
      status: 'completed',
      nextDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Relancer manager de Clara',
      status: 'pending',
      nextDate: '2024-01-16'
    },
    {
      id: '3',
      title: 'Export variables paie',
      status: 'scheduled',
      nextDate: '2024-01-30',
      frequency: 'Tous les 15 du mois'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success-soft" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'scheduled':
        return <Repeat className="h-4 w-4 text-sage" />;
      default:
        return <Clock className="h-4 w-4 text-mist" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
            <div className="flex items-center space-x-2">
              <Repeat className="h-5 w-5 text-sage" />
              <h2 className="text-lg font-bold text-charcoal">Tâches récurrentes</h2>
            </div>
            {isOpen ? (
              <ChevronDown className="h-4 w-4 text-mist" />
            ) : (
              <ChevronRight className="h-4 w-4 text-mist" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="space-y-3 mt-4">
          {recurringTasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              {getStatusIcon(task.status)}
              <div className="flex-1">
                <p className="text-base text-charcoal">{task.title}</p>
                {task.frequency && (
                  <p className="text-xs text-mist mt-1">{task.frequency}</p>
                )}
              </div>
              <span className="text-xs text-mist">{task.nextDate}</span>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default RecurringTasks;
