
import React from 'react';
import { Settings, Focus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  focusMode: boolean;
  onToggleFocus: () => void;
}

const Header: React.FC<HeaderProps> = ({ focusMode, onToggleFocus }) => {
  return (
    <header className="sticky top-0 bg-cream border-b border-sage/20 h-20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-bold text-charcoal">
            Bonjour Camille 👋
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFocus}
            className={`transition-colors ${focusMode ? 'bg-sage text-white' : ''}`}
          >
            <Focus className="h-4 w-4 mr-2" />
            Mode Focus
          </Button>
          
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="Camille" />
                  <AvatarFallback>CM</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
              <DropdownMenuItem>
                Préférences
              </DropdownMenuItem>
              <DropdownMenuItem>
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
