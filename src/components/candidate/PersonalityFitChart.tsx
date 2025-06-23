
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

  const getGradientColors = (score: number) => {
    // Create a gradient from red to yellow to green based on score
    if (score <= 3) return "from-red-500 via-red-400 to-yellow-300";
    if (score <= 5) return "from-red-400 via-yellow-400 to-yellow-300";
    if (score <= 7) return "from-orange-400 via-yellow-300 to-green-300";
    return "from-yellow-300 via-green-400 to-green-500";
  };

  const getScoreColor = (score: number) => {
    if (score <= 3) return "text-red-600";
    if (score <= 5) return "text-orange-600";
    if (score <= 7) return "text-yellow-600";
    return "text-green-600";
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
      <div className="flex items-center justify-between mb-6">
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

      <div className="space-y-8">
        {traits.map((trait) => (
          <div key={trait.name} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-base font-medium text-gray-900">{trait.name}</span>
              <div className="flex items-center gap-4">
                {displayMode === "comparison" && (
                  <span className={`text-sm font-medium ${getMatchColor(trait.score, trait.companyFit)}`}>
                    {getMatchLabel(trait.score, trait.companyFit)}
                  </span>
                )}
                <span className={`text-xl font-bold ${getScoreColor(trait.score)}`}>
                  {trait.score.toFixed(1)}
                </span>
              </div>
            </div>
            
            <div className="relative">
              {/* Full width gradient bar */}
              <div className={`h-6 w-full bg-gradient-to-r ${getGradientColors(trait.score)} rounded-lg`}>
                {/* Score indicator triangle */}
                <div 
                  className="absolute top-0 h-6 flex items-center justify-center"
                  style={{ left: `${Math.min(Math.max(trait.score * 10, 2), 98)}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-gray-800"></div>
                </div>
                
                {/* Company fit indicator (in comparison mode) */}
                {displayMode === "comparison" && (
                  <div 
                    className="absolute top-0 h-6 flex items-center justify-center"
                    style={{ left: `${Math.min(Math.max(trait.companyFit * 10, 2), 98)}%`, transform: 'translateX(-50%)' }}
                  >
                    <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-white shadow-lg"></div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Legend for comparison mode */}
            {displayMode === "comparison" && (
              <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-gray-800"></div>
                  <span>Candidat: {trait.score.toFixed(1)}/10</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-gray-400"></div>
                  <span>Entreprise: {trait.companyFit.toFixed(1)}/10</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalityFitChart;
