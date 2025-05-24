
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
  job_postings?: {
    title: string;
    department: string;
  };
}

export const useCandidates = () => {
  return useQuery({
    queryKey: ['candidates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('candidates')
        .select(`
          *,
          job_postings (
            title,
            department
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Candidate[];
    },
  });
};

export const useCreateCandidate = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (candidateData: {
      name: string;
      target_job_id: string;
      email?: string;
      ai_status?: string;
    }) => {
      // Create candidate
      const { data: candidate, error: candidateError } = await supabase
        .from('candidates')
        .insert([candidateData])
        .select()
        .single();
      
      if (candidateError) throw candidateError;

      // Create job application entry
      const { error: applicationError } = await supabase
        .from('job_applications')
        .insert([{
          candidate_id: candidate.id,
          job_posting_id: candidateData.target_job_id,
          status: 'to_analyze'
        }]);

      if (applicationError) throw applicationError;

      // Create timeline event
      const { error: timelineError } = await supabase
        .from('timeline_events')
        .insert([{
          candidate_id: candidate.id,
          action: 'CV uploaded',
          description: 'Candidate CV uploaded and profile created'
        }]);

      if (timelineError) console.warn('Timeline event creation failed:', timelineError);

      return candidate;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      toast({
        title: "Succès",
        description: "Le candidat a été créé avec succès",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la création du candidat",
        variant: "destructive",
      });
      console.error('Error creating candidate:', error);
    },
  });
};

export const useUpdateCandidateStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ 
      id, 
      status 
    }: { 
      id: string; 
      status: 'to_analyze' | 'in_review' | 'contacted' | 'interview_scheduled' | 'offer_sent' | 'hired' | 'rejected';
    }) => {
      const { data, error } = await supabase
        .from('candidates')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;

      // Add timeline event
      const { error: timelineError } = await supabase
        .from('timeline_events')
        .insert([{
          candidate_id: id,
          action: 'Status changed',
          description: `Status changed to ${status}`
        }]);

      if (timelineError) console.warn('Timeline event creation failed:', timelineError);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      toast({
        title: "Statut mis à jour",
        description: "Le statut du candidat a été mis à jour",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour du statut",
        variant: "destructive",
      });
      console.error('Error updating candidate status:', error);
    },
  });
};
