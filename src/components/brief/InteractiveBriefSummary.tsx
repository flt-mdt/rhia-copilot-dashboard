
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

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

interface InteractiveBriefSummaryProps {
  briefData: BriefData;
  completionState: BriefCompletionState;
  onCompletionChange: (section: keyof BriefCompletionState, completed: boolean) => void;
}

const InteractiveBriefSummary: React.FC<InteractiveBriefSummaryProps> = ({ 
  briefData, 
  completionState, 
  onCompletionChange 
}) => {
  const sections = [
    { 
      label: 'Missions principales', 
      data: briefData.missions, 
      key: 'missions' as keyof BriefCompletionState
    },
    { 
      label: 'Hard skills requis', 
      data: briefData.hardSkills, 
      key: 'hardSkills' as keyof BriefCompletionState
    },
    { 
      label: 'Soft skills attendus', 
      data: briefData.softSkills, 
      key: 'softSkills' as keyof BriefCompletionState
    },
    { 
      label: 'Contexte projet', 
      data: briefData.context ? [briefData.context] : [], 
      key: 'context' as keyof BriefCompletionState
    },
    { 
      label: 'Localisation', 
      data: briefData.location ? [briefData.location] : [], 
      key: 'location' as keyof BriefCompletionState
    },
    { 
      label: 'Contraintes', 
      data: briefData.constraints, 
      key: 'constraints' as keyof BriefCompletionState
    }
  ];

  const completedSections = Object.values(completionState).filter(Boolean).length;
  const completionPercentage = Math.round((completedSections / sections.length) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Résumé du brief</CardTitle>
        <p className="text-sm text-gray-600">Synthèse mise à jour en temps réel</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Progression</span>
            <span className="text-sm text-gray-600">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {sections.map((section) => (
          <div key={section.key} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={completionState[section.key]}
                onCheckedChange={(checked) => 
                  onCompletionChange(section.key, Boolean(checked))
                }
                className="h-4 w-4"
              />
              <span className="text-sm font-medium text-gray-700">
                {section.label}
              </span>
            </div>
            
            {section.data.length > 0 ? (
              <div className="ml-6 space-y-1">
                {section.key === 'hardSkills' || section.key === 'softSkills' ? (
                  <div className="flex flex-wrap gap-1">
                    {section.data.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">
                    {section.data.map((item, index) => (
                      <div key={index}>• {item}</div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="ml-6 text-xs text-gray-400 italic">
                À définir dans la conversation
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default InteractiveBriefSummary;
