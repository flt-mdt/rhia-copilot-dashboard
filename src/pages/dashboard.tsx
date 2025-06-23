
import React from 'react';
import Header from '@/components/layout/Header';
import StatCard from '@/components/dashboard/StatCard';
import TopCandidates from '@/components/dashboard/TopCandidates';
import ActiveJobs from '@/components/dashboard/ActiveJobs';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, BarChart, Clock, Activity } from 'lucide-react';

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
    <div className="transition-all duration-300 ease-in-out p-4 md:p-8 bg-[#F9FAFB] min-h-screen" 
         style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
      <Header title={t('dashboard.title')} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatCard
          icon={<TrendingUp className="w-7 h-7" />}
          title={t('dashboard.stats.newApplications')}
          value={isLoading ? "..." : stats?.newApplications ?? 0}
          change={isLoading ? undefined : getChangeProps(stats?.newApplicationsChange)}
        />
        <StatCard
          icon={<BarChart className="w-7 h-7" />}
          title={t('dashboard.stats.totalCandidates')}
          value={isLoading ? "..." : stats?.totalCandidates ?? 0}
          change={isLoading ? undefined : getChangeProps(stats?.totalCandidatesChange)}
        />
        <StatCard
          icon={<Clock className="w-7 h-7" />}
          title={t('dashboard.stats.interviewStage')}
          value={isLoading ? "..." : stats?.interviewStage ?? 0}
          change={isLoading ? undefined : getChangeProps(stats?.interviewStageChange)}
        />
        <StatCard
          icon={<Activity className="w-7 h-7" />}
          title={t('dashboard.stats.activeJobs')}
          value={isLoading ? "..." : stats?.activeJobs ?? 0}
          change={isLoading ? undefined : getChangeProps(stats?.activeJobsChange)}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        <TopCandidates />
        <ActiveJobs />
      </div>
    </div>
  );
};

export default Dashboard;
