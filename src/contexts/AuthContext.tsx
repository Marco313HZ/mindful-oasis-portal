
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '@/services/api';

interface User {
  id: string;
  email: string;
  role: 'SuperAdmin' | 'Doctor' | 'Patient';
  full_name: string;
  phone?: string;
  is_active: boolean;
  is_verified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (userData: any, role: 'admin' | 'doctor' | 'patient') => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      
      if (!response.user.is_verified) {
        throw new Error('Please verify your email before signing in');
      }

      if (!response.user.is_active) {
        throw new Error('Your account is not active. Please contact support.');
      }

      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userData', JSON.stringify(response.user));
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const signup = async (userData: any, role: 'admin' | 'doctor' | 'patient') => {
    try {
      let response;
      switch (role) {
        case 'admin':
          response = await authAPI.signupAdmin(userData);
          break;
        case 'doctor':
          response = await authAPI.signupDoctor(userData);
          break;
        case 'patient':
          response = await authAPI.signupPatient(userData);
          break;
        default:
          throw new Error('Invalid role');
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const verifyEmail = async (email: string, code: string) => {
    try {
      const response = await authAPI.verifyEmail(email, code);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    signup,
    verifyEmail,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
