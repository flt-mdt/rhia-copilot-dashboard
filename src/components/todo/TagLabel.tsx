
import React from 'react';

interface TagLabelProps {
  label: string;
  color: string;
}

const TagLabel: React.FC<TagLabelProps> = ({ label, color }) => {
  const colorClasses = {
    red: 'bg-red-100 text-red-800',
    orange: 'bg-orange-100 text-orange-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    teal: 'bg-teal-100 text-teal-800',
    blue: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    pink: 'bg-pink-100 text-pink-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  const colorClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.gray;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {label}
    </span>
  );
};

export default TagLabel;
