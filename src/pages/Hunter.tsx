
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
    <div className="ml-64 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header title={t('hunter.title')} />
      
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <div className="w-5 h-5 bg-blue-600 rounded-sm flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            Powered by AI
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Votre ingénieur pédagogique
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Spécialisé dans le photovoltaïque
          </p>
        </div>

        {/* Search Form - Redesigned */}
        <div className="mb-16">
          <SearchForm
            userId={user.id}
            onSearch={handleSearch}
            onResults={handleResults}
            isLoading={isLoading}
          />
        </div>

        {hasSearched && (
          <>
            <AdvancedFilters onFilterChange={handleFilterChange} />

            {isLoading ? (
              <div className="space-y-6 mt-8">
                <Skeleton className="h-[120px] w-full max-w-4xl mx-auto rounded-2xl" />
                <Skeleton className="h-[120px] w-full max-w-4xl mx-auto rounded-2xl" />
                <Skeleton className="h-[120px] w-full max-w-4xl mx-auto rounded-2xl" />
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
                    <div className="text-center p-12 bg-white rounded-3xl shadow-sm max-w-4xl mx-auto border border-gray-100">
                      <h3 className="text-xl font-semibold text-gray-700 mb-3">{t('hunter.noResults')}</h3>
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
