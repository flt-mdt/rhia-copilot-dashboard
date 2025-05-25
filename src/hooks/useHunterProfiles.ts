
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
      const { data, error } = await supabase
        .from('hunter_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as SavedHunterProfile[];
    },
  });

  const saveProfileMutation = useMutation({
    mutationFn: async ({ candidate, searchQuery }: { candidate: HunterCandidate; searchQuery?: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('hunter_profiles')
        .insert({
          user_id: user.id,
          name: candidate.name,
          source: candidate.source,
          profile_url: candidate.profileUrl,
          location: candidate.location,
          languages: candidate.languages,
          availability: candidate.availability,
          skills: candidate.skills.map(skill => skill.name),
          match_score: candidate.matchScore,
          search_query: searchQuery,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hunter-profiles'] });
      toast({
        title: 'Profil sauvegardé',
        description: 'Le profil a été ajouté à votre liste sauvegardée',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erreur',
        description: 'Impossible de sauvegarder le profil',
        variant: 'destructive',
      });
      console.error('Error saving profile:', error);
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<SavedHunterProfile> }) => {
      const { error } = await supabase
        .from('hunter_profiles')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hunter-profiles'] });
    },
  });

  const deleteProfileMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('hunter_profiles')
        .delete()
        .eq('id', id);

      if (error) throw error;
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
