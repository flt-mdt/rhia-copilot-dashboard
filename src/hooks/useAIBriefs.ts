
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface AIBrief {
  id: string;
  user_id: string;
  title: string | null;
  missions: string[];
  hard_skills: string[];
  soft_skills: string[];
  project_context: string | null;
  location: string | null;
  constraints: string[];
  conversation_data: any;
  brief_summary: any;
  is_complete: boolean;
  generated_job_posting_id: string | null;
  created_at: string;
  updated_at: string;
}

export const useAIBriefs = () => {
  const [briefs, setBriefs] = useState<AIBrief[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchBriefs = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      console.log('Fetching briefs for user:', user.id);
      
      const { data, error } = await supabase
        .from('ai_briefs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching briefs:', error);
        throw error;
      }

      console.log('Fetched briefs data:', data);

      // Transformer les données pour correspondre à notre interface
      const transformedData: AIBrief[] = (data || []).map((item: any) => ({
        id: item.id,
        user_id: item.user_id || '',
        title: item.title,
        missions: item.missions || [],
        hard_skills: item.hard_skills || [],
        soft_skills: item.soft_skills || [],
        project_context: item.project_context,
        location: item.location,
        constraints: item.constraints || [],
        conversation_data: item.conversation_data,
        brief_summary: item.brief_summary,
        is_complete: item.is_complete || false,
        generated_job_posting_id: item.generated_job_posting_id,
        created_at: item.created_at || new Date().toISOString(),
        updated_at: item.updated_at || new Date().toISOString()
      }));

      console.log('Transformed briefs:', transformedData);
      setBriefs(transformedData);
    } catch (error) {
      console.error('Error fetching briefs:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les briefs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveBrief = async (briefData: Partial<AIBrief>) => {
    if (!user) return null;

    try {
      console.log('Saving brief:', briefData);
      
      const dataToInsert = {
        user_id: user.id,
        title: briefData.title,
        missions: briefData.missions || [],
        hard_skills: briefData.hard_skills || [],
        soft_skills: briefData.soft_skills || [],
        project_context: briefData.project_context,
        location: briefData.location,
        constraints: briefData.constraints || [],
        conversation_data: briefData.conversation_data,
        brief_summary: briefData.brief_summary,
        is_complete: briefData.is_complete || false,
        generated_job_posting_id: briefData.generated_job_posting_id
      };

      let result;
      if (briefData.id) {
        // Update existing brief
        const { data, error } = await supabase
          .from('ai_briefs')
          .update(dataToInsert)
          .eq('id', briefData.id)
          .eq('user_id', user.id)
          .select()
          .single();
        
        if (error) throw error;
        result = data;
      } else {
        // Insert new brief
        const { data, error } = await supabase
          .from('ai_briefs')
          .insert(dataToInsert)
          .select()
          .single();
        
        if (error) throw error;
        result = data;
      }

      await fetchBriefs();
      
      toast({
        title: "Succès",
        description: "Brief sauvegardé avec succès"
      });

      return result;
    } catch (error) {
      console.error('Error saving brief:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le brief",
        variant: "destructive"
      });
      return null;
    }
  };

  const deleteBrief = async (briefId: string) => {
    if (!user) return;

    try {
      console.log('Deleting brief:', briefId);
      
      const { error } = await supabase
        .from('ai_briefs')
        .delete()
        .eq('id', briefId)
        .eq('user_id', user.id);

      if (error) throw error;

      await fetchBriefs();
      
      toast({
        title: "Succès",
        description: "Brief supprimé avec succès"
      });
    } catch (error) {
      console.error('Error deleting brief:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le brief",
        variant: "destructive"
      });
    }
  };

  const generateJobPosting = async (briefId: string) => {
    if (!user) return null;

    try {
      const brief = briefs.find(b => b.id === briefId);
      if (!brief) throw new Error('Brief not found');

      const jobPostingData = {
        user_id: user.id,
        title: brief.title || 'Nouveau poste',
        description: brief.project_context || '',
        requirements: [...brief.hard_skills, ...brief.soft_skills],
        missions: brief.missions,
        hard_skills: brief.hard_skills,
        soft_skills: brief.soft_skills,
        location: brief.location || '',
        source_brief_id: briefId
      };

      const { data, error } = await supabase
        .from('job_offers_drafts')
        .insert(jobPostingData)
        .select()
        .single();

      if (error) throw error;

      // Update brief with generated job posting ID
      await supabase
        .from('ai_briefs')
        .update({ generated_job_posting_id: data.id })
        .eq('id', briefId);

      await fetchBriefs();

      toast({
        title: "Succès",
        description: "Fiche de poste générée avec succès"
      });

      return data;
    } catch (error) {
      console.error('Error generating job posting:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer la fiche de poste",
        variant: "destructive"
      });
      return null;
    }
  };

  useEffect(() => {
    fetchBriefs();
  }, [user]);

  return {
    briefs,
    loading,
    saveBrief,
    deleteBrief,
    generateJobPosting,
    refetch: fetchBriefs
  };
};
