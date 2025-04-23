import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (user: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('dental_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        // Invalid stored data
        localStorage.removeItem('dental_user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Find user with matching credentials
      const user = mockUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (user) {
        // Create a copy without the password for storage
        const { password: _, ...userWithoutPassword } = user;
        const secureUser = { ...userWithoutPassword, id: user.id };
        
        // Store in localStorage
        localStorage.setItem('dental_user', JSON.stringify(secureUser));
        
        setAuthState({
          user: secureUser as User,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return true;
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Invalid email or password',
        });
        return false;
      }
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'An error occurred during login',
      });
      return false;
    }
  };

  const signup = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Check if email already exists
      const existingUser = mockUsers.find(
        u => u.email.toLowerCase() === userData.email.toLowerCase()
      );

      if (existingUser) {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Email already in use',
        }));
        return false;
      }

      // In a real app, you would create the user in the database
      // For this demo, we'll just simulate a successful signup
      
      // Create a new user object with an ID
      const newUser: User = {
        ...userData,
        id: `user-${Date.now()}`,
      };

      // Create a copy without the password for storage
      const { password: _, ...userWithoutPassword } = newUser;
      const secureUser = { ...userWithoutPassword, id: newUser.id };
      
      // Store in localStorage
      localStorage.setItem('dental_user', JSON.stringify(secureUser));
      
      setAuthState({
        user: secureUser as User,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      return true;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'An error occurred during signup',
      }));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('dental_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
