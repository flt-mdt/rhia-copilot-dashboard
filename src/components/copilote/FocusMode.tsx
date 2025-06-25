
import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TimerFocus from './TimerFocus';

interface FocusModeProps {
  onExit: () => void;
}

const FocusMode: React.FC<FocusModeProps> = ({ onExit }) => {
  const [currentTask] = useState({
    id: '1',
    title: 'Valider la période d\'essai de Victor Martin',
    employee: 'Victor Martin'
  });

  const [isCompleted, setIsCompleted] = useState(false);

  const handleTaskComplete = () => {
    setIsCompleted(true);
    setTimeout(() => {
      onExit();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-lavender/20 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={onExit}
            className="absolute top-4 right-4"
          >
            <X className="h-6 w-6" />
          </Button>
          
          <div className="mb-6">
            <TimerFocus />
          </div>
          
          <h1 className="text-2xl font-bold text-charcoal mb-2">
            Mode Focus 🎯
          </h1>
          <p className="text-mist mb-8">
            Concentrez-vous sur une seule tâche à la fois
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {isCompleted ? (
            <div className="animate-fade-in">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-xl font-bold text-success-soft mb-2">
                Bravo ! Tâche accomplie
              </h2>
              <p className="text-mist">
                Vous pouvez être fier de votre travail
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👤</span>
                </div>
                <h2 className="text-xl font-bold text-charcoal mb-2">
                  {currentTask.title}
                </h2>
                <p className="text-mist">
                  Collaborateur : {currentTask.employee}
                </p>
              </div>
              
              <div className="space-y-4">
                <Button
                  onClick={handleTaskComplete}
                  className="w-full bg-success-soft hover:bg-success-soft/90 text-white py-3 text-lg"
                >
                  ✅ J'ai terminé
                </Button>
                
                <p className="text-sm text-mist">
                  Prenez votre temps, la qualité prime sur la rapidité
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FocusMode;
