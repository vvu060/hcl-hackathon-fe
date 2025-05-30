import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy users for demonstration
const DUMMY_USERS: User[] = [
  {
    id: '1',
    email: 'admin@shiftly.com',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '2',
    email: 'user@shiftly.com',
    name: 'John Doe',
    role: 'user',
  },
];

// Dummy credentials
const DUMMY_CREDENTIALS = [
  { email: 'admin@shiftly.com', password: 'admin123' },
  { email: 'user@shiftly.com', password: 'user123' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('shiftly_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('shiftly_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check credentials
    const credential = DUMMY_CREDENTIALS.find(
      (cred) => cred.email === email && cred.password === password
    );

    if (credential) {
      const userData = DUMMY_USERS.find((u) => u.email === email);
      if (userData) {
        setUser(userData);
        localStorage.setItem('shiftly_user', JSON.stringify(userData));
        return true;
      }
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shiftly_user');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isAdmin,
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
