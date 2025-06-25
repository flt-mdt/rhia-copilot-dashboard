
import React from 'react';
import { Calendar, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Employee {
  id: string;
  name: string;
  avatar: string;
  status: string;
  nextDeadline: string;
  priority: 'high' | 'medium' | 'low';
}

interface MiniEmployeeCardProps {
  employee: Employee;
  onClick: (employee: Employee) => void;
}

const MiniEmployeeCard: React.FC<MiniEmployeeCardProps> = ({ employee, onClick }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit' 
    });
  };

  return (
    <div 
      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => onClick(employee)}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={employee.avatar} alt={employee.name} />
        <AvatarFallback>
          <User className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-charcoal">
          {employee.name}
        </h3>
        <p className="text-xs text-mist">
          {employee.status}
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Calendar className="h-3 w-3 text-mist" />
        <span className="text-xs text-mist">
          {formatDate(employee.nextDeadline)}
        </span>
      </div>
    </div>
  );
};

export default MiniEmployeeCard;
