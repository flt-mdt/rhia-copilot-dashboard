
import React from 'react';
import { Upload, FileText, User, Calendar } from 'lucide-react';

type ActivityType = 'upload' | 'document' | 'transition' | 'event';

interface ActivityItemProps {
  type: ActivityType;
  message: string;
  timestamp: string;
}

const ActivityItem = ({ type, message, timestamp }: ActivityItemProps) => {
  const getIcon = () => {
    switch (type) {
      case 'upload':
        return { icon: Upload, bgColor: 'bg-blue-100', color: 'text-blue-500' };
      case 'document':
        return { icon: FileText, bgColor: 'bg-purple-100', color: 'text-purple-500' };
      case 'transition':
        return { icon: User, bgColor: 'bg-green-100', color: 'text-green-500' };
      case 'event':
        return { icon: Calendar, bgColor: 'bg-amber-100', color: 'text-amber-500' };
      default:
        return { icon: FileText, bgColor: 'bg-gray-100', color: 'text-gray-500' };
    }
  };

  const { icon: Icon, bgColor, color } = getIcon();

  return (
    <div className="flex items-start gap-3 py-4 border-b border-gray-100 last:border-0">
      <div className={`${bgColor} rounded-full p-2 flex items-center justify-center`}>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{message}</p>
        <p className="text-xs text-gray-500">{timestamp}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
