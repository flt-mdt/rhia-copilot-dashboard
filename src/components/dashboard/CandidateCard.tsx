
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import GradientSlider from '@/components/ui/gradient-slider';

interface CandidateCardProps {
  initials: string;
  name: string;
  position: string;
  applied: string;
  score: {
    rating: string;
    percentage: number;
  };
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  initials,
  name,
  position,
  applied,
  score,
}) => {
  // Valider et parser la date de manière sécurisée
  const getTimeAgo = (dateString: string) => {
    try {
      // Si c'est déjà une date formatée (comme "27/06/2025"), on retourne directement
      if (dateString.includes('/')) {
        return `il y a quelques jours`;
      }
      
      const appliedDate = new Date(dateString);
      
      // Vérifier si la date est valide
      if (isNaN(appliedDate.getTime())) {
        return 'Date inconnue';
      }
      
      return formatDistanceToNow(appliedDate, { 
        addSuffix: true, 
        locale: fr 
      });
    } catch (error) {
      console.error('Erreur lors du formatage de la date:', error);
      return 'Date inconnue';
    }
  };

  const timeAgo = getTimeAgo(applied);

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
          <p className="text-sm text-gray-600 truncate">{position}</p>
          <p className="text-xs text-gray-500">{timeAgo}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <GradientSlider 
            value={score.percentage} 
            max={100}
            className="flex-shrink-0"
          />
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
