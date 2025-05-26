import React, { useState } from 'react';
import SearchForm from '@/components/hunter/SearchForm';
import AdvancedFilters, { FilterOptions } from '@/components/hunter/AdvancedFilters';
import ResultsSummary from '@/components/hunter/ResultsSummary';
import CandidateCard, { HunterCandidate } from '@/components/hunter/CandidateCard';
import { useUser } from '@/contexts/UserContext';

const HunterPage: React.FC = () => {
  const { user } = useUser();
  const [candidates, setCandidates] = useState<HunterCandidate[]>([]);
  const [rawCandidates, setRawCandidates] = useState<HunterCandidate[]>([]);
  const [lastQuery, setLastQuery] = useState('');

  const [filters, setFilters] = useState<FilterOptions>({
    minMatchScore: 60,
    countries: [],
    sortBy: 'score',
  });

  const normalizeCandidates = (apiCandidates: any[]): HunterCandidate[] => {
    return apiCandidates.map(c => ({
      id: c.id ?? c.profile_url,
      name: c.name,
      source: c.source,
      location: c.location,
      languages: c.languages || [],
      availability: c.availability,
      profileUrl: c.profile_url,
      matchScore: c.match_score ?? c.score ?? 0,
      skills: (c.skills || []).map((s: string) => ({ name: s }))
    }));
  };

  const handleResults = (apiCandidates: any[]) => {
    const normalized = normalizeCandidates(apiCandidates);
    setRawCandidates(normalized);
    applyFilters(filters, normalized);
  };

  const applyFilters = (filterOptions: FilterOptions, source: HunterCandidate[] = rawCandidates) => {
    let filtered = source.filter(c => c.matchScore >= filterOptions.minMatchScore);

    if (filterOptions.countries.length > 0) {
      filtered = filtered.filter(c => filterOptions.countries.includes(c.location));
    }

    // Optionally implement sortBy if needed

    setCandidates(filtered);
  };

  return (
    <div className="space-y-6">
      <SearchForm
        userId={user.id}
        onSearch={(q) => setLastQuery(q)}
        onResults={handleResults}
        isLoading={false} // connect this to loading state if desired
      />

      <AdvancedFilters onFilterChange={(f) => {
        setFilters(f);
        applyFilters(f);
      }} />

      <ResultsSummary candidates={candidates} />

      <div className="space-y-4 max-w-3xl mx-auto">
        {candidates.map((c) => (
          <CandidateCard key={c.id} candidate={c} searchQuery={lastQuery} />
        ))}
      </div>
    </div>
  );
};

export default HunterPage;
