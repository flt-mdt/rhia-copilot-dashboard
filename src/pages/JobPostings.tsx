
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, ChevronDown, Calendar, User, Plus } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  location: string;
  department: string;
  candidates: number;
  postedDate: string;
  status: 'Active' | 'Draft';
}

const JobPostings = () => {
  const navigate = useNavigate();
  
  const jobs: Job[] = [
    {
      id: 1,
      title: "Senior AI Engineer",
      location: "Paris, France",
      department: "Engineering",
      candidates: 12,
      postedDate: "01/06/2023",
      status: "Active"
    },
    {
      id: 2,
      title: "Product Manager",
      location: "Lyon, France",
      department: "Product",
      candidates: 8,
      postedDate: "05/06/2023",
      status: "Active"
    },
    {
      id: 3,
      title: "UX/UI Designer",
      location: "Remote (France)",
      department: "Design",
      candidates: 0,
      postedDate: "10/06/2023",
      status: "Draft"
    }
  ];
  
  const handleJobClick = (jobId: number) => {
    navigate(`/job-postings/${jobId}`);
  };
  
  const handleCreateJob = () => {
    // This would open a form or modal to create a new job posting
    console.log("Create new job");
  };

  return (
    <div className="ml-64 p-8 bg-[#F9FAFB]">
      <Header title="Job Postings" />
      
      <div className="bg-white rounded-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">All Job Postings</h2>
          <Button className="bg-primary text-white" onClick={handleCreateJob}>
            <Plus className="mr-2 h-4 w-4 bg-white text-primary rounded-full p-[2px]" />
            Add New Job
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100">
              <TableHead className="text-gray-500 font-medium">POSITION</TableHead>
              <TableHead className="text-gray-500 font-medium">DEPARTMENT</TableHead>
              <TableHead className="text-gray-500 font-medium">CANDIDATES</TableHead>
              <TableHead className="text-gray-500 font-medium">POSTED</TableHead>
              <TableHead className="text-gray-500 font-medium">STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <React.Fragment key={job.id}>
                <TableRow 
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleJobClick(job.id)}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-md mr-3">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-500">{job.location}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700">{job.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-700">
                      <User className="h-4 w-4 mr-1 text-gray-500" /> 
                      {job.candidates}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-700">
                      <Calendar className="h-4 w-4 mr-1 text-gray-500" /> 
                      {job.postedDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    {job.status === 'Active' ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-100 text-gray-600 hover:bg-gray-100 border-0">
                        Draft
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow className="border-b border-gray-100">
                  <TableCell colSpan={5} className="text-center py-2">
                    <Button 
                      variant="ghost" 
                      className="text-gray-500 text-sm"
                      onClick={() => handleJobClick(job.id)}
                    >
                      Show More <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobPostings;
