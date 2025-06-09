
import { useState, useEffect } from 'react';
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

const API_BASE = process.env.REACT_APP_API_BASE || 'https://hunter-backend-w5ju.onrender.com/api';

export const useAIBriefs = () => {
  const [briefs, setBriefs] = useState<AIBrief[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const getHeaders = () => {
    const token = user?.access_token;
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  };

  const fetchBriefs = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      console.log('Fetching briefs from API:', `${API_BASE}/brief`);
      
      const response = await fetch(`${API_BASE}/brief`, {
        method: 'GET',
        headers: getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched briefs data:', data);

      // Transform API response to match our interface
      const transformedData: AIBrief[] = (data || []).map((item: any) => ({
        id: item.id,
        user_id: item.user_id || '',
        title: item.titre || item.title,
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

  const fetchBrief = async (briefId: string): Promise<AIBrief | null> => {
    if (!user) return null;

    try {
      console.log('Fetching brief:', briefId);
      
      const response = await fetch(`${API_BASE}/brief/${briefId}`, {
        method: 'GET',
        headers: getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform single brief response
      const transformedBrief: AIBrief = {
        id: data.id,
        user_id: data.user_id || '',
        title: data.titre || data.title,
        missions: data.missions || [],
        hard_skills: data.hard_skills || [],
        soft_skills: data.soft_skills || [],
        project_context: data.project_context,
        location: data.location,
        constraints: data.constraints || [],
        conversation_data: data.conversation_data,
        brief_summary: data.brief_summary,
        is_complete: data.is_complete || false,
        generated_job_posting_id: data.generated_job_posting_id,
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString()
      };

      return transformedBrief;
    } catch (error) {
      console.error('Error fetching brief:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger le brief",
        variant: "destructive"
      });
      return null;
    }
  };

  const saveBrief = async (briefData: Partial<AIBrief>) => {
    if (!user) return null;

    try {
      console.log('Saving brief:', briefData);
      
      const payload = {
        titre: briefData.title,
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

      let response;
      if (briefData.id) {
        // Update existing brief
        response = await fetch(`${API_BASE}/brief/${briefData.id}`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(payload)
        });
      } else {
        // Create new brief
        response = await fetch(`${API_BASE}/brief`, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(payload)
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
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
      
      const response = await fetch(`${API_BASE}/brief/${briefId}`, {
        method: 'DELETE',
        headers: getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

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
      console.log('Generating job posting for brief:', briefId);
      
      const response = await fetch(`${API_BASE}/brief/${briefId}/generate`, {
        method: 'POST',
        headers: getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
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
    fetchBrief,
    refetch: fetchBriefs
  };
};
