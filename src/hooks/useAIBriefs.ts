import { useState, useEffect } from "react";
import { briefApi } from "@/api/index"; // Updated import
import { briefApi } from "@/api/api"; // Updated import
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Types stricts pour une correspondance totale front/back
export interface AIBrief {
  id: string;
  user_id: string;
  title: string | null;
  missions: string[];
  hardSkills: string[];
  softSkills: string[];
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

type BackendBrief = {
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
};

function adaptBriefFromBackend(b: BackendBrief): AIBrief {
  return {
    id: b.id,
    user_id: b.user_id,
    title: b.title,
    missions: b.missions ?? [],
    hardSkills: b.hard_skills ?? [],
    softSkills: b.soft_skills ?? [],
    project_context: b.project_context ?? "",
    location: b.location ?? "",
    constraints: b.constraints ?? [],
    conversation_data: b.conversation_data ?? [],
    brief_summary: b.brief_summary ?? {},
    is_complete: b.is_complete ?? false,
    generated_job_posting_id: b.generated_job_posting_id,
    created_at: b.created_at ?? new Date().toISOString(),
    updated_at: b.updated_at ?? new Date().toISOString()
  };
}

function adaptBriefToBackend(b: Partial<AIBrief>) {
  return {
    title: b.title,
    missions: b.missions,
    hard_skills: b.hardSkills,
    soft_skills: b.softSkills,
    project_context: b.project_context,
    location: b.location,
    constraints: b.constraints,
    conversation_data: b.conversation_data,
    brief_summary: b.brief_summary,
    is_complete: b.is_complete,
    generated_job_posting_id: b.generated_job_posting_id
  };
}

export const useAIBriefs = () => {
  const [briefs, setBriefs] = useState<AIBrief[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Chargement de tous les briefs
  const fetchBriefs = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await briefApi.get<BackendBrief[]>("/brief/");
      setBriefs(res.data.map(adaptBriefFromBackend));
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les briefs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Chargement d'un brief par ID (utile pour page détail, édition)
  const fetchBrief = async (briefId: string) => {
    if (!user) return null;
    try {
      const res = await briefApi.get<BackendBrief>(`/brief/${briefId}`);
      return adaptBriefFromBackend(res.data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger ce brief",
        variant: "destructive"
      });
      return null;
    }
  };

  // Création ou update d'un brief (POST ou PATCH selon présence d'id)
  const saveBrief = async (briefData: Partial<AIBrief>) => {
    if (!user) return null;
    try {
      let res;
      if (briefData.id) {
        res = await briefApi.patch<BackendBrief>(
          `/brief/${briefData.id}`,
          adaptBriefToBackend(briefData)
        );
      } else {
        res = await briefApi.post<BackendBrief>(
          `/brief`,
          adaptBriefToBackend(briefData)
        );
      }
      await fetchBriefs();
      toast({
        title: "Succès",
        description: "Brief sauvegardé avec succès"
      });
      return adaptBriefFromBackend(res.data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le brief",
        variant: "destructive"
      });
      return null;
    }
  };

  // Suppression d'un brief
  const deleteBrief = async (briefId: string) => {
    if (!user) return;
    try {
      await briefApi.delete(`/brief/${briefId}`);
      await fetchBriefs();
      toast({
        title: "Succès",
        description: "Brief supprimé avec succès"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le brief",
        variant: "destructive"
      });
    }
  };

  // Génération de la fiche de poste à partir d'un brief
  const generateJobPosting = async (briefId: string) => {
    if (!user) return null;
    try {
      const res = await briefApi.post(`/brief/${briefId}/generate`);
      await fetchBriefs();
      toast({
        title: "Succès",
        description: "Fiche de poste générée avec succès"
      });
      return res.data;
    } catch (error) {
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
    // eslint-disable-next-line
  }, [user?.id]);

  return {
    briefs,
    loading,
    fetchBriefs,
    fetchBrief,
    saveBrief,
    deleteBrief,
    generateJobPosting,
    refetch: fetchBriefs
  };
};
