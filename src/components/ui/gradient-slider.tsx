
import React from 'react';
import { cn } from '@/lib/utils';

interface GradientSliderProps {
  value: number;
  max?: number;
  className?: string;
  showValue?: boolean;
}

const GradientSlider: React.FC<GradientSliderProps> = ({ 
  value, 
  max = 100, 
  className,
  showValue = false 
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  // Calculate graduation points (5 points total: 0%, 25%, 50%, 75%, 100%)
  const graduationPoints = [0, 25, 50, 75, 100];
  
  // Get the background color based on the score level
  const getScoreBackgroundColor = (score: number) => {
    if (score <= 20) return 'bg-red-500';
    if (score <= 40) return 'bg-orange-500';
    if (score <= 60) return 'bg-yellow-500';
    if (score <= 80) return 'bg-lime-500';
    return 'bg-green-500';
  };

  // Get the border color based on the score level
  const getScoreBorderColor = (score: number) => {
    if (score <= 20) return 'border-red-500';
    if (score <= 40) return 'border-orange-500';
    if (score <= 60) return 'border-yellow-500';
    if (score <= 80) return 'border-lime-500';
    return 'border-green-500';
  };
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative w-32 h-2">
        {/* Background track */}
        <div className="absolute inset-0 bg-gray-300 rounded-full" />
        
        {/* Progress fill with gradient */}
        <div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
        
        {/* Graduation points */}
        {graduationPoints.map((point, index) => (
          <div key={index}>
            {/* Graduation point circle */}
            <div 
              className={`absolute top-1/2 w-3 h-3 rounded-full border-2 transform -translate-y-1/2 -translate-x-1.5 transition-all duration-300 ${
                point <= percentage 
                  ? `bg-white ${getScoreBorderColor(point)}` 
                  : 'bg-gray-400 border-gray-400'
              }`}
              style={{ left: `${point}%` }}
            />
          </div>
        ))}

        {/* Score value above the actual score position */}
        <div 
          className={`absolute -top-8 transform -translate-x-1/2 text-white text-xs px-2 py-1 rounded ${getScoreBackgroundColor(percentage)}`}
          style={{ left: `${percentage}%` }}
        >
          {Math.round(value)}
        </div>
      </div>
      
      {showValue && (
        <span className="text-sm font-medium text-gray-700 min-w-[2rem]">
          {Math.round(value)}
        </span>
      )}
    </div>
  );
};

export default GradientSlider;
