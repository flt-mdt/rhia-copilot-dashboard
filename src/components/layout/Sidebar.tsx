
import { Link, useLocation } from "react-router-dom";
import { Settings, Users, Briefcase } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 h-screen bg-white fixed left-0 top-0 shadow-md flex flex-col">
      <div className="p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded bg-primary flex items-center justify-center">
          <span className="text-white font-bold">RC</span>
        </div>
        <span className="font-semibold text-lg">RHIA Copilot</span>
      </div>
      
      <nav className="mt-8">
        <ul className="space-y-1">
          <li>
            <Link 
              to="/" 
              className={`flex items-center gap-3 px-4 py-3 ${
                isActive("/") 
                ? "bg-blue-50 text-primary font-medium" 
                : "text-textGray hover:bg-gray-100"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" 
                stroke={isActive("/") ? "#2563EB" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/candidates" 
              className={`flex items-center gap-3 px-4 py-3 ${
                isActive("/candidates") 
                ? "bg-blue-50 text-primary font-medium" 
                : "text-textGray hover:bg-gray-100"
              }`}
            >
              <Users size={20} />
              Candidates
            </Link>
          </li>
          <li>
            <Link 
              to="/job-postings" 
              className={`flex items-center gap-3 px-4 py-3 ${
                isActive("/job-postings") 
                ? "bg-blue-50 text-primary font-medium" 
                : "text-textGray hover:bg-gray-100"
              }`}
            >
              <Briefcase size={20} />
              Job Postings
            </Link>
          </li>
          <li>
            <Link 
              to="/settings" 
              className={`flex items-center gap-3 px-4 py-3 ${
                isActive("/settings") 
                ? "bg-blue-50 text-primary font-medium" 
                : "text-textGray hover:bg-gray-100"
              }`}
            >
              <Settings size={20} />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="mt-auto mb-4 mx-4 pt-4 border-t border-gray-200 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-600 font-medium">AD</span>
        </div>
        <div>
          <div className="text-sm font-medium">Alex Dupont</div>
          <div className="text-xs text-gray-500">HR Manager</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
