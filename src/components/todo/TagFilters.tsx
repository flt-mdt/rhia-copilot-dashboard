
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { TaskTag } from '@/hooks/useRecruiterTasks';

interface TagFiltersProps {
  tags: TaskTag[];
  selectedTagFilters: string[];
  onTagFilterChange: (tagIds: string[]) => void;
  compact?: boolean;
}

const TagFilters: React.FC<TagFiltersProps> = ({
  tags,
  selectedTagFilters,
  onTagFilterChange,
  compact = false,
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

  // Grouper les tags par catégorie
  const tagsByCategory = tags.reduce((acc, tag) => {
    if (!acc[tag.category]) acc[tag.category] = [];
    acc[tag.category].push(tag);
    return acc;
  }, {} as Record<string, TaskTag[]>);

  const categoryLabels = {
    process: 'Processus',
    urgency: 'Urgence',
    type: 'Type',
    custom: 'Personnalisé'
  };

  if (compact) {
    // Version compacte pour desktop
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {tags.slice(0, 4).map((tag) => (
          <Button
            key={tag.id}
            variant={selectedTagFilters.includes(tag.id) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleTagFilter(tag.id)}
            className={`text-xs h-7 ${
              selectedTagFilters.includes(tag.id)
                ? `bg-${tag.color}-500 text-white hover:bg-${tag.color}-600`
                : `border-${tag.color}-300 text-${tag.color}-700 hover:bg-${tag.color}-50`
            }`}
          >
            {tag.name}
          </Button>
        ))}
        {tags.length > 4 && (
          <Badge variant="outline" className="text-xs">
            +{tags.length - 4}
          </Badge>
        )}
        {selectedTagFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-7 px-2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }

  // Version complète pour le drawer mobile
  return (
    <div className="space-y-4">
      {Object.entries(tagsByCategory).map(([category, categoryTags]) => (
        <div key={category} className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">
            {categoryLabels[category as keyof typeof categoryLabels] || category}
          </h4>
          <div className="flex flex-wrap gap-2">
            {categoryTags.map((tag) => (
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
          </div>
        </div>
      ))}
      {selectedTagFilters.length > 0 && (
        <div className="pt-2 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="w-full"
          >
            Effacer tous les filtres
          </Button>
        </div>
      )}
    </div>
  );
};

export default TagFilters;
