
import React from 'react';
import { Search, Plus, Bell, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TopBarControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  orderBy: string;
  onOrderByChange: (value: string) => void;
  onAddTask: () => void;
  notificationCount: number;
}

const TopBarControls: React.FC<TopBarControlsProps> = ({
  searchTerm,
  onSearchChange,
  orderBy,
  onOrderByChange,
  onAddTask,
  notificationCount,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Todo List</h1>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {notificationCount}
              </Badge>
            )}
          </Button>
          
          <Button variant="ghost" size="sm" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              3
            </Badge>
          </Button>

          <Button onClick={onAddTask} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4 mt-4">
        <div className="flex items-center space-x-2">
          <input type="checkbox" className="rounded" />
          <Select value={orderBy} onValueChange={onOrderByChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Order by" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="deadline">Deadline</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="candidate">Candidate</SelectItem>
              <SelectItem value="created">Created</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Input
            placeholder="Search todo list"
            className="max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBarControls;
