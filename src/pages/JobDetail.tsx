
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
import { useLanguage } from '@/contexts/LanguageContext';
import { Progress } from '@/components/ui/progress';
import { useJobPosting, useDeleteJobPosting } from '@/hooks/useJobPostings';
import { useCandidates } from '@/hooks/useCandidatesData';
import DeleteJobDialog from '@/components/job/DeleteJobDialog';

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { data: job, isLoading } = useJobPosting(jobId!);
  const { data: candidates = [] } = useCandidates();
  const deleteJobMutation = useDeleteJobPosting();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Get candidates for this job
  const jobCandidates = candidates.filter(c => c.target_job_id === jobId);
  const candidatesCount = jobCandidates.length;
  const analyzedCandidates = jobCandidates.filter(c => c.ai_status === 'completed').length;
  const averageScore = jobCandidates.length > 0 
    ? Math.round(jobCandidates.reduce((sum, c) => sum + (c.ai_score || 0), 0) / jobCandidates.length)
    : 0;

  const handleViewCandidates = () => {
    navigate(`/candidates?job=${jobId}`);
  };

  const handleEdit = () => {
    navigate(`/job-postings/${jobId}/edit`);
  };

  const handleDuplicate = () => {
    navigate(`/job-postings/${jobId}/duplicate`);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteJobMutation.mutateAsync(jobId!);
      navigate('/job-postings');
    } catch (error) {
      console.error('Error deleting job:', error);
    } finally {
      setShowDeleteDialog(false);
    }
  };

  if (isLoading) {
    return (
      <div className="transition-all duration-300 ease-in-out p-4 sm:p-6 lg:p-8 bg-[#F9FAFB] min-h-screen"
           style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
        <Header title={t('jobDetail.title')} />
        <div className="flex justify-center items-center h-64">
          <p>{t('jobDetail.loading')}</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="transition-all duration-300 ease-in-out p-4 sm:p-6 lg:p-8 bg-[#F9FAFB] min-h-screen"
           style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
        <Header title={t('jobDetail.title')} />
        <div className="flex justify-center items-center h-64">
          <p>{t('jobDetail.notFound')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transition-all duration-300 ease-in-out p-4 sm:p-6 lg:p-8 bg-[#F9FAFB] min-h-screen"
         style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
      <Header title={t('jobDetail.myJobs')} />
      
      <Button
        variant="outline"
        className="mb-4 sm:mb-6"
        onClick={() => navigate('/job-postings')}
      >
        {t('jobDetail.backToJobs')}
      </Button>
      
      <Card className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <div className="space-y-6">
          {/* Job Title and Actions */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">{job.title}</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 self-end sm:self-start">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  {t('jobDetail.edit')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDuplicate}>
                  <Copy className="mr-2 h-4 w-4" />
                  {t('jobDetail.duplicate')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t('jobDetail.delete')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Job Details - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">{t('jobDetail.location')} :</span>
              </div>
              <span className="font-medium text-sm sm:text-base ml-6 sm:ml-0">{job.location}</span>
            </div>
            
            {job.salary_min && job.salary_max && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-sm sm:text-base">{t('jobDetail.salary')} :</span>
                <span className="font-medium text-sm sm:text-base ml-6 sm:ml-0">{job.salary_min}k-{job.salary_max}k</span>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <BriefcaseBusiness className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">{t('jobDetail.type')} :</span>
              </div>
              <Badge variant="outline" className="bg-gray-100 text-gray-700 w-fit ml-6 sm:ml-0">
                {job.contract_type}
              </Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">{t('jobDetail.publishDate')}:</span>
              </div>
              <span className="font-medium text-sm sm:text-base ml-6 sm:ml-0">
                {job.created_at ? new Date(job.created_at).toLocaleDateString('fr-FR') : 'N/A'}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 col-span-1 md:col-span-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">{t('jobDetail.applications')}:</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800 w-fit ml-6 sm:ml-0">
                {candidatesCount}
              </Badge>
            </div>
          </div>
          
          {/* Candidates Analysis */}
          {candidatesCount > 0 && (
            <>
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-sm text-gray-600">
                    {analyzedCandidates}/{candidatesCount} {t('jobDetail.analyzed')}
                  </span>
                  <span className="text-xs text-gray-400">
                    {Math.round((analyzedCandidates / candidatesCount) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={(analyzedCandidates / candidatesCount) * 100} 
                  className="h-2"
                />
              </div>
              
              {averageScore > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-gray-700 text-sm sm:text-base">{t('jobDetail.averageScore')} :</span>
                  <Badge className="bg-green-100 text-green-800 px-3 py-1 rounded-full w-fit">
                    {averageScore}%
                  </Badge>
                </div>
              )}
            </>
          )}
          
          {/* Action Buttons - Responsive Layout */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <Button 
              className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto"
              onClick={handleViewCandidates}
            >
              <Eye className="mr-2 h-4 w-4" />
              {t('jobDetail.viewCandidates')}
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleEdit}
              className="w-full sm:w-auto"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              {t('jobDetail.edit')}
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleDuplicate}
              className="w-full sm:w-auto"
            >
              <Copy className="mr-2 h-4 w-4" />
              {t('jobDetail.duplicate')}
            </Button>
            
            <Button 
              variant="outline"
              className="text-red-600 hover:bg-red-50 hover:text-red-700 w-full sm:w-auto"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {t('jobDetail.delete')}
            </Button>
          </div>
        </div>
      </Card>

      <DeleteJobDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmDelete}
        jobTitle={job.title}
        candidatesCount={candidatesCount}
        isDeleting={deleteJobMutation.isPending}
      />
    </div>
  );
};

export default JobDetail;
