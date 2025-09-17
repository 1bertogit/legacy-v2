import { useState, useEffect, createContext, useContext } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { User } from '../lib/supabase';

interface MockAuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  updateProfile: (updates: Partial<User>) => Promise<{ error: any }>;
  loginAsDemo: () => void;
}

const MockAuthContext = createContext<MockAuthContextType | undefined>(undefined);

export const useMockAuth = () => {
  const context = useContext(MockAuthContext);
  if (context === undefined) {
    throw new Error('useMockAuth must be used within a MockAuthProvider');
  }
  return context;
};

// Mock user data
const mockUser: User = {
  id: 'demo-user-123',
  email: 'demo@mentoria.com',
  name: 'Usuário Demo',
  phone: '(11) 99999-9999',
  crm: 'CRM123456',
  specialty: 'Cardiologia',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

// Mock session data
const mockSession: Session = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  expires_at: Date.now() / 1000 + 3600,
  token_type: 'bearer',
  user: {
    id: mockUser.id,
    email: mockUser.email,
    aud: 'authenticated',
    role: 'authenticated',
    email_confirmed_at: new Date().toISOString(),
    phone: mockUser.phone,
    confirmed_at: new Date().toISOString(),
    last_sign_in_at: new Date().toISOString(),
    app_metadata: {},
    user_metadata: {
      name: mockUser.name,
      crm: mockUser.crm,
      specialty: mockUser.specialty
    },
    identities: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  } as SupabaseUser
};

export const MockAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user was previously logged in as demo
    const isDemoMode = localStorage.getItem('demo-mode') === 'true';
    if (isDemoMode) {
      setUser(mockUser);
      setSession(mockSession);
    }
    setLoading(false);
  }, []);

  const loginAsDemo = () => {
    console.log('🎭 [MOCK AUTH] Fazendo login como usuário demo');
    setUser(mockUser);
    setSession(mockSession);
    localStorage.setItem('demo-mode', 'true');
  };

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    console.log('🎭 [MOCK AUTH] SignUp simulado');
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    console.log('🎭 [MOCK AUTH] SignIn simulado');
    // Simular login bem-sucedido
    loginAsDemo();
    return { error: null };
  };

  const signOut = async () => {
    console.log('🎭 [MOCK AUTH] SignOut simulado');
    setUser(null);
    setSession(null);
    localStorage.removeItem('demo-mode');
    return { error: null };
  };

  const updateProfile = async (updates: Partial<User>) => {
    console.log('🎭 [MOCK AUTH] UpdateProfile simulado');
    if (user) {
      const updatedUser = { ...user, ...updates, updated_at: new Date().toISOString() };
      setUser(updatedUser);
    }
    return { error: null };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    loginAsDemo
  };

  return (
    <MockAuthContext.Provider value={value}>
      {children}
    </MockAuthContext.Provider>
  );
};

export default MockAuthProvider;