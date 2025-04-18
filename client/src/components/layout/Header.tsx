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
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Logo } from "@/components/ui/logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logoutMutation } = useAuth();
  console.log("user",user)
  const [, navigate] = useLocation();

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
    if (!user || !user?.user?.firstname) return "U";
    return user?.user?.firstname.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-background py-3 px-4 md:px-8 sticky top-0 z-50 border-b border-border overflow-hidden">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-foreground hover:text-primary transition">
            Home
          </Link>
          <Link href="/market" className="text-foreground hover:text-primary transition">
            Market
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary transition">
            About
          </Link>
          <Link href="/fees" className="text-foreground hover:text-primary transition">
            Fees
          </Link>
          <Link href="/help" className="text-foreground hover:text-primary transition">
            Help
          </Link>
          <Link href="/university" className="text-foreground hover:text-primary transition">
            University
          </Link>
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
                    <p className="font-medium">{user?.user?.firstname||"-"}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer w-full flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
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
                <Link href="/auth">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth">Sign Up</Link>
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
            <Link href="/" className="py-2 text-foreground hover:text-primary transition">
              Home
            </Link>
            <Link href="/market" className="py-2 text-foreground hover:text-primary transition">
              Market
            </Link>
            <Link href="/about" className="py-2 text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="/fees" className="py-2 text-foreground hover:text-primary transition">
              Fees
            </Link>
            <Link href="/help" className="py-2 text-foreground hover:text-primary transition">
              Help
            </Link>
            <Link href="/university" className="py-2 text-foreground hover:text-primary transition">
              University
            </Link>
            {!user && (
              <Link href="/auth" className="py-2 text-foreground hover:text-primary transition">
                Log In / Sign Up
              </Link>
            )}
            {user && (
              <button 
                onClick={handleLogout}
                className="py-2 text-left text-foreground hover:text-primary transition"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
