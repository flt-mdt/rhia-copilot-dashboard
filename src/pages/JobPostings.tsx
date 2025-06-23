
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
      <div className="transition-all duration-300 ease-in-out p-4 sm:p-6 lg:p-8 bg-[#F9FAFB] min-h-screen"
           style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
        <Header title={t('jobs.title')} />
        <div className="flex justify-center items-center h-32 sm:h-48 lg:h-64">
          <p className="text-sm sm:text-base">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transition-all duration-300 ease-in-out p-4 sm:p-6 lg:p-8 bg-[#F9FAFB] min-h-screen"
         style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
      <Header title={t('jobs.title')} />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">{t('jobs.allJobs')}</h2>
        <Button 
          onClick={handleAddNew}
          className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base"
        >
          <span className="sm:hidden">Créer</span>
          <span className="hidden sm:inline">{t('jobs.addNew')}</span>
        </Button>
      </div>

      {jobs.length === 0 ? (
        <Card className="p-6 sm:p-8 text-center">
          <p className="text-gray-500 mb-4 text-sm sm:text-base">{t('jobs.noJobs')}</p>
          <Button 
            onClick={handleAddNew}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 py-2 text-sm sm:text-base"
          >
            {t('jobs.addNew')}
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 sm:gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="p-4 sm:p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                    <h3 
                      className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 cursor-pointer hover:text-blue-600 line-clamp-2"
                      onClick={() => handleViewJob(job.id)}
                    >
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-gray-100 text-gray-700 text-xs sm:text-sm px-2 py-1">
                        {job.contract_type || t('jobs.notSpecified')}
                      </Badge>
                      {job.department && (
                        <Badge variant="outline" className="bg-blue-100 text-blue-700 text-xs sm:text-sm px-2 py-1">
                          {job.department}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3">
                    {job.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="truncate">
                        <span className="hidden sm:inline">{t('jobs.posted')}: </span>
                        {job.created_at ? new Date(job.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>0 {t('jobs.candidates')}</span>
                    </div>
                  </div>
                  
                  {job.description && (
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 mb-3">
                      {job.description}
                    </p>
                  )}
                  
                  {(job.salary_min || job.salary_max) && (
                    <div className="text-xs sm:text-sm text-gray-700">
                      <span className="font-medium">Salaire: </span>
                      <span className="break-words">
                        {job.salary_min && job.salary_max 
                          ? `${job.salary_min}k - ${job.salary_max}k €`
                          : job.salary_min 
                          ? `À partir de ${job.salary_min}k €`
                          : `Jusqu'à ${job.salary_max}k €`
                        }
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-row lg:flex-col xl:flex-row items-center gap-2 w-full lg:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewJob(job.id)}
                    className="flex-1 lg:flex-none text-xs sm:text-sm px-3 py-2"
                  >
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                    <span className="hidden sm:inline">Voir</span>
                    <span className="sm:hidden">Voir</span>
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 lg:flex-none text-xs sm:text-sm px-3 py-2"
                      >
                        <span className="hidden sm:inline">{t('jobs.actions')}</span>
                        <span className="sm:hidden">•••</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleEditJob(job.id)}>
                        <Edit2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">{t('jobs.editJob')}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicateJob(job.id)}>
                        <Copy className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">{t('jobs.duplicateJob')}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">Supprimer</span>
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
