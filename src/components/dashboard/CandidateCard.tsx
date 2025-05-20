
import React from 'react';

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

const CandidateCard = ({ initials, name, position, applied, score }: CandidateCardProps) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="font-medium text-gray-600">{initials}</span>
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-gray-500">Applying for: {position}</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">Applied {applied}</div>
      </div>
      
      <div className="mt-3 flex justify-between items-center">
        <div className="text-sm text-gray-500">Match score</div>
        <div className="flex items-center gap-4">
          <div className="bg-green-100 text-success text-xs rounded-full px-2 py-1 font-medium">
            {score.rating}
          </div>
          <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ width: `${score.percentage}%` }}
            ></div>
          </div>
          <div className="text-sm font-medium">{score.percentage}%</div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
