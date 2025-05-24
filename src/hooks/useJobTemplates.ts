
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
        .from('job_templates_public' as any)
        .select('*')
        .order('is_featured', { ascending: false })
        .order('usage_count', { ascending: false });

      if (error) throw error;

      // Transformer les données pour correspondre à notre interface
      const transformedData: JobTemplate[] = (data || []).map((item: any) => ({
        id: item.id,
        title: item.title || '',
        description: item.description,
        requirements: item.requirements || [],
        missions: item.missions || [],
        hard_skills: item.hard_skills || [],
        soft_skills: item.soft_skills || [],
        department: item.department,
        experience_level: item.experience_level,
        is_featured: item.is_featured || false,
        usage_count: item.usage_count || 0,
        created_at: item.created_at || new Date().toISOString()
      }));

      setTemplates(transformedData);
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
      const template = templates.find(t => t.id === templateId);
      const newUsageCount = (template?.usage_count || 0) + 1;

      const { error } = await supabase
        .from('job_templates_public' as any)
        .update({ usage_count: newUsageCount })
        .eq('id', templateId);

      if (error) throw error;

      // Mettre à jour localement
      setTemplates(prev => prev.map(t => 
        t.id === templateId 
          ? { ...t, usage_count: newUsageCount }
          : t
      ));
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
