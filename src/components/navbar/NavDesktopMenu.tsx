
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { Users, FileCheck } from "lucide-react";

export const NavDesktopMenu = () => {
  const navigate = useNavigate();
  
  return (
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
          <Link to="/jobs" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
            Projets
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
