
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AIBrief {
  id: string;
  title: string | null;
  project_context: string | null;
  location: string | null;
  hardSkills: string[];
  hard_skills: string[] | null;
  soft_skills: string[] | null;
  missions: string[] | null;
  constraints: string[] | null;
  is_complete: boolean | null;
  created_at: string;
  updated_at: string;
  conversation_data: any;
  brief_summary: any;
}

export const useAIBriefs = () => {
  const [briefs, setBriefs] = useState<AIBrief[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchBriefs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_briefs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur lors du chargement des briefs:', error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les briefs IA.",
          variant: "destructive",
        });
        return;
      }

      // Mapper les données pour la compatibilité
      const mappedBriefs = (data || []).map(brief => ({
        ...brief,
        hardSkills: brief.hard_skills || [],
        // Correction: accès sécurisé à brief_summary
        project_context: brief.brief_summary && 
                        typeof brief.brief_summary === 'object' && 
                        brief.brief_summary !== null &&
                        'project_context' in brief.brief_summary 
                        ? (brief.brief_summary as any).project_context 
                        : null
      }));

      setBriefs(mappedBriefs);
    } catch (error) {
      console.error('Erreur lors du chargement des briefs:', error);
      toast({
        title: "Erreur de chargement",
        description: "Une erreur est survenue lors du chargement des briefs.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchBrief = async (briefId: string): Promise<AIBrief | null> => {
    try {
      const { data, error } = await supabase
        .from('ai_briefs')
        .select('*')
        .eq('id', briefId)
        .maybeSingle();

      if (error) {
        console.error('Erreur lors du chargement du brief:', error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger le brief.",
          variant: "destructive",
        });
        return null;
      }

      if (!data) return null;

      // Mapper les données pour la compatibilité
      return {
        ...data,
        hardSkills: data.hard_skills || [],
        project_context: data.brief_summary && 
                        typeof data.brief_summary === 'object' && 
                        data.brief_summary !== null &&
                        'project_context' in data.brief_summary 
                        ? (data.brief_summary as any).project_context 
                        : null
      };
    } catch (error) {
      console.error('Erreur lors du chargement du brief:', error);
      toast({
        title: "Erreur de chargement",
        description: "Une erreur est survenue lors du chargement du brief.",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteBrief = async (briefId: string) => {
    try {
      const { error } = await supabase
        .from('ai_briefs')
        .delete()
        .eq('id', briefId);

      if (error) {
        console.error('Erreur lors de la suppression du brief:', error);
        toast({
          title: "Erreur de suppression",
          description: "Impossible de supprimer le brief.",
          variant: "destructive",
        });
        return;
      }

      // Mettre à jour l'état local
      setBriefs(prev => prev.filter(brief => brief.id !== briefId));
      
      toast({
        title: "Brief supprimé",
        description: "Le brief a été supprimé avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du brief:', error);
      toast({
        title: "Erreur de suppression",
        description: "Une erreur est survenue lors de la suppression.",
        variant: "destructive",
      });
    }
  };

  const refreshBriefs = () => {
    fetchBriefs();
  };

  useEffect(() => {
    fetchBriefs();

    // Écouter les changements en temps réel
    const subscription = supabase
      .channel('ai_briefs_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'ai_briefs' 
        }, 
        () => {
          // Rafraîchir les données quand il y a un changement
          fetchBriefs();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    briefs,
    loading,
    fetchBrief,
    deleteBrief,
    refreshBriefs
  };
};
