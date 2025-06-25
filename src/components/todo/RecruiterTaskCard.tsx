
import React, { useState } from 'react';
import { Star, MoreHorizontal, Calendar, User } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TagLabel from './TagLabel';
import CandidateAvatarGroup from './CandidateAvatarGroup';

interface RecruiterTaskCardProps {
  id: string;
  title: string;
  candidateName: string;
  tags: Array<{
    label: string;
    color: string;
  }>;
  assignees: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
  priority: boolean;
  dueDate?: string;
  isCompleted: boolean;
  onComplete: (id: string) => void;
  onTogglePriority: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const RecruiterTaskCard: React.FC<RecruiterTaskCardProps> = ({
  id,
  title,
  candidateName,
  tags,
  assignees,
  priority,
  dueDate,
  isCompleted,
  onComplete,
  onTogglePriority,
  onEdit,
  onDelete,
}) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = () => {
    setIsCompleting(true);
    setTimeout(() => {
      onComplete(id);
    }, 600);
  };

  const cardBorderColor = isCompleted 
    ? 'border-green-200 bg-green-50/30' 
    : priority 
    ? 'border-purple-200 bg-purple-50/30' 
    : 'border-teal-200 bg-teal-50/30';

  return (
    <div className={`
      relative p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md
      ${cardBorderColor} ${isCompleting ? 'animate-pulse' : ''}
    `}>
      {isCompleting && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
          <div className="text-2xl animate-bounce">🎉</div>
        </div>
      )}
      
      <div className="flex items-start space-x-3">
        {/* Task status and drag handle */}
        <div className="flex flex-col items-center space-y-2">
          <div className="text-gray-400 cursor-move">
            <svg width="6" height="16" viewBox="0 0 6 16" fill="currentColor">
              <circle cx="1" cy="2" r="1"/>
              <circle cx="5" cy="2" r="1"/>
              <circle cx="1" cy="8" r="1"/>
              <circle cx="5" cy="8" r="1"/>
              <circle cx="1" cy="14" r="1"/>
              <circle cx="5" cy="14" r="1"/>
            </svg>
          </div>
          <Checkbox
            checked={isCompleted}
            onCheckedChange={handleComplete}
            className="data-[state=checked]:bg-green-500"
          />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className={`font-medium text-gray-900 ${isCompleted ? 'line-through text-gray-500' : ''}`}>
              {title}
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onTogglePriority(id)}
                className={`p-1 ${priority ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                <Star className={`h-4 w-4 ${priority ? 'fill-current' : ''}`} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-1">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem onClick={() => onEdit(id)}>
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(id)} className="text-red-600">
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <TagLabel key={index} label={tag.label} color={tag.color} />
            ))}
          </div>

          {/* Footer with assignees and candidate */}
          <div className="flex items-center justify-between">
            <CandidateAvatarGroup assignees={assignees} />
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span className="font-medium text-blue-600 hover:underline cursor-pointer">
                {candidateName}
              </span>
              {dueDate && (
                <>
                  <Calendar className="h-4 w-4" />
                  <span>{dueDate}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterTaskCard;
