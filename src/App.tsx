
import React from 'react';
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
import Collection from "./pages/Collection";
import SavedProfiles from "./pages/SavedProfiles";
import Brief from "./pages/Brief";
import JobTemplatesLibrary from "./pages/JobTemplatesLibrary";
import Subscription from "./pages/Subscription";
import RootRedirect from "./components/RootRedirect";
import Presentation from "./pages/Presentation";
import Privacy from "./pages/Privacy";

const App: React.FC = () => {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <LanguageProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Presentation />} />
                <Route path="/presentation" element={<Presentation />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/dashboard-redirect" element={<RootRedirect />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign-in" element={<Navigate to="/login" replace />} />
                <Route path="/dashboard" element={
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
                <Route path="/collection" element={
                  <ProtectedRoute>
                    <Sidebar />
                    <Collection />
                  </ProtectedRoute>
                } />
                <Route path="/saved-profiles" element={
                  <ProtectedRoute>
                    <Sidebar />
                    <SavedProfiles />
                  </ProtectedRoute>
                } />
                <Route path="/brief" element={
                  <ProtectedRoute>
                    <Sidebar />
                    <Brief />
                  </ProtectedRoute>
                } />
                <Route path="/job-templates" element={
                  <ProtectedRoute>
                    <Sidebar />
                    <JobTemplatesLibrary />
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
};

export default App;
