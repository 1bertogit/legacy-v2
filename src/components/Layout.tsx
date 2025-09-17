import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import {
  Home,
  GraduationCap,
  Users,
  FileText,
  Play,
  BookOpen,
  Library,
  Calendar,
  TrendingUp,
  MessageSquare,
  User,
  Settings,
  HelpCircle,
  Mail,
  Menu,
  X,
  Stethoscope,
  Bell,
  Search,
  LogOut
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useMockAuth } from '../hooks/useMockAuth';
import GlassCard from './GlassCard';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: number;
}

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useMockAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Academy', href: '/academy', icon: GraduationCap },
    { name: 'Mentoria', href: '/mentoring', icon: Users },
    { name: 'Casos Clínicos', href: '/clinical-cases', icon: FileText },
    { name: 'Microaulas', href: '/microlessons', icon: Play },
    { name: 'Protocolos', href: '/protocols', icon: BookOpen },
    { name: 'Biblioteca', href: '/library', icon: Library },
    { name: 'Calendário', href: '/calendar', icon: Calendar },
    { name: 'Marketing', href: '/marketing', icon: TrendingUp },
    { name: 'WhatsApp', href: '/whatsapp-library', icon: MessageSquare, badge: 3 },
    { name: 'Mensagens', href: '/messages', icon: Mail, badge: 5 },
    { name: 'Perfil', href: '/profile', icon: User },
    { name: 'Configurações', href: '/settings', icon: Settings },
    { name: 'Ajuda', href: '/help', icon: HelpCircle }
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-400/10" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-400/10" />
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-cyan-500/3 blur-3xl dark:bg-cyan-400/5" />
      </div>

      {/* Sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm dark:bg-black/70"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Navegação principal"
      >
        <GlassCard
          variant="surface"
          padding="none"
          rounded="none"
          className="h-full flex flex-col"
        >
          {/* Sidebar Header */}
          <header className="border-b border-white/10 p-6 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-2 dark:from-blue-400/30 dark:to-purple-400/30">
                  <Stethoscope className="h-6 w-6 text-blue-400 dark:text-blue-300" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white dark:text-gray-100">Legacy</h1>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Mentoring Platform</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                aria-label="Fechar menu de navegação"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 overflow-y-auto p-4" aria-label="Menu de navegação">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? 'border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white dark:border-blue-400/40 dark:from-blue-400/30 dark:to-purple-400/30 dark:text-gray-100'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                  aria-current={active ? 'page' : undefined}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-5 w-5 ${
                      active ? 'text-blue-400 dark:text-blue-300' : 'text-gray-400 group-hover:text-white dark:text-gray-500 dark:group-hover:text-gray-200'
                    }`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="rounded-full bg-red-500 px-2 py-1 text-xs text-white dark:bg-red-600" aria-label={`${item.badge} notificações`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <footer className="border-t border-white/10 p-4 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="group flex w-full items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-all hover:bg-red-500/20 hover:text-white focus:bg-red-500/20 focus:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 dark:text-gray-400 dark:hover:bg-red-600/20 dark:hover:text-gray-200"
              aria-label="Sair da plataforma"
            >
              <LogOut className="h-5 w-5 text-gray-400 group-hover:text-red-400 dark:text-gray-500 dark:group-hover:text-red-400" />
              <span>Sair</span>
            </button>
          </footer>
        </GlassCard>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 px-4 py-3 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                aria-label="Abrir menu de navegação"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-lg border border-white/20 bg-white/10 py-2 pl-10 pr-4 text-white placeholder-gray-400 transition-all focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-400/50 dark:focus:ring-blue-400/50"
                  aria-label="Campo de busca"
                />
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-200">
                <Bell className="h-6 w-6" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                  {user?.avatar_url ? (
                    <img 
                      src={user.avatar_url} 
                      alt={user.name} 
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white dark:text-gray-100">{user?.name || 'Usuário'}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{user?.specialty || 'Médico'}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6" role="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;