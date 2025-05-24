
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
      <div className="ml-64 p-8">
        <Header title="Candidates" />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading candidates...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-64 p-8">
      <Header title="Candidates" />

      <div className="mb-6">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg 
              className="h-5 w-5 text-gray-400" 
              viewBox="0 0 20 20" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path 
                d="M19 19L13 13M15 8A7 7 0 111 8a7 7 0 0114 0z" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Search by name or position..." 
            className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
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
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Jobs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {availableJobs.map((job) => (
                  <SelectItem key={job} value={job}>
                    {job}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md flex items-center gap-1">
                  <BarChart className="w-4 h-4" />
                  Score
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <div className="p-2">
                  {scoreOptions.map((option) => (
                    <button 
                      key={option.value}
                      onClick={() => setScoreFilter(option.value)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md ${
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
                <button className="px-3 py-1 text-gray-600 rounded-md flex items-center gap-1 hover:bg-gray-100">
                  <Calendar className="w-4 h-4" />
                  Date
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            <Button onClick={() => setShowUploadDialog(true)} className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload CV
            </Button>
          </div>
        </div>
      </div>

      <p className="text-gray-500 mb-6">{filteredCandidates.length} candidates found</p>

      {filteredCandidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <Card 
              key={candidate.id} 
              className="overflow-hidden border border-gray-100 transition-shadow hover:shadow-md cursor-pointer" 
              onClick={(e) => handleCandidateClick(candidate.id, e)}
            >
              <div className="p-6">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 bg-gray-100">
                      <AvatarFallback className="text-gray-600">
                        {getInitials(candidate.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">{candidate.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {candidate.current_position || candidate.job_postings?.title || 'No position'}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge 
                      className={`${getStatusColor(candidate.status || 'to_analyze')} font-normal text-xs px-3`}
                      variant="outline"
                    >
                      {getStatusLabel(candidate.status || 'to_analyze')}
                    </Badge>
                    <span className="text-gray-500 text-xs mt-1">
                      {candidate.created_at ? formatDate(candidate.created_at) : 'No date'}
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Overall Match</span>
                    <span className="font-medium">{candidate.ai_score || 0}%</span>
                  </div>
                  <Progress value={candidate.ai_score || 0} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1 bg-blue-50 rounded text-blue-500">
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2h14a1 1 0 100-2H3zm0 6a1 1 0 000 2h14a1 1 0 100-2H3zm0 6a1 1 0 000 2h14a1 1 0 100-2H3z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-600">Technical: <span className="font-medium">-/5</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="p-1 bg-purple-50 rounded text-purple-500">
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-600">Experience: <span className="font-medium">{candidate.experience_years || 0} ans</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="p-1 bg-green-50 rounded text-green-500">
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-600">Education: <span className="font-medium">-/5</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="p-1 bg-yellow-50 rounded text-yellow-500">
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-600">Location: <span className="font-medium">{candidate.location || 'N/A'}</span></span>
                  </div>
                </div>

                <button 
                  className="w-full flex justify-center items-center gap-1 text-gray-500 text-sm py-1 hover:bg-gray-50 rounded-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/candidates/${candidate.id}`);
                  }}
                >
                  <span>Show More</span>
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
                  <button 
                    className="text-blue-600 text-sm font-medium hover:underline view-cv-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewCV(candidate.id, e);
                    }}
                  >
                    View Resume
                  </button>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-gray-600 text-sm hover:text-gray-900 status-change-button" onClick={(e) => e.stopPropagation()}>
                        Change Status
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" onClick={(e) => e.stopPropagation()}>
                      <div className="p-2">
                        <button
                          onClick={() => handleChangeStatus(candidate.id, 'to_analyze')}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-blue-50"
                        >
                          New
                        </button>
                        <button
                          onClick={() => handleChangeStatus(candidate.id, 'in_review')}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-purple-50"
                        >
                          Reviewed
                        </button>
                        <button
                          onClick={() => handleChangeStatus(candidate.id, 'interview_scheduled')}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-green-50"
                        >
                          Interview
                        </button>
                        <button
                          onClick={() => handleChangeStatus(candidate.id, 'contacted')}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-yellow-50"
                        >
                          Contacted
                        </button>
                        <button
                          onClick={() => handleChangeStatus(candidate.id, 'hired')}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-emerald-50"
                        >
                          Hired
                        </button>
                        <button
                          onClick={() => handleChangeStatus(candidate.id, 'rejected')}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-red-50"
                        >
                          Rejected
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-block p-3 rounded-full bg-gray-100 mb-4">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M12 14a3 3 0 100-6 3 3 0 000 6z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No candidates found</h3>
          <p className="text-gray-500 mt-1">No candidates match your current filters</p>
          <Button 
            className="mt-4"
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setJobFilter('all');
              setScoreFilter(0);
              setDate(undefined);
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
      
      {/* CV Viewer Dialog */}
      <Dialog open={selectedCVCandidate !== null} onOpenChange={() => setSelectedCVCandidate(null)}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>
              {selectedCVCandidate && candidates.find(c => c.id === selectedCVCandidate)?.name}'s CV
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 h-full overflow-auto bg-gray-100 rounded-md p-4 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
              <p className="text-center text-gray-500">CV Preview would appear here</p>
              <p className="text-center text-gray-500 mt-2">In a real application, this would display the actual CV document.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Candidate Files</DialogTitle>
          </DialogHeader>
          <FileUploader onUpload={handleFileUpload} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Candidates;
