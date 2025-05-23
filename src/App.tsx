
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Index from "./pages/Index";
import Candidates from "./pages/Candidates";
import CandidateProfile from "./pages/CandidateProfile";
import JobPostings from "./pages/JobPostings";
import JobDetail from "./pages/JobDetail";
import CreateJobForm from "./components/job/CreateJobForm";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Hunter from "./pages/Hunter";
import Brief from "./pages/Brief";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/candidates/:candidateId" element={<CandidateProfile />} />
          <Route path="/job-postings" element={<JobPostings />} />
          <Route path="/job-postings/create" element={<CreateJobForm />} />
          <Route path="/job-postings/:jobId" element={<JobDetail />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/hunter" element={<Hunter />} />
          <Route path="/brief" element={<Brief />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
