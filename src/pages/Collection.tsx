
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Users, FileText, Grid, List, Filter } from 'lucide-react';
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
  
  const { profiles, isLoading: profilesLoading } = useHunterProfiles();
  const { briefs, loading: briefsLoading } = useAIBriefs();

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
    
    if (selectedCategory === 'all' || selectedCategory === 'candidates') {
      allItems = [...allItems, ...profiles.map(profile => ({ ...profile, type: 'candidate' }))];
    }
    
    if (selectedCategory === 'all' || selectedCategory === 'briefs') {
      allItems = [...allItems, ...briefs.map(brief => ({ ...brief, type: 'brief' }))];
    }

    if (searchTerm) {
      allItems = allItems.filter(item => {
        if (item.type === 'candidate') {
          return item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 item.skills?.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        } else if (item.type === 'brief') {
          return item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 item.hard_skills?.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return false;
      });
    }

    return allItems;
  };

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
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
                placeholder="Rechercher dans vos collections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                size="sm"
              >
                Tout
              </Button>
              <Button
                variant={selectedCategory === 'candidates' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('candidates')}
                size="sm"
              >
                <Users className="h-4 w-4 mr-1" />
                Candidats
              </Button>
              <Button
                variant={selectedCategory === 'briefs' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('briefs')}
                size="sm"
              >
                <FileText className="h-4 w-4 mr-1" />
                Briefs
              </Button>
            </div>

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
          </div>
        </div>

        {/* Collections Overview */}
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

        {/* Items Grid/List */}
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
              />
            ) : (
              <BriefCollectionCard
                key={`brief-${item.id}`}
                brief={item}
                viewMode={viewMode}
              />
            )
          ))}
        </div>

        {/* Empty State */}
        {filteredItems().length === 0 && !profilesLoading && !briefsLoading && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun élément trouvé</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm 
                ? "Aucun résultat ne correspond à votre recherche" 
                : "Commencez par sauvegarder des candidats depuis Hunter ou créer des briefs avec l'IA"
              }
            </p>
            {searchTerm && (
              <Button variant="outline" onClick={() => setSearchTerm('')}>
                Effacer la recherche
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
