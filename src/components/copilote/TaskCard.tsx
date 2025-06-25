
import React, { useState } from 'react';
import { MessageSquare, Calendar, User } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BadgeEcheance from './BadgeEcheance';
import TagRH from './TagRH';

interface Task {
  id: string;
  title: string;
  employee: string;
  avatar: string;
  tags: string[];
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  hasComments: boolean;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete }) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = () => {
    setIsCompleting(true);
    setTimeout(() => {
      onComplete(task.id);
    }, 600);
  };

  return (
    <div className={`group relative bg-white border border-gray-100 rounded-xl p-4 hover:scale-[1.01] transition-all duration-200 hover:shadow-md ${isCompleting ? 'animate-pulse' : ''}`}>
      {isCompleting && (
        <div className="absolute inset-0 flex items-center justify-center bg-success-soft/20 rounded-xl">
          <div className="text-2xl animate-confetti">🎉</div>
        </div>
      )}
      
      <div className="flex items-start space-x-4">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleComplete}
          className="mt-1"
        />
        
        <Avatar className="h-10 w-10">
          <AvatarImage src={task.avatar} alt={task.employee} />
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-charcoal mb-2 group-hover:text-sage transition-colors">
            {task.title}
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {task.tags.map((tag, index) => (
              <TagRH key={index} tag={tag} />
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <BadgeEcheance deadline={task.deadline} priority={task.priority} />
            
            <div className="flex items-center space-x-2">
              {task.hasComments && (
                <MessageSquare className="h-4 w-4 text-mist" />
              )}
              <Calendar className="h-4 w-4 text-mist" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
