
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Candidate {
  id: string;
  name: string;
  email?: string;
  phone_number?: string;
  target_job_id?: string;
  ai_score?: number;
  ai_status?: string;
  status?: 'to_analyze' | 'in_review' | 'contacted' | 'interview_scheduled' | 'offer_sent' | 'hired' | 'rejected';
  ai_summary?: string;
  hr_comment?: string;
  is_favorite?: boolean;
  location?: string;
  experience_years?: number;
  current_company?: string;
  current_position?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  created_at?: string;
  updated_at?: string;
}

export const useCandidates = () => {
  return useQuery({
    queryKey: ['candidates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Candidate[];
    },
  });
};

export const useCandidate = (id: string) => {
  return useQuery({
    queryKey: ['candidate', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('candidates')
        .select(`
          *,
          candidate_skills (
            *,
            skills (*)
          ),
          documents (*),
          timeline_events (*),
          personality_traits (*)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateCandidate = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (candidateData: Omit<Candidate, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('candidates')
        .insert([candidateData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      toast({
        title: "Succès",
        description: "Le candidat a été ajouté avec succès",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'ajout du candidat",
        variant: "destructive",
      });
      console.error('Error creating candidate:', error);
    },
  });
};

export const useUpdateCandidate = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Candidate> }) => {
      const { data, error } = await supabase
        .from('candidates')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      toast({
        title: "Succès",
        description: "Le candidat a été mis à jour",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour",
        variant: "destructive",
      });
      console.error('Error updating candidate:', error);
    },
  });
};
