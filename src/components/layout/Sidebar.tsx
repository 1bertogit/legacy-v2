import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { GlassNavCard } from '../ui/GlassCard'
import { useStore } from '../../store/useStore'
import {
  LayoutDashboard,
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
  ChevronLeft,
  ChevronRight,
  Stethoscope
} from 'lucide-react'

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  category?: string
}

const navigationItems: NavItem[] = [
  // Core
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, category: 'core' },
  { name: 'Academy', href: '/academy', icon: GraduationCap, category: 'core' },
  { name: 'Mentoria', href: '/mentoria', icon: Users, category: 'core' },
  { name: 'Casos Clínicos', href: '/casos-clinicos', icon: Stethoscope, category: 'core' },
  
  // Learning
  { name: 'Microaulas', href: '/microaulas', icon: Play, category: 'learning' },
  { name: 'Protocolos', href: '/protocolos', icon: FileText, category: 'learning' },
  { name: 'Biblioteca', href: '/biblioteca', icon: Library, category: 'learning' },
  
  // Tools
  { name: 'Calendário', href: '/calendario', icon: Calendar, category: 'tools' },
  { name: 'Marketing', href: '/marketing', icon: TrendingUp, category: 'tools' },
  { name: 'Acervo WhatsApp', href: '/acervo-whatsapp', icon: MessageSquare, category: 'tools' },
  
  // Account
  { name: 'Perfil', href: '/profile', icon: User, category: 'account' },
  { name: 'Configurações', href: '/settings', icon: Settings, category: 'account' },
  { name: 'Ajuda', href: '/help', icon: HelpCircle, category: 'account' },
  { name: 'Mensagens', href: '/messages', icon: Mail, badge: '3', category: 'account' }
]

const categoryLabels = {
  core: 'Principal',
  learning: 'Aprendizado',
  tools: 'Ferramentas',
  account: 'Conta'
}

export const Sidebar: React.FC = () => {
  const location = useLocation()
  const { sidebarOpen, setSidebarOpen } = useStore()

  const groupedItems = navigationItems.reduce((acc, item) => {
    const category = item.category || 'other'
    if (!acc[category]) acc[category] = []
    acc[category].push(item)
    return acc
  }, {} as Record<string, NavItem[]>)

  return (
    <>
      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        'fixed left-0 top-0 h-full z-50 transition-all duration-300 ease-out',
        'lg:relative lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        sidebarOpen ? 'w-72' : 'w-20'
      )}>
        <GlassNavCard className="h-full p-4 m-2 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className={cn(
              'flex items-center gap-3 transition-opacity duration-200',
              !sidebarOpen && 'lg:opacity-0'
            )}>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Legacy</span>
            </div>
            
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.10] transition-colors"
            >
              {sidebarOpen ? (
                <ChevronLeft className="w-4 h-4 text-white/80" />
              ) : (
                <ChevronRight className="w-4 h-4 text-white/80" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-6 overflow-y-auto">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                {sidebarOpen && (
                  <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
                    {categoryLabels[category as keyof typeof categoryLabels] || category}
                  </h3>
                )}
                
                <div className="space-y-1">
                  {items.map((item) => {
                    const isActive = location.pathname === item.href
                    const Icon = item.icon
                    
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative',
                          isActive 
                            ? 'bg-white/[0.12] text-white border border-white/[0.16]' 
                            : 'text-white/70 hover:text-white hover:bg-white/[0.06]',
                          !sidebarOpen && 'justify-center'
                        )}
                        onClick={() => {
                          if (window.innerWidth < 1024) {
                            setSidebarOpen(false)
                          }
                        }}
                      >
                        <Icon className={cn(
                          'w-5 h-5 transition-colors',
                          isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                        )} />
                        
                        {sidebarOpen && (
                          <>
                            <span className="font-medium">{item.name}</span>
                            {item.badge && (
                              <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                        
                        {/* Tooltip para sidebar fechada */}
                        {!sidebarOpen && (
                          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                            {item.name}
                          </div>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
        </GlassNavCard>
      </div>
    </>
  )
}