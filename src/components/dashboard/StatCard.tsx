
import React from 'react';
import { useCountUp } from '@/hooks/useCountUp';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  change?: {
    value: string;
    positive?: boolean;
  };
  index?: number;
}

const StatCard = ({ icon, title, value, change, index = 0 }: StatCardProps) => {
  const numericValue = typeof value === 'number' ? value : parseFloat(value.toString()) || 0;
  const isNumeric = typeof value === 'number' || !isNaN(numericValue);
  
  const { count } = useCountUp({
    end: isNumeric ? numericValue : 0,
    duration: 1500,
  });

  const displayValue = isNumeric ? Math.round(count) : value;

  return (
    <div 
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] animate-fade-in group"
      style={{ 
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'both'
      }}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div className="text-gray-400 transition-all duration-300 group-hover:text-primary group-hover:scale-110">
            {icon}
          </div>
          <div>
            <h3 className="text-gray-500 font-medium text-sm transition-colors duration-200 group-hover:text-gray-700">
              {title}
            </h3>
            <p className="text-3xl font-bold mt-1 transition-all duration-300 group-hover:text-primary">
              {displayValue}
            </p>
          </div>
        </div>
        {change && (
          <div className={`text-sm font-medium transition-all duration-300 transform group-hover:scale-110 ${
            change.positive ? "text-green-600" : "text-red-600"
          }`}>
            <div className="flex items-center gap-1">
              <span className={`inline-block transition-transform duration-300 ${
                change.positive ? 'group-hover:rotate-12' : 'group-hover:-rotate-12'
              }`}>
                {change.positive ? '↗' : '↘'}
              </span>
              {change.value}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
