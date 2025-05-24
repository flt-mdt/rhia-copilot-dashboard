
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DashboardStats {
  newApplications: number;
  totalCandidates: number;
  interviewStage: number;
  activeJobs: number;
  newApplicationsChange: string;
  totalCandidatesChange: string;
  interviewStageChange: string;
  activeJobsChange: string;
}

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async (): Promise<DashboardStats> => {
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

      // Get total candidates
      const { count: totalCandidates } = await supabase
        .from('candidates')
        .select('*', { count: 'exact', head: true });

      // Get new applications (last 7 days)
      const { count: newApplications } = await supabase
        .from('candidates')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', oneWeekAgo.toISOString());

      // Get candidates in interview stage
      const { count: interviewStage } = await supabase
        .from('candidates')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'interview_scheduled');

      // Get active job postings
      const { count: activeJobs } = await supabase
        .from('job_postings')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      // Calculate previous week's data for comparison
      const { count: previousNewApplications } = await supabase
        .from('candidates')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', twoWeeksAgo.toISOString())
        .lt('created_at', oneWeekAgo.toISOString());

      const { count: previousTotalCandidates } = await supabase
        .from('candidates')
        .select('*', { count: 'exact', head: true })
        .lt('created_at', oneWeekAgo.toISOString());

      const { count: previousInterviewStage } = await supabase
        .from('candidates')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'interview_scheduled')
        .lt('updated_at', oneWeekAgo.toISOString());

      // Calculate percentage changes
      const calculatePercentageChange = (current: number, previous: number): string => {
        if (previous === 0) {
          return current > 0 ? '+100%' : '0%';
        }
        const change = Math.round(((current - previous) / previous) * 100);
        return change >= 0 ? `+${change}%` : `${change}%`;
      };

      const newApplicationsChange = calculatePercentageChange(
        newApplications || 0, 
        previousNewApplications || 0
      );

      const totalCandidatesChange = calculatePercentageChange(
        totalCandidates || 0,
        previousTotalCandidates || 0
      );

      const interviewStageChange = calculatePercentageChange(
        interviewStage || 0,
        previousInterviewStage || 0
      );

      return {
        newApplications: newApplications || 0,
        totalCandidates: totalCandidates || 0,
        interviewStage: interviewStage || 0,
        activeJobs: activeJobs || 0,
        newApplicationsChange,
        totalCandidatesChange,
        interviewStageChange,
        activeJobsChange: '0%', // Les offres actives ne changent pas par semaine
      };
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};
