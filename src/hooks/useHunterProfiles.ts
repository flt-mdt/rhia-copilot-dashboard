
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { HunterCandidate } from '@/components/hunter/CandidateCard';

export interface SavedHunterProfile {
  id: string;
  user_id: string;
  name: string;
  source: string;
  profile_url: string;
  location: string | null;
  languages: string[] | null;
  availability: string | null;
  skills: string[] | null;
  match_score: number | null;
  search_query: string | null;
  is_contacted: boolean | null;
  is_shortlisted: boolean | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const useHunterProfiles = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ['hunter-profiles'],
    queryFn: async () => {
      console.log('Fetching hunter profiles...');
      
      const { data, error } = await supabase
        .from('hunter_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching hunter profiles:', error);
        throw error;
      }
      
      console.log('Fetched hunter profiles:', data);
      return data as SavedHunterProfile[];
    },
  });

  const saveProfileMutation = useMutation({
    mutationFn: async ({ candidate, searchQuery }: { candidate: HunterCandidate; searchQuery?: string }) => {
      console.log('Saving hunter profile:', candidate);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const profileData = {
        user_id: user.id,
        name: candidate.name,
        source: candidate.source,
        profile_url: candidate.profileUrl,
        location: candidate.location,
        languages: candidate.languages,
        availability: candidate.availability,
        skills: candidate.skills.map(skill => skill.name),
        match_score: candidate.matchScore,
        search_query: searchQuery || null,
      };

      console.log('Profile data to save:', profileData);

      const { error } = await supabase
        .from('hunter_profiles')
        .insert(profileData);

      if (error) {
        console.error('Error saving hunter profile:', error);
        throw error;
      }
      
      console.log('Hunter profile saved successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hunter-profiles'] });
      toast({
        title: 'Profil sauvegardé',
        description: 'Le profil a été ajouté à votre liste sauvegardée',
      });
    },
    onError: (error) => {
      console.error('Save profile mutation error:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de sauvegarder le profil',
        variant: 'destructive',
      });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<SavedHunterProfile> }) => {
      console.log('Updating hunter profile:', id, updates);
      
      const { error } = await supabase
        .from('hunter_profiles')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error('Error updating hunter profile:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hunter-profiles'] });
    },
  });

  const deleteProfileMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting hunter profile:', id);
      
      const { error } = await supabase
        .from('hunter_profiles')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting hunter profile:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hunter-profiles'] });
      toast({
        title: 'Profil supprimé',
        description: 'Le profil a été retiré de votre liste',
      });
    },
  });

  return {
    profiles,
    isLoading,
    saveProfile: saveProfileMutation.mutate,
    updateProfile: updateProfileMutation.mutate,
    deleteProfile: deleteProfileMutation.mutate,
    isSaving: saveProfileMutation.isPending,
  };
};
