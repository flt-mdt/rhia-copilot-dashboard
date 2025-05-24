
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import StatCard from '@/components/dashboard/StatCard';
import CandidateCard from '@/components/dashboard/CandidateCard';
import JobCard from '@/components/dashboard/JobCard';
import { Check, Users, Briefcase, Mail } from 'lucide-react';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { useCandidates } from '@/hooks/useCandidatesData';
import { useJobPostings } from '@/hooks/useJobPostings';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: candidates = [] } = useCandidates();
  const { data: jobPostings = [] } = useJobPostings();
  
  const handleCandidateClick = (id: string) => {
    navigate(`/candidates/${id}`);
  };
  
  const handleJobClick = (id: string) => {
    navigate(`/job-postings/${id}`);
  };

  // Get top candidates (highest AI scores)
  const topCandidates = candidates
    .filter(c => c.ai_score !== null)
    .sort((a, b) => (b.ai_score || 0) - (a.ai_score || 0))
    .slice(0, 3);

  // Get active job postings
  const activeJobs = jobPostings.filter(job => job.is_active).slice(0, 2);
  
  return (
    <div className="ml-64 p-8">
      <Header title={t('dashboard.title')} />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Mail className="h-6 w-6" />}
          title={t('dashboard.stats.newApplications')}
          value={statsLoading ? "..." : stats?.newApplications || 0}
          change={{ value: stats?.newApplicationsChange || "+0%", positive: true }}
        />
        
        <StatCard
          icon={<Users className="h-6 w-6" />}
          title={t('dashboard.stats.totalCandidates')}
          value={statsLoading ? "..." : stats?.totalCandidates || 0}
          change={{ value: stats?.totalCandidatesChange || "+0%", positive: true }}
        />
        
        <StatCard
          icon={<Check className="h-6 w-6" />}
          title={t('dashboard.stats.interviewStage')}
          value={statsLoading ? "..." : stats?.interviewStage || 0}
          change={{ value: stats?.interviewStageChange || "+0%", positive: true }}
        />
        
        <StatCard
          icon={<Briefcase className="h-6 w-6" />}
          title={t('dashboard.stats.activeJobs')}
          value={statsLoading ? "..." : stats?.activeJobs || 0}
          change={{ value: stats?.activeJobsChange || "0%", positive: false }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Candidates */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{t('dashboard.topCandidates')}</h2>
            <Link to="/candidates" className="text-primary text-sm flex items-center">
              {t('dashboard.viewAll')}
              <svg className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
          
          <div className="space-y-4">
            {topCandidates.length > 0 ? (
              topCandidates.map((candidate) => (
                <div key={candidate.id} onClick={() => handleCandidateClick(candidate.id)} className="cursor-pointer">
                  <CandidateCard 
                    initials={candidate.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    name={candidate.name} 
                    position={candidate.job_postings?.title || candidate.current_position || "N/A"}
                    applied={new Date(candidate.created_at || '').toLocaleDateString('fr-FR')}
                    score={{ 
                      rating: `${((candidate.ai_score || 0) / 20).toFixed(1)}/5`, 
                      percentage: candidate.ai_score || 0 
                    }}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">{t('dashboard.noCandidates')}</p>
            )}
          </div>
        </div>
        
        {/* Active Job Postings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{t('dashboard.activeJobs')}</h2>
            <Link to="/job-postings" className="text-primary text-sm flex items-center">
              {t('dashboard.viewAll')}
              <svg className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
          
          <div className="space-y-4">
            {activeJobs.length > 0 ? (
              activeJobs.map((job) => (
                <JobCard 
                  key={job.id}
                  title={job.title} 
                  department={job.department || "N/A"} 
                  location={job.location || "N/A"}
                  postedDate={new Date(job.created_at || '').toLocaleDateString('fr-FR')}
                  candidates={candidates.filter(c => c.target_job_id === job.id).length}
                  onClick={() => handleJobClick(job.id)}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">{t('dashboard.noActiveJobs')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
