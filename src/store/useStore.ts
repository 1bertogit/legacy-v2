import { create } from 'zustand'
import { User } from '../lib/supabase'

interface AppState {
  // Auth state
  user: User | null
  isAuthenticated: boolean
  
  // UI state
  sidebarOpen: boolean
  theme: 'dark' | 'light'
  
  // Navigation state
  currentPage: string
  
  // Loading states
  loading: {
    auth: boolean
    courses: boolean
    cases: boolean
    sessions: boolean
  }
  
  // Actions
  setUser: (user: User | null) => void
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'dark' | 'light') => void
  setCurrentPage: (page: string) => void
  setLoading: (key: keyof AppState['loading'], value: boolean) => void
}

export const useStore = create<AppState>((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  sidebarOpen: true,
  theme: 'dark',
  currentPage: 'dashboard',
  loading: {
    auth: true,
    courses: false,
    cases: false,
    sessions: false
  },
  
  // Actions
  setUser: (user) => set((state) => ({ 
    user, 
    isAuthenticated: !!user 
  })),
  
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  setTheme: (theme) => set({ theme }),
  
  setCurrentPage: (page) => set({ currentPage: page }),
  
  setLoading: (key, value) => set((state) => ({
    loading: {
      ...state.loading,
      [key]: value
    }
  }))
}))