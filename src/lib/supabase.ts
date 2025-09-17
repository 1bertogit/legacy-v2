import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://clmjlvvyytbkbzatvemi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbWpsdnZ5eXRia2J6YXR2ZW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczODg1MjQsImV4cCI6MjA3Mjk2NDUyNH0.k1Y9b_GBWON8fEab-QZi3nbgtz4pdxJLvF-CxEQ_zR4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  crm?: string;
  specialty?: string;
  avatar_url?: string;
  role?: 'mentor' | 'student';
  created_at: string;
  updated_at: string;
}

// Auth helper functions
export const auth = {
  // Sign up new user
  signUp: async (email: string, password: string, userData: Partial<User>) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { data, error };
  },

  // Sign in user
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  // Sign out user
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // Listen to auth changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Database helper functions
export const db = {
  // Get user profile
  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  // Update user profile
  updateUserProfile: async (userId: string, updates: Partial<User>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  // Create user profile
  createUserProfile: async (profile: Partial<User>) => {
    const { data, error } = await supabase
      .from('profiles')
      .insert([profile])
      .select()
      .single();
    return { data, error };
  }
};

export default supabase;