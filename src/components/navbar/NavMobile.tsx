
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Search, Home, Users, FileCheck, MessageSquare, Bell, User, Settings, PlusCircle, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface NavMobileProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
}

export const NavMobile = ({ mobileMenuOpen, setMobileMenuOpen, setSearchOpen }: NavMobileProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "Aucune nouvelle notification pour le moment",
    });
  };
  
  return (
    mobileMenuOpen && (
      <div className="fixed inset-0 top-[65px] z-40 flex flex-col gap-4 bg-background p-4 md:hidden animate-in fade-in">
        <div className="flex flex-col space-y-4">
          {/* Mobile Search Button */}
          <Button 
            variant="outline" 
            className="relative w-full h-10 justify-start pl-10 text-muted-foreground border border-input rounded-full"
            onClick={() => {
              setSearchOpen(true);
              setMobileMenuOpen(false);
            }}
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <span>Rechercher...</span>
          </Button>

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
            <span>Explorer les freelances</span>
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

          <Button 
            variant="ghost"
            className="flex items-center justify-start space-x-2 p-2 rounded-md hover:bg-muted"
            onClick={() => {
              handleNotificationClick();
              setMobileMenuOpen(false);
            }}
          >
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </Button>

          <Link 
            to="/profile" 
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted"
            onClick={() => setMobileMenuOpen(false)}
          >
            <User className="h-5 w-5" />
            <span>Mon profil</span>
          </Link>

          <Link 
            to="/settings" 
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Settings className="h-5 w-5" />
            <span>Paramètres</span>
          </Link>

          <div className="mt-4">
            <Button 
              className="w-full bg-gigconnect-purple hover:bg-gigconnect-darkpurple rounded-full"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/post-project");
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Publier une annonce
            </Button>
          </div>
          
          <div className="mt-2">
            <Button 
              variant="outline" 
              className="w-full rounded-full"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/auth");
              }}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              S'inscrire / Se connecter
            </Button>
          </div>
        </div>
      </div>
    )
  );
};
