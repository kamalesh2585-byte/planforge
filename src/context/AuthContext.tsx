import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'supervisor' | 'operator' | 'analyst';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock credentials for demo
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'admin@planforge.com': {
    password: 'admin123',
    user: {
      id: '1',
      name: 'Admin User',
      email: 'admin@planforge.com',
      role: 'admin',
    },
  },
  'supervisor@planforge.com': {
    password: 'supervisor123',
    user: {
      id: '2',
      name: 'John Supervisor',
      email: 'supervisor@planforge.com',
      role: 'supervisor',
    },
  },
  'operator@planforge.com': {
    password: 'operator123',
    user: {
      id: '3',
      name: 'Jane Operator',
      email: 'operator@planforge.com',
      role: 'operator',
    },
  },
  'analyst@planforge.com': {
    password: 'analyst123',
    user: {
      id: '4',
      name: 'Sarah Analyst',
      email: 'analyst@planforge.com',
      role: 'analyst',
    },
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check demo credentials
      const userRecord = DEMO_USERS[email];
      if (userRecord && userRecord.password === password) {
        setUser(userRecord.user);
        console.log('✅ Login successful:', userRecord.user);
        return true;
      }

      console.error('❌ Invalid credentials for:', email);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    console.log('🚪 Logging out...');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
