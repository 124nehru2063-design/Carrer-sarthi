import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  class?: '10' | '12';
  stream?: 'science' | 'commerce' | 'arts';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  class: '10' | '12';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Mock login - in production this would call the FastAPI backend
    try {
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: email === 'admin@example.com' ? 'admin' : 'student',
        class: '12',
        stream: 'science'
      };
      
      const mockToken = 'mock-jwt-token';
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    
    // Mock registration - in production this would call the FastAPI backend
    try {
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        role: 'student',
        class: data.class
      };
      
      const mockToken = 'mock-jwt-token';
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('user_data', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}