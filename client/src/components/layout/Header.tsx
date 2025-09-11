import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, User, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter"; // Keep useLocation
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Logo } from "@/components/ui/logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logoutMutation } = useAuth();
  console.log("user",user)
  // console.log("user",user) // Removed console log
  const [location, navigate] = useLocation(); // Get the current location

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleLogin = () => {
    navigate("/auth");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "U";
    // Check both possible locations for the first name based on the updated User type
    const firstName = user.firstname || user.user?.firstname;
    // If neither location yields a truthy first name, return default
    if (!firstName) return "U";
    // Otherwise, return the uppercase initial
    return firstName.charAt(0).toUpperCase();
  };

  // Helper function to determine link class
  const getLinkClass = (path: string) => {
    return location === path
      ? "text-primary transition" // Active link class
      : "text-foreground hover:text-primary transition"; // Default link class
  };

  return (
    <header className="bg-background py-3 px-4 md:px-8 sticky top-0 z-50 border-b border-border overflow-hidden">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link href="/market" className={getLinkClass("/market")}>
            Market
          </Link>
          <Link href="/about" className={getLinkClass("/about")}>
            About
          </Link>
          {/* <Link href="/fees" className={getLinkClass("/fees")}>
            Fees
          </Link> */}
          <Link href="/help" className={getLinkClass("/help")}>
            Help
          </Link>
          <a href="https://hot.hamma.trade" target="_blank" rel="noopener noreferrer" className={getLinkClass("/university")}>
            University
          </a>
          <a href="https://hamma.trade" target="_blank" rel="noopener noreferrer" className={getLinkClass("/hamma-trade")}>
            Prop Trading
          </a>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {/* Use the same logic to display the first name */}
                    <p className="font-medium truncate">{user?.firstname || user.user?.firstname || "-"}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                {/* Removed Dashboard link */}
                <DropdownMenuItem asChild>
                  <a href={`https://www.gohamma.com/?token=${localStorage.getItem("access_token")}&refresh_token=${localStorage.getItem("refresh_token")}`} target="_blank" className="cursor-pointer w-full flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer w-full flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="hidden md:flex"
                asChild
              >
                <a href="https://www.gohamma.com/login" target="_blank" rel="noopener noreferrer">Log In</a>
              </Button>
              <Button asChild>
                <a href="https://www.gohamma.com/register" target="_blank" rel="noopener noreferrer">Sign Up</a>
              </Button>
            </>
          )}
          
          <button className="md:hidden text-foreground" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border mt-4">
          <div className="flex flex-col py-4 px-4">
            <Link href="/" className={`py-2 ${getLinkClass("/")}`} onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/market" className={`py-2 ${getLinkClass("/market")}`} onClick={toggleMenu}>
              Market
            </Link>
            <Link href="/about" className={`py-2 ${getLinkClass("/about")}`} onClick={toggleMenu}>
              About
            </Link>
            {/* <Link href="/fees" className={`py-2 ${getLinkClass("/fees")}`} onClick={toggleMenu}>
              Fees
            </Link> */}
            <Link href="/help" className={`py-2 ${getLinkClass("/help")}`} onClick={toggleMenu}>
              Help
            </Link>
            <a href="https://hot.hamma.trade" target="_blank" rel="noopener noreferrer" className={`py-2 ${getLinkClass("/university")}`} onClick={toggleMenu}>
              University
            </a>
            <a href="https://hamma.trade" target="_blank" rel="noopener noreferrer" className={`py-2 ${getLinkClass("/hamma-trade")}`} onClick={toggleMenu}>
              Prop Trading
            </a>
            {!user && (
              <a href="https://www.gohamma.com/register" target="_blank" rel="noopener noreferrer" className={`py-2 ${getLinkClass("/auth")}`} onClick={toggleMenu}>
                Log In / Sign Up
              </a>
            )}
             {/* Add active state for dashboard/settings in mobile if needed */}
            {user && (
              <>
                {/* Removed Dashboard link */}
                {/* <Link href="/dashboard" className={`py-2 ${getLinkClass("/dashboard")} flex items-center`} onClick={toggleMenu}>
                   <User className="mr-2 h-4 w-4" /> Dashboard
                </Link> */}
                 <Link href="/settings" className={`py-2 ${getLinkClass("/settings")} flex items-center`} onClick={toggleMenu}>
                   <Settings className="mr-2 h-4 w-4" /> Settings
                </Link>
                <button
                  onClick={() => { handleLogout(); toggleMenu(); }}
                  className="py-2 text-left text-foreground hover:text-primary transition flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Log Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
