
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StarRating from '@/components/settings/StarRating';
import LanguageSelector from '@/components/settings/LanguageSelector';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Settings as SettingsIcon, LogOut, Save, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/hooks/useNotifications';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEvaluationCriteria } from '@/hooks/useEvaluationCriteria';
import NotificationItem from '@/components/notifications/NotificationItem';

interface CriterionWeight {
  id: string;
  name: string;
  description: string;
  weight: number;
}

const DEFAULT_CRITERIA: CriterionWeight[] = [
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
];

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { notifications } = useNotifications();
  const { t } = useLanguage();
  const { criteria: dbCriteria, loading, saveAllCriteria } = useEvaluationCriteria();
  
  const [criteria, setCriteria] = useState<CriterionWeight[]>(DEFAULT_CRITERIA);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Sync with database data when it loads
  useEffect(() => {
    if (dbCriteria.length > 0) {
      const mappedCriteria = dbCriteria.map(dbCriterion => ({
        id: dbCriterion.criterion_id,
        name: dbCriterion.criterion_name,
        description: dbCriterion.description,
        weight: dbCriterion.weight
      }));
      setCriteria(mappedCriteria);
      setHasUnsavedChanges(false);
    }
  }, [dbCriteria]);

  const handleWeightChange = (id: string, newWeight: number) => {
    setCriteria(prevCriteria => 
      prevCriteria.map(criterion => 
        criterion.id === id ? { ...criterion, weight: newWeight } : criterion
      )
    );
    setHasUnsavedChanges(true);
  };

  const handleSaveCriteria = async () => {
    const criteriaToSave = criteria.map(criterion => ({
      criterion_id: criterion.id,
      criterion_name: criterion.name,
      description: criterion.description,
      weight: criterion.weight
    }));

    await saveAllCriteria(criteriaToSave);
    setHasUnsavedChanges(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    
    toast({
      title: t('success.logoutSuccess'),
      description: "You have been logged out",
    });
    
    navigate('/login');
  };

  return (
    <TooltipProvider>
      <div className="transition-all duration-300 ease-in-out p-4 md:p-8 bg-[#F9FAFB]"
           style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
        <Header title={t('settings.title')} />
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Language Selector */}
          <LanguageSelector />

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5 text-primary" />
                  <CardTitle className="flex items-center gap-2">
                    {t('settings.criteria.title')}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-500 hover:text-gray-700 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs p-4 bg-white border shadow-lg">
                        <div className="space-y-2 text-sm">
                          <div className="font-semibold text-gray-900">
                            {/* Cette instruction n'a pas de clé de traduction spécifique, elle reste en dur */}
                            💡 À quoi servent les étoiles ?
                          </div>
                          <div className="text-gray-700">
                            {/* Idem, phrase d'aide spécifique */}
                            Les étoiles permettent d'indiquer l'importance que vous accordez à chaque critère dans le calcul de la note de matching.
                          </div>
                          <div className="text-gray-700">
                            Plus un critère a d'étoiles, plus il comptera dans la note finale.
                          </div>
                          <div className="text-gray-700">
                            👉 <span className="font-medium">Attention :</span> les étoiles ne reflètent pas la qualité attendue des profils (nous recherchons toujours le meilleur pour vous), mais bien la pondération du critère dans l'évaluation globale.
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </div>
                {hasUnsavedChanges && (
                  <Button 
                    onClick={handleSaveCriteria}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {loading ? t('common.saving') : t('common.save')}
                  </Button>
                )}
              </div>
              <CardDescription>
                {t('settings.criteria.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-6">
                {t('settings.criteria.help')}
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
              {hasUnsavedChanges && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    {/* Message d'avertissement spécifique */}
                    {t('settings.unsavedChanges')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>{t('settings.activity.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {notifications.length > 0 ? (
                  notifications.slice(0, 10).map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <p className="text-sm">{t('settings.activity.empty')}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Logout Button */}
          <Card className="border border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-red-600">{t('settings.logout.title')}</CardTitle>
              <CardDescription>
                {t('settings.logout.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {t('settings.logout.button')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Settings;
