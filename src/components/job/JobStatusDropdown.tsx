
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ChevronDown } from 'lucide-react';

interface JobStatusDropdownProps {
  currentStatus: boolean;
  onStatusChange: (isActive: boolean) => void;
}

const JobStatusDropdown = ({ currentStatus, onStatusChange }: JobStatusDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer flex items-center gap-1">
          {currentStatus ? (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Active
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-gray-100 text-gray-600 hover:bg-gray-100 border-0">
              Draft
            </Badge>
          )}
          <ChevronDown className="h-3 w-3 text-gray-500" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="bg-white border shadow-md z-50">
        <DropdownMenuItem 
          onClick={() => onStatusChange(true)}
          className="cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Active
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onStatusChange(false)}
          className="cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            Draft
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default JobStatusDropdown;
