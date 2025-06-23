
import React, { useState } from 'react';
import { ExternalLink, Save, Download, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useHunterProfiles } from '@/hooks/useHunterProfiles';
import { useCountUp } from '@/hooks/useCountUp';
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
  const [isHovered, setIsHovered] = useState(false);

  // Animated score counting
  const { count: animatedScore } = useCountUp({
    end: candidate.matchScore,
    duration: 1500,
  });

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
    <Card 
      className="rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-2 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold transition-all duration-300 group-hover:text-blue-600 group-hover:scale-105">
                {candidate.name}
              </h3>
              {candidate.isNew && (
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 animate-[pulse_2s_infinite] transition-all duration-300 hover:scale-110">
                  {t('hunter.new')}
                </Badge>
              )}
              {isSaved && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 transition-all duration-300 hover:scale-110 animate-fade-in">
                  <Check className="mr-1 h-3 w-3 transition-transform duration-300 group-hover:scale-125" />
                  {t('hunter.saved')}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2 mt-1">
              <Badge 
                variant="outline" 
                className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-0 transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:text-blue-700"
              >
                {candidate.source}
              </Badge>
              <span className="text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-700">
                {candidate.location} • {candidate.languages.join(', ')}
              </span>
            </div>
            
            <div className="text-sm text-gray-500 mt-1 transition-colors duration-300 group-hover:text-gray-700">
              {t('hunter.availability')}: {candidate.availability}
            </div>
          </div>
          
          {/* Animated match score */}
          <div className="bg-green-100 text-green-700 text-sm font-semibold rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-green-200 group-hover:shadow-lg">
            <span className="transition-all duration-300">
              {Math.round(animatedScore)}%
            </span>
          </div>
        </div>

        {/* Skills with staggered animation */}
        <div className="flex flex-wrap gap-2 mt-4">
          {candidate.skills?.map((skill, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-0 transition-all duration-300 hover:scale-105 hover:bg-purple-50 hover:text-purple-700 animate-fade-in"
              style={{ 
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'both'
              }}
            >
              {skill.name}
            </Badge>
          ))}
        </div>

        {/* Action buttons with enhanced animations */}
        <div className="flex gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-0 transition-all duration-300 hover:scale-105 hover:shadow-md group/btn"
            onClick={() => window.open(candidate.profileUrl, '_blank')}
          >
            <ExternalLink className="mr-1 h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-12" />
            {t('hunter.viewProfile')}
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className={`border-0 transition-all duration-300 hover:scale-105 hover:shadow-md group/btn ${
              isSaved 
                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                : 'bg-gray-200 hover:bg-gray-300 hover:bg-yellow-100 hover:text-yellow-800'
            }`}
            onClick={handleSaveCandidate}
            disabled={isSaved || isSaving}
          >
            {isSaved ? (
              <>
                <Check className="mr-1 h-4 w-4 transition-transform duration-300 group-hover/btn:scale-125" /> 
                {t('hunter.saved')}
              </>
            ) : (
              <>
                <Save className="mr-1 h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:-rotate-12" /> 
                {t('hunter.save')}
              </>
            )}
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-green-100 hover:bg-green-200 border-0 transition-all duration-300 hover:scale-105 hover:shadow-md group/btn"
            onClick={handleImportCandidate}
          >
            <Download className="mr-1 h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:translate-y-1" />
            {t('hunter.import')}
          </Button>
        </div>

        {/* Animated progress bar for match score */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="text-xs text-gray-500 mb-1">Score de correspondance</div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: isHovered ? `${candidate.matchScore}%` : '0%',
                transformOrigin: 'left'
              }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
