
import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  change?: {
    value: string;
    positive?: boolean;
  };
}

const StatCard = ({ icon, title, value, change }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div className="text-gray-400">
            {icon}
          </div>
          <div>
            <h3 className="text-gray-500 font-medium text-sm">{title}</h3>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>
        </div>
        {change && (
          <div className={`text-sm font-medium ${change.positive ? "text-green-600" : "text-red-600"}`}>
            {change.value}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
