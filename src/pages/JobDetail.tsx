
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, Calendar, Eye, Edit2, Copy, MoreVertical, Trash2, 
  MapPin, BriefcaseBusiness 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

interface Job {
  id: number;
  title: string;
  location: string;
  department: string;
  salary: string;
  type: string;
  postedDate: string;
  candidates: number;
  analyzedCandidates: number;
  averageScore: number;
  status: 'Active' | 'Draft';
}

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to get job details
    const fetchJobDetail = () => {
      setLoading(true);
      // This would be replaced with a real API call
      setTimeout(() => {
        // Mock data
        const jobData: Job = {
          id: Number(jobId),
          title: "Développeur Full Stack",
          location: "Paris",
          department: "Engineering",
          salary: "45k-55k",
          type: "CDI",
          postedDate: "12 juin 2025",
          candidates: 12,
          analyzedCandidates: 10,
          averageScore: 82,
          status: "Active"
        };
        
        setJob(jobData);
        setLoading(false);
      }, 500);
    };

    fetchJobDetail();
  }, [jobId]);

  const handleViewCandidates = () => {
    // This would navigate to a candidates page filtered by this job
    navigate(`/candidates?job=${jobId}`);
  };

  const handleEdit = () => {
    toast({
      title: "Action en cours",
      description: "Ouverture du formulaire de modification",
    });
    // This would open an edit form
  };

  const handleDuplicate = () => {
    toast({
      title: "Offre dupliquée",
      description: "Une copie de cette offre a été créée",
    });
    // This would duplicate the job posting
  };

  const handleDelete = () => {
    toast({
      title: "Supprimer cette offre?",
      description: "Cette action est irréversible",
      variant: "destructive",
    });
    // This would show a confirmation dialog
  };

  if (loading) {
    return (
      <div className="ml-64 p-8 bg-[#F9FAFB] min-h-screen">
        <Header title="Détail de l'offre" />
        <div className="flex justify-center items-center h-64">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="ml-64 p-8 bg-[#F9FAFB] min-h-screen">
        <Header title="Détail de l'offre" />
        <div className="flex justify-center items-center h-64">
          <p>Offre non trouvée</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-64 p-8 bg-[#F9FAFB] min-h-screen">
      <Header title="Mes Offres d'emploi" />
      
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate('/job-postings')}
      >
        &larr; Retour aux offres
      </Button>
      
      <Card className="bg-white rounded-xl shadow-sm p-6">
        <div className="space-y-6">
          {/* Job Title and Actions */}
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDuplicate}>
                  <Copy className="mr-2 h-4 w-4" />
                  Dupliquer
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Job Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>Lieu : <span className="font-medium">{job.location}</span></span>
              <span className="text-gray-500">&mdash;</span>
              <span>Salaire : <span className="font-medium">{job.salary}</span></span>
            </div>
            
            <div className="flex items-center gap-2">
              <BriefcaseBusiness className="h-4 w-4 text-gray-500" />
              <span>Type : </span>
              <Badge variant="outline" className="bg-gray-100 text-gray-700">
                {job.type}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>Date de publication: <span className="font-medium">{job.postedDate}</span></span>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span>Candidatures: </span>
              <Badge className="bg-blue-100 text-blue-800">
                {job.candidates}
              </Badge>
            </div>
          </div>
          
          {/* Candidates Analysis */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {job.analyzedCandidates}/{job.candidates} analysées
              </span>
              <span className="text-xs text-gray-400">{Math.round((job.analyzedCandidates / job.candidates) * 100)}%</span>
            </div>
            <Progress 
              value={(job.analyzedCandidates / job.candidates) * 100} 
              className="h-2"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Moyenne score : </span>
            <Badge className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              {job.averageScore}%
            </Badge>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button 
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleViewCandidates}
            >
              <Eye className="mr-2 h-4 w-4" />
              Voir les candidats
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleEdit}
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Modifier
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleDuplicate}
            >
              <Copy className="mr-2 h-4 w-4" />
              Dupliquer
            </Button>
            
            <Button 
              variant="outline"
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobDetail;
