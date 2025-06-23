
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
    <div className="border-b border-gray-200 py-4 transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 group">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
            <span className="font-medium text-gray-600 group-hover:text-white transition-colors duration-300">
              {initials}
            </span>
          </div>
          <div>
            <h3 className="font-medium transition-colors duration-200 group-hover:text-primary">
              {name}
            </h3>
            <p className="text-sm text-gray-500 transition-colors duration-200 group-hover:text-gray-700">
              Applying for: {position}
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-500 transition-colors duration-200 group-hover:text-gray-700">
          Applied {applied}
        </div>
      </div>
      
      <div className="mt-3 flex justify-between items-center">
        <div className="text-sm text-gray-500 transition-colors duration-200 group-hover:text-gray-700">
          Match score
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-green-100 text-success text-xs rounded-full px-2 py-1 font-medium transition-all duration-300 group-hover:bg-green-200 group-hover:scale-105">
            {score.rating}
          </div>
          <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden transition-colors duration-300 group-hover:bg-gray-300">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-700 ease-out transform origin-left"
              style={{ 
                width: `${score.percentage}%`,
                transform: 'scaleX(1)',
                animation: 'progress-fill 1.5s ease-out forwards'
              }}
            ></div>
          </div>
          <div className="text-sm font-medium transition-all duration-300 group-hover:text-primary group-hover:scale-105">
            {score.percentage}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
