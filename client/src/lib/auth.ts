import { useState, useEffect } from 'react';
import { apiRequest } from './queryClient';
import { useToast } from "@/hooks/use-toast";

// User type
export interface User {
  id: number;
  username: string;
  email: string;
  name?: string;
}

// Login credentials type
export interface LoginCredentials {
  username: string;
  password: string;
}

// Registration data type
export interface RegisterData {
  username: string;
  password: string;
  email: string;
  name?: string;
}

// Hook to manage authentication state
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing user session on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const response = await apiRequest('POST', '/api/auth/login', credentials);
      const userData = await response.json();
      
      // Store user data in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.username}!`,
      });
      
      return { success: true, user: userData };
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
      
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      const response = await apiRequest('POST', '/api/auth/register', data);
      const userData = await response.json();
      
      toast({
        title: "Registration successful",
        description: "Your account has been created",
      });
      
      return { success: true, user: userData };
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
      
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}
