
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Assignee {
  id: string;
  name: string;
  avatar: string;
}

interface CandidateAvatarGroupProps {
  assignees: Assignee[];
  maxVisible?: number;
}

const CandidateAvatarGroup: React.FC<CandidateAvatarGroupProps> = ({
  assignees,
  maxVisible = 3,
}) => {
  const visibleAssignees = assignees.slice(0, maxVisible);
  const remainingCount = assignees.length - maxVisible;

  return (
    <TooltipProvider>
      <div className="flex -space-x-2">
        {visibleAssignees.map((assignee) => (
          <Tooltip key={assignee.id}>
            <TooltipTrigger>
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src={assignee.avatar} alt={assignee.name} />
                <AvatarFallback className="text-xs">
                  {assignee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>Responsable : {assignee.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        {remainingCount > 0 && (
          <Tooltip>
            <TooltipTrigger>
              <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  +{remainingCount}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{remainingCount} autre{remainingCount > 1 ? 's' : ''} assigné{remainingCount > 1 ? 's' : ''}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};

export default CandidateAvatarGroup;
