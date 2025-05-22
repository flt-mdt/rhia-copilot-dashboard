
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import ActivityItem from "@/components/activity/ActivityItem";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const location = useLocation();
  const isSettingsPage = location.pathname === "/settings";
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  const recentActivities = [
    {
      type: 'upload' as const,
      message: 'New CV uploaded for Senior AI Engineer',
      timestamp: '2 hours ago'
    },
    {
      type: 'document' as const,
      message: 'CV analysis completed for Thomas Dubois',
      timestamp: '3 hours ago'
    },
    {
      type: 'transition' as const,
      message: 'Emma Bernard moved to interview stage',
      timestamp: '5 hours ago'
    },
    {
      type: 'event' as const,
      message: 'Interview scheduled with Sophie Martin',
      timestamp: '1 day ago'
    }
  ];

  const handleNotificationClick = () => {
    setHasUnreadNotifications(false);
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center gap-4">
        {!isSettingsPage && (
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary w-64"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <button 
              className="relative p-2 rounded-full hover:bg-gray-100 group"
              onClick={handleNotificationClick}
            >
              <Bell className="h-6 w-6 text-gray-500 group-hover:text-blue-600" />
              {hasUnreadNotifications && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="py-2 px-3 border-b border-gray-100">
              <h3 className="font-medium text-sm">Recent Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {recentActivities.map((activity, index) => (
                <div key={index} className="px-2">
                  <ActivityItem
                    type={activity.type}
                    message={activity.message}
                    timestamp={activity.timestamp}
                  />
                </div>
              ))}
            </div>
            <div className="py-2 px-3 border-t border-gray-100 text-center">
              <button className="text-sm text-blue-600 hover:underline">
                View all notifications
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
