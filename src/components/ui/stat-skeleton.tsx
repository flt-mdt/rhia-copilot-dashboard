
import React from 'react';

const StatSkeleton = ({ index = 0 }: { index?: number }) => {
  return (
    <div 
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 animate-fade-in"
      style={{ 
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'both'
      }}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div className="w-7 h-7 bg-gray-200 rounded animate-pulse"></div>
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-8 w-16 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="w-12 h-5 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default StatSkeleton;
