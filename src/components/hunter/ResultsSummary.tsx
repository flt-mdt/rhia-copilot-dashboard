
import React from 'react';
import { HunterCandidate } from './CandidateCard';

interface ResultsSummaryProps {
  candidates: HunterCandidate[];
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ candidates }) => {
  // Calculate summary statistics
  const totalCandidates = candidates.length;
  const highMatchingCandidates = candidates.filter(c => c.matchScore >= 85).length;
  
  if (totalCandidates === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6 max-w-3xl mx-auto">
      <p className="text-sm text-gray-600 italic">
        Nous avons trouvé {totalCandidates} profil{totalCandidates > 1 ? 's' : ''} correspondant 
        étroitement à vos critères. 
        {highMatchingCandidates > 0 && (
          <> Les {highMatchingCandidates} premier{highMatchingCandidates > 1 ? 's' : ''} ont un taux 
          de matching supérieur à 85%.</>
        )}
      </p>
    </div>
  );
};

export default ResultsSummary;
