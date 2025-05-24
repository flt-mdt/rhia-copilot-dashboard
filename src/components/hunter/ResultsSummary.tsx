
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { HunterCandidate } from './CandidateCard';

interface ResultsSummaryProps {
  candidates: HunterCandidate[];
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ candidates }) => {
  const { t } = useLanguage();
  
  // Calculate summary statistics
  const totalCandidates = candidates.length;
  const highMatchingCandidates = candidates.filter(c => c.matchScore >= 85).length;
  
  if (totalCandidates === 0) {
    return null;
  }

  const pluralSuffix = totalCandidates > 1 ? 's' : '';
  const highMatchingPlural = highMatchingCandidates > 1 ? 's' : '';

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6 max-w-3xl mx-auto">
      <p className="text-sm text-gray-600 italic">
        {t('hunter.resultsFound')
          .replace('{count}', totalCandidates.toString())
          .replace('{s}', pluralSuffix)}
        {highMatchingCandidates > 0 && (
          <>{t('hunter.highMatching')
            .replace('{count}', highMatchingCandidates.toString())
            .replace('{s}', highMatchingPlural)}</>
        )}
      </p>
    </div>
  );
};

export default ResultsSummary;
