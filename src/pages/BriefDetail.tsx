import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAIBriefs } from "@/hooks/useAIBriefs";
import { useToast } from "@/hooks/use-toast";
import BriefSummary from "@/components/brief/BriefSummary";
import { Button } from "@/components/ui/button";

const BriefDetail = () => {
  const { briefId } = useParams<{ briefId: string }>();
  const { fetchBrief, deleteBrief } = useAIBriefs();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [brief, setBrief] = useState<any>(null);

  useEffect(() => {
    const loadBrief = async () => {
      if (!briefId) return;
      setLoading(true);
      const b = await fetchBrief(briefId);
      if (b) {
        setBrief(b);
      } else {
        toast({ title: "Erreur", description: "Brief introuvable", variant: "destructive" });
        navigate("/briefs"); // ou la page liste
      }
      setLoading(false);
    };
    loadBrief();
    // eslint-disable-next-line
  }, [briefId]);

  const handleDelete = async () => {
    if (!briefId) return;
    await deleteBrief(briefId);
    navigate("/briefs");
  };

  if (loading) return <div className="p-6">Chargement…</div>;
  if (!brief) return null;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">{brief.title}</h1>
      <div className="mb-4 text-sm text-gray-500">Créé le : {new Date(brief.created_at).toLocaleString()}</div>
      <BriefSummary briefData={{
        missions: brief.missions,
        hardSkills: brief.hardSkills,
        softSkills: brief.softSkills,
        context: brief.project_context,
        location: brief.location,
        constraints: brief.constraints
      }} />
      <div className="flex mt-6 gap-2">
        <Button onClick={handleDelete} variant="destructive">Supprimer</Button>
        <Button onClick={() => navigate(`/brief/${brief.id}/edit`)} variant="outline">Éditer</Button>
      </div>
    </div>
  );
};

export default BriefDetail;
