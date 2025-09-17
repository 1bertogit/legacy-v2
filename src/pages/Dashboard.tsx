import React from 'react'
import { Link } from 'react-router-dom'
import GlassCard from '../components/GlassCard'
import { Button } from '../components/ui/Button'
import { useMockAuth } from '../hooks/useMockAuth'
import {
  BookOpen,
  Users,
  FileText,
  Video,
  Calendar,
  TrendingUp,
  Clock,
  Award,
  MessageSquare,
  Play,
  ArrowRight,
  Star,
  Target,
  Activity
} from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ComponentType<any>
  trend: 'up' | 'down'
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, trend }) => (
  <GlassCard className="p-6" role="article" aria-labelledby={`stat-${title.toLowerCase().replace(/\s+/g, '-')}`}>
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p id={`stat-${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-medium text-gray-400 dark:text-gray-500">{title}</p>
        <p className="mt-1 text-2xl font-bold text-white dark:text-gray-100">{value}</p>
        <div className="mt-2 flex items-center">
          {trend === 'up' ? (
            <TrendingUp className="mr-1 h-4 w-4 text-green-400 dark:text-green-300" aria-hidden="true" />
          ) : (
            <TrendingUp className="mr-1 h-4 w-4 text-red-400 dark:text-red-300 rotate-180" aria-hidden="true" />
          )}
          <span className={`text-sm font-medium ${
            trend === 'up' ? 'text-green-400 dark:text-green-300' : 'text-red-400 dark:text-red-300'
          }`} aria-label={`Mudança de ${change}`}>
            {change}
          </span>
        </div>
      </div>
      <div className="rounded-lg bg-blue-500/20 p-3 dark:bg-blue-400/30" aria-hidden="true">
        <Icon className="h-6 w-6 text-blue-400 dark:text-blue-300" />
      </div>
    </div>
  </GlassCard>
)

interface ActivityItemProps {
  title: string
  description: string
  time: string
  type: 'course' | 'mentoring' | 'case' | 'protocol'
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, description, time, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'course': return <BookOpen className="w-4 h-4" />
      case 'mentoring': return <Users className="w-4 h-4" />
      case 'case': return <FileText className="w-4 h-4" />
      case 'protocol': return <Target className="w-4 h-4" />
    }
  }

  const getColor = () => {
    switch (type) {
      case 'course': return 'text-blue-400 dark:text-blue-300'
      case 'mentoring': return 'text-purple-400 dark:text-purple-300'
      case 'case': return 'text-green-400 dark:text-green-300'
      case 'protocol': return 'text-orange-400 dark:text-orange-300'
    }
  }

  return (
    <article className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-white/[0.04] focus-within:bg-white/[0.04] dark:hover:bg-gray-700/30 dark:focus-within:bg-gray-700/30">
      <div className={`rounded-lg bg-white/[0.06] p-2 dark:bg-gray-600/30 ${getColor()}`} aria-hidden="true">
        {getIcon()}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-medium text-white dark:text-gray-100">{title}</h4>
        <p className="mt-1 text-xs text-white/60 dark:text-gray-400">{description}</p>
        <time className="mt-1 text-xs text-white/40 dark:text-gray-500" dateTime={time}>{time}</time>
      </div>
    </article>
  )
}

export const Dashboard: React.FC = () => {
  const { user } = useMockAuth()

  const stats = [
    {
      title: 'Cursos Concluídos',
      value: '12',
      change: '+2 este mês',
      icon: BookOpen,
      trend: 'up' as const
    },
    {
      title: 'Horas de Mentoria',
      value: '48h',
      change: '+8h esta semana',
      icon: Clock,
      trend: 'up' as const
    },
    {
      title: 'Casos Analisados',
      value: '24',
      change: '+4 esta semana',
      icon: FileText,
      trend: 'up' as const
    },
    {
      title: 'Pontuação',
      value: '2,450',
      change: '+150 pontos',
      icon: Award,
      trend: 'up' as const
    }
  ]

  const recentActivities = [
    {
      title: 'Curso de Cardiologia Avançada',
      description: 'Módulo 3: Arritmias Complexas concluído',
      time: 'há 2 horas',
      type: 'course' as const
    },
    {
      title: 'Sessão de Mentoria',
      description: 'Discussão sobre caso clínico de emergência',
      time: 'há 4 horas',
      type: 'mentoring' as const
    },
    {
      title: 'Caso Clínico Aprovado',
      description: 'Paciente com IAM - Análise completa',
      time: 'há 1 dia',
      type: 'case' as const
    },
    {
      title: 'Novo Protocolo',
      description: 'Protocolo de Sepse 2024 disponível',
      time: 'há 2 dias',
      type: 'protocol' as const
    }
  ]

  const upcomingEvents = [
    {
      title: 'Mentoria em Grupo',
      time: 'Hoje, 14:00',
      mentor: 'Dr. Carlos Silva',
      topic: 'Emergências Cardiovasculares'
    },
    {
      title: 'Webinar: Novas Diretrizes',
      time: 'Amanhã, 19:00',
      mentor: 'Dra. Ana Santos',
      topic: 'Hipertensão Arterial 2024'
    },
    {
      title: 'Discussão de Caso',
      time: 'Sex, 16:00',
      mentor: 'Dr. Roberto Lima',
      topic: 'Caso Complexo de UTI'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative" aria-labelledby="welcome-heading">
        <GlassCard className="p-8 overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-4">
                <div>
                  <h1 id="welcome-heading" className="text-3xl lg:text-4xl font-bold text-white mb-2 dark:text-gray-100">
                    Bem-vindo de volta, {user?.name?.split(' ')[0] || 'Doutor'}! 👋
                  </h1>
                  <p className="text-white/70 text-lg dark:text-gray-300">
                    Continue sua jornada de aprendizado médico
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" icon={Play} iconPosition="left">
                    Continuar Curso
                  </Button>
                  <Button variant="glass" icon={Calendar} iconPosition="left">
                    Agendar Mentoria
                  </Button>
                </div>
              </div>
              
              <div className="lg:w-80">
                <GlassCard className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Activity className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Progresso Semanal</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Meta</span>
                        <span className="text-white">8h / 10h</span>
                      </div>
                      <div className="w-full bg-white/[0.06] rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                      <p className="text-xs text-white/60">Faltam 2h para atingir sua meta</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-3xl"></div>
        </GlassCard>
      </section>

      {/* Stats Grid */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Estatísticas do Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <section className="lg:col-span-2" aria-labelledby="activities-heading">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 id="activities-heading" className="text-xl font-semibold text-white dark:text-gray-100">Atividade Recente</h2>
              <Link to="/activity" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-blue-300 dark:hover:text-blue-200 dark:focus:ring-blue-400/50">
                Ver todas <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
            
            <div className="space-y-1" role="feed" aria-label="Lista de atividades recentes">
              {recentActivities.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>
          </GlassCard>
        </section>

        {/* Upcoming Events */}
        <section aria-labelledby="events-heading">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 id="events-heading" className="text-xl font-semibold text-white dark:text-gray-100">Próximos Eventos</h2>
              <Link to="/calendar" className="text-blue-400 hover:text-blue-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-blue-300 dark:hover:text-blue-200 dark:focus:ring-blue-400/50">
                Ver agenda
              </Link>
            </div>
            
            <div className="space-y-4" role="list" aria-label="Lista de próximos eventos">
              {upcomingEvents.map((event, index) => (
                <article key={index} className="p-4 rounded-lg bg-white/[0.04] border border-white/[0.06] dark:bg-gray-700/30 dark:border-gray-600" role="listitem">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-medium text-sm dark:text-gray-100">{event.title}</h3>
                    <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded dark:text-blue-300 dark:bg-blue-400/20" aria-label={`Horário: ${event.time}`}>
                      {event.time}
                    </span>
                  </div>
                  <p className="text-white/60 text-xs mb-1 dark:text-gray-400">{event.mentor}</p>
                  <p className="text-white/50 text-xs dark:text-gray-500">{event.topic}</p>
                </article>
              ))}
            </div>
            
            <Button variant="glass" size="sm" fullWidth className="mt-4" icon={Calendar}>
              Ver Calendário Completo
            </Button>
          </GlassCard>
        </section>
      </div>

      {/* Quick Actions */}
      <section aria-labelledby="quick-actions-heading">
        <GlassCard className="p-6">
          <h2 id="quick-actions-heading" className="text-xl font-semibold text-white mb-6">Ações Rápidas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/academy" className="group" aria-label="Academy - Explore novos cursos">
              <div className="p-6 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-all duration-200 group-hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500/50 dark:bg-gray-700/30 dark:border-gray-600 dark:hover:bg-gray-700/50 dark:focus-within:ring-blue-400/50">
                <BookOpen className="w-8 h-8 text-blue-400 mb-3 dark:text-blue-300" aria-hidden="true" />
                <h3 className="text-white font-medium mb-1 dark:text-gray-100">Academy</h3>
                <p className="text-white/60 text-sm dark:text-gray-400">Explore novos cursos</p>
              </div>
            </Link>
            
            <Link to="/mentoring" className="group" aria-label="Mentoria - Agende uma sessão">
              <div className="p-6 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-all duration-200 group-hover:scale-105 focus-within:ring-2 focus-within:ring-purple-500/50 dark:bg-gray-700/30 dark:border-gray-600 dark:hover:bg-gray-700/50 dark:focus-within:ring-purple-400/50">
                <Users className="w-8 h-8 text-purple-400 mb-3 dark:text-purple-300" aria-hidden="true" />
                <h3 className="text-white font-medium mb-1 dark:text-gray-100">Mentoria</h3>
                <p className="text-white/60 text-sm dark:text-gray-400">Agende uma sessão</p>
              </div>
            </Link>
            
            <Link to="/clinical-cases" className="group" aria-label="Casos Clínicos - Analise casos reais">
              <div className="p-6 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-all duration-200 group-hover:scale-105 focus-within:ring-2 focus-within:ring-green-500/50 dark:bg-gray-700/30 dark:border-gray-600 dark:hover:bg-gray-700/50 dark:focus-within:ring-green-400/50">
                <FileText className="w-8 h-8 text-green-400 mb-3 dark:text-green-300" aria-hidden="true" />
                <h3 className="text-white font-medium mb-1 dark:text-gray-100">Casos Clínicos</h3>
                <p className="text-white/60 text-sm dark:text-gray-400">Analise casos reais</p>
              </div>
            </Link>
            
            <Link to="/protocols" className="group" aria-label="Protocolos - Consulte diretrizes">
              <div className="p-6 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-all duration-200 group-hover:scale-105 focus-within:ring-2 focus-within:ring-orange-500/50 dark:bg-gray-700/30 dark:border-gray-600 dark:hover:bg-gray-700/50 dark:focus-within:ring-orange-400/50">
                <Target className="w-8 h-8 text-orange-400 mb-3 dark:text-orange-300" aria-hidden="true" />
                <h3 className="text-white font-medium mb-1 dark:text-gray-100">Protocolos</h3>
                <p className="text-white/60 text-sm dark:text-gray-400">Consulte diretrizes</p>
              </div>
            </Link>
          </div>
        </GlassCard>
      </section>
    </div>
  )
}

export default Dashboard