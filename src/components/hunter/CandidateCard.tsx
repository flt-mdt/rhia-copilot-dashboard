import React, { useState } from 'react';
import { ExternalLink, Save, Download, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveCandidate = () => {
    toast({
      title: t('hunter.profileSaved'),
      description: `${candidate.name} a été ajouté à vos favoris.`,
    });
    setIsSaved(true);
  };

  const handleImportCandidate = () => {
    toast({
      title: t('hunter.profileImported'),
      description: t('hunter.importedToDatabase').replace('{name}', candidate.name),
    });
  };

  return (
    <Card className="rounded-xl bg-white shadow-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">{candidate.name}</h3>
              {candidate.isNew && (
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  {t('hunter.new')}
                </Badge>
              )}
              {isSaved && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <Check className="mr-1 h-3 w-3" />
                  Sauvegardé
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-0">
                {candidate.source}
              </Badge>
              <span className="text-sm text-gray-500">
                {candidate.location} • {candidate.languages.join(', ')}
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {t('hunter.availability')}: {candidate.availability}
            </div>
          </div>
          <div className="bg-green-100 text-green-700 text-sm font-semibold rounded-full w-12 h-12 flex items-center justify-center">
            {candidate.matchScore}%
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {candidate.skills?.map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-0">
              {skill.name}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-0"
            onClick={() => window.open(candidate.profileUrl, '_blank')}
          >
            <ExternalLink className="mr-1 h-4 w-4" />
            {t('hunter.viewProfile')}
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className={`border-0 ${
              isSaved ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={handleSaveCandidate}
            disabled={isSaved}
          >
            {isSaved ? (
              <><Check className="mr-1 h-4 w-4" /> Sauvegardé</>
            ) : (
              <><Save className="mr-1 h-4 w-4" /> {t('hunter.save')}</>
            )}
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-green-100 hover:bg-green-200 border-0"
            onClick={handleImportCandidate}
          >
            <Download className="mr-1 h-4 w-4" />
            {t('hunter.import')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
