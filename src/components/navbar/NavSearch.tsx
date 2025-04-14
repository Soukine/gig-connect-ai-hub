
import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CommandDialog, CommandInput, Command, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const NavSearch = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleSearchResultClick = (path: string) => {
    setSearchOpen(false);
    navigate(path);
  };
  
  return (
    <>
      <Button 
        variant="outline" 
        className="relative w-full h-10 justify-start pl-10 text-muted-foreground border border-input rounded-full"
        onClick={() => setSearchOpen(true)}
      >
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <span>Rechercher des talents ou des projets...</span>
      </Button>
      
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
    </>
  );
};
