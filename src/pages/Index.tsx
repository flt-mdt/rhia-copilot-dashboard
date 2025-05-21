
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import StatCard from '@/components/dashboard/StatCard';
import CandidateCard from '@/components/dashboard/CandidateCard';
import JobCard from '@/components/dashboard/JobCard';
import { Check } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  const handleCandidateClick = (id: number) => {
    navigate(`/candidates/${id}`);
  };
  
  return (
    <div className="ml-64 p-8">
      <Header title="Dashboard" />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
          title="New Applications"
          value="1"
          change={{ value: "+12%", positive: true }}
        />
        
        <StatCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          title="Total Candidates"
          value="3"
          change={{ value: "+5%", positive: true }}
        />
        
        <StatCard
          icon={<Check className="h-6 w-6" />}
          title="Interview Stage"
          value="1"
          change={{ value: "+2%", positive: true }}
        />
        
        <StatCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
          title="Active Jobs"
          value="2"
          change={{ value: "0%", positive: false }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Candidates */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Top Candidates</h2>
            <Link to="/candidates" className="text-primary text-sm flex items-center">
              View all
              <svg className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
          
          <div onClick={() => handleCandidateClick(1)} className="cursor-pointer">
            <CandidateCard 
              initials="EB" 
              name="Emma Bernard" 
              position="Product Manager"
              applied="20/06/2023" 
              score={{ rating: "4.7/5", percentage: 94 }}
            />
          </div>
          
          <div onClick={() => handleCandidateClick(2)} className="cursor-pointer">
            <CandidateCard 
              initials="SM" 
              name="Sophie Martin" 
              position="Senior AI Engineer"
              applied="15/06/2023" 
              score={{ rating: "4.6/5", percentage: 92 }}
            />
          </div>
          
          <div onClick={() => handleCandidateClick(3)} className="cursor-pointer">
            <CandidateCard 
              initials="TD" 
              name="Thomas Dubois" 
              position="Senior AI Engineer"
              applied="18/06/2023" 
              score={{ rating: "4.1/5", percentage: 82 }}
            />
          </div>
        </div>
        
        {/* Active Job Postings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Active Job Postings</h2>
            <a href="#" className="text-primary text-sm flex items-center">
              View all
              <svg className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
          
          <JobCard 
            title="Senior AI Engineer" 
            department="Engineering" 
            location="Paris, France"
            postedDate="01/06/2023"
            candidates={12}
          />
          
          <JobCard 
            title="Product Manager" 
            department="Product" 
            location="Lyon, France"
            postedDate="05/06/2023"
            candidates={8}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
