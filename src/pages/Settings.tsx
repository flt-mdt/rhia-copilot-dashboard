
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import StarRating from '@/components/settings/StarRating';
import { Settings as SettingsIcon } from 'lucide-react';
import ActivityItem from '@/components/activity/ActivityItem';

interface CriterionWeight {
  id: string;
  name: string;
  description: string;
  weight: number;
}

const Settings = () => {
  const [criteria, setCriteria] = useState<CriterionWeight[]>([
    {
      id: "technical-skills",
      name: "Technical Skills",
      description: "Programming languages, frameworks, tools, methodologies",
      weight: 5
    },
    {
      id: "soft-skills",
      name: "Soft Skills",
      description: "Communication, teamwork, leadership, problem-solving abilities",
      weight: 4
    },
    {
      id: "experience",
      name: "Experience",
      description: "Relevant work history, projects, industry experience",
      weight: 5
    },
    {
      id: "education",
      name: "Education",
      description: "Degrees, certifications, coursework, academic achievements",
      weight: 3
    },
    {
      id: "languages",
      name: "Languages",
      description: "Language proficiency levels and related certifications",
      weight: 2
    },
    {
      id: "personality-fit",
      name: "Personality Fit",
      description: "Cultural fit, character traits, work style compatibility",
      weight: 4
    }
  ]);

  const recentActivities = [
    {
      type: 'upload' as const,
      message: 'New CV uploaded for Senior AI Engineer',
      timestamp: '2 hours ago'
    },
    {
      type: 'document' as const,
      message: 'CV analysis completed for Thomas Dubois',
      timestamp: '3 hours ago'
    },
    {
      type: 'transition' as const,
      message: 'Emma Bernard moved to interview stage',
      timestamp: '5 hours ago'
    },
    {
      type: 'event' as const,
      message: 'Interview scheduled with Sophie Martin',
      timestamp: '1 day ago'
    }
  ];

  const handleWeightChange = (id: string, newWeight: number) => {
    setCriteria(prevCriteria => 
      prevCriteria.map(criterion => 
        criterion.id === id ? { ...criterion, weight: newWeight } : criterion
      )
    );
  };

  return (
    <div className="ml-64 p-8 bg-[#F9FAFB]">
      <Header title="Settings" />
      
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-primary" />
              <CardTitle>Evaluation Criteria Weights</CardTitle>
            </div>
            <CardDescription>
              Customize the importance of different criteria used to evaluate candidates
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <p className="text-sm text-gray-600 mb-6">
              Adjust the importance of each criterion by clicking on the stars. Higher ratings will give more weight to that criterion in the overall candidate score.
            </p>
            
            <div className="space-y-6">
              {criteria.map(criterion => (
                <div 
                  key={criterion.id} 
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b border-gray-100"
                >
                  <div className="mb-2 sm:mb-0">
                    <h3 className="font-medium text-gray-900">{criterion.name}</h3>
                    <p className="text-sm text-gray-500">{criterion.description}</p>
                  </div>
                  <StarRating 
                    value={criterion.weight} 
                    onChange={(value) => handleWeightChange(criterion.id, value)} 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentActivities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  type={activity.type}
                  message={activity.message}
                  timestamp={activity.timestamp}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
