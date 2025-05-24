import { useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, Star, StarOff, Send, FileText, Calendar,
  ThumbsUp, ThumbsDown, Clipboard, Link, BookOpen, Languages,
  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { CandidateDetail, CandidateStatus } from "@/types/candidate";
import CandidateHeader from "@/components/candidate/CandidateHeader";
import CandidateSummary from "@/components/candidate/CandidateSummary";
import SkillsMatchingGrid from "@/components/candidate/SkillsMatchingGrid";
import DocumentsSection from "@/components/candidate/DocumentsSection";
import PersonalityFitChart from "@/components/candidate/PersonalityFitChart";
import CandidateTimeline from "@/components/candidate/CandidateTimeline";
import { FileUploader } from "@/components/candidate/FileUploader";

// Mock function to fetch candidate data
const fetchCandidateData = async (id: string): Promise<CandidateDetail> => {
  // In a real app, this would be an API call
  return {
    id,
    name: "Emma Bernard",
    email: "emma.bernard@example.com",
    phoneNumber: "+33 6 12 34 56 78",
    targetJob: "Product Owner",
    aiScore: 87,
    aiStatus: "analyzed",
    status: "in_review",
    lastUpdated: "2025-05-19T14:30:00",
    aiSummary: "Candidate shows strong product management skills with 4 years of experience. Technical background in development is a plus for this role. Excellent communication skills and stakeholder management abilities. Would be a good fit for the product team.",
    hrComment: "",
    processedDate: "2025-05-18T09:15:00",
    skills: {
      hardSkills: [
        { name: "Product Roadmapping", level: 9, match: true },
        { name: "Agile/Scrum", level: 8, match: true },
        { name: "User Stories", level: 9, match: true },
        { name: "Technical Knowledge", level: 7, match: true },
      ],
      softSkills: [
        { name: "Communication", level: 9, match: true },
        { name: "Leadership", level: 7, match: true },
        { name: "Problem Solving", level: 8, match: true },
        { name: "Stakeholder Management", level: 8, match: true },
      ],
      experience: [
        { name: "Product Management", level: 8, match: true },
        { name: "Team Leadership", level: 6, match: false },
        { name: "SaaS Products", level: 7, match: true },
      ],
      education: [
        { name: "Master's in Digital Business", level: 9, match: true },
        { name: "Bachelor's in Computer Science", level: 8, match: true }
      ],
      languages: [
        { name: "French", level: 10, match: true },
        { name: "English", level: 8, match: true },
        { name: "Spanish", level: 5, match: false }
      ]
    },
    personalityFit: {
      overall: 8,
      traits: [
        { name: "Independence", score: 8, companyFit: 9 },
        { name: "Stress Management", score: 7, companyFit: 7 },
        { name: "Adaptability", score: 9, companyFit: 8 },
        { name: "Structure", score: 8, companyFit: 7 },
        { name: "Innovation", score: 7, companyFit: 9 }
      ]
    },
    documents: [
      { id: "1", name: "CV Emma Bernard", type: "pdf", url: "/documents/cv.pdf" },
      { id: "2", name: "Lettre de motivation", type: "docx", url: "/documents/letter.docx" },
      { id: "3", name: "Vidéo de présentation", type: "mp4", url: "/documents/video.mp4" }
    ],
    timeline: [
      { date: "2025-05-15", action: "Candidature reçue" },
      { date: "2025-05-16", action: "CV analysé par IA" },
      { date: "2025-05-19", action: "Consulté par RH" }
    ],
    isFavorite: false
  };
};

const statusToColorMap: Record<CandidateStatus, string> = {
  to_analyze: "bg-blue-100 text-blue-800",
  in_review: "bg-yellow-100 text-yellow-800",
  contacted: "bg-purple-100 text-purple-800",
  interview_scheduled: "bg-indigo-100 text-indigo-800",
  offer_sent: "bg-emerald-100 text-emerald-800",
  hired: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800"
};

const CandidateProfile = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const { toast } = useToast();
  const [hrComment, setHrComment] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const { data: candidate, isLoading, error } = useQuery({
    queryKey: ['candidate', candidateId],
    queryFn: () => fetchCandidateData(candidateId || ""),
    enabled: !!candidateId
  });

  if (isLoading) {
    return (
      <div className="flex-1 p-6 ml-64 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-4 items-center justify-center min-h-[60vh]">
            <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500">Loading candidate profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="flex-1 p-6 ml-64 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <Card className="mt-8">
            <CardContent className="py-12">
              <div className="flex flex-col gap-4 items-center justify-center text-center">
                <ThumbsDown className="h-12 w-12 text-red-500" />
                <h2 className="text-xl font-semibold">Unable to load candidate profile</h2>
                <p className="text-gray-500">
                  The candidate profile could not be loaded. Please try again later.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => window.history.back()}
                >
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${candidate.name} has been ${isFavorite ? "removed from" : "added to"} your favorites.`
    });
  };

  const handleSendToManager = () => {
    toast({
      title: "Sent to manager",
      description: `${candidate.name}'s profile has been sent to the manager.`
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "Exporting PDF",
      description: `${candidate.name}'s profile is being exported to PDF.`
    });
  };

  const handleRejectCandidate = () => {
    toast({
      title: "Candidate rejected",
      description: `${candidate.name} has been marked as rejected.`
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Candidate profile link has been copied to clipboard."
    });
  };

  const handleHRCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHrComment(e.target.value);
  };

  const handleSaveComment = () => {
    toast({
      title: "Comment saved",
      description: "Your comment has been saved successfully."
    });
  };

  const handleFileUpload = (candidateData: {
    name: string;
    jobPostingId: string;
    files: File[];
  }) => {
    toast({
      title: "Files Uploaded",
      description: `${candidateData.files.length} files uploaded for ${candidateData.name || candidate?.name}. AI analysis started.`,
    });
    setShowUploadDialog(false);
  };

  return (
    <div className="flex-1 p-6 ml-64 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header with Upload Button */}
        <div className="flex justify-between items-center">
          <CandidateHeader 
            name={candidate.name}
            targetJob={candidate.targetJob}
            score={candidate.aiScore}
            status={candidate.status}
            aiStatus={candidate.aiStatus}
            lastUpdated={candidate.lastUpdated}
            onCopyLink={handleCopyLink}
          />
          
          <Button 
            onClick={() => setShowUploadDialog(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Documents
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-6 mt-6">
          {/* Left column - Summary & Comments */}
          <div className="col-span-12 lg:col-span-4">
            <CandidateSummary
              aiSummary={candidate.aiSummary}
              hrComment={hrComment}
              processedDate={candidate.processedDate}
              onCommentChange={handleHRCommentChange}
              onSaveComment={handleSaveComment}
            />

            {/* Actions Panel */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <Button 
                    variant="outline" 
                    className="justify-start" 
                    onClick={handleToggleFavorite}
                  >
                    {isFavorite ? (
                      <>
                        <StarOff className="h-4 w-4 mr-2" />
                        <span>Remove from favorites</span>
                      </>
                    ) : (
                      <>
                        <Star className="h-4 w-4 mr-2" />
                        <span>Add to favorites</span>
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start" 
                    onClick={handleSendToManager}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    <span>Send to manager</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start" 
                    onClick={handleExportPDF}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Export profile as PDF</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start text-red-500 hover:bg-red-50 hover:text-red-700" 
                    onClick={handleRejectCandidate}
                  >
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    <span>Reject candidate</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Candidate History</CardTitle>
              </CardHeader>
              <CardContent>
                <CandidateTimeline events={candidate.timeline} />
              </CardContent>
            </Card>
          </div>

          {/* Right column - Detailed Information */}
          <div className="col-span-12 lg:col-span-8">
            {/* Skills Matching */}
            <SkillsMatchingGrid skills={candidate.skills} />

            {/* Documents */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <DocumentsSection documents={candidate.documents} />
              </CardContent>
            </Card>

            {/* Personality Fit */}
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Personality Fit</CardTitle>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    candidate.personalityFit.overall >= 8 ? 'bg-green-100 text-green-800' : 
                    candidate.personalityFit.overall >= 6 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {candidate.personalityFit.overall >= 8 ? 'Good Fit' : 
                     candidate.personalityFit.overall >= 6 ? 'Potential Fit' : 
                     'Mismatch'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <PersonalityFitChart traits={candidate.personalityFit.traits} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Additional Documents</DialogTitle>
          </DialogHeader>
          <FileUploader onUpload={handleFileUpload} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CandidateProfile;
