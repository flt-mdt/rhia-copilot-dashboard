
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, Users, FileText, Grid, List, Filter, BarChart3 } from 'lucide-react';
import { useHunterProfiles } from '@/hooks/useHunterProfiles';
import { useAIBriefs } from '@/hooks/useAIBriefs';
import CollectionCard from '@/components/collection/CollectionCard';
import CandidateCollectionCard from '@/components/collection/CandidateCollectionCard';
import BriefCollectionCard from '@/components/collection/BriefCollectionCard';

const Collection = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'candidates' | 'briefs'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { profiles, isLoading: profilesLoading, deleteProfile } = useHunterProfiles();
  const { briefs, loading: briefsLoading, deleteBrief } = useAIBriefs();

  console.log('Profiles loaded:', profiles.length);
  console.log('Briefs loaded:', briefs.length);
  console.log('Search term:', searchTerm);
  console.log('Selected category:', selectedCategory);

  const collections = [
    {
      id: 'candidates',
      title: 'Candidats sauvegardés',
      description: 'Profils de candidats trouvés via Hunter',
      count: profiles.length,
      icon: Users,
      color: 'bg-blue-500',
      items: profiles
    },
    {
      id: 'briefs',
      title: 'Briefs IA',
      description: 'Briefs générés avec l\'assistant IA',
      count: briefs.length,
      icon: FileText,
      color: 'bg-green-500',
      items: briefs
    }
  ];

  const filteredCollections = collections.filter(collection => {
    if (selectedCategory === 'all') return true;
    return collection.id === selectedCategory;
  });

  const filteredItems = () => {
    let allItems: any[] = [];
    
    // Only show items based on selected category
    if (selectedCategory === 'candidates') {
      allItems = profiles.map(profile => ({ ...profile, type: 'candidate' }));
    } else if (selectedCategory === 'briefs') {
      allItems = briefs.map(brief => ({ ...brief, type: 'brief' }));
    }

    // Apply search filter when a specific category is selected and there's a search term
    if (searchTerm && selectedCategory !== 'all') {
      allItems = allItems.filter(item => {
        const searchLower = searchTerm.toLowerCase();
        
        if (item.type === 'candidate') {
          return (
            item.name?.toLowerCase().includes(searchLower) ||
            item.location?.toLowerCase().includes(searchLower) ||
            item.source?.toLowerCase().includes(searchLower) ||
            item.skills?.some((skill: string) => skill.toLowerCase().includes(searchLower)) ||
            item.search_query?.toLowerCase().includes(searchLower)
          );
        } else if (item.type === 'brief') {
          return (
            item.title?.toLowerCase().includes(searchLower) ||
            item.project_context?.toLowerCase().includes(searchLower) ||
            item.location?.toLowerCase().includes(searchLower) ||
            item.hard_skills?.some((skill: string) => skill.toLowerCase().includes(searchLower)) ||
            item.soft_skills?.some((skill: string) => skill.toLowerCase().includes(searchLower)) ||
            item.missions?.some((mission: string) => mission.toLowerCase().includes(searchLower))
          );
        }
        return false;
      });
    }

    console.log('Filtered items:', allItems.length);
    return allItems;
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleCategoryChange = (category: 'all' | 'candidates' | 'briefs') => {
    setSelectedCategory(category);
    // Clear search when changing category
    setSearchTerm('');
  };

  const isLoading = profilesLoading || briefsLoading;

  return (
    <div className="min-h-screen bg-gray-50 transition-all duration-300 ease-in-out"
         style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Collections</h1>
          <p className="text-gray-600">Organisez et gérez vos candidats et briefs sauvegardés</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={
                  selectedCategory === 'candidates' 
                    ? "Rechercher candidats par nom, compétence, localisation..."
                    : selectedCategory === 'briefs'
                    ? "Rechercher briefs par titre, compétence, mission..."
                    : "Sélectionnez une catégorie pour rechercher..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                disabled={selectedCategory === 'all'}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                >
                  ×
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => handleCategoryChange('all')}
                size="sm"
              >
                Tout
              </Button>
              <Button
                variant={selectedCategory === 'candidates' ? 'default' : 'outline'}
                onClick={() => handleCategoryChange('candidates')}
                size="sm"
              >
                <Users className="h-4 w-4 mr-1" />
                Candidats ({profiles.length})
              </Button>
              <Button
                variant={selectedCategory === 'briefs' ? 'default' : 'outline'}
                onClick={() => handleCategoryChange('briefs')}
                size="sm"
              >
                <FileText className="h-4 w-4 mr-1" />
                Briefs ({briefs.length})
              </Button>
            </div>

            {selectedCategory !== 'all' && (
              <div className="flex gap-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  onClick={() => setViewMode('grid')}
                  size="sm"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  onClick={() => setViewMode('list')}
                  size="sm"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Search Results Info */}
          {searchTerm && selectedCategory !== 'all' && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  {filteredItems().length} résultat(s) trouvé(s) pour "{searchTerm}"
                  {selectedCategory === 'candidates' ? ' dans les candidats' : ' dans les briefs'}
                </span>
                <Button variant="outline" size="sm" onClick={handleClearSearch}>
                  Effacer la recherche
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Collections Overview - Only shown when "all" is selected */}
        {selectedCategory === 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {collections.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                onClick={() => setSelectedCategory(collection.id as 'candidates' | 'briefs')}
              />
            ))}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Chargement des collections...</p>
          </div>
        )}

        {/* Items Grid/List - Only shown when a specific category is selected */}
        {!isLoading && selectedCategory !== 'all' && (
          <div className={`${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
          }`}>
            {filteredItems().map((item, index) => (
              item.type === 'candidate' ? (
                <CandidateCollectionCard
                  key={`candidate-${item.id}`}
                  candidate={item}
                  viewMode={viewMode}
                  onDelete={deleteProfile}
                />
              ) : (
                <BriefCollectionCard
                  key={`brief-${item.id}`}
                  brief={item}
                  viewMode={viewMode}
                  onDelete={deleteBrief}
                />
              )
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && selectedCategory !== 'all' && filteredItems().length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              {selectedCategory === 'candidates' ? (
                <Users className="h-8 w-8 text-gray-400" />
              ) : (
                <FileText className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm 
                ? 'Aucun résultat trouvé' 
                : selectedCategory === 'candidates' 
                  ? 'Aucun candidat trouvé' 
                  : 'Aucun brief trouvé'
              }
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm 
                ? "Essayez avec d'autres mots-clés ou effacez la recherche" 
                : selectedCategory === 'candidates'
                  ? "Commencez par sauvegarder des candidats depuis Hunter"
                  : "Commencez par créer des briefs avec l'IA"
              }
            </p>
            {searchTerm && (
              <Button variant="outline" onClick={handleClearSearch}>
                Effacer la recherche
              </Button>
            )}
          </div>
        )}

        {/* Collection Statistics */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <h4 className="text-lg font-semibold text-gray-900">Aperçu des collections</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{profiles.length}</div>
                <div className="text-sm text-gray-600">Candidats sauvegardés</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{briefs.length}</div>
                <div className="text-sm text-gray-600">Briefs IA créés</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{filteredItems().length}</div>
                <div className="text-sm text-gray-600">Éléments visibles</div>
              </div>
            </div>
            
            {searchTerm && (
              <>
                <Separator className="my-4" />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Recherche active :</span>
                  <Badge variant="outline">"{searchTerm}"</Badge>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Collection;
