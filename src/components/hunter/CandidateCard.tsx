
import React, { useState } from 'react';
import { ExternalLink, Save, Download, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useHunterProfiles } from '@/hooks/useHunterProfiles';
import { hunterApi } from '@/api/index';

interface Skill {
  name: string;
}

export interface HunterCandidate {
  id: string;
  name: string;
  source: string;
  location: string;
  languages: string[];
  availability: string;
  skills: Skill[];
  matchScore: number;
  profileUrl: string;
  isNew?: boolean;
}

interface CandidateCardProps {
  candidate: HunterCandidate;
  searchQuery?: string;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, searchQuery }) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { isSaving } = useHunterProfiles();
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveCandidate = async () => {
    try {
      await hunterApi.patch(`/results/${candidate.id}`, {
        is_shortlisted: true
      });
      setIsSaved(true);
      toast({
        title: t('hunter.saved'),
        description: t('hunter.profileMarkedAsSaved'),
      });
    } catch (error) {
      console.error('Erreur API PATCH:', error);
      toast({
        title: t('hunter.saveError'),
        description: t('hunter.profileSaveFailed'),
        variant: 'destructive',
      });
    }
  };

  const handleImportCandidate = () => {
    toast({
      title: t('hunter.profileImported'),
      description: t('hunter.importedToDatabase').replace('{name}', candidate.name),
    });
  };

  return (
    <Card className="rounded-3xl bg-white shadow-lg border border-gray-100 max-w-4xl mx-auto">
      <CardContent className="p-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
              {candidate.isNew && (
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 rounded-full px-3 py-1">
                  {t('hunter.new')}
                </Badge>
              )}
              {isSaved && (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 rounded-full px-3 py-1">
                  <Check className="mr-1 h-3 w-3" />
                  {t('hunter.saved')}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-4 mb-3">
              <Badge variant="outline" className="bg-gray-50 text-gray-600 hover:bg-gray-50 border-0 rounded-full px-3 py-1">
                {candidate.source}
              </Badge>
              <span className="text-gray-600">
                {candidate.location} • {candidate.languages.join(', ')}
              </span>
            </div>
            
            <div className="text-gray-600 mb-4">
              {t('hunter.availability')}: {candidate.availability}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {candidate.skills?.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200 rounded-full px-3 py-1"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                size="sm"
                variant="outline"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 rounded-full px-4 py-2"
                onClick={() => window.open(candidate.profileUrl, '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                {t('hunter.viewProfile')}
              </Button>
              
              <Button 
                size="sm" 
                variant="outline" 
                className={`rounded-full px-4 py-2 border-0 ${
                  isSaved 
                    ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
                onClick={handleSaveCandidate}
                disabled={isSaved || isSaving}
              >
                {isSaved ? (
                  <><Check className="mr-2 h-4 w-4" /> {t('hunter.saved')}</>
                ) : (
                  <><Save className="mr-2 h-4 w-4" /> {t('hunter.save')}</>
                )}
              </Button>
              
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200 rounded-full px-4 py-2"
                onClick={handleImportCandidate}
              >
                <Download className="mr-2 h-4 w-4" />
                {t('hunter.import')}
              </Button>
            </div>
          </div>
          
          <div className="ml-6">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 text-green-800 text-lg font-bold rounded-2xl w-16 h-16 flex items-center justify-center shadow-sm">
              {candidate.matchScore}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
