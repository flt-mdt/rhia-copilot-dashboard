
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
      // Get total candidates
      const { count: totalCandidates } = await supabase
        .from('candidates')
        .select('*', { count: 'exact', head: true });

      // Get new applications (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { count: newApplications } = await supabase
        .from('candidates')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo.toISOString());

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

      // Calculate previous period for comparison
      const fourteenDaysAgo = new Date();
      fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

      const { count: previousNewApplications } = await supabase
        .from('candidates')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', fourteenDaysAgo.toISOString())
        .lt('created_at', sevenDaysAgo.toISOString());

      // Calculate percentage changes
      const newApplicationsChange = previousNewApplications 
        ? `${Math.round(((newApplications || 0) - (previousNewApplications || 0)) / (previousNewApplications || 1) * 100)}%`
        : '+100%';

      return {
        newApplications: newApplications || 0,
        totalCandidates: totalCandidates || 0,
        interviewStage: interviewStage || 0,
        activeJobs: activeJobs || 0,
        newApplicationsChange,
        totalCandidatesChange: '+5%', // Mock for now
        interviewStageChange: '+2%', // Mock for now  
        activeJobsChange: '0%', // Mock for now
      };
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};
