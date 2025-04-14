
import { useNavigate } from "react-router-dom";
import { Bell, MessageSquare, Bookmark, User, Settings, FileCheck, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface NavActionsProps {
  isLoggedIn: boolean;
}

export const NavActions = ({ isLoggedIn }: NavActionsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handlePublishClick = () => {
    navigate("/post-project");
  };
  
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "Aucune nouvelle notification pour le moment",
    });
  };
  
  const handleMessageClick = () => {
    navigate("/messages");
  };
  
  const handleLoginClick = () => {
    navigate("/auth");
  };
  
  return (
    <div className="hidden md:flex items-center space-x-2">
      {isLoggedIn ? (
        <>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={handleNotificationClick}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-gigconnect-green"></span>
          </Button>

          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleMessageClick}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
          >
            <Bookmark className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="@user" />
                  <AvatarFallback className="bg-gigconnect-lightpurple text-gigconnect-purple">
                    U
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Mon profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <FileCheck className="mr-2 h-4 w-4" />
                  <span>Mes projets</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/messages")}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Messages</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            size="sm"
            className="bg-gigconnect-purple hover:bg-gigconnect-darkpurple rounded-full"
            onClick={handlePublishClick}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Publier
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outline"
            onClick={handleLoginClick}
            className="rounded-full"
          >
            Se connecter
          </Button>
          <Button 
            className="bg-gigconnect-purple hover:bg-gigconnect-darkpurple rounded-full"
            onClick={handlePublishClick}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Publier
          </Button>
        </>
      )}
    </div>
  );
};
