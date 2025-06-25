
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Trophy, Calendar } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

const CompletedTasks: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const completedTasks = [
    {
      id: '1',
      title: 'Entretien de recrutement - Développeur Senior',
      employee: 'Sarah Martin',
      completedAt: '2024-01-14 14:30',
      tags: ['Recrutement', 'Entretien']
    },
    {
      id: '2',
      title: 'Validation congés - Équipe Marketing',
      employee: 'Équipe Marketing',
      completedAt: '2024-01-14 10:15',
      tags: ['Congés', 'Validation']
    },
    {
      id: '3',
      title: 'Mise à jour fiche de poste - UX Designer',
      employee: 'Thomas Dubois',
      completedAt: '2024-01-13 16:45',
      tags: ['Fiche de poste', 'UX']
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-success-soft" />
              <h2 className="text-lg font-bold text-charcoal">
                🎉 Tâches accomplies aujourd'hui
              </h2>
            </div>
            {isOpen ? (
              <ChevronDown className="h-4 w-4 text-mist" />
            ) : (
              <ChevronRight className="h-4 w-4 text-mist" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="space-y-3 mt-4">
          {completedTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-success-soft/10 rounded-lg border border-success-soft/20">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success-soft rounded-full"></div>
                <div>
                  <h3 className="text-base font-medium text-charcoal">
                    {task.title}
                  </h3>
                  <p className="text-sm text-mist">
                    {task.employee}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-mist" />
                <span className="text-xs text-mist">
                  {task.completedAt}
                </span>
              </div>
            </div>
          ))}
          
          <div className="pt-4 text-center">
            <Button
              variant="outline"
              className="border-success-soft text-success-soft hover:bg-success-soft hover:text-white"
            >
              ✨ Célébrer mes progrès
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CompletedTasks;
