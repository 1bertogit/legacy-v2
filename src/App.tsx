import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { MockAuthProvider, useMockAuth } from './hooks/useMockAuth';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Academy from './pages/Academy';
import Mentoring from './pages/Mentoring';
import ClinicalCases from './pages/ClinicalCases';
import Microlearning from './pages/Microlearning';
import Protocols from './pages/Protocols';
import Library from './pages/Library';
import Calendar from './pages/Calendar';
import Marketing from './pages/Marketing';
import WhatsAppLibrary from './pages/WhatsAppLibrary';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Help from './pages/Help';

// Loading component
const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e] flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white/60 text-lg">Carregando Legacy Mentoring...</p>
    </div>
  </div>
);

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useMockAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  // Temporariamente permitir acesso sem autenticação
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  return <>{children}</>;
};

// Public Route Component (redirect if authenticated)
interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user, loading } = useMockAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// App Routes Component
const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      
      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="academy" element={<Academy />} />
        <Route path="mentoring" element={<Mentoring />} />
        <Route path="clinical-cases" element={<ClinicalCases />} />
        <Route path="microlearning" element={<Microlearning />} />
        <Route path="protocols" element={<Protocols />} />
        <Route path="library" element={<Library />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="marketing" element={<Marketing />} />
        <Route path="whatsapp-library" element={<WhatsAppLibrary />} />
        <Route path="messages" element={<Messages />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
      </Route>
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <MockAuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </MockAuthProvider>
  );
}

export default App;