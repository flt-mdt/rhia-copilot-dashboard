
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, CheckCircle, Trash2 } from 'lucide-react';
import { AIBrief } from '@/hooks/useAIBriefs';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface BriefCollectionCardProps {
  brief: AIBrief;
  viewMode: 'grid' | 'list';
  onDelete?: (id: string) => void;
}

const BriefCollectionCard: React.FC<BriefCollectionCardProps> = ({ 
  brief, 
  viewMode, 
  onDelete 
}) => {
  const navigate = useNavigate();
  const formattedDate = format(new Date(brief.created_at), 'dd MMM yyyy', { locale: fr });

  const handleViewBrief = () => {
    navigate(`/brief/${brief.id}`);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(brief.id);
    }
  };

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{brief.title || 'Brief sans titre'}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{formattedDate}</span>
                  {brief.is_complete && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Terminé
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={handleViewBrief}>
                Voir le brief
              </Button>
              {onDelete && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Supprimer le brief</AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr de vouloir supprimer ce brief ? Cette action est irréversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1">
            {brief.is_complete && (
              <Badge className="bg-green-100 text-green-800 text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                Terminé
              </Badge>
            )}
            {onDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 h-6 w-6 p-0">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Supprimer le brief</AlertDialogTitle>
                    <AlertDialogDescription>
                      Êtes-vous sûr de vouloir supprimer ce brief ? Cette action est irréversible.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                      Supprimer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
              )}
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {brief.title || 'Brief sans titre'}
        </h3>
        
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <Calendar className="h-3 w-3" />
          <span>{formattedDate}</span>
        </div>
        
        {brief.hard_skills && brief.hard_skills.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {brief.hard_skills.slice(0, 2).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                  {skill}
                </Badge>
              ))}
              {brief.hard_skills.length > 2 && (
                <Badge variant="outline" className="text-xs bg-gray-50">
                  +{brief.hard_skills.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {brief.project_context && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {brief.project_context}
          </p>
        )}
        
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full text-xs"
          onClick={handleViewBrief}
        >
          <FileText className="h-3 w-3 mr-1" />
          Voir le brief
        </Button>
      </CardContent>
    </Card>
  );
};

export default BriefCollectionCard;
