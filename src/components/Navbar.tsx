
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  FileCheck,
  User,
  Bookmark,
  Settings,
  PlusCircle
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { CommandDialog, CommandInput, Command, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { useToast } from "@/hooks/use-toast";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isMobile = useIsMobile();
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
  
  const handleSearchResultClick = (path: string) => {
    setSearchOpen(false);
    navigate(path);
  };
  
  const handleLoginClick = () => {
    navigate("/auth");
  };
  
  const isLoggedIn = false; // Replace with actual authentication check when implemented
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b">
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
        <div className="hidden lg:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm">Explorer</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4 grid grid-cols-2 gap-3">
                    <Link 
                      to="/explore" 
                      className="flex flex-col p-3 rounded-md hover:bg-accent"
                      onClick={() => navigate("/explore")}
                    >
                      <div className="flex items-center gap-2 font-medium">
                        <Users className="h-4 w-4" /> 
                        Freelances
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Trouvez des talents pour vos projets</p>
                    </Link>
                    <Link 
                      to="/jobs" 
                      className="flex flex-col p-3 rounded-md hover:bg-accent"
                      onClick={() => navigate("/jobs")}
                    >
                      <div className="flex items-center gap-2 font-medium">
                        <FileCheck className="h-4 w-4" /> 
                        Projets
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Découvrez les dernières opportunités</p>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/jobs" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Projets
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 justify-center px-4 max-w-md">
          <Button 
            variant="outline" 
            className="relative w-full h-10 justify-start pl-10 text-muted-foreground border border-input rounded-full"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <span>Rechercher des talents ou des projets...</span>
          </Button>
        </div>

        {/* Desktop Actions */}
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
                  handleLoginClick();
                }}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                S'inscrire / Se connecter
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Command Dialog (Search) */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Rechercher des talents ou des projets..." />
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <CommandGroup heading="Catégories populaires">
              <CommandItem onSelect={() => handleSearchResultClick("/explore?category=design")}>
                Design & Créativité
              </CommandItem>
              <CommandItem onSelect={() => handleSearchResultClick("/explore?category=dev")}>
                Développement Web & Mobile
              </CommandItem>
              <CommandItem onSelect={() => handleSearchResultClick("/explore?category=marketing")}>
                Marketing Digital
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Talents populaires">
              <CommandItem onSelect={() => handleSearchResultClick("/freelance/1")}>
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <span>Sophie Martin</span>
                </div>
                <span className="ml-2 text-xs text-muted-foreground">Designer UX/UI</span>
              </CommandItem>
              <CommandItem onSelect={() => handleSearchResultClick("/freelance/2")}>
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarFallback>TD</AvatarFallback>
                  </Avatar>
                  <span>Thomas Dubois</span>
                </div>
                <span className="ml-2 text-xs text-muted-foreground">Développeur Full Stack</span>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Projets récents">
              <CommandItem onSelect={() => handleSearchResultClick("/project/1")}>Refonte complète d'un site e-commerce</CommandItem>
              <CommandItem onSelect={() => handleSearchResultClick("/project/2")}>Création d'identité visuelle pour startup</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </header>
  );
};

export default Navbar;
