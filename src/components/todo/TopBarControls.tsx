
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
import { useIsMobile } from '@/hooks/use-mobile';
import { TaskTag } from '@/hooks/useRecruiterTasks';
import TagFilters from './TagFilters';
import FilterDrawer from './FilterDrawer';

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
  const isMobile = useIsMobile();

  return (
    <div className="bg-white border-b border-gray-200 p-4 space-y-4">
      {/* Première ligne - Titre, recherche et actions principales */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 whitespace-nowrap">Todo List</h1>
          
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher une tâche ou un candidat..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
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

      {/* Deuxième ligne - Filtres et compteurs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
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

          {/* Filtres par tags - Responsive */}
          {isMobile ? (
            <FilterDrawer
              tags={tags}
              selectedTagFilters={selectedTagFilters}
              onTagFilterChange={onTagFilterChange}
            />
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Tags:</span>
              <TagFilters
                tags={tags}
                selectedTagFilters={selectedTagFilters}
                onTagFilterChange={onTagFilterChange}
                compact={true}
              />
            </div>
          )}
        </div>

        {/* Compteurs */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 whitespace-nowrap">
            Aujourd'hui: {todayTasksCount}
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 whitespace-nowrap">
            Semaine: {weekTasksCount}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default TopBarControls;
