
import React from 'react';
import { Bell, Upload, FileText, ArrowRight, Calendar, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Notification } from '@/hooks/useNotifications';

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
}

const NotificationItem = ({ notification, onClick }: NotificationItemProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'upload':
        return <Upload className="h-4 w-4 text-blue-500" />;
      case 'document':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'transition':
        return <ArrowRight className="h-4 w-4 text-orange-500" />;
      case 'event':
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case 'system':
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-400" />;
    }
  };

  const timeAgo = formatDistanceToNow(new Date(notification.created_at), {
    addSuffix: true,
    locale: fr
  });

  return (
    <div 
      className={`p-3 hover:bg-gray-50 cursor-pointer border-l-2 ${
        notification.is_read ? 'border-transparent' : 'border-blue-500 bg-blue-50/30'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          {getIcon(notification.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className={`text-sm font-medium ${
              notification.is_read ? 'text-gray-700' : 'text-gray-900'
            }`}>
              {notification.title}
            </p>
            {!notification.is_read && (
              <span className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></span>
            )}
          </div>
          <p className={`text-sm mt-1 ${
            notification.is_read ? 'text-gray-500' : 'text-gray-600'
          }`}>
            {notification.message}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {timeAgo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
