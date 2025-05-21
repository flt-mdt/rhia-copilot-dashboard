
import { InfoCircle, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillMatch } from "@/types/candidate";

interface SkillsMatchingGridProps {
  skills: {
    hardSkills: SkillMatch[];
    softSkills: SkillMatch[];
    experience: SkillMatch[];
    education: SkillMatch[];
    languages: SkillMatch[];
  };
}

const SkillsMatchingGrid = ({ skills }: SkillsMatchingGridProps) => {
  const renderSkillTable = (skills: SkillMatch[], title: string) => (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              {title}
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-500 w-24">
              Niveau
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-500 w-24">
              Match
            </th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill, index) => (
            <tr 
              key={`${skill.name}-${index}`} 
              className={`${index !== skills.length - 1 ? 'border-b' : ''}`}
            >
              <td className="px-4 py-3 text-sm text-gray-900">
                {skill.name}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${skill.level * 10}%` }}
                    />
                  </div>
                  <span className="ml-2 text-xs font-medium text-gray-700">
                    {skill.level}/10
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-center">
                {skill.match ? (
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-100 text-yellow-800">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01" />
                    </svg>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Matching détaillé</CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent className="w-80">
              <p>
                L'analyse par compétences est basée sur le CV du candidat et les exigences du poste.
                Chaque compétence est notée de 1 à 10 et indique si elle correspond aux besoins du poste.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hardSkills" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="hardSkills">Hard Skills</TabsTrigger>
            <TabsTrigger value="softSkills">Soft Skills</TabsTrigger>
            <TabsTrigger value="experience">Expérience</TabsTrigger>
            <TabsTrigger value="education">Formation</TabsTrigger>
            <TabsTrigger value="languages">Langues</TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <TabsContent value="hardSkills">
              {renderSkillTable(skills.hardSkills, 'Hard Skills')}
            </TabsContent>
            <TabsContent value="softSkills">
              {renderSkillTable(skills.softSkills, 'Soft Skills')}
            </TabsContent>
            <TabsContent value="experience">
              {renderSkillTable(skills.experience, 'Expérience')}
            </TabsContent>
            <TabsContent value="education">
              {renderSkillTable(skills.education, 'Formation')}
            </TabsContent>
            <TabsContent value="languages">
              {renderSkillTable(skills.languages, 'Langues')}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SkillsMatchingGrid;
