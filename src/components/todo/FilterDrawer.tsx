
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';
import TagFilters from './TagFilters';
import { TaskTag } from '@/hooks/useRecruiterTasks';

interface FilterDrawerProps {
  tags: TaskTag[];
  selectedTagFilters: string[];
  onTagFilterChange: (tagIds: string[]) => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  tags,
  selectedTagFilters,
  onTagFilterChange,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
          {selectedTagFilters.length > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
              {selectedTagFilters.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Filtres</SheetTitle>
          <SheetDescription>
            Filtrez vos tâches par tags pour une meilleure organisation
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <TagFilters
            tags={tags}
            selectedTagFilters={selectedTagFilters}
            onTagFilterChange={onTagFilterChange}
            compact={false}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterDrawer;
