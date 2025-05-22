
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  minMatchScore: number;
  countries: string[];
  sortBy: 'score' | 'date' | 'popularity';
}

const countries = ['France', 'Remote', 'Europe', 'USA', 'Canada'];

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    minMatchScore: 60,
    countries: [],
    sortBy: 'score',
  });

  const handleScoreChange = (value: number[]) => {
    const newFilters = { ...filters, minMatchScore: value[0] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCountryChange = (country: string, checked: boolean) => {
    const newCountries = checked
      ? [...filters.countries, country]
      : filters.countries.filter(c => c !== country);
    
    const newFilters = { ...filters, countries: newCountries };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortBy: 'score' | 'date' | 'popularity') => {
    const newFilters = { ...filters, sortBy };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="max-w-3xl mx-auto mb-6">
      <Button 
        variant="ghost" 
        className="flex items-center justify-between w-full text-gray-700 mb-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>Filtres avancés</span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </Button>
      
      {isExpanded && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Matching minimum: {filters.minMatchScore}%
                </label>
                <Slider
                  defaultValue={[filters.minMatchScore]}
                  max={100}
                  min={0}
                  step={5}
                  onValueChange={handleScoreChange}
                  className="mb-6"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Pays / Localisation</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {countries.map(country => (
                    <div key={country} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`country-${country}`} 
                        checked={filters.countries.includes(country)}
                        onCheckedChange={(checked) => 
                          handleCountryChange(country, checked as boolean)
                        }
                      />
                      <label 
                        htmlFor={`country-${country}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {country}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Trier par</label>
                <div className="flex space-x-2">
                  <Button 
                    variant={filters.sortBy === 'score' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => handleSortChange('score')}
                  >
                    Score
                  </Button>
                  <Button 
                    variant={filters.sortBy === 'date' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => handleSortChange('date')}
                  >
                    Date
                  </Button>
                  <Button 
                    variant={filters.sortBy === 'popularity' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => handleSortChange('popularity')}
                  >
                    Popularité
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdvancedFilters;
