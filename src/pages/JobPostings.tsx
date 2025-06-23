
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useJobPostings } from '@/hooks/useJobPostings';
import { Eye, Edit2, Copy, Trash2, MapPin, Calendar, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const JobPostings = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { data: jobs = [], isLoading } = useJobPostings();

  const handleAddNew = () => {
    navigate('/job-postings/create');
  };

  const handleViewJob = (jobId: string) => {
    navigate(`/job-postings/${jobId}`);
  };

  const handleEditJob = (jobId: string) => {
    navigate(`/job-postings/${jobId}/edit`);
  };

  const handleDuplicateJob = (jobId: string) => {
    navigate(`/job-postings/${jobId}/duplicate`);
  };

  if (isLoading) {
    return (
      <div className="transition-all duration-300 ease-in-out p-4 md:p-8 bg-[#F9FAFB] min-h-screen"
           style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
        <Header title={t('jobs.title')} />
        <div className="flex justify-center items-center h-64">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transition-all duration-300 ease-in-out p-4 md:p-8 bg-[#F9FAFB] min-h-screen"
         style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
      <Header title={t('jobs.title')} />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{t('jobs.allJobs')}</h2>
        <Button 
          onClick={handleAddNew}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {t('jobs.addNew')}
        </Button>
      </div>

      {jobs.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500 mb-4">{t('jobs.noJobs')}</p>
          <Button 
            onClick={handleAddNew}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {t('jobs.addNew')}
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 
                      className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                      onClick={() => handleViewJob(job.id)}
                    >
                      {job.title}
                    </h3>
                    <Badge variant="outline" className="bg-gray-100 text-gray-700">
                      {job.contract_type || t('jobs.notSpecified')}
                    </Badge>
                    {job.department && (
                      <Badge variant="outline" className="bg-blue-100 text-blue-700">
                        {job.department}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    {job.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{t('jobs.posted')}: {job.created_at ? new Date(job.created_at).toLocaleDateString('fr-FR') : 'N/A'}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>0 {t('jobs.candidates')}</span>
                    </div>
                  </div>
                  
                  {job.description && (
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {job.description}
                    </p>
                  )}
                  
                  {(job.salary_min || job.salary_max) && (
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">Salaire: </span>
                      {job.salary_min && job.salary_max 
                        ? `${job.salary_min}k - ${job.salary_max}k €`
                        : job.salary_min 
                        ? `À partir de ${job.salary_min}k €`
                        : `Jusqu'à ${job.salary_max}k €`
                      }
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewJob(job.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Voir
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        {t('jobs.actions')}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditJob(job.id)}>
                        <Edit2 className="mr-2 h-4 w-4" />
                        {t('jobs.editJob')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicateJob(job.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        {t('jobs.duplicateJob')}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPostings;
