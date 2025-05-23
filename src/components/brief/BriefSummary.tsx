
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle } from 'lucide-react';

interface BriefData {
  missions: string[];
  hardSkills: string[];
  softSkills: string[];
  context: string;
  location: string;
  constraints: string[];
}

interface BriefSummaryProps {
  briefData: BriefData;
}

const BriefSummary: React.FC<BriefSummaryProps> = ({ briefData }) => {
  const sections = [
    { label: 'Missions principales', data: briefData.missions, key: 'missions' },
    { label: 'Hard skills requis', data: briefData.hardSkills, key: 'hardSkills' },
    { label: 'Soft skills attendus', data: briefData.softSkills, key: 'softSkills' },
    { label: 'Contexte projet', data: briefData.context ? [briefData.context] : [], key: 'context' },
    { label: 'Localisation', data: briefData.location ? [briefData.location] : [], key: 'location' },
    { label: 'Contraintes', data: briefData.constraints, key: 'constraints' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Résumé du brief</CardTitle>
        <p className="text-sm text-gray-600">Synthèse mise à jour en temps réel</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {sections.map((section) => (
          <div key={section.key} className="space-y-2">
            <div className="flex items-center space-x-2">
              {section.data.length > 0 ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Circle className="h-4 w-4 text-gray-300" />
              )}
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
        
        <div className="pt-3 border-t">
          <div className="text-xs text-gray-500">
            Complétude du brief: {Math.round((sections.filter(s => s.data.length > 0).length / sections.length) * 100)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BriefSummary;
