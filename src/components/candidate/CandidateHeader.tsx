
import { CheckCircle, AlertCircle, Clock, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CandidateStatus } from "@/types/candidate";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface CandidateHeaderProps {
  name: string;
  targetJob: string;
  score: number;
  status: CandidateStatus;
  aiStatus: "analyzed" | "error" | "pending";
  lastUpdated: string;
  onCopyLink: () => void;
}

const statusLabels: Record<CandidateStatus, string> = {
  to_analyze: "À analyser",
  in_review: "En cours d'analyse",
  contacted: "Contacté",
  interview_scheduled: "Entretien planifié",
  offer_sent: "Offre envoyée",
  hired: "Recruté",
  rejected: "Refusé"
};

const statusToColorMap: Record<CandidateStatus, string> = {
  to_analyze: "bg-blue-100 text-blue-800",
  in_review: "bg-yellow-100 text-yellow-800",
  contacted: "bg-purple-100 text-purple-800",
  interview_scheduled: "bg-indigo-100 text-indigo-800",
  offer_sent: "bg-emerald-100 text-emerald-800",
  hired: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800"
};

const aiStatusIcons = {
  analyzed: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  pending: <Clock className="h-5 w-5 text-yellow-500" />
};

const aiStatusLabels = {
  analyzed: "Analysé par IA",
  error: "Erreur d'analyse",
  pending: "En attente d'analyse"
};

const CandidateHeader = ({
  name,
  targetJob,
  score,
  status,
  aiStatus,
  lastUpdated,
  onCopyLink
}: CandidateHeaderProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10B981"; // green
    if (score >= 60) return "#F59E0B"; // yellow/orange
    return "#EF4444"; // red
  };

  const formattedLastUpdated = formatDistanceToNow(new Date(lastUpdated), {
    addSuffix: true,
    locale: fr
  });

  // Mock data - en production, ces valeurs viendraient des props ou d'une API
  const averageScore = 79;
  const topScore = 85;

  const createCircularProgress = (percentage: number, color: string, size: number = 120) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f3f4f6"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-900">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">{name}</h1>
            <Button variant="ghost" size="icon" onClick={onCopyLink} className="h-7 w-7">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Copy className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copier le lien du profil</p>
                </TooltipContent>
              </Tooltip>
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {targetJob}
            </span>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${statusToColorMap[status]}`}>
              {statusLabels[status]}
            </span>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="inline-flex items-center gap-1 text-xs font-medium text-gray-600">
                  {aiStatusIcons[aiStatus]}
                  <span>{aiStatusLabels[aiStatus]}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {aiStatus === "analyzed" ? "Profil analysé par notre IA" : 
                   aiStatus === "error" ? "Une erreur est survenue lors de l'analyse" :
                   "L'analyse du profil est en cours"}
                </p>
              </TooltipContent>
            </Tooltip>
            
            <span className="text-xs text-gray-500 ml-2">
              Mis à jour {formattedLastUpdated}
            </span>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center">
                {createCircularProgress(score, getScoreColor(score))}
                
                {/* Statistics en dessous */}
                <div className="flex items-center gap-8 mt-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <span>Average</span>
                    <span className="text-gray-400">↑</span>
                    <span className="font-medium text-gray-700">{averageScore}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Top Score</span>
                    <span className="text-gray-400">↑</span>
                    <span className="font-medium text-gray-700">{topScore}</span>
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Score de matching IA</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CandidateHeader;
