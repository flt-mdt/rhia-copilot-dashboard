
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Upload, Calendar, BarChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from '@/components/ui/progress';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { FileUploader } from '@/components/candidate/FileUploader';
import { useToast } from "@/hooks/use-toast";
import { useCandidates, useCreateCandidate, useUpdateCandidateStatus, type Candidate } from '@/hooks/useCandidatesData';
import { CandidateSkeletonGrid } from '@/components/ui/candidate-skeleton';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { AnimatedSearch } from '@/components/ui/animated-search';
import { AnimatedButton } from '@/components/ui/animated-button';

const Candidates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: candidates = [], isLoading } = useCandidates();
  const createCandidateMutation = useCreateCandidate();
  const updateCandidateStatusMutation = useUpdateCandidateStatus();
  
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');
  const [scoreFilter, setScoreFilter] = useState(0);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedCVCandidate, setSelectedCVCandidate] = useState<string | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  useEffect(() => {
    let result = candidates;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        candidate => 
          candidate.name.toLowerCase().includes(query) || 
          (candidate.current_position && candidate.current_position.toLowerCase().includes(query))
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(candidate => candidate.status === statusFilter);
    }
    
    // Apply job filter
    if (jobFilter !== 'all') {
      result = result.filter(candidate => 
        candidate.job_postings?.title === jobFilter
      );
    }
    
    // Apply score filter
    if (scoreFilter > 0) {
      result = result.filter(candidate => 
        candidate.ai_score && candidate.ai_score >= scoreFilter
      );
    }
    
    setFilteredCandidates(result);
  }, [candidates, searchQuery, statusFilter, jobFilter, scoreFilter, date]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interview_scheduled':
        return 'bg-green-100 text-green-700';
      case 'in_review':
        return 'bg-purple-100 text-purple-700';
      case 'to_analyze':
        return 'bg-blue-100 text-blue-700';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-700';
      case 'hired':
        return 'bg-emerald-100 text-emerald-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'to_analyze':
        return 'New';
      case 'in_review':
        return 'Reviewed';
      case 'interview_scheduled':
        return 'Interview';
      case 'contacted':
        return 'Contacted';
      case 'hired':
        return 'Hired';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const handleViewCV = (candidateId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedCVCandidate(candidateId);
  };

  const handleChangeStatus = (candidateId: string, newStatus: 'to_analyze' | 'in_review' | 'contacted' | 'interview_scheduled' | 'offer_sent' | 'hired' | 'rejected') => {
    updateCandidateStatusMutation.mutate({ id: candidateId, status: newStatus });
  };

  const handleFileUpload = (candidateData: {
    name: string;
    jobPostingId: string;
    files: File[];
  }) => {
    // In a real app, you would upload files to storage first
    // For now, we'll just create the candidate record
    createCandidateMutation.mutate({
      name: candidateData.name,
      target_job_id: candidateData.jobPostingId,
      ai_status: 'processing'
    });
    setShowUploadDialog(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `Applied ${date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })}`;
  };

  // Get unique job titles for filter
  const availableJobs = Array.from(new Set(
    candidates
      .filter(c => c.job_postings?.title)
      .map(c => c.job_postings!.title)
  ));

  const scoreOptions = [
    { label: 'All Scores', value: 0 },
    { label: '≥ 90%', value: 90 },
    { label: '≥ 80%', value: 80 },
    { label: '≥ 70%', value: 70 }
  ];

  const handleCandidateClick = (candidateId: string, event: React.MouseEvent) => {
    if (
      (event.target as HTMLElement).closest('.status-change-button') ||
      (event.target as HTMLElement).closest('.view-cv-button')
    ) {
      return;
    }
    
    navigate(`/candidates/${candidateId}`);
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out"
           style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
        <Header title="Candidates" />
        <div className="mb-4 sm:mb-6">
          <div className="relative mb-4 sm:mb-6">
            <AnimatedSearch
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name or position..."
              className="animate-fade-in"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="w-full sm:w-[180px] h-10 bg-gray-100 rounded animate-pulse"></div>
              <div className="w-full sm:w-[180px] h-10 bg-gray-100 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <div className="w-16 sm:w-20 h-8 bg-gray-100 rounded animate-pulse"></div>
              <div className="w-16 sm:w-20 h-8 bg-gray-100 rounded animate-pulse"></div>
              <div className="w-24 sm:w-28 h-10 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        <CandidateSkeletonGrid count={9} />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out"
         style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
      <Header title="Candidates" />

      <div className="mb-4 sm:mb-6">
        <div className="relative mb-4 sm:mb-6">
          <AnimatedSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name or position..."
            className="animate-fade-in"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] transition-all duration-200 hover:border-blue-300">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="to_analyze">New</SelectItem>
                <SelectItem value="in_review">Reviewed</SelectItem>
                <SelectItem value="interview_scheduled">Interview</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={jobFilter} onValueChange={setJobFilter}>
              <SelectTrigger className="w-full sm:w-[180px] transition-all duration-200 hover:border-blue-300">
                <SelectValue placeholder="All Jobs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {Array.from(new Set(
                  candidates
                    .filter(c => c.job_postings?.title)
                    .map(c => c.job_postings!.title)
                )).map((job) => (
                  <SelectItem key={job} value={job}>
                    {job}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-end overflow-x-auto">
            <Popover>
              <PopoverTrigger asChild>
                <button className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-600 rounded-md flex items-center gap-1 transition-all duration-200 hover:bg-blue-100 hover:scale-105 whitespace-nowrap text-sm">
                  <BarChart className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Score</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <div className="p-2">
                  {[
                    { label: 'All Scores', value: 0 },
                    { label: '≥ 90%', value: 90 },
                    { label: '≥ 80%', value: 80 },
                    { label: '≥ 70%', value: 70 }
                  ].map((option) => (
                    <button 
                      key={option.value}
                      onClick={() => setScoreFilter(option.value)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                        scoreFilter === option.value 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <button className="px-2 sm:px-3 py-1 text-gray-600 rounded-md flex items-center gap-1 hover:bg-gray-100 transition-all duration-200 hover:scale-105 whitespace-nowrap text-sm">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Date</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <AnimatedButton onClick={() => setShowUploadDialog(true)} className="flex items-center gap-1 sm:gap-2 text-sm px-3 py-1.5 sm:px-4 sm:py-2">
              <Upload className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-200 group-hover:scale-110" />
              <span className="hidden sm:inline">Upload CV</span>
              <span className="sm:hidden">Upload</span>
            </AnimatedButton>
          </div>
        </div>
      </div>

      <p className="text-gray-500 mb-4 sm:mb-6 animate-fade-in text-sm sm:text-base" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
        <AnimatedCounter end={filteredCandidates.length} /> candidates found
      </p>

      {filteredCandidates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {filteredCandidates.map((candidate, index) => (
            <Card 
              key={candidate.id} 
              className="overflow-hidden border border-gray-100 transition-all duration-500 ease-out hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-2 cursor-pointer animate-fade-in opacity-0 group relative"
              style={{ 
                animationDelay: `${600 + index * 100}ms`,
                animationFillMode: 'forwards'
              }}
              onClick={(e) => handleCandidateClick(candidate.id, e)}
            >
              <div className="p-4 sm:p-6">
                <div className="flex justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-100 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg flex-shrink-0">
                      <AvatarFallback className="text-gray-600 transition-colors duration-300 group-hover:text-blue-600 text-sm sm:text-base">
                        {candidate.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-base sm:text-lg transition-all duration-300 group-hover:text-blue-600 group-hover:scale-105 transform-gpu truncate">
                        {candidate.name}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm transition-colors duration-300 group-hover:text-gray-700 truncate">
                        {candidate.current_position || candidate.job_postings?.title || 'No position'}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <Badge 
                      className={`${candidate.status ? {
                        'interview_scheduled': 'bg-green-100 text-green-700',
                        'in_review': 'bg-purple-100 text-purple-700',
                        'to_analyze': 'bg-blue-100 text-blue-700',
                        'contacted': 'bg-yellow-100 text-yellow-700',
                        'hired': 'bg-emerald-100 text-emerald-700',
                        'rejected': 'bg-red-100 text-red-700',
                      }[candidate.status] || 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-700'} font-normal text-xs px-2 sm:px-3 py-1 transition-all duration-300 hover:scale-105 group-hover:shadow-md`}
                      variant="outline"
                    >
                      {candidate.status ? {
                        'to_analyze': 'New',
                        'in_review': 'Reviewed',
                        'interview_scheduled': 'Interview',
                        'contacted': 'Contacted',
                        'hired': 'Hired',
                        'rejected': 'Rejected',
                      }[candidate.status] || candidate.status : 'New'}
                    </Badge>
                    <span className="text-gray-500 text-xs mt-1 transition-colors duration-300 group-hover:text-gray-700 text-right">
                      {candidate.created_at ? new Date(candidate.created_at).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      }) : 'No date'}
                    </span>
                  </div>
                </div>

                <div className="mb-4 sm:mb-5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs sm:text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800">Overall Match</span>
                    <span className="font-medium text-sm sm:text-base transition-all duration-300 group-hover:scale-105 group-hover:text-blue-600">
                      <AnimatedCounter end={candidate.ai_score || 0} suffix="%" />
                    </span>
                  </div>
                  <Progress 
                    value={candidate.ai_score || 0} 
                    className="h-1.5 sm:h-2 transition-all duration-500 group-hover:h-2 sm:group-hover:h-3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-y-2 sm:gap-y-3 mb-3 sm:mb-4">
                  <div className="flex items-center gap-1 sm:gap-2 transition-all duration-300 group-hover:scale-105">
                    <span className="p-0.5 sm:p-1 bg-blue-50 rounded text-blue-500 transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-110 flex-shrink-0">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2h14a1 1 0 100-2H3zm0 6a1 1 0 000 2h14a1 1 0 100-2H3zm0 6a1 1 0 000 2h14a1 1 0 100-2H3z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-xs sm:text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800 truncate">Tech: <span className="font-medium">-/5</span></span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 transition-all duration-300 group-hover:scale-105">
                    <span className="p-0.5 sm:p-1 bg-purple-50 rounded text-purple-500 transition-all duration-300 group-hover:bg-purple-100 group-hover:scale-110 flex-shrink-0">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-xs sm:text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800 truncate">Exp: <span className="font-medium">{candidate.experience_years || 0}y</span></span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 transition-all duration-300 group-hover:scale-105">
                    <span className="p-0.5 sm:p-1 bg-green-50 rounded text-green-500 transition-all duration-300 group-hover:bg-green-100 group-hover:scale-110 flex-shrink-0">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    </span>
                    <span className="text-xs sm:text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800 truncate">Edu: <span className="font-medium">-/5</span></span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 transition-all duration-300 group-hover:scale-105">
                    <span className="p-0.5 sm:p-1 bg-yellow-50 rounded text-yellow-500 transition-all duration-300 group-hover:bg-yellow-100 group-hover:scale-110 flex-shrink-0">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-xs sm:text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800 truncate">Loc: <span className="font-medium">{candidate.location ? candidate.location.substring(0, 10) + (candidate.location.length > 10 ? '...' : '') : 'N/A'}</span></span>
                  </div>
                </div>

                <button 
                  className="w-full flex justify-center items-center gap-1 text-gray-500 text-xs sm:text-sm py-1 hover:bg-gray-50 rounded-md transition-all duration-300 hover:scale-105 group/show-more"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/candidates/${candidate.id}`);
                  }}
                >
                  <span className="transition-colors duration-300 group-hover/show-more:text-blue-600">Show More</span>
                  <svg 
                    className="w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 group-hover:translate-y-1 group-hover/show-more:text-blue-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="border-t border-gray-100 mt-3 sm:mt-4 pt-3 sm:pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                  <button 
                    className="text-blue-600 text-xs sm:text-sm font-medium hover:underline view-cv-button transition-all duration-300 hover:scale-105 hover:text-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCVCandidate(candidate.id);
                    }}
                  >
                    View Resume
                  </button>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-gray-600 text-xs sm:text-sm hover:text-gray-900 status-change-button transition-all duration-300 hover:scale-105" onClick={(e) => e.stopPropagation()}>
                        Change Status
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[180px] sm:w-[200px] p-0" onClick={(e) => e.stopPropagation()}>
                      <div className="p-2">
                        {[
                          { value: 'to_analyze', label: 'New', color: 'hover:bg-blue-50' },
                          { value: 'in_review', label: 'Reviewed', color: 'hover:bg-purple-50' },
                          { value: 'interview_scheduled', label: 'Interview', color: 'hover:bg-green-50' },
                          { value: 'contacted', label: 'Contacted', color: 'hover:bg-yellow-50' },
                          { value: 'hired', label: 'Hired', color: 'hover:bg-emerald-50' },
                          { value: 'rejected', label: 'Rejected', color: 'hover:bg-red-50' }
                        ].map((status) => (
                          <button
                            key={status.value}
                            onClick={() => updateCandidateStatusMutation.mutate({ 
                              id: candidate.id, 
                              status: status.value as any 
                            })}
                            className={`w-full text-left px-3 py-2 text-xs sm:text-sm rounded-md transition-all duration-200 ${status.color} hover:scale-105`}
                          >
                            {status.label}
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Subtle border effect on hover */}
              <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-gray-200/30 transition-all duration-500 pointer-events-none" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 sm:py-12 animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
          <div className="inline-block p-3 rounded-full bg-gray-100 mb-4 animate-bounce-subtle">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M12 14a3 3 0 100-6 3 3 0 000 6z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No candidates found</h3>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">No candidates match your current filters</p>
          <AnimatedButton 
            className="mt-4 text-sm px-4 py-2"
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setJobFilter('all');
              setScoreFilter(0);
              setDate(undefined);
            }}
          >
            Clear all filters
          </AnimatedButton>
        </div>
      )}
      
      {/* CV Viewer Dialog */}
      <Dialog open={selectedCVCandidate !== null} onOpenChange={() => setSelectedCVCandidate(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-4xl h-[85vh] sm:h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">
              {selectedCVCandidate && candidates.find(c => c.id === selectedCVCandidate)?.name}'s CV
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 h-full overflow-auto bg-gray-100 rounded-md p-4 flex items-center justify-center">
            <div className="bg-white p-4 sm:p-6 rounded shadow max-w-md mx-auto">
              <p className="text-center text-gray-500 text-sm sm:text-base">CV Preview would appear here</p>
              <p className="text-center text-gray-500 mt-2 text-xs sm:text-sm">In a real application, this would display the actual CV document.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-md max-w-[95vw]">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">Upload Candidate Files</DialogTitle>
          </DialogHeader>
          <FileUploader onUpload={handleFileUpload} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Candidates;
