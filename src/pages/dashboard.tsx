
import React from 'react';
import Header from '@/components/layout/Header';
import StatCard from '@/components/dashboard/StatCard';
import TopCandidates from '@/components/dashboard/TopCandidates';
import ActiveJobs from '@/components/dashboard/ActiveJobs';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';

const getChangeProps = (changeValue?: string) => {
  if (typeof changeValue !== "string") return undefined;
  // remove any spaces and get the sign (+/-/0)
  const num = parseInt(changeValue.replace("%", ""), 10);
  return {
    value: changeValue,
    positive: num >= 0,
  };
};

const Dashboard = () => {
  const { t } = useLanguage();
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <div className="ml-64 p-8 bg-[#F9FAFB]">
      <Header title={t('dashboard.title')} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title={t('dashboard.stats.newApplications')}
          value={isLoading ? "..." : stats?.newApplications ?? 0}
          change={isLoading ? undefined : getChangeProps(stats?.newApplicationsChange)}
        />
        <StatCard
          title={t('dashboard.stats.totalCandidates')}
          value={isLoading ? "..." : stats?.totalCandidates ?? 0}
          change={isLoading ? undefined : getChangeProps(stats?.totalCandidatesChange)}
        />
        <StatCard
          title={t('dashboard.stats.interviewStage')}
          value={isLoading ? "..." : stats?.interviewStage ?? 0}
          change={isLoading ? undefined : getChangeProps(stats?.interviewStageChange)}
        />
        <StatCard
          title={t('dashboard.stats.activeJobs')}
          value={isLoading ? "..." : stats?.activeJobs ?? 0}
          change={isLoading ? undefined : getChangeProps(stats?.activeJobsChange)}
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
