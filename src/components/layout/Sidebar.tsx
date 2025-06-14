import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Settings, Users, Briefcase, LogOut, LogIn, Search, MessageSquare, Folders } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-64 h-screen bg-white fixed left-0 top-0 shadow-md flex flex-col">
      <div className="p-4 flex items-center gap-3">
        <img 
          src="/lovable-uploads/add27bbf-284b-4ea1-ab3e-b9ec42eb3ce3.png" 
          alt="RHIA Copilot" 
          className="h-10 w-auto"
        />
        <span className="font-jakarta font-extrabold text-lg">RHIA Copilot</span>
      </div>
      
      <nav className="mt-8">
        <ul className="space-y-1">
          <li>
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-3 px-4 py-3 ${
                isActive("/dashboard") 
                ? "bg-blue-50 text-primary font-medium" 
                : "text-textGray hover:bg-gray-100"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" 
                stroke={isActive("/dashboard") ? "#2563EB" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                location.pathname.includes("/candidates") 
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
                location.pathname.includes("/job-postings") 
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
              to="/hunter" 
              className={`flex items-center gap-3 px-4 py-3 ${
                isActive("/hunter") 
                ? "bg-blue-50 text-primary font-medium" 
                : "text-textGray hover:bg-gray-100"
              }`}
            >
              <Search size={20} />
              Hunter
            </Link>
          </li>
          <li>
            <Link 
              to="/collection" 
              className={`flex items-center gap-3 px-4 py-3 ${
                isActive("/collection") 
                ? "bg-blue-50 text-primary font-medium" 
                : "text-textGray hover:bg-gray-100"
              }`}
            >
              <Folders size={20} />
              Collection
            </Link>
          </li>
          <li>
            <Link 
              to="/brief" 
              className={`flex items-center gap-3 px-4 py-3 ${
                isActive("/brief") 
                ? "bg-blue-50 text-primary font-medium" 
                : "text-textGray hover:bg-gray-100"
              }`}
            >
              <MessageSquare size={20} />
              Brief avec l'IA
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
      
      <div className="mt-auto mb-4 mx-4 pt-4 border-t border-gray-200">
        {user ? (
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 font-medium">
                  {user.user_metadata?.name?.split(' ').map((n: string) => n[0]).join('') || 
                   user.email?.substring(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <div className="text-sm font-medium">
                  {user.user_metadata?.name || user.email}
                </div>
                <div className="text-xs text-gray-500">HR Manager</div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        ) : (
          <Link 
            to="/login"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <LogIn size={16} />
            Connexion
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
