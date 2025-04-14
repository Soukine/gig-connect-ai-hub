
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavLogo } from "./navbar/NavLogo";
import { NavDesktopMenu } from "./navbar/NavDesktopMenu";
import { NavSearch } from "./navbar/NavSearch";
import { NavActions } from "./navbar/NavActions";
import { NavMobile } from "./navbar/NavMobile";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const isLoggedIn = false; // Replace with actual authentication check when implemented
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b">
      <nav className="container mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center">
          <NavLogo />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          <NavDesktopMenu />
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 justify-center px-4 max-w-md">
          <NavSearch />
        </div>

        {/* Desktop Actions */}
        <NavActions isLoggedIn={isLoggedIn} />

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
      {isMobile && (
        <NavMobile 
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen} 
          setSearchOpen={setSearchOpen} 
        />
      )}

      {/* Search Dialog - rendered outside to be accessed from both desktop and mobile */}
      {!isMobile && searchOpen && (
        <NavSearch />
      )}
    </header>
  );
};

export default Navbar;
