
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Settings, Users, Briefcase, LogOut, LogIn, Search, MessageSquare, Folders, PanelLeftClose, PanelLeftOpen, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Update CSS variable when sidebar state changes
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width', 
      isCollapsed ? '64px' : '256px'
    );
  }, [isCollapsed]);
  
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

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} h-screen bg-white fixed left-0 top-0 shadow-md flex flex-col transition-all duration-300 ease-in-out z-50`}>
      {/* Header avec logo et bouton collapse */}
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/add27bbf-284b-4ea1-ab3e-b9ec42eb3ce3.png" 
              alt="RHIA Copilot" 
              className="h-10 w-auto"
            />
            <span className="font-jakarta font-extrabold text-lg">RHIA Copilot</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-md"
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-5 w-5 text-gray-600" />
          ) : (
            <PanelLeftClose className="h-5 w-5 text-gray-600" />
          )}
        </Button>
      </div>
      
      <nav className="mt-4 flex-1 overflow-y-auto">
        {/* ANALYTICS Section */}
        <div className="mb-6">
          {!isCollapsed && (
            <div className="px-4 mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">ANALYTICS</span>
            </div>
          )}
          <ul className="space-y-1">
            <li>
              <Link 
                to="/dashboard" 
                className={`flex items-center gap-3 px-4 py-3 ${
                  isActive("/dashboard") 
                  ? "bg-blue-50 text-primary font-medium" 
                  : "text-textGray hover:bg-gray-100"
                }`}
                title={isCollapsed ? "Dashboard" : ""}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" 
                  stroke={isActive("/dashboard") ? "#2563EB" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                {!isCollapsed && "Dashboard"}
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
                title={isCollapsed ? "Collection" : ""}
              >
                <BarChart size={20} className="flex-shrink-0" />
                {!isCollapsed && "Collection"}
              </Link>
            </li>
          </ul>
        </div>

        {/* TOOLS Section */}
        <div className="mb-6">
          {!isCollapsed && (
            <div className="px-4 mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">TOOLS</span>
            </div>
          )}
          <ul className="space-y-1">
            <li>
              <Link 
                to="/hunter" 
                className={`flex items-center gap-3 px-4 py-3 ${
                  isActive("/hunter") 
                  ? "bg-blue-50 text-primary font-medium" 
                  : "text-textGray hover:bg-gray-100"
                }`}
                title={isCollapsed ? "Hunter" : ""}
              >
                <Search size={20} className="flex-shrink-0" />
                {!isCollapsed && "Hunter"}
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
                title={isCollapsed ? "Brief avec l'IA" : ""}
              >
                <MessageSquare size={20} className="flex-shrink-0" />
                {!isCollapsed && "Brief avec l'IA"}
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
                title={isCollapsed ? "Candidates" : ""}
              >
                <Users size={20} className="flex-shrink-0" />
                {!isCollapsed && "Candidates"}
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
                title={isCollapsed ? "Job Postings" : ""}
              >
                <Briefcase size={20} className="flex-shrink-0" />
                {!isCollapsed && "Job Postings"}
              </Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT Section */}
        <div className="mb-6">
          {!isCollapsed && (
            <div className="px-4 mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">SUPPORT</span>
            </div>
          )}
          <ul className="space-y-1">
            <li>
              <Link 
                to="/settings" 
                className={`flex items-center gap-3 px-4 py-3 ${
                  isActive("/settings") 
                  ? "bg-blue-50 text-primary font-medium" 
                  : "text-textGray hover:bg-gray-100"
                }`}
                title={isCollapsed ? "Settings" : ""}
              >
                <Settings size={20} className="flex-shrink-0" />
                {!isCollapsed && "Settings"}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="mt-auto mb-4 mx-4 pt-4 border-t border-gray-200">
        {user ? (
          <div className="flex flex-col">
            {!isCollapsed && (
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
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
            )}
            <button 
              onClick={handleLogout}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? "Déconnexion" : ""}
            >
              <LogOut size={16} className="flex-shrink-0" />
              {!isCollapsed && "Déconnexion"}
            </button>
          </div>
        ) : (
          <Link 
            to="/login"
            className={`flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? "Connexion" : ""}
          >
            <LogIn size={16} className="flex-shrink-0" />
            {!isCollapsed && "Connexion"}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
