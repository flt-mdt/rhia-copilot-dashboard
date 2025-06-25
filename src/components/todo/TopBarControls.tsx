
import React from 'react';
import { Search, Bell } from 'lucide-react';
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
import { TaskTag } from '@/hooks/useRecruiterTasks';

interface TopBarControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  orderBy: string;
  onOrderByChange: (value: string) => void;
  onAddTask: () => void;
  notificationCount: number;
  customAddButton?: React.ReactNode;
  tags: TaskTag[];
  selectedTagFilters: string[];
  onTagFilterChange: (tagIds: string[]) => void;
  todayTasksCount: number;
  weekTasksCount: number;
}

const TopBarControls: React.FC<TopBarControlsProps> = ({
  searchTerm,
  onSearchChange,
  orderBy,
  onOrderByChange,
  onAddTask,
  notificationCount,
  customAddButton,
  tags,
  selectedTagFilters,
  onTagFilterChange,
  todayTasksCount,
  weekTasksCount,
}) => {
  const toggleTagFilter = (tagId: string) => {
    if (selectedTagFilters.includes(tagId)) {
      onTagFilterChange(selectedTagFilters.filter(id => id !== tagId));
    } else {
      onTagFilterChange([...selectedTagFilters, tagId]);
    }
  };

  const clearAllFilters = () => {
    onTagFilterChange([]);
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Todo List</h1>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher une tâche ou un candidat..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-80"
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

          {customAddButton || (
            <Button onClick={onAddTask} className="bg-blue-600 hover:bg-blue-700 text-white">
              + Add Task
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-4">
          <Select value={orderBy} onValueChange={onOrderByChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="custom_order">Ordre personnalisé</SelectItem>
              <SelectItem value="deadline">Date d'échéance</SelectItem>
              <SelectItem value="priority">Priorité</SelectItem>
              <SelectItem value="candidate">Candidat</SelectItem>
              <SelectItem value="created">Date de création</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Filtres par tag:</span>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Button
                  key={tag.id}
                  variant={selectedTagFilters.includes(tag.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleTagFilter(tag.id)}
                  className={`text-xs ${
                    selectedTagFilters.includes(tag.id)
                      ? `bg-${tag.color}-500 text-white hover:bg-${tag.color}-600`
                      : `border-${tag.color}-300 text-${tag.color}-700 hover:bg-${tag.color}-50`
                  }`}
                >
                  {tag.name}
                </Button>
              ))}
              {selectedTagFilters.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Effacer
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Aujourd'hui: {todayTasksCount}
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Cette semaine: {weekTasksCount}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBarControls;
