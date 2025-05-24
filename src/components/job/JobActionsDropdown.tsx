
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2, Edit } from 'lucide-react';

interface JobActionsDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

const JobActionsDropdown = ({ onEdit, onDelete }: JobActionsDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border shadow-md z-50">
        <DropdownMenuItem onClick={onEdit} className="cursor-pointer hover:bg-gray-50">
          <Edit className="mr-2 h-4 w-4" />
          Modifier
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={onDelete} 
          className="cursor-pointer hover:bg-gray-50 text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default JobActionsDropdown;
