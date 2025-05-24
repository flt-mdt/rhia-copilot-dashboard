
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface JobTemplate {
  id: string;
  title: string;
  description: string | null;
  requirements: string[];
  missions: string[];
  hard_skills: string[];
  soft_skills: string[];
  department: string | null;
  experience_level: string | null;
  is_featured: boolean;
  usage_count: number;
  created_at: string;
}

export const useJobTemplates = () => {
  const [templates, setTemplates] = useState<JobTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('job_templates_public')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('usage_count', { ascending: false });

      if (error) throw error;

      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les modèles",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const incrementUsage = async (templateId: string) => {
    try {
      const { error } = await supabase
        .from('job_templates_public')
        .update({ usage_count: templates.find(t => t.id === templateId)?.usage_count + 1 || 1 })
        .eq('id', templateId);

      if (error) throw error;
    } catch (error) {
      console.error('Error incrementing usage:', error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return {
    templates,
    loading,
    incrementUsage,
    refetch: fetchTemplates
  };
};
