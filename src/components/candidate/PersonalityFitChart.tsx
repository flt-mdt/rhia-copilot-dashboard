
import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { PersonalityTrait } from "@/types/candidate";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface PersonalityFitChartProps {
  traits: PersonalityTrait[];
}

const PersonalityFitChart = ({ traits }: PersonalityFitChartProps) => {
  const [displayMode, setDisplayMode] = useState<"candidate" | "comparison">("candidate");

  const getBarColor = (value: number) => {
    if (value >= 8) return "bg-green-500";
    if (value >= 6) return "bg-blue-500";
    if (value >= 4) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getMatchLabel = (candidateScore: number, companyFit: number) => {
    const diff = Math.abs(candidateScore - companyFit);
    
    if (diff <= 1) return "Très bon match";
    if (diff <= 2) return "Bon match";
    if (diff <= 3) return "Match acceptable";
    return "Écart significatif";
  };

  const getMatchColor = (candidateScore: number, companyFit: number) => {
    const diff = Math.abs(candidateScore - companyFit);
    
    if (diff <= 1) return "text-green-600";
    if (diff <= 2) return "text-blue-600";
    if (diff <= 3) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <ToggleGroup type="single" value={displayMode} onValueChange={(value) => value && setDisplayMode(value as "candidate" | "comparison")}>
          <ToggleGroupItem value="candidate" aria-label="Candidat uniquement">
            Profil candidat
          </ToggleGroupItem>
          <ToggleGroupItem value="comparison" aria-label="Comparaison avec l'entreprise">
            Comparaison
          </ToggleGroupItem>
        </ToggleGroup>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </TooltipTrigger>
          <TooltipContent className="w-80">
            <p>
              Cette analyse mesure l'adéquation entre la personnalité du candidat et la culture de l'entreprise.
              Chaque trait est évalué sur une échelle de 1 à 10 et comparé aux besoins de l'équipe.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="space-y-5">
        {traits.map((trait) => (
          <div key={trait.name} className="space-y-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">{trait.name}</span>
              {displayMode === "comparison" && (
                <span className={`text-xs font-medium ${getMatchColor(trait.score, trait.companyFit)}`}>
                  {getMatchLabel(trait.score, trait.companyFit)}
                </span>
              )}
            </div>
            
            <div className="relative h-8 bg-gray-100 rounded overflow-hidden">
              {/* Candidate score */}
              <div
                className={`absolute top-0 left-0 h-full ${getBarColor(trait.score)}`}
                style={{ width: `${trait.score * 10}%` }}
              />
              
              {/* Company fit indicator (in comparison mode) */}
              {displayMode === "comparison" && (
                <div 
                  className="absolute top-0 h-full border-l-2 border-gray-800"
                  style={{ left: `${trait.companyFit * 10}%` }}
                >
                  <div className="absolute -left-1.5 top-0 w-3 h-3 bg-white border-2 border-gray-800 rounded-full" />
                </div>
              )}
              
              {/* Score number */}
              <div className={`absolute top-0 left-0 h-full w-full flex items-center ${trait.score > 5 ? "justify-end pr-2" : "pl-2"}`}>
                <span className={`text-xs font-bold ${trait.score > 5 ? "text-white" : "text-gray-800"}`}>
                  {trait.score}/10
                </span>
              </div>
            </div>
            
            {/* Legend for comparison mode */}
            {displayMode === "comparison" && (
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Candidat: {trait.score}/10</span>
                <span>Entreprise: {trait.companyFit}/10</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalityFitChart;
