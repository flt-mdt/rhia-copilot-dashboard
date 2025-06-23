import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTypewriter } from '@/hooks/useTypewriter';
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

  // Typewriter animation for placeholder
  const typewriterText = useTypewriter({
    words: [
      'Développeur React senior avec 5+ ans d\'expérience...',
      'Chef de projet digital bilingue anglais...',
      'Designer UX/UI maîtrisant Figma et Sketch...',
      'Data Scientist Python avec expertise ML...'
    ],
    typeSpeed: 80,
    deleteSpeed: 40,
    delayBetweenWords: 3000
  });

  // Get user's display name
  const userName = user?.user_metadata?.name || user?.user_metadata?.full_name || 'Utilisateur';

  // Typewriter animation for greeting
  const greetingText = useTypewriter({
    words: [`Bonjour ${userName} !`],
    typeSpeed: 150,      // Plus lent pour la frappe
    deleteSpeed: 100,    // Plus lent pour l'effacement  
    delayBetweenWords: 0,
    pauseAfterComplete: 8000  // Pause de 8 secondes avant de recommencer
  });

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
      <div className="min-h-screen bg-white transition-all duration-500 ease-in-out p-4 md:p-8 animate-fade-in"
           style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="transform transition-all duration-300 hover:scale-[1.02] animate-fade-in"
               style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
            <SearchForm
              userId={user.id}
              onSearch={handleSearch}
              onResults={handleResults}
              isLoading={isLoading}
            />
          </div>

          <div className="animate-fade-in"
               style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            <AdvancedFilters onFilterChange={handleFilterChange} />
          </div>

          {isLoading ? (
            <div className="space-y-6 mt-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} 
                     className="animate-fade-in"
                     style={{ 
                       animationDelay: `${300 + index * 150}ms`,
                       animationFillMode: 'both'
                     }}>
                  <Skeleton className="h-[180px] w-full max-w-3xl mx-auto rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
                </div>
              ))}
              
              {/* Progress bar animation */}
              <div className="max-w-3xl mx-auto mt-6 animate-fade-in"
                   style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-[progress-fill_3s_ease-out_infinite]"></div>
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">Recherche en cours...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="animate-fade-in"
                   style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
                <ResultsSummary candidates={candidates} />
              </div>

              <div className="space-y-6 mt-8">
                {candidates.length > 0 ? (
                  candidates.map((candidate, index) => (
                    <div key={candidate.id}
                         className="animate-fade-in transform transition-all duration-300 hover:scale-[1.02]"
                         style={{ 
                           animationDelay: `${400 + index * 100}ms`,
                           animationFillMode: 'both'
                         }}>
                      <CandidateCard
                        candidate={candidate}
                        searchQuery={currentSearchQuery}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-3xl mx-auto animate-fade-in transform transition-all duration-300 hover:shadow-lg"
                       style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
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
    <div className="min-h-screen bg-white flex flex-col transition-all duration-300 ease-in-out"
         style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
      {/* Header avec sphère bleue et message de bienvenue */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        {/* Sphère bleue avec dégradé et animations */}
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mb-8 shadow-lg animate-fade-in transform transition-all duration-300 hover:scale-110 hover:shadow-xl animate-[pulse_3s_ease-in-out_infinite]"
             style={{ animationDelay: '100ms', animationFillMode: 'both' }}></div>
        
        {/* Message de bienvenue avec animation typewriter */}
        <h1 className="text-4xl font-semibold text-gray-800 mb-4 text-center animate-fade-in transform transition-all duration-300 hover:text-blue-600 min-h-[3rem] flex items-center"
            style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          <span className="inline-block">
            {greetingText}
            <span className="inline-block w-0.5 h-8 bg-blue-600 ml-1 animate-pulse"></span>
          </span>
        </h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-md animate-fade-in"
           style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
          Décrivez-nous le profil candidat recherché, nous nous occupons du reste.
        </p>

        {/* Grille des cartes principales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl mb-12">
          {/* Carte profil à gauche */}
          <Card className="bg-gray-800 text-white shadow-lg animate-fade-in transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-700"
                style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3 transition-all duration-300 group-hover:scale-110">
                  <span className="text-gray-800 font-semibold text-sm">RC</span>
                </div>
                <div>
                  <h3 className="font-semibold">RHIA Copilot</h3>
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full transition-all duration-300 hover:bg-blue-400">
                    Assistant RH IA
                  </span>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Conçu pour optimiser vos processus de recrutement et identifier les meilleurs candidats pour vos postes.
              </p>
            </CardContent>
          </Card>

          {/* Section Tasks au centre */}
          <Card className="shadow-sm border border-gray-200 animate-fade-in transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-200"
                style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span>👥</span>
                  <span className="ml-2">Sourcer des candidats qualifiés</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span>🎯</span>
                  <span className="ml-2">Analyser les profils et compétences</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span>📊</span>
                  <span className="ml-2">Générer des rapports de matching</span>
                </div>
              </div>
              <div className="mt-4 text-right">
                <span className="text-blue-500 text-sm cursor-pointer hover:underline transition-all duration-300 hover:text-blue-700 hover:scale-105">
                  Voir tout
                </span>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Fonctionnalités
              </div>
            </CardContent>
          </Card>

          {/* Carte de suggestion à droite */}
          <Card className="shadow-sm border border-gray-200 animate-fade-in transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-green-200 hover:bg-green-50"
                style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
            <CardContent className="p-6">
              <h4 className="text-sm font-medium text-gray-800 mb-3 transition-colors duration-300 hover:text-green-700">
                Recherche un développeur React senior avec 5+ ans d'expérience, maîtrisant TypeScript et Node.js, basé à Paris
              </h4>
              <p className="text-xs text-gray-500">
                Suggestion de recherche
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Barre de raccourcis */}
        <div className="flex flex-wrap gap-4 mb-12 animate-fade-in"
             style={{ animationDelay: '700ms', animationFillMode: 'both' }}>
          <Button variant="outline" className="rounded-full bg-white border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-blue-300 group">
            <CalendarIcon className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
            Planifier entretiens
          </Button>
          <Button variant="outline" className="rounded-full bg-white border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-green-300 group">
            <PlayIcon className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
            Recherche démo
          </Button>
          <Button variant="outline" className="rounded-full bg-white border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-purple-300 group">
            <GridIcon className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-180" />
            Parcourir les sources
          </Button>
          <Button variant="outline" className="rounded-full bg-white border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-orange-300 group">
            <ShareIcon className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
            Profils sauvegardés
          </Button>
        </div>
      </div>

      {/* Zone de saisie en bas */}
      <div className="border-t border-gray-200 bg-white p-6 animate-fade-in"
           style={{ animationDelay: '800ms', animationFillMode: 'both' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-4 bg-gray-50 rounded-2xl p-4 transition-all duration-300 hover:bg-gray-100 hover:shadow-lg">
            <div className="flex-1">
              <Textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={typewriterText || "Décrivez le profil recherché..."}
                className="border-0 bg-transparent resize-none focus:ring-0 focus:outline-none text-gray-700 placeholder-gray-500 transition-all duration-300 focus:placeholder-gray-400"
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
                <SelectTrigger className="w-32 border-0 bg-transparent text-sm text-gray-600 transition-all duration-300 hover:bg-gray-200 hover:scale-105">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="github">GitHub</SelectItem>
                  <SelectItem value="indeed">Indeed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110 hover:bg-gray-200">
                <PaperclipIcon className="w-4 h-4 transition-transform duration-300 hover:rotate-12" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110 hover:bg-gray-200">
                <MicIcon className="w-4 h-4 transition-transform duration-300 hover:scale-125" />
              </Button>
              <Button 
                onClick={handleSendMessage}
                className="bg-gray-800 hover:bg-gray-900 text-white rounded-full px-4 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100"
                disabled={!chatInput.trim()}
              >
                <SendIcon className="w-4 h-4 transition-transform duration-300 hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-xs text-gray-500 animate-fade-in"
           style={{ animationDelay: '900ms', animationFillMode: 'both' }}>
        RHIA Copilot peut afficher des informations inexactes, veuillez donc vérifier les résultats.{' '}
        <span className="underline cursor-pointer transition-all duration-300 hover:text-blue-600 hover:scale-105">
          Votre confidentialité et RHIA Copilot
        </span>
      </div>
    </div>
  );
};

export default Hunter;
