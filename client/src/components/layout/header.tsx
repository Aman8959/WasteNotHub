import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogOut, Menu } from "lucide-react";

const Header = () => {
  const [location] = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Products", path: "/products" },
    { name: "Agents", path: "/agents" },
    { name: "Donate", path: "/donate" },
  ];

  return (
    <header className="bg-gray-900 shadow-md border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <i className="fas fa-recycle text-white text-3xl mr-2"></i>
            <span className="font-heading font-bold text-2xl text-white">WasteNot</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                href={link.path}
                className={`font-heading font-medium ${
                  location === link.path
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                } transition`}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 text-white">
                    <User className="h-5 w-5 mr-2" />
                    <span className="font-heading font-medium">{user?.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                  <DropdownMenuItem onClick={logout} className="text-white hover:bg-gray-700">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link 
                  href="/login"
                  className="font-heading font-medium text-gray-400 hover:text-white transition"
                >
                  Login
                </Link>
                <Link href="/signup">
                  <Button className="font-heading font-medium bg-gray-800 text-white hover:bg-gray-700">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block py-2 font-heading font-medium ${
                  location === link.path
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                } transition`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <Button 
                variant="ghost" 
                className="w-full justify-start p-2 font-heading font-medium text-white"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block py-2 font-heading font-medium text-gray-400 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block py-2 font-heading font-medium text-center bg-gray-800 text-white rounded hover:bg-gray-700 mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
