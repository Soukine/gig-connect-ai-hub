
import { Link } from "react-router-dom";

export const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gigconnect-purple text-white font-semibold">
        5
      </div>
      <span className="font-bold text-xl hidden sm:inline-block">5's</span>
    </Link>
  );
};
