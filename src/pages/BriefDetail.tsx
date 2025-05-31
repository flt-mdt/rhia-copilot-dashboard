
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAIBriefs } from '@/hooks/useAIBriefs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, MapPin, CheckCircle, Clock, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const BriefDetail = () => {
  const { briefId } = useParams();
  const navigate = useNavigate();
  const { briefs, loading } = useAIBriefs();

  const brief = briefs.find(b => b.id === briefId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 ml-64">
        <div className="p-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!brief) {
    return (
      <div className="min-h-screen bg-gray-50 ml-64">
        <div className="p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Brief non trouvé</h1>
            <Button onClick={() => navigate('/collection')}>
              Retour aux collections
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = format(new Date(brief.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr });

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/collection')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux collections
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {brief.title || 'Brief sans titre'}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedDate}</span>
                </div>
                {brief.is_complete ? (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Terminé
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    <Clock className="h-3 w-3 mr-1" />
                    En cours
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contexte du projet */}
            {brief.project_context && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Contexte du projet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-wrap">{brief.project_context}</p>
                </CardContent>
              </Card>
            )}

            {/* Missions */}
            {brief.missions && brief.missions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Missions principales</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {brief.missions.map((mission, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{mission}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Contraintes */}
            {brief.constraints && brief.constraints.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Contraintes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {brief.constraints.map((constraint, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{constraint}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Localisation */}
            {brief.location && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Localisation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{brief.location}</p>
                </CardContent>
              </Card>
            )}

            {/* Hard Skills */}
            {brief.hard_skills && brief.hard_skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Hard Skills requises</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {brief.hard_skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Soft Skills */}
            {brief.soft_skills && brief.soft_skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Soft Skills attendues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {brief.soft_skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" onClick={() => navigate('/brief')}>
                  Modifier le brief
                </Button>
                {brief.generated_job_posting_id && (
                  <Button variant="outline" className="w-full">
                    Voir la fiche de poste générée
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BriefDetail;
