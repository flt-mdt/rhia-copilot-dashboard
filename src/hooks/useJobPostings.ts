
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface JobPosting {
  id: string;
  title: string;
  description?: string;
  location?: string;
  contract_type?: 'CDI' | 'CDD' | 'Freelance' | 'Stage' | 'Alternance';
  department?: 'Engineering' | 'Design' | 'Product' | 'Marketing' | 'Sales' | 'HR';
  salary_min?: number;
  salary_max?: number;
  experience_level?: string;
  skills_required?: string[];
  benefits?: string[];
  is_active?: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export const useJobPostings = () => {
  return useQuery({
    queryKey: ['job-postings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as JobPosting[];
    },
  });
};

export const useJobPosting = (id: string) => {
  return useQuery({
    queryKey: ['job-posting', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as JobPosting;
    },
    enabled: !!id,
  });
};

export const useCreateJobPosting = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (jobData: Omit<JobPosting, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('job_postings')
        .insert([jobData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-postings'] });
      toast({
        title: "Succès",
        description: "L'offre d'emploi a été créée avec succès",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la création de l'offre",
        variant: "destructive",
      });
      console.error('Error creating job posting:', error);
    },
  });
};

export const useUpdateJobPosting = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<JobPosting> }) => {
      const { data, error } = await supabase
        .from('job_postings')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-postings'] });
      toast({
        title: "Succès",
        description: "L'offre d'emploi a été mise à jour",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour de l'offre",
        variant: "destructive",
      });
      console.error('Error updating job posting:', error);
    },
  });
};

export const useDeleteJobPosting = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('job_postings')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-postings'] });
      toast({
        title: "Succès",
        description: "L'offre d'emploi a été supprimée",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression de l'offre",
        variant: "destructive",
      });
      console.error('Error deleting job posting:', error);
    },
  });
};
