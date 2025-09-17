import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { GlassCard } from '../ui/GlassCard'
import { Button, GhostButton } from '../ui/Button'
import { useStore } from '../../store/useStore'
import { useAuth } from '../../hooks/useAuth'
import {
  Search,
  Bell,
  Menu,
  User,
  Settings,
  LogOut,
  ChevronDown,
  MessageSquare,
  Calendar,
  HelpCircle
} from 'lucide-react'

export const Header: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = useStore()
  const { user, signOut } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    setShowUserMenu(false)
  }

  return (
    <header className="sticky top-0 z-30 p-4">
      <GlassCard className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg bg-white/[0.06] p-2 transition-colors hover:bg-white/[0.10] focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:bg-gray-700/50 dark:hover:bg-gray-600/50 lg:hidden"
              aria-label="Abrir/fechar menu de navegação"
            >
              <Menu className="h-5 w-5 text-white dark:text-gray-200" />
            </button>

            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-white/40 dark:text-gray-500" aria-hidden="true" />
              <input
                type="text"
                placeholder="Buscar cursos, casos, protocolos..."
                className="w-80 rounded-xl border border-white/[0.08] bg-white/[0.06] py-2.5 pl-10 pr-4 text-white transition-all duration-200 placeholder:text-white/40 focus:border-white/[0.16] focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-gray-500 dark:focus:ring-blue-400/50"
                aria-label="Campo de busca"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search mobile */}
            <button 
              className="rounded-lg bg-white/[0.06] p-2 transition-colors hover:bg-white/[0.10] focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:bg-gray-700/50 dark:hover:bg-gray-600/50 md:hidden"
              aria-label="Abrir busca"
            >
              <Search className="h-5 w-5 text-white/70 dark:text-gray-300" />
            </button>

            {/* Quick actions */}
            <div className="hidden sm:flex items-center gap-2">
              <GhostButton size="sm" icon={Calendar}>
                <span className="hidden lg:inline">Agendar</span>
              </GhostButton>
              <GhostButton size="sm" icon={MessageSquare}>
                <span className="hidden lg:inline">Mensagens</span>
              </GhostButton>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative rounded-lg bg-white/[0.06] p-2 transition-colors hover:bg-white/[0.10] focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:bg-gray-700/50 dark:hover:bg-gray-600/50"
                aria-label="Notificações"
                aria-expanded={showNotifications}
              >
                <Bell className="h-5 w-5 text-white/70 dark:text-gray-300" />
                <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500" aria-hidden="true">
                  <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                </span>
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 z-50">
                  <GlassCard className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white">Notificações</h3>
                        <button className="text-sm text-blue-400 transition-colors hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-blue-300 dark:hover:text-blue-200">
                          Marcar todas como lidas
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="cursor-pointer rounded-lg border border-white/[0.06] bg-white/[0.04] p-3 transition-colors hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-700/50 dark:hover:bg-gray-600/50">
                          <p className="text-sm text-white dark:text-gray-100">Nova sessão de mentoria agendada</p>
                          <p className="mt-1 text-xs text-white/60 dark:text-gray-400">há 5 minutos</p>
                        </div>
                        <div className="cursor-pointer rounded-lg border border-white/[0.06] bg-white/[0.04] p-3 transition-colors hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-700/50 dark:hover:bg-gray-600/50">
                          <p className="text-sm text-white dark:text-gray-100">Caso clínico aprovado</p>
                          <p className="mt-1 text-xs text-white/60 dark:text-gray-400">há 1 hora</p>
                        </div>
                        <div className="cursor-pointer rounded-lg border border-white/[0.06] bg-white/[0.04] p-3 transition-colors hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-700/50 dark:hover:bg-gray-600/50">
                          <p className="text-sm text-white dark:text-gray-100">Novo protocolo disponível</p>
                          <p className="mt-1 text-xs text-white/60 dark:text-gray-400">há 2 horas</p>
                        </div>
                      </div>
                      
                      <Link 
                        to="/notifications" 
                        className="block border-t border-white/[0.06] pt-2 text-center text-sm text-blue-400 transition-colors hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-600 dark:text-blue-300 dark:hover:text-blue-200"
                      >
                        Ver todas as notificações
                      </Link>
                    </div>
                  </GlassCard>
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 rounded-lg bg-white/[0.06] p-2 transition-colors hover:bg-white/[0.10] focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:bg-gray-700/50 dark:hover:bg-gray-600/50"
                aria-label="Menu do usuário"
                aria-expanded={showUserMenu}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-medium text-white dark:text-gray-100">{user?.name || 'Usuário'}</p>
                  <p className="text-xs text-white/60 dark:text-gray-400">{'Estudante'}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-white/70 dark:text-gray-300" />
              </button>

              {/* User dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 z-50">
                  <GlassCard className="p-2">
                    <div className="space-y-1">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-gray-300 dark:hover:bg-gray-600/50 dark:hover:text-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="h-4 w-4" />
                        Meu Perfil
                      </Link>
                      
                      <Link
                        to="/settings"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-gray-300 dark:hover:bg-gray-600/50 dark:hover:text-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="h-4 w-4" />
                        Configurações
                      </Link>
                      
                      <Link
                        to="/help"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-gray-300 dark:hover:bg-gray-600/50 dark:hover:text-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <HelpCircle className="h-4 w-4" />
                        Ajuda
                      </Link>
                      
                      <hr className="border-white/[0.06] my-2" />
                      
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-red-400 transition-colors hover:bg-red-500/[0.06] hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 dark:text-red-400 dark:hover:bg-red-600/20 dark:hover:text-red-300"
                      >
                        <LogOut className="h-4 w-4" />
                        Sair
                      </button>
                    </div>
                  </GlassCard>
                </div>
              )}
            </div>
          </div>
        </div>
      </GlassCard>
    </header>
  )
}