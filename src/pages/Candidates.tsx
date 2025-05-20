
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from '@/components/ui/progress';

interface Candidate {
  id: number;
  initials: string;
  name: string;
  position: string;
  appliedDate: string;
  status: 'Interview' | 'Reviewed' | 'New';
  overallMatch: number;
  scores: {
    technical: string;
    experience: string;
    education: string;
    languages: string;
  };
}

const Candidates = () => {
  const [candidates] = useState<Candidate[]>([
    {
      id: 1,
      initials: 'EB',
      name: 'Emma Bernard',
      position: 'Product Manager',
      appliedDate: 'Applied 20 juin 2023',
      status: 'Interview',
      overallMatch: 94,
      scores: {
        technical: '4.8/5',
        experience: '4.9/5',
        education: '4.3/5',
        languages: '4.6/5'
      }
    },
    {
      id: 2,
      initials: 'SM',
      name: 'Sophie Martin',
      position: 'Senior AI Engineer',
      appliedDate: 'Applied 15 juin 2023',
      status: 'Reviewed',
      overallMatch: 92,
      scores: {
        technical: '4.5/5',
        experience: '4.2/5',
        education: '5/5',
        languages: '4.5/5'
      }
    },
    {
      id: 3,
      initials: 'TD',
      name: 'Thomas Dubois',
      position: 'Senior AI Engineer',
      appliedDate: 'Applied 18 juin 2023',
      status: 'New',
      overallMatch: 82,
      scores: {
        technical: '4.2/5',
        experience: '3.8/5',
        education: '4.5/5',
        languages: '4/5'
      }
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Interview':
        return 'bg-green-100 text-green-700';
      case 'Reviewed':
        return 'bg-purple-100 text-purple-700';
      case 'New':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="ml-64 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Candidates</h1>
        <div className="flex items-center gap-4">
          <Button className="bg-primary text-white">
            <Upload className="mr-2 h-4 w-4" />
            Upload CV
          </Button>
        </div>
      </div>

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
            placeholder="Search by name or skills..." 
            className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Statuses</option>
                <option>New</option>
                <option>Reviewed</option>
                <option>Interview</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Jobs</option>
                <option>Product Manager</option>
                <option>Senior AI Engineer</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md flex items-center gap-1">
              Score
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="px-3 py-1 text-gray-600 rounded-md flex items-center gap-1 hover:bg-gray-100">
              Date
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <p className="text-gray-500 mb-6">{candidates.length} candidates found</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <Card key={candidate.id} className="overflow-hidden border border-gray-100">
            <div className="p-6">
              <div className="flex justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 bg-gray-100">
                    <AvatarFallback className="text-gray-600">{candidate.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-lg">{candidate.name}</h3>
                    <p className="text-gray-500 text-sm">{candidate.position}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <Badge 
                    className={`${getStatusColor(candidate.status)} font-normal text-xs px-3`}
                    variant="outline"
                  >
                    {candidate.status}
                  </Badge>
                  <span className="text-gray-500 text-xs mt-1">{candidate.appliedDate}</span>
                </div>
              </div>

              <div className="mb-5">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Overall Match</span>
                  <span className="font-medium">{candidate.overallMatch}%</span>
                </div>
                <Progress value={candidate.overallMatch} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-blue-50 rounded text-blue-500">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2h14a1 1 0 100-2H3zm0 6a1 1 0 000 2h14a1 1 0 100-2H3zm0 6a1 1 0 000 2h14a1 1 0 100-2H3z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-600">Technical: <span className="font-medium">{candidate.scores.technical}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-purple-50 rounded text-purple-500">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-600">Experience: <span className="font-medium">{candidate.scores.experience}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-green-50 rounded text-green-500">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-600">Education: <span className="font-medium">{candidate.scores.education}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-yellow-50 rounded text-yellow-500">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-600">Languages: <span className="font-medium">{candidate.scores.languages}</span></span>
                </div>
              </div>

              <button className="w-full flex justify-center items-center gap-1 text-gray-500 text-sm py-1 hover:bg-gray-50 rounded-md">
                <span>Show More</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
                <button className="text-blue-600 text-sm font-medium hover:underline">View Resume</button>
                <button className="text-gray-600 text-sm hover:text-gray-900">Change Status</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Candidates;
