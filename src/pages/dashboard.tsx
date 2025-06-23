
import React from 'react';
import Header from '@/components/layout/Header';
import StatCard from '@/components/dashboard/StatCard';
import StatSkeleton from '@/components/ui/stat-skeleton';
import TopCandidates from '@/components/dashboard/TopCandidates';
import ActiveJobs from '@/components/dashboard/ActiveJobs';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, BarChart, Clock, Activity } from 'lucide-react';

const getChangeProps = (changeValue?: string) => {
  if (typeof changeValue !== "string") return undefined;
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
      <div className="animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
        <Header title={t('dashboard.title')} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {isLoading ? (
          // Skeleton loading state
          Array.from({ length: 4 }).map((_, index) => (
            <StatSkeleton key={index} index={index} />
          ))
        ) : (
          // Actual stat cards with staggered animation
          <>
            <StatCard
              icon={<TrendingUp className="w-7 h-7" />}
              title={t('dashboard.stats.newApplications')}
              value={stats?.newApplications ?? 0}
              change={getChangeProps(stats?.newApplicationsChange)}
              index={0}
            />
            <StatCard
              icon={<BarChart className="w-7 h-7" />}
              title={t('dashboard.stats.totalCandidates')}
              value={stats?.totalCandidates ?? 0}
              change={getChangeProps(stats?.totalCandidatesChange)}
              index={1}
            />
            <StatCard
              icon={<Clock className="w-7 h-7" />}
              title={t('dashboard.stats.interviewStage')}
              value={stats?.interviewStage ?? 0}
              change={getChangeProps(stats?.interviewStageChange)}
              index={2}
            />
            <StatCard
              icon={<Activity className="w-7 h-7" />}
              title={t('dashboard.stats.activeJobs')}
              value={stats?.activeJobs ?? 0}
              change={getChangeProps(stats?.activeJobsChange)}
              index={3}
            />
          </>
        )}
      </div>

      <div 
        className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 animate-fade-in"
        style={{ animationDelay: '800ms', animationFillMode: 'both' }}
      >
        <div className="transform transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
          <TopCandidates />
        </div>
        <div className="transform transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
          <ActiveJobs />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
