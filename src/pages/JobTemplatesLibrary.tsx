
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useJobTemplates } from '@/hooks/useJobTemplates';
import { Star, Users, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const JobTemplatesLibrary = () => {
  const { templates, loading } = useJobTemplates();
  const { toast } = useToast();

  const handleUseTemplate = (template: any) => {
    // Copy template data to clipboard or localStorage for use in form
    const templateData = {
      title: template.title,
      description: template.description,
      missions: template.missions,
      hardSkills: template.hard_skills,
      softSkills: template.soft_skills,
      department: template.department,
      experienceLevel: template.experience_level
    };
    
    localStorage.setItem('selectedJobTemplate', JSON.stringify(templateData));
    
    toast({
      title: "Modèle sélectionné",
      description: "Le modèle a été copié. Vous pouvez maintenant l'utiliser dans le formulaire de création."
    });
  };

  if (loading) {
    return (
      <div className="ml-64 p-6 bg-bgLight min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Bibliothèque de modèles</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-64 p-6 bg-bgLight min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📚 Bibliothèque de modèles
          </h1>
          <p className="text-gray-600">
            Découvrez des modèles de fiches de poste inspirants et utilisez-les pour vos créations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1 flex items-center gap-2">
                      {template.title}
                      {template.is_featured && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="h-3 w-3" />
                      <span>{template.usage_count} utilisations</span>
                    </div>
                  </div>
                </div>
                {template.department && (
                  <Badge variant="outline" className="w-fit">
                    {template.department}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {template.description && (
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {template.description}
                  </p>
                )}
                
                {template.missions.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Missions principales</h4>
                    <div className="space-y-1">
                      {template.missions.slice(0, 3).map((mission, index) => (
                        <div key={index} className="text-xs text-gray-600">
                          • {mission}
                        </div>
                      ))}
                      {template.missions.length > 3 && (
                        <div className="text-xs text-gray-400">
                          +{template.missions.length - 3} autres missions
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {template.hard_skills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Compétences techniques</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.hard_skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {template.hard_skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.hard_skills.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <Button 
                  onClick={() => handleUseTemplate(template)}
                  className="w-full"
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Utiliser ce modèle
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobTemplatesLibrary;
