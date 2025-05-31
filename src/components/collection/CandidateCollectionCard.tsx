
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Star } from 'lucide-react';
import { SavedHunterProfile } from '@/hooks/useHunterProfiles';

interface CandidateCollectionCardProps {
  candidate: SavedHunterProfile;
  viewMode: 'grid' | 'list';
}

const CandidateCollectionCard: React.FC<CandidateCollectionCardProps> = ({ candidate, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                {candidate.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Badge variant="outline" className="text-xs">{candidate.source}</Badge>
                  {candidate.location && (
                    <>
                      <MapPin className="h-3 w-3" />
                      <span>{candidate.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {candidate.match_score && (
                <Badge className="bg-green-100 text-green-800">
                  {candidate.match_score}% match
                </Badge>
              )}
              <Button size="sm" variant="outline" onClick={() => window.open(candidate.profile_url, '_blank')}>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
            {candidate.name.charAt(0)}
          </div>
          {candidate.match_score && (
            <Badge className="bg-green-100 text-green-800 text-xs">
              {candidate.match_score}%
            </Badge>
          )}
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-1 truncate">{candidate.name}</h3>
        
        <div className="flex items-center gap-1 mb-2">
          <Badge variant="outline" className="text-xs">{candidate.source}</Badge>
        </div>
        
        {candidate.location && (
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{candidate.location}</span>
          </div>
        )}
        
        {candidate.skills && candidate.skills.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {candidate.skills.slice(0, 2).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                  {skill}
                </Badge>
              ))}
              {candidate.skills.length > 2 && (
                <Badge variant="outline" className="text-xs bg-gray-50">
                  +{candidate.skills.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full text-xs"
          onClick={() => window.open(candidate.profile_url, '_blank')}
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          Voir le profil
        </Button>
      </CardContent>
    </Card>
  );
};

export default CandidateCollectionCard;
