
export type CandidateStatus = 
  | "to_analyze" 
  | "in_review" 
  | "contacted" 
  | "interview_scheduled" 
  | "offer_sent" 
  | "hired" 
  | "rejected";

export type SkillMatch = {
  name: string;
  level: number;
  match: boolean;
};

export type PersonalityTrait = {
  name: string;
  score: number;
  companyFit: number;
};

export type Document = {
  id: string;
  name: string;
  type: string;
  url: string;
};

export type TimelineEvent = {
  date: string;
  action: string;
};

export type CandidateDetail = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  targetJob: string;
  aiScore: number;
  aiStatus: "analyzed" | "error" | "pending";
  status: CandidateStatus;
  lastUpdated: string;
  aiSummary: string;
  hrComment: string;
  processedDate: string;
  skills: {
    hardSkills: SkillMatch[];
    softSkills: SkillMatch[];
    experience: SkillMatch[];
    education: SkillMatch[];
    languages: SkillMatch[];
  };
  personalityFit: {
    overall: number;
    traits: PersonalityTrait[];
  };
  documents: Document[];
  timeline: TimelineEvent[];
  isFavorite: boolean;
};
