import { useState, useEffect, createContext, useContext } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase, auth, db, User } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  updateProfile: (updates: Partial<User>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (session?.user) {
        await loadUserProfile(session.user.id);
      }
      
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          await loadUserProfile(session.user.id);
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      console.log('🔍 [DEBUG useAuth] Carregando perfil do usuário:', userId);
      const { data: profile, error } = await db.getUserProfile(userId);
      console.log('🔍 [DEBUG useAuth] Perfil carregado:', profile);
      
      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const newProfile = {
            id: user.id,
            email: user.email!,
            name: user.user_metadata?.name || '',
            phone: user.user_metadata?.phone || '',
            crm: user.user_metadata?.crm || '',
            specialty: user.user_metadata?.specialty || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          
          const { data: createdProfile } = await db.createUserProfile(newProfile);
          setUser(createdProfile || newProfile);
          console.log('🔍 [DEBUG useAuth] Usuário definido no estado:', createdProfile || newProfile);
        }
      } else if (profile) {
        setUser(profile);
        console.log('🔍 [DEBUG useAuth] Usuário definido no estado:', profile);
      } else {
        console.log('🔍 [DEBUG useAuth] Nenhum perfil encontrado para o usuário');
      }
    } catch (error) {
      console.error('🔍 [DEBUG useAuth] Erro ao carregar perfil:', error);
    }
  };

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    setLoading(true);
    const { data, error } = await auth.signUp(email, password, userData);
    setLoading(false);
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔍 [DEBUG useAuth] Tentando fazer login com Supabase...');
      console.log('🔍 [DEBUG useAuth] Email:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('🔍 [DEBUG useAuth] Resposta do Supabase:', { data, error });

      if (error) {
        console.error('🔍 [DEBUG useAuth] Erro na autenticação:', error);
        throw error;
      }

      if (data.user) {
        console.log('🔍 [DEBUG useAuth] Usuário autenticado, carregando perfil...');
        await loadUserProfile(data.user.id);
      }

      return { data, error: null };
    } catch (error: any) {
      console.error('🔍 [DEBUG useAuth] Erro no signIn:', error);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    setLoading(true);
    const { error } = await auth.signOut();
    if (!error) {
      setUser(null);
      setSession(null);
    }
    setLoading(false);
    return { error };
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return { error: new Error('No user logged in') };
    
    setLoading(true);
    const { data, error } = await db.updateUserProfile(user.id, {
      ...updates,
      updated_at: new Date().toISOString()
    });
    
    if (data) {
      setUser(data);
    }
    
    setLoading(false);
    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;