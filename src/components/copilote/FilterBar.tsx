
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterBarProps {
  filters: {
    period: string;
    employee: string;
    search: string;
  };
  onFiltersChange: (filters: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFiltersChange }) => {
  return (
    <div className="bg-lavender/30 border-b border-lavender/50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Select
            value={filters.period}
            onValueChange={(value) => onFiltersChange({ ...filters, period: value })}
          >
            <SelectTrigger className="w-full sm:w-40 bg-white">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={filters.employee}
            onValueChange={(value) => onFiltersChange({ ...filters, employee: value })}
          >
            <SelectTrigger className="w-full sm:w-48 bg-white">
              <SelectValue placeholder="Collaborateur" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">Tous les collaborateurs</SelectItem>
              <SelectItem value="victor">Victor Martin</SelectItem>
              <SelectItem value="clara">Clara Dubois</SelectItem>
              <SelectItem value="julien">Julien Moreau</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mist h-4 w-4" />
            <Input
              placeholder="Recherche rapide..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="pl-10 bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
