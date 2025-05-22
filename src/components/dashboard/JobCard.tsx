
import React from 'react';

interface JobCardProps {
  title: string;
  department: string;
  location: string;
  postedDate: string;
  candidates: number;
  onClick?: () => void;
}

const JobCard = ({ title, department, location, postedDate, candidates, onClick }: JobCardProps) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-primary font-medium">{title}</h3>
          <div className="flex items-center mt-1">
            <p className="text-sm text-gray-500">{department} • {location}</p>
          </div>
          <p className="text-sm text-gray-500 mt-1">{candidates} candidates</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="bg-green-100 text-success text-xs rounded-full px-2 py-1 font-medium">
              active
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Posted {postedDate}</span>
          </div>
          <button 
            className="text-sm border border-gray-200 text-gray-600 px-3 py-1 rounded hover:bg-gray-50"
            onClick={onClick}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
