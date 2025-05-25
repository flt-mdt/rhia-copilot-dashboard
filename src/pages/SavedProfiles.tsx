
import React, { useState } from 'react';
import { Trash2, ExternalLink, MessageSquare, Eye, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Header from '@/components/layout/Header';
import { useHunterProfiles, SavedHunterProfile } from '@/hooks/useHunterProfiles';
import { Skeleton } from '@/components/ui/skeleton';

const SavedProfiles = () => {
  const { profiles, isLoading, updateProfile, deleteProfile } = useHunterProfiles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<SavedHunterProfile | null>(null);
  const [notes, setNotes] = useState('');

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateNotes = (profile: SavedHunterProfile) => {
    updateProfile({
      id: profile.id,
      updates: { notes }
    });
    setSelectedProfile(null);
    setNotes('');
  };

  const handleToggleContact = (profile: SavedHunterProfile) => {
    updateProfile({
      id: profile.id,
      updates: { is_contacted: !profile.is_contacted }
    });
  };

  const handleToggleShortlist = (profile: SavedHunterProfile) => {
    updateProfile({
      id: profile.id,
      updates: { is_shortlisted: !profile.is_shortlisted }
    });
  };

  if (isLoading) {
    return (
      <div className="ml-64 p-8 bg-[#F9FAFB]">
        <Header title="Profils sauvegardés" />
        <div className="max-w-7xl mx-auto space-y-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="ml-64 p-8 bg-[#F9FAFB]">
      <Header title="Profils sauvegardés" />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher par nom, source ou localisation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredProfiles.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {searchTerm ? 'Aucun profil trouvé' : 'Aucun profil sauvegardé'}
              </h3>
              <p className="text-gray-500">
                {searchTerm 
                  ? 'Essayez avec d\'autres mots-clés de recherche.'
                  : 'Commencez par sauvegarder des profils depuis la page Hunter.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredProfiles.map(profile => (
              <Card key={profile.id} className="rounded-xl bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold">{profile.name}</h3>
                        <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0">
                          {profile.source}
                        </Badge>
                        {profile.is_shortlisted && (
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            Shortlisté
                          </Badge>
                        )}
                        {profile.is_contacted && (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            Contacté
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        {profile.location} • {profile.languages?.join(', ')}
                      </div>
                      <div className="text-sm text-gray-500">
                        Disponibilité: {profile.availability}
                      </div>
                      {profile.search_query && (
                        <div className="text-xs text-gray-400 mt-1">
                          Trouvé avec: "{profile.search_query}"
                        </div>
                      )}
                    </div>
                    <div className="bg-green-100 text-green-700 text-sm font-semibold rounded-full w-12 h-12 flex items-center justify-center">
                      {profile.match_score}%
                    </div>
                  </div>

                  {profile.skills && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {profile.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700 border-0">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {profile.notes && (
                    <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                      <Label className="text-sm font-medium">Notes:</Label>
                      <p className="text-sm text-gray-700 mt-1">{profile.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={profile.is_contacted || false}
                          onCheckedChange={() => handleToggleContact(profile)}
                        />
                        <Label className="text-sm">Contacté</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={profile.is_shortlisted || false}
                          onCheckedChange={() => handleToggleShortlist(profile)}
                        />
                        <Label className="text-sm">Shortlisté</Label>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(profile.profile_url, '_blank')}
                      >
                        <ExternalLink className="mr-1 h-4 w-4" />
                        Voir profil
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedProfile(profile);
                              setNotes(profile.notes || '');
                            }}
                          >
                            <MessageSquare className="mr-1 h-4 w-4" />
                            Notes
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Notes pour {profile.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Textarea
                              placeholder="Ajoutez vos notes sur ce candidat..."
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              rows={4}
                            />
                            <div className="flex gap-2">
                              <Button 
                                onClick={() => selectedProfile && handleUpdateNotes(selectedProfile)}
                                className="flex-1"
                              >
                                Sauvegarder
                              </Button>
                              <Button 
                                variant="outline" 
                                onClick={() => setSelectedProfile(null)}
                                className="flex-1"
                              >
                                Annuler
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteProfile(profile.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedProfiles;
