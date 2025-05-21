
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CandidateSummaryProps {
  aiSummary: string;
  hrComment: string;
  processedDate: string;
  onCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSaveComment: () => void;
}

const CandidateSummary = ({
  aiSummary,
  hrComment,
  processedDate,
  onCommentChange,
  onSaveComment
}: CandidateSummaryProps) => {
  const formattedProcessedDate = format(new Date(processedDate), 'dd MMMM yyyy', { locale: fr });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Résumé</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Analyse IA
              <span className="text-xs text-gray-400 ml-2">
                (Traité le {formattedProcessedDate})
              </span>
            </h3>
            <p className="text-sm text-gray-700 whitespace-pre-line">{aiSummary}</p>
          </div>
          
          <div className="pt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Commentaire RH</h3>
            <Textarea
              placeholder="Ajoutez vos commentaires sur ce candidat..."
              className="min-h-[120px] text-sm"
              value={hrComment}
              onChange={onCommentChange}
            />
            <div className="flex justify-end mt-2">
              <Button size="sm" onClick={onSaveComment}>
                <Save className="h-4 w-4 mr-1" />
                Enregistrer
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateSummary;
