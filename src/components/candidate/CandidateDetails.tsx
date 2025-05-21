
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from 'lucide-react';

interface CandidateProps {
  candidate: {
    id: number;
    name: string;
    position: string;
    overallMatch: number;
    scores: {
      technical: string;
      experience: string;
      education: string;
      languages: string;
    };
  };
}

const CandidateDetails = ({ candidate }: CandidateProps) => {
  // This is sample additional data that would come from a real API
  const additionalData = {
    location: "Paris, France",
    availability: "2 weeks notice",
    salary: "70K-85K €",
    highlights: [
      "Expert in React and TypeScript",
      "Led a team of 5 developers",
      "Fluent in French and English"
    ],
    skills: ["React", "TypeScript", "Node.js", "AWS", "Docker"],
    lastActivity: "Updated profile 3 days ago"
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Location</h4>
          <p className="text-sm">{additionalData.location}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Availability</h4>
          <p className="text-sm">{additionalData.availability}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Expected Salary</h4>
          <p className="text-sm">{additionalData.salary}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Last Activity</h4>
          <p className="text-sm">{additionalData.lastActivity}</p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-1">Highlights</h4>
        <ul className="list-disc list-inside text-sm space-y-1">
          {additionalData.highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-2">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {additionalData.skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-2">Detailed Skills</h4>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600">Communication</span>
              <div className="flex items-center">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="h-3 w-3 text-gray-300" />
              </div>
            </div>
            <Progress value={80} className="h-1" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600">Leadership</span>
              <div className="flex items-center">
                {[1, 2, 3].map((star) => (
                  <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
                {[1, 2].map((star) => (
                  <Star key={star} className="h-3 w-3 text-gray-300" />
                ))}
              </div>
            </div>
            <Progress value={60} className="h-1" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600">Problem Solving</span>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <Progress value={100} className="h-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;
