import React from 'react';
import Header from '@/components/layout/Header';
import StatCard from '@/components/dashboard/StatCard';
import TopCandidates from '@/components/dashboard/TopCandidates';
import ActiveJobs from '@/components/dashboard/ActiveJobs';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const { t } = useLanguage();
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <div className="ml-64 p-8 bg-[#F9FAFB]">
      <Header title={t('dashboard.title')} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label={t('dashboard.stats.newApplications')}
          value={isLoading ? <Skeleton className="h-6 w-16" /> : stats?.newApplications}
          change={isLoading ? null : stats?.newApplicationsChange}
        />
        <StatCard
          label={t('dashboard.stats.totalCandidates')}
          value={isLoading ? <Skeleton className="h-6 w-16" /> : stats?.totalCandidates}
          change={isLoading ? null : stats?.totalCandidatesChange}
        />
        <StatCard
          label={t('dashboard.stats.interviewStage')}
          value={isLoading ? <Skeleton className="h-6 w-16" /> : stats?.interviewStage}
          change={isLoading ? null : stats?.interviewStageChange}
        />
        <StatCard
          label={t('dashboard.stats.activeJobs')}
          value={isLoading ? <Skeleton className="h-6 w-16" /> : stats?.activeJobs}
          change={isLoading ? null : stats?.activeJobsChange}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopCandidates />
        <ActiveJobs />
      </div>
    </div>
  );
};
export default Dashboard;
