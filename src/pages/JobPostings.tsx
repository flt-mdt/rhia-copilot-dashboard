
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Briefcase, ChevronDown, Calendar, User, Plus } from 'lucide-react';
import { useJobPostings, useUpdateJobPosting, useDeleteJobPosting } from '@/hooks/useJobPostings';
import JobStatusDropdown from '@/components/job/JobStatusDropdown';
import JobActionsDropdown from '@/components/job/JobActionsDropdown';
import { useLanguage } from '@/contexts/LanguageContext';

const JobPostings = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { data: jobs = [], isLoading, error } = useJobPostings();
  const updateJobMutation = useUpdateJobPosting();
  const deleteJobMutation = useDeleteJobPosting();
  
  const handleJobClick = (jobId: string) => {
    navigate(`/job-postings/${jobId}`);
  };
  
  const handleCreateJob = () => {
    navigate('/job-postings/create');
  };

  const handleStatusChange = (jobId: string, isActive: boolean) => {
    updateJobMutation.mutate({ 
      id: jobId, 
      updates: { is_active: isActive } 
    });
  };

  const handleDeleteJob = (jobId: string) => {
    if (window.confirm(t('jobs.deleteConfirm'))) {
      deleteJobMutation.mutate(jobId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  if (isLoading) {
    return (
      <div className="ml-64 p-8 bg-[#F9FAFB]">
        <Header title={t('jobs.title')} />
        <div className="bg-white rounded-lg p-6 border border-gray-100">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ml-64 p-8 bg-[#F9FAFB]">
        <Header title={t('jobs.title')} />
        <div className="bg-white rounded-lg p-6 border border-gray-100">
          <div className="text-center text-red-600">
            Erreur lors du chargement des offres d'emploi
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-64 p-8 bg-[#F9FAFB]">
      <Header title={t('jobs.title')} />
      
      <div className="bg-white rounded-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">{t('jobs.allJobs')}</h2>
          <Button className="bg-primary text-white" onClick={handleCreateJob}>
            <Plus className="mr-2 h-4 w-4 bg-white text-primary rounded-full p-[2px]" />
            {t('jobs.addNew')}
          </Button>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {t('jobs.noJobs')}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-100">
                <TableHead className="text-gray-500 font-medium">{t('jobs.position')}</TableHead>
                <TableHead className="text-gray-500 font-medium">{t('jobs.department')}</TableHead>
                <TableHead className="text-gray-500 font-medium">{t('jobs.candidates')}</TableHead>
                <TableHead className="text-gray-500 font-medium">{t('jobs.posted')}</TableHead>
                <TableHead className="text-gray-500 font-medium">{t('jobs.status')}</TableHead>
                <TableHead className="text-gray-500 font-medium">{t('jobs.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <React.Fragment key={job.id}>
                  <TableRow 
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleJobClick(job.id)}
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-md mr-3">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{job.title}</div>
                          <div className="text-sm text-gray-500">{job.location || t('jobs.notSpecified')}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">{job.department || t('jobs.notSpecified')}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-gray-700">
                        <User className="h-4 w-4 mr-1 text-gray-500" /> 
                        0 {/* TODO: Count from job_applications table */}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-gray-700">
                        <Calendar className="h-4 w-4 mr-1 text-gray-500" /> 
                        {job.created_at ? formatDate(job.created_at) : 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <JobStatusDropdown 
                        currentStatus={job.is_active ?? true}
                        onStatusChange={(isActive) => handleStatusChange(job.id, isActive)}
                      />
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <JobActionsDropdown
                        onEdit={() => navigate(`/job-postings/${job.id}/edit`)}
                        onDelete={() => handleDeleteJob(job.id)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-b border-gray-100">
                    <TableCell colSpan={6} className="text-center py-2">
                      <Button 
                        variant="ghost" 
                        className="text-gray-500 text-sm"
                        onClick={() => handleJobClick(job.id)}
                      >
                        {t('jobs.showMore')} <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default JobPostings;
