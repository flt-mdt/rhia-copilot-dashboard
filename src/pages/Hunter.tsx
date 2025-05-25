import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import SearchForm from '@/components/hunter/SearchForm';
import ResultsSummary from '@/components/hunter/ResultsSummary';
import CandidateCard, { HunterCandidate } from '@/components/hunter/CandidateCard';
import AdvancedFilters, { FilterOptions } from '@/components/hunter/AdvancedFilters';
import { Skeleton } from '@/components/ui/skeleton';

const Hunter = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [candidates, setCandidates] = useState<HunterCandidate[]>([]);
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
    
    // Simulate API call with a timeout
    setTimeout(() => {
      const mockCandidates: HunterCandidate[] = [
        {
          id: '1',
          name: 'Sophie Martin',
          source: 'LinkedIn',
          location: 'Paris, France',
          languages: ['Français', 'Anglais'],
          availability: 'Disponible dans 3 mois',
          skills: [
            { name: 'React' },
            { name: 'TypeScript' },
            { name: 'Node.js' },
            { name: 'GraphQL' }
          ],
          matchScore: 92,
          profileUrl: 'https://linkedin.com/',
          isNew: true
        },
        {
          id: '2',
          name: 'Thomas Dubois',
          source: 'GitHub',
          location: 'Lyon, France',
          languages: ['Français', 'Anglais', 'Espagnol'],
          availability: 'Disponible immédiatement',
          skills: [
            { name: 'JavaScript' },
            { name: 'Vue.js' },
            { name: 'PHP' },
            { name: 'MySQL' }
          ],
          matchScore: 87,
          profileUrl: 'https://github.com/'
        },
        {
          id: '3',
          name: 'Marie Lefebvre',
          source: 'Behance',
          location: 'Remote (France)',
          languages: ['Français', 'Anglais'],
          availability: 'Actuellement en poste',
          skills: [
            { name: 'UI Design' },
            { name: 'Figma' },
            { name: 'Adobe XD' },
            { name: 'Sketch' }
          ],
          matchScore: 85,
          profileUrl: 'https://behance.net/'
        },
        {
          id: '4',
          name: 'Jean Dupont',
          source: 'Portfolio',
          location: 'Bordeaux, France',
          languages: ['Français'],
          availability: 'Disponible dans 1 mois',
          skills: [
            { name: 'Angular' },
            { name: 'Java' },
            { name: 'Spring Boot' },
            { name: 'Docker' }
          ],
          matchScore: 78,
          profileUrl: 'https://example.com/'
        },
        {
          id: '5',
          name: 'Claire Bernard',
          source: 'LinkedIn',
          location: 'Marseille, France',
          languages: ['Français', 'Italien'],
          availability: 'Disponible immédiatement',
          skills: [
            { name: 'Python' },
            { name: 'Django' },
            { name: 'PostgreSQL' },
            { name: 'AWS' }
          ],
          matchScore: 74,
          profileUrl: 'https://linkedin.com/',
          isNew: true
        },
        {
          id: '6',
          name: 'Luc Moreau',
          source: 'GitHub',
          location: 'Remote (Europe)',
          languages: ['Français', 'Anglais', 'Allemand'],
          availability: 'Disponible dans 2 mois',
          skills: [
            { name: 'Go' },
            { name: 'Kubernetes' },
            { name: 'Microservices' },
            { name: 'CI/CD' }
          ],
          matchScore: 68,
          profileUrl: 'https://github.com/'
        }
      ];
      
      setCandidates(mockCandidates);
      setIsLoading(false);
      
      toast({
        title: t('hunter.searchCompleted'),
        description: t('hunter.candidatesFound').replace('{count}', mockCandidates.length.toString()),
      });
    }, 2000);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  // Apply filters to candidate list
  const filteredCandidates = candidates
    .filter(candidate => candidate.matchScore >= filters.minMatchScore)
    .filter(candidate => 
      filters.countries.length === 0 || 
      filters.countries.some(country => candidate.location.includes(country))
    )
    .sort((a, b) => {
      if (filters.sortBy === 'score') {
        return b.matchScore - a.matchScore;
      }
      // We're mocking the other sort options for simplicity
      return 0;
    });

  return (
    <div className="ml-64 p-8 bg-[#F9FAFB]">
      <Header title={t('hunter.title')} />
      
      <div className="max-w-7xl mx-auto">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        
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
                <ResultsSummary candidates={filteredCandidates} />
                
                <div className="space-y-6 mt-8">
                  {filteredCandidates.length > 0 ? (
                    filteredCandidates.map(candidate => (
                      <CandidateCard 
                        key={candidate.id} 
                        candidate={candidate} 
                        searchQuery={currentSearchQuery}
                      />
                    ))
                  ) : (
                    <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-3xl mx-auto">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">{t('hunter.noResults')}</h3>
                      <p className="text-gray-500">
                        {t('hunter.noResultsDesc')}
                      </p>
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
