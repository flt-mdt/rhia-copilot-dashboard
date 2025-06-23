
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import SearchForm from '@/components/hunter/SearchForm';
import ResultsSummary from '@/components/hunter/ResultsSummary';
import CandidateCard, { HunterCandidate } from '@/components/hunter/CandidateCard';
import AdvancedFilters from '@/components/hunter/AdvancedFilters';
import type { FilterOptions } from '@/components/hunter/AdvancedFilters';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, PlayIcon, GridIcon, ShareIcon, PaperclipIcon, MicIcon, SendIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
  const [chatInput, setChatInput] = useState('');

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
      title: 'Recherche terminée',
      description: `${apiCandidates.length} candidats trouvés`,
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

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      handleSearch(chatInput);
      setChatInput('');
    }
  };

  if (hasSearched) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-7xl mx-auto">
          <SearchForm
            userId={user.id}
            onSearch={handleSearch}
            onResults={handleResults}
            isLoading={isLoading}
          />

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
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Aucun résultat</h3>
                    <p className="text-gray-500">Essayez d'ajuster vos critères de recherche ou vos filtres.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header avec sphère bleue et message de bienvenue */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        {/* Sphère bleue avec dégradé */}
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mb-8 shadow-lg"></div>
        
        {/* Message de bienvenue */}
        <h1 className="text-4xl font-semibold text-gray-800 mb-4 text-center">
          Salut ! 👋
        </h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-md">
          Dites-nous ce dont vous avez besoin, et nous nous occupons du reste.
        </p>

        {/* Grille des cartes principales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl mb-12">
          {/* Carte profil à gauche */}
          <Card className="bg-gray-800 text-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                  <span className="text-gray-800 font-semibold text-sm">SL</span>
                </div>
                <div>
                  <h3 className="font-semibold">Sam Lee</h3>
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Assistant Données
                  </span>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Conçu pour aider à gérer les processus de vente et maximiser l'engagement client.
              </p>
            </CardContent>
          </Card>

          {/* Section Tasks au centre */}
          <Card className="shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span>📄</span>
                  <span className="ml-2">Répondre à la documentation RFP</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span>📄</span>
                  <span className="ml-2">Effectuer une analyse concurrentielle</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span>📄</span>
                  <span className="ml-2">Fournir des commentaires sur la communication</span>
                </div>
              </div>
              <div className="mt-4 text-right">
                <span className="text-blue-500 text-sm cursor-pointer hover:underline">
                  Voir tout
                </span>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Tâches
              </div>
            </CardContent>
          </Card>

          {/* Carte de suggestion à droite */}
          <Card className="shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <h4 className="text-sm font-medium text-gray-800 mb-3">
                Quels sont les principaux avantages du Produit 1 que je devrais mettre en avant pour les clients potentiels ?
              </h4>
              <p className="text-xs text-gray-500">
                Suggestion de prompt
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Barre de raccourcis */}
        <div className="flex flex-wrap gap-4 mb-12">
          <Button variant="outline" className="rounded-full bg-white border-gray-200 hover:bg-gray-50">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Connecter l'agenda
          </Button>
          <Button variant="outline" className="rounded-full bg-white border-gray-200 hover:bg-gray-50">
            <PlayIcon className="w-4 h-4 mr-2" />
            Tâche démo
          </Button>
          <Button variant="outline" className="rounded-full bg-white border-gray-200 hover:bg-gray-50">
            <GridIcon className="w-4 h-4 mr-2" />
            Parcourir les intégrations
          </Button>
          <Button variant="outline" className="rounded-full bg-white border-gray-200 hover:bg-gray-50">
            <ShareIcon className="w-4 h-4 mr-2" />
            Partagé dans les notes
          </Button>
        </div>
      </div>

      {/* Zone de saisie en bas */}
      <div className="border-t border-gray-200 bg-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-4 bg-gray-50 rounded-2xl p-4">
            <div className="flex-1">
              <Textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Demandez-moi n'importe quoi..."
                className="border-0 bg-transparent resize-none focus:ring-0 focus:outline-none text-gray-700 placeholder-gray-500"
                rows={1}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-32 border-0 bg-transparent text-sm text-gray-600">
                  <SelectValue placeholder="Sélectionner la source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="github">GitHub</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <PaperclipIcon className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <MicIcon className="w-4 h-4" />
              </Button>
              <Button 
                onClick={handleSendMessage}
                className="bg-gray-800 hover:bg-gray-900 text-white rounded-full px-4"
                disabled={!chatInput.trim()}
              >
                <SendIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-xs text-gray-500">
        Centra peut afficher des informations inexactes, veuillez donc vérifier la réponse.{' '}
        <span className="underline cursor-pointer">Votre confidentialité et Orbita GPT</span>
      </div>
    </div>
  );
};

export default Hunter;
