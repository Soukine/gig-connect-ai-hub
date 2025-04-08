
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Search,
  Bell,
  MessageSquare,
  Menu,
  X,
  UserPlus,
  Home,
  Users,
  FileCheck
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b">
      <nav className="container mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gigconnect-purple text-white font-semibold">
              G
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">GigConnect</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="hidden md:flex flex-1 justify-center px-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Rechercher des talents ou des projets..."
                className="landing-input pl-10"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        )}

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-gigconnect-green"></span>
          </Button>

          <Button variant="ghost" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>

          <Link to="/profile">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="@user" />
              <AvatarFallback className="bg-gigconnect-lightpurple text-gigconnect-purple">
                U
              </AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex items-center space-x-2">
            <Button size="sm" className="bg-gigconnect-purple hover:bg-gigconnect-darkpurple">
              Publier
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        )}
      </nav>

      {/* Mobile Navigation */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-40 flex flex-col gap-4 bg-background p-4 md:hidden animate-fade-in">
          <div className="flex flex-col space-y-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher des talents ou des projets..."
                className="landing-input pl-10"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>

            <Link 
              to="/" 
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>Accueil</span>
            </Link>

            <Link 
              to="/explore" 
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Users className="h-5 w-5" />
              <span>Explorer</span>
            </Link>

            <Link 
              to="/jobs" 
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileCheck className="h-5 w-5" />
              <span>Projets</span>
            </Link>

            <Link 
              to="/messages" 
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
            </Link>

            <Link 
              to="/notifications" 
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </Link>

            <div className="mt-4">
              <Button className="w-full bg-gigconnect-purple hover:bg-gigconnect-darkpurple">
                Publier une annonce
              </Button>
            </div>
            
            <div className="mt-2">
              <Button variant="outline" className="w-full">
                <UserPlus className="mr-2 h-4 w-4" />
                S'inscrire / Se connecter
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
