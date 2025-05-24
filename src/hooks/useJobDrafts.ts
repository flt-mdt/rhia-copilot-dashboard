
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface JobDraft {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  requirements: string[];
  missions: string[];
  hard_skills: string[];
  soft_skills: string[];
  location: string | null;
  contract_type: string | null;
  salary_range: string | null;
  source_brief_id: string | null;
  created_at: string;
  updated_at: string;
}

export const useJobDrafts = () => {
  const [drafts, setDrafts] = useState<JobDraft[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchDrafts = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('job_offers_drafts' as any)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transformer les données pour correspondre à notre interface
      const transformedData: JobDraft[] = (data || []).map((item: any) => ({
        id: item.id,
        user_id: item.user_id || '',
        title: item.title || '',
        description: item.description,
        requirements: item.requirements || [],
        missions: item.missions || [],
        hard_skills: item.hard_skills || [],
        soft_skills: item.soft_skills || [],
        location: item.location,
        contract_type: item.contract_type,
        salary_range: item.salary_range,
        source_brief_id: item.source_brief_id,
        created_at: item.created_at || new Date().toISOString(),
        updated_at: item.updated_at || new Date().toISOString()
      }));

      setDrafts(transformedData);
    } catch (error) {
      console.error('Error fetching drafts:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les brouillons",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, [user]);

  return {
    drafts,
    loading,
    refetch: fetchDrafts
  };
};
