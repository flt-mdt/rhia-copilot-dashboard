
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface EvaluationCriterion {
  id: string;
  criterion_id: string;
  criterion_name: string;
  description: string;
  weight: number;
}

export const useEvaluationCriteria = () => {
  const [criteria, setCriteria] = useState<EvaluationCriterion[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchCriteria = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('evaluation_criteria')
        .select('*')
        .eq('user_id', user.id)
        .order('criterion_id');

      if (error) throw error;

      setCriteria(data || []);
    } catch (error) {
      console.error('Error fetching criteria:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les critères d'évaluation",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveCriterion = async (criterion: Omit<EvaluationCriterion, 'id'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('evaluation_criteria')
        .upsert({
          user_id: user.id,
          criterion_id: criterion.criterion_id,
          criterion_name: criterion.criterion_name,
          description: criterion.description,
          weight: criterion.weight
        }, {
          onConflict: 'user_id,criterion_id'
        })
        .select();

      if (error) throw error;

      await fetchCriteria(); // Refresh the list
      
      toast({
        title: "Succès",
        description: "Critère d'évaluation sauvegardé"
      });
    } catch (error) {
      console.error('Error saving criterion:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le critère",
        variant: "destructive"
      });
    }
  };

  const saveAllCriteria = async (criteriaToSave: Omit<EvaluationCriterion, 'id'>[]) => {
    if (!user) return;

    try {
      const criteriaWithUserId = criteriaToSave.map(criterion => ({
        user_id: user.id,
        criterion_id: criterion.criterion_id,
        criterion_name: criterion.criterion_name,
        description: criterion.description,
        weight: criterion.weight
      }));

      const { error } = await supabase
        .from('evaluation_criteria')
        .upsert(criteriaWithUserId, {
          onConflict: 'user_id,criterion_id'
        });

      if (error) throw error;

      await fetchCriteria(); // Refresh the list
      
      toast({
        title: "Succès",
        description: "Critères d'évaluation sauvegardés"
      });
    } catch (error) {
      console.error('Error saving criteria:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les critères",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchCriteria();
  }, [user]);

  return {
    criteria,
    loading,
    saveCriterion,
    saveAllCriteria,
    refetch: fetchCriteria
  };
};
