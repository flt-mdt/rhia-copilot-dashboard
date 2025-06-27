
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
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative w-32 h-2 bg-gray-300 rounded-full overflow-hidden">
        {/* Background gradient track */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-30" />
        
        {/* Progress fill with gradient */}
        <div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
        
        {/* Thumb/indicator */}
        <div 
          className="absolute top-1/2 w-4 h-4 bg-white border-2 border-purple-500 rounded-full shadow-lg transform -translate-y-1/2 -translate-x-2 transition-all duration-300"
          style={{ left: `${percentage}%` }}
        />
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
