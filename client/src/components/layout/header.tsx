import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Menu, Settings, Package } from "lucide-react";

const Header = () => {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
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
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 text-white">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={`https://avatar.vercel.sh/${user.username}`} alt={user.username} />
                      <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-heading font-medium">{user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                  <DropdownMenuItem asChild className="text-white hover:bg-gray-700">
                    <Link href="/profile">
                      <User className="h-4 w-4 mr-2" />
                      प्रोफाइल
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-white hover:bg-gray-700">
                    <Link href="/products">
                      <Package className="h-4 w-4 mr-2" />
                      प्रोडक्ट्स
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-white hover:bg-gray-700">
                    <Link href="/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      सेटिंग्स
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => logoutMutation.mutate()} 
                    className="text-white hover:bg-gray-700"
                    disabled={logoutMutation.isPending}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {logoutMutation.isPending ? "लॉग आउट हो रहा है..." : "लॉग आउट"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link 
                  href="/auth"
                  className="font-heading font-medium text-gray-400 hover:text-white transition"
                >
                  लॉगिन
                </Link>
                <Link href="/auth">
                  <Button className="font-heading font-medium bg-gray-800 text-white hover:bg-gray-700">
                    रजिस्टर
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
            
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="block py-2 font-heading font-medium text-gray-400 hover:text-white flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  प्रोफाइल
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start p-2 font-heading font-medium text-white"
                  onClick={() => {
                    logoutMutation.mutate();
                    setMobileMenuOpen(false);
                  }}
                  disabled={logoutMutation.isPending}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {logoutMutation.isPending ? "लॉग आउट हो रहा है..." : "लॉग आउट"}
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/auth"
                  className="block py-2 font-heading font-medium text-gray-400 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  लॉगिन
                </Link>
                <Link
                  href="/auth"
                  className="block py-2 font-heading font-medium text-center bg-gray-800 text-white rounded hover:bg-gray-700 mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  रजिस्टर
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
