
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, CheckCircle2, Trash2, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface TaskFilterSidebarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  taskCounts: {
    all: number;
    myTasks: number;
    favorites: number;
    done: number;
    deleted: number;
  };
}

const TaskFilterSidebar: React.FC<TaskFilterSidebarProps> = ({
  activeFilter,
  onFilterChange,
  taskCounts,
}) => {
  const isMobile = useIsMobile();

  const filterItems = [
    {
      key: 'all',
      label: 'All',
      icon: null,
      count: taskCounts.all,
      color: 'bg-blue-500',
    },
    {
      key: 'myTasks',
      label: 'My Task',
      icon: <User className="h-4 w-4" />,
      count: taskCounts.myTasks,
      color: 'bg-gray-500',
    },
    {
      key: 'favorites',
      label: 'Favorites',
      icon: <Heart className="h-4 w-4" />,
      count: taskCounts.favorites,
      color: 'bg-pink-500',
    },
    {
      key: 'done',
      label: 'Done',
      icon: <CheckCircle2 className="h-4 w-4" />,
      count: taskCounts.done,
      color: 'bg-green-500',
    },
    {
      key: 'deleted',
      label: 'Deleted',
      icon: <Trash2 className="h-4 w-4" />,
      count: taskCounts.deleted,
      color: 'bg-red-500',
    },
  ];

  const FilterContent = () => (
    <div className="space-y-2">
      {filterItems.map((item) => (
        <Button
          key={item.key}
          variant={activeFilter === item.key ? "secondary" : "ghost"}
          className={`w-full justify-between text-left ${
            activeFilter === item.key ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
          }`}
          onClick={() => onFilterChange(item.key)}
        >
          <div className="flex items-center space-x-3">
            {item.icon}
            <span>{item.label}</span>
          </div>
          <Badge 
            variant="secondary" 
            className={`${item.color} text-white text-xs`}
          >
            {item.count}
          </Badge>
        </Button>
      ))}
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="fixed bottom-4 right-4 z-50 shadow-lg">
            Menu
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80">
          <SheetHeader>
            <SheetTitle>Filtres de statut</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4">
      <FilterContent />
    </div>
  );
};

export default TaskFilterSidebar;
