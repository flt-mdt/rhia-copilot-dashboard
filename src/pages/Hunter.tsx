
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import SearchForm from '@/components/hunter/SearchForm';
import ResultsSummary from '@/components/hunter/ResultsSummary';
import CandidateCard, { HunterCandidate } from '@/components/hunter/CandidateCard';
import AdvancedFilters from '@/components/hunter/AdvancedFilters';
import type { FilterOptions } from '@/components/hunter/AdvancedFilters';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/hooks/useUser';

const Hunter = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [candidates, setCandidates] = useState<HunterCandidate[]>([]);
  const [rawCandidates, setRawCandidates] = useState<HunterCandidate[]>([]);
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FilterOptions>({
    minMatchScore: 60,
    countries: [],
    sortBy: 'score'
  });
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (criteria: string) => {
    setIsLoading(true);
    setHasSearched(true);
    setCurrentSearchQuery(criteria);
  };

  const handleResults = (apiCandidates: any[]) => {
    setRawCandidates(apiCandidates);
    applyFilters(filters, apiCandidates);
    setIsLoading(false);

    toast({
      title: t('hunter.searchCompleted'),
      description: t('hunter.candidatesFound').replace('{count}', apiCandidates.length.toString()),
    });
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filterOptions: FilterOptions, source: HunterCandidate[] = rawCandidates) => {
    let filtered = source.filter(candidate => candidate.matchScore >= filterOptions.minMatchScore);

    if (filterOptions.countries.length > 0) {
      filtered = filtered.filter(candidate =>
        filterOptions.countries.some(country => candidate.location.includes(country))
      );
    }

    if (filterOptions.sortBy === 'score') {
      filtered = filtered.sort((a, b) => b.matchScore - a.matchScore);
    }

    setCandidates(filtered);
  };

  return (
    <div className="ml-64 p-8 bg-[#F9FAFB]">
      <Header title={t('hunter.title')} />

      <div className="max-w-7xl mx-auto">
        <SearchForm
          userId={user.id}
          onSearch={handleSearch}
          onResults={handleResults}
          isLoading={isLoading}
        />

        {hasSearched && (
          <>
            <AdvancedFilters onFilterChange={handleFilterChange} />

            {isLoading ? (
              <div className="space-y-6 mt-8">
                <Skeleton className="h-[120px] w-full max-w-3xl mx-auto rounded-xl" />
                <Skeleton className="h-[120px] w-full max-w-3xl mx-auto rounded-xl" />
                <Skeleton className="h-[120px] w-full max-w-3xl mx-auto rounded-xl" />
              </div>
            ) : (
              <>
                <ResultsSummary candidates={candidates} />

                <div className="space-y-6 mt-8">
                  {candidates.length > 0 ? (
                    candidates.map(candidate => (
                      <CandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        searchQuery={currentSearchQuery}
                      />
                    ))
                  ) : (
                    <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-3xl mx-auto">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">{t('hunter.noResults')}</h3>
                      <p className="text-gray-500">{t('hunter.noResultsDesc')}</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Hunter;
