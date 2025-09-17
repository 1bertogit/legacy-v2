import React, { useState } from 'react'
import GlassCard from '../components/GlassCard'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import {
  Video,
  Calendar,
  Clock,
  Users,
  Star,
  Play,
  Pause,
  Volume2,
  Maximize,
  MessageSquare,
  FileText,
  Download,
  Search,
  Filter,
  Plus,
  User,
  Award,
  TrendingUp,
  BookOpen,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Phone,
  PhoneOff,
  Settings,
  Share2
} from 'lucide-react'

interface MentoringSession {
  id: string
  title: string
  mentor: {
    name: string
    specialty: string
    avatar: string
    rating: number
  }
  date: string
  time: string
  duration: string
  status: 'scheduled' | 'live' | 'completed' | 'cancelled'
  participants: number
  maxParticipants: number
  description: string
  category: string
  recordingUrl?: string
  transcription?: string
  materials?: string[]
  price?: string
}

interface SessionCardProps {
  session: MentoringSession
  onJoin?: () => void
  onViewRecording?: () => void
}

const SessionCard: React.FC<SessionCardProps> = ({ session, onJoin, onViewRecording }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'scheduled': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'cancelled': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'AO VIVO'
      case 'scheduled': return 'AGENDADA'
      case 'completed': return 'CONCLUÍDA'
      case 'cancelled': return 'CANCELADA'
      default: return status.toUpperCase()
    }
  }

  return (
    <GlassCard className="p-6 hover:scale-[1.02] transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-white font-semibold text-lg">{session.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(session.status)}`}>
              {getStatusText(session.status)}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {session.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {session.time} ({session.duration})
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {session.participants}/{session.maxParticipants}
            </div>
          </div>
          
          <p className="text-white/70 text-sm mb-4">{session.description}</p>
        </div>
        
        {session.price && (
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{session.price}</p>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-white font-medium">{session.mentor.name}</p>
          <p className="text-white/60 text-sm">{session.mentor.specialty}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-white/60 text-sm">{session.mentor.rating}</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3">
        {session.status === 'live' && (
          <Button variant="primary" icon={Video} onClick={onJoin} fullWidth>
            Entrar na Sessão
          </Button>
        )}
        
        {session.status === 'scheduled' && (
          <Button variant="primary" icon={Calendar} onClick={onJoin} fullWidth>
            Agendar
          </Button>
        )}
        
        {session.status === 'completed' && session.recordingUrl && (
          <>
            <Button variant="primary" icon={Play} onClick={onViewRecording}>
              Ver Gravação
            </Button>
            <Button variant="glass" icon={FileText}>
              Transcrição
            </Button>
            <Button variant="glass" icon={Download}>
              Materiais
            </Button>
          </>
        )}
        
        <Button variant="glass" icon={Share2}>
          Compartilhar
        </Button>
      </div>
    </GlassCard>
  )
}

interface VideoPlayerProps {
  session: MentoringSession
  isLive?: boolean
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ session, isLive = false }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [showChat, setShowChat] = useState(true)

  return (
    <GlassCard className="overflow-hidden">
      <div className="aspect-video bg-black relative">
        {/* Video Content */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
          <div className="text-center">
            <Video className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <p className="text-white/70">
              {isLive ? 'Sessão ao vivo' : 'Gravação da sessão'}
            </p>
          </div>
        </div>
        
        {/* Live Indicator */}
        {isLive && (
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">AO VIVO</span>
            </div>
          </div>
        )}
        
        {/* Participants Count */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-2 bg-black/50 text-white px-3 py-1 rounded-full">
            <Users className="w-4 h-4" />
            <span className="text-sm">{session.participants}</span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {isLive ? (
                <>
                  <Button
                    variant={isMicOn ? 'primary' : 'glass'}
                    size="sm"
                    icon={isMicOn ? Mic : MicOff}
                    onClick={() => setIsMicOn(!isMicOn)}
                  />
                  <Button
                    variant={isCameraOn ? 'primary' : 'glass'}
                    size="sm"
                    icon={isCameraOn ? Camera : CameraOff}
                    onClick={() => setIsCameraOn(!isCameraOn)}
                  />
                  <Button
                    variant="glass"
                    size="sm"
                    icon={PhoneOff}
                  >
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={isPlaying ? Pause : Play}
                    onClick={() => setIsPlaying(!isPlaying)}
                  />
                  <Button
                    variant="glass"
                    size="sm"
                    icon={Volume2}
                    onClick={() => setIsMuted(!isMuted)}
                  />
                </>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="glass"
                size="sm"
                icon={MessageSquare}
                onClick={() => setShowChat(!showChat)}
              >
                Chat
              </Button>
              <Button
                variant="glass"
                size="sm"
                icon={Settings}
              />
              <Button
                variant="glass"
                size="sm"
                icon={Maximize}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Session Info */}
      <div className="p-6">
        <h3 className="text-white font-semibold text-lg mb-2">{session.title}</h3>
        <div className="flex items-center gap-4 text-sm text-white/60">
          <span>Por {session.mentor.name}</span>
          <span>•</span>
          <span>{session.date} às {session.time}</span>
          <span>•</span>
          <span>{session.duration}</span>
        </div>
      </div>
    </GlassCard>
  )
}

export const Mentoring: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'live' | 'recordings'>('upcoming')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedSession, setSelectedSession] = useState<MentoringSession | null>(null)

  const sessions: MentoringSession[] = [
    {
      id: '1',
      title: 'Discussão de Casos Complexos em Cardiologia',
      mentor: {
        name: 'Dr. Carlos Silva',
        specialty: 'Cardiologista',
        avatar: '',
        rating: 4.9
      },
      date: '15/12/2024',
      time: '14:00',
      duration: '2h',
      status: 'live',
      participants: 45,
      maxParticipants: 50,
      description: 'Análise detalhada de casos clínicos complexos com foco em diagnóstico diferencial e condutas terapêuticas.',
      category: 'Cardiologia',
      price: 'R$ 150'
    },
    {
      id: '2',
      title: 'Emergências Neurológicas: Protocolo de Atendimento',
      mentor: {
        name: 'Dra. Ana Santos',
        specialty: 'Neurologista',
        avatar: '',
        rating: 4.8
      },
      date: '16/12/2024',
      time: '19:00',
      duration: '1h 30min',
      status: 'scheduled',
      participants: 23,
      maxParticipants: 40,
      description: 'Protocolos atualizados para atendimento de emergências neurológicas no pronto-socorro.',
      category: 'Neurologia',
      price: 'R$ 120'
    },
    {
      id: '3',
      title: 'Técnicas Avançadas em Cirurgia Minimamente Invasiva',
      mentor: {
        name: 'Dr. Roberto Lima',
        specialty: 'Cirurgião',
        avatar: '',
        rating: 4.7
      },
      date: '10/12/2024',
      time: '16:00',
      duration: '3h',
      status: 'completed',
      participants: 67,
      maxParticipants: 80,
      description: 'Demonstração prática de técnicas cirúrgicas modernas com casos reais.',
      category: 'Cirurgia',
      recordingUrl: '/recordings/session-3',
      transcription: 'Transcrição disponível',
      materials: ['slides.pdf', 'checklist.pdf', 'referencias.pdf']
    }
  ]

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || session.category === selectedCategory
    const matchesTab = 
      (activeTab === 'upcoming' && session.status === 'scheduled') ||
      (activeTab === 'live' && session.status === 'live') ||
      (activeTab === 'recordings' && session.status === 'completed')
    
    return matchesSearch && matchesCategory && matchesTab
  })

  const categories = ['Todos', 'Cardiologia', 'Neurologia', 'Cirurgia', 'Emergência', 'Pediatria']

  if (selectedSession) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="glass" 
            onClick={() => setSelectedSession(null)}
          >
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold text-white">{selectedSession.title}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VideoPlayer session={selectedSession} isLive={selectedSession.status === 'live'} />
          </div>
          
          <div className="space-y-6">
            {/* Chat */}
            <GlassCard className="p-6">
              <h3 className="text-white font-semibold mb-4">Chat da Sessão</h3>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                <div className="text-sm">
                  <span className="text-blue-400 font-medium">Dr. Silva:</span>
                  <span className="text-white/70 ml-2">Bem-vindos à nossa sessão!</span>
                </div>
                <div className="text-sm">
                  <span className="text-green-400 font-medium">Maria:</span>
                  <span className="text-white/70 ml-2">Obrigada pela oportunidade!</span>
                </div>
              </div>
              <Input
                placeholder="Digite sua mensagem..."
                variant="glass"
              />
            </GlassCard>
            
            {/* Materials */}
            {selectedSession.materials && (
              <GlassCard className="p-6">
                <h3 className="text-white font-semibold mb-4">Materiais</h3>
                <div className="space-y-2">
                  {selectedSession.materials.map((material, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/[0.06] rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-white/60" />
                        <span className="text-white text-sm">{material}</span>
                      </div>
                      <Button variant="ghost" size="sm" icon={Download} />
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Mentoria</h1>
          <p className="text-white/70">Participe de sessões ao vivo com especialistas renomados</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="primary" icon={Plus}>
            Agendar Sessão
          </Button>
          <Button variant="glass" icon={Calendar}>
            Minha Agenda
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Video className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">24</p>
          <p className="text-white/60 text-sm">Sessões Participadas</p>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">48h</p>
          <p className="text-white/60 text-sm">Horas de Mentoria</p>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Award className="w-6 h-6 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">12</p>
          <p className="text-white/60 text-sm">Certificados</p>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-orange-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">4.8</p>
          <p className="text-white/60 text-sm">Avaliação Média</p>
        </GlassCard>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white/[0.06] p-1 rounded-lg w-fit">
        {[
          { key: 'upcoming', label: 'Próximas', icon: Calendar },
          { key: 'live', label: 'Ao Vivo', icon: Video },
          { key: 'recordings', label: 'Gravações', icon: Play }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeTab === tab.key
                ? 'bg-white/[0.10] text-white'
                : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <GlassCard className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Buscar sessões..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
              variant="glass"
            />
          </div>
          
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </GlassCard>

      {/* Sessions */}
      <div className="space-y-6">
        {filteredSessions.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <Video className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Nenhuma sessão encontrada</h3>
            <p className="text-white/60">Tente ajustar os filtros ou agendar uma nova sessão</p>
          </GlassCard>
        ) : (
          filteredSessions.map(session => (
            <SessionCard 
              key={session.id} 
              session={session}
              onJoin={() => setSelectedSession(session)}
              onViewRecording={() => setSelectedSession(session)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Mentoring