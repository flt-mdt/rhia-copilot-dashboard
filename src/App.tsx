
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/layout/Sidebar";
import Index from "./pages/Index";
import Candidates from "./pages/Candidates";
import CandidateProfile from "./pages/CandidateProfile";
import JobPostings from "./pages/JobPostings";
import JobDetail from "./pages/JobDetail";
import CreateJobForm from "./components/job/CreateJobForm";
import EditJobForm from "./components/job/EditJobForm";
import DuplicateJobForm from "./components/job/DuplicateJobForm";
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
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-in" element={<Navigate to="/login" replace />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Sidebar />
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/candidates" element={
                <ProtectedRoute>
                  <Sidebar />
                  <Candidates />
                </ProtectedRoute>
              } />
              <Route path="/candidates/:candidateId" element={
                <ProtectedRoute>
                  <Sidebar />
                  <CandidateProfile />
                </ProtectedRoute>
              } />
              <Route path="/job-postings" element={
                <ProtectedRoute>
                  <Sidebar />
                  <JobPostings />
                </ProtectedRoute>
              } />
              <Route path="/job-postings/create" element={
                <ProtectedRoute>
                  <Sidebar />
                  <CreateJobForm />
                </ProtectedRoute>
              } />
              <Route path="/job-postings/:jobId/edit" element={
                <ProtectedRoute>
                  <Sidebar />
                  <EditJobForm />
                </ProtectedRoute>
              } />
              <Route path="/job-postings/:jobId/duplicate" element={
                <ProtectedRoute>
                  <Sidebar />
                  <DuplicateJobForm />
                </ProtectedRoute>
              } />
              <Route path="/job-postings/:jobId" element={
                <ProtectedRoute>
                  <Sidebar />
                  <JobDetail />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Sidebar />
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/hunter" element={
                <ProtectedRoute>
                  <Sidebar />
                  <Hunter />
                </ProtectedRoute>
              } />
              <Route path="/brief" element={
                <ProtectedRoute>
                  <Sidebar />
                  <Brief />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
