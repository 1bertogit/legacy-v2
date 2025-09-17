import React, { useState } from 'react'
import GlassCard from '../components/GlassCard'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  MapPin,
  Users,
  Video,
  Phone,
  User,
  Bell,
  Edit,
  Trash2,
  Copy,
  Share2,
  Download,
  Upload,
  Settings,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
  XCircle,
  X,
  Clock3,
  Calendar as CalendarDays,
  Repeat,
  Tag,
  FileText,
  Stethoscope,
  Heart,
  Brain,
  Activity,
  Pill,
  Microscope,
  Shield,
  Target,
  Zap,
  Star,
  BookOpen,
  GraduationCap,
  Presentation,
  Coffee,
  Briefcase,
  Home,
  Building,
  Globe,
  Wifi,
  WifiOff,
  Camera,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Navigation,
  Route,
  Car,
  Train,
  Plane,
  Ship,
  Bike
} from 'lucide-react'

interface CalendarEvent {
  id: string
  title: string
  description?: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  type: 'consultation' | 'surgery' | 'meeting' | 'conference' | 'course' | 'personal' | 'emergency'
  category: string
  location?: {
    type: 'physical' | 'virtual' | 'hybrid'
    address?: string
    room?: string
    platform?: string
    link?: string
    coordinates?: { lat: number; lng: number }
  }
  attendees?: Attendee[]
  organizer: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed' | 'in-progress'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
    interval: number
    endDate?: string
    count?: number
  }
  reminders?: {
    time: number // minutes before
    method: 'email' | 'push' | 'sms'
  }[]
  attachments?: {
    id: string
    name: string
    url: string
    type: string
    size: number
  }[]
  notes?: string
  tags?: string[]
  color?: string
  isPrivate?: boolean
  requiresPreparation?: boolean
  estimatedDuration?: number
  actualDuration?: number
  followUpRequired?: boolean
  patientId?: string
  caseId?: string
  protocolId?: string
}

interface Attendee {
  id: string
  name: string
  email: string
  role: 'organizer' | 'required' | 'optional' | 'resource'
  status: 'pending' | 'accepted' | 'declined' | 'tentative'
  avatar?: string
  specialty?: string
  department?: string
}

interface CalendarView {
  type: 'month' | 'week' | 'day' | 'agenda'
  date: Date
}

interface EventFormProps {
  event?: CalendarEvent
  onSave: (event: Partial<CalendarEvent>) => void
  onClose: () => void
}

const EventForm: React.FC<EventFormProps> = ({ event, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    startDate: event?.startDate || new Date().toISOString().split('T')[0],
    endDate: event?.endDate || new Date().toISOString().split('T')[0],
    startTime: event?.startTime || '09:00',
    endTime: event?.endTime || '10:00',
    type: event?.type || 'consultation' as const,
    category: event?.category || 'Consulta',
    location: event?.location || { type: 'physical' as const },
    priority: event?.priority || 'medium' as const,
    notes: event?.notes || '',
    isPrivate: event?.isPrivate || false
  })

  const eventTypes = [
    { value: 'consultation', label: 'Consulta', icon: Stethoscope, color: 'blue' },
    { value: 'surgery', label: 'Cirurgia', icon: Activity, color: 'red' },
    { value: 'meeting', label: 'Reunião', icon: Users, color: 'purple' },
    { value: 'conference', label: 'Conferência', icon: Presentation, color: 'green' },
    { value: 'course', label: 'Curso', icon: GraduationCap, color: 'yellow' },
    { value: 'personal', label: 'Pessoal', icon: User, color: 'gray' },
    { value: 'emergency', label: 'Emergência', icon: AlertCircle, color: 'red' }
  ]

  const priorities = [
    { value: 'low', label: 'Baixa', color: 'gray' },
    { value: 'medium', label: 'Média', color: 'blue' },
    { value: 'high', label: 'Alta', color: 'yellow' },
    { value: 'urgent', label: 'Urgente', color: 'red' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <GlassCard className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {event ? 'Editar Evento' : 'Novo Evento'}
            </h2>
            <button onClick={onClose} className="text-white/60 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Título</label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Digite o título do evento"
                variant="glass"
                required
              />
            </div>
            
            <div className="flex gap-4">
              <Button type="submit" variant="primary" className="flex-1">
                {event ? 'Atualizar' : 'Criar'} Evento
              </Button>
              <Button type="button" variant="glass" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </GlassCard>
    </div>
  )
}

interface EventCardProps {
  event: CalendarEvent
  onEdit: () => void
  onDelete: () => void
  onView: () => void
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete, onView }) => {
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation': return Stethoscope
      case 'surgery': return Activity
      case 'meeting': return Users
      case 'conference': return Presentation
      case 'course': return GraduationCap
      case 'personal': return User
      case 'emergency': return AlertCircle
      default: return CalendarIcon
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'bg-blue-500/20 text-blue-400'
      case 'surgery': return 'bg-red-500/20 text-red-400'
      case 'meeting': return 'bg-purple-500/20 text-purple-400'
      case 'conference': return 'bg-green-500/20 text-green-400'
      case 'course': return 'bg-yellow-500/20 text-yellow-400'
      case 'personal': return 'bg-gray-500/20 text-gray-400'
      case 'emergency': return 'bg-red-600/20 text-red-500'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-500/20 text-gray-400'
      case 'medium': return 'bg-blue-500/20 text-blue-400'
      case 'high': return 'bg-yellow-500/20 text-yellow-400'
      case 'urgent': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500/20 text-blue-400'
      case 'confirmed': return 'bg-green-500/20 text-green-400'
      case 'cancelled': return 'bg-red-500/20 text-red-400'
      case 'completed': return 'bg-gray-500/20 text-gray-400'
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const Icon = getEventTypeIcon(event.type)

  return (
    <GlassCard className="p-4 hover:scale-[1.01] transition-all duration-200">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getEventTypeColor(event.type)}`}>
          <Icon className="w-6 h-6" />
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-white font-semibold">{event.title}</h3>
            <div className="flex items-center gap-1">
              <button onClick={onEdit} className="text-white/60 hover:text-white transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={onDelete} className="text-white/60 hover:text-red-400 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {event.description && (
            <p className="text-white/70 text-sm mb-3 line-clamp-2">{event.description}</p>
          )}
          
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2 py-1 rounded text-xs ${getEventTypeColor(event.type)}`}>
              {event.type === 'consultation' ? 'Consulta' :
               event.type === 'surgery' ? 'Cirurgia' :
               event.type === 'meeting' ? 'Reunião' :
               event.type === 'conference' ? 'Conferência' :
               event.type === 'course' ? 'Curso' :
               event.type === 'personal' ? 'Pessoal' : 'Emergência'}
            </span>
            <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(event.priority)}`}>
              {event.priority === 'low' ? 'Baixa' :
               event.priority === 'medium' ? 'Média' :
               event.priority === 'high' ? 'Alta' : 'Urgente'}
            </span>
            <span className={`px-2 py-1 rounded text-xs ${getStatusColor(event.status)}`}>
              {event.status === 'scheduled' ? 'Agendado' :
               event.status === 'confirmed' ? 'Confirmado' :
               event.status === 'cancelled' ? 'Cancelado' :
               event.status === 'completed' ? 'Concluído' : 'Em Andamento'}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-white/60">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {event.startTime} - {event.endTime}
            </div>
            {event.location && (
              <div className="flex items-center gap-1">
                {event.location.type === 'virtual' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                {event.location.type === 'virtual' ? 'Virtual' : event.location.address || 'Presencial'}
              </div>
            )}
            {event.attendees && event.attendees.length > 0 && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {event.attendees.length} participantes
              </div>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

export const Calendar: React.FC = () => {
  const [view, setView] = useState<CalendarView>({ type: 'month', date: new Date() })
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [showEventForm, setShowEventForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Consulta - Dr. Silva',
      description: 'Consulta de rotina com paciente João Santos',
      startDate: '2024-12-20',
      endDate: '2024-12-20',
      startTime: '09:00',
      endTime: '10:00',
      type: 'consultation',
      category: 'Cardiologia',
      location: {
        type: 'physical',
        address: 'Consultório 205, Hospital das Clínicas',
        room: '205'
      },
      organizer: {
        id: '1',
        name: 'Dr. Silva',
        email: 'silva@hospital.com'
      },
      status: 'confirmed',
      priority: 'medium',
      attendees: [
        {
          id: '1',
          name: 'João Santos',
          email: 'joao@email.com',
          role: 'required',
          status: 'accepted'
        }
      ],
      notes: 'Paciente com histórico de hipertensão',
      patientId: 'patient-1'
    },
    {
      id: '2',
      title: 'Cirurgia Cardíaca - Ponte de Safena',
      description: 'Cirurgia de revascularização do miocárdio',
      startDate: '2024-12-21',
      endDate: '2024-12-21',
      startTime: '07:00',
      endTime: '12:00',
      type: 'surgery',
      category: 'Cirurgia Cardíaca',
      location: {
        type: 'physical',
        address: 'Centro Cirúrgico 3, Hospital das Clínicas',
        room: 'Sala 3'
      },
      organizer: {
        id: '2',
        name: 'Dr. Cardoso',
        email: 'cardoso@hospital.com'
      },
      status: 'scheduled',
      priority: 'high',
      attendees: [
        {
          id: '2',
          name: 'Maria Oliveira',
          email: 'maria@email.com',
          role: 'required',
          status: 'accepted'
        },
        {
          id: '3',
          name: 'Enfermeira Ana',
          email: 'ana@hospital.com',
          role: 'required',
          status: 'accepted'
        }
      ],
      requiresPreparation: true,
      estimatedDuration: 300,
      patientId: 'patient-2'
    },
    {
      id: '3',
      title: 'Reunião de Equipe Médica',
      description: 'Discussão de casos clínicos complexos',
      startDate: '2024-12-22',
      endDate: '2024-12-22',
      startTime: '14:00',
      endTime: '16:00',
      type: 'meeting',
      category: 'Administrativa',
      location: {
        type: 'hybrid',
        address: 'Sala de Reuniões 1',
        platform: 'Teams',
        link: 'https://teams.microsoft.com/meeting'
      },
      organizer: {
        id: '3',
        name: 'Dr. Diretor',
        email: 'diretor@hospital.com'
      },
      status: 'confirmed',
      priority: 'medium',
      attendees: [
        {
          id: '4',
          name: 'Dr. Silva',
          email: 'silva@hospital.com',
          role: 'required',
          status: 'accepted'
        },
        {
          id: '5',
          name: 'Dr. Cardoso',
          email: 'cardoso@hospital.com',
          role: 'required',
          status: 'pending'
        }
      ]
    },
    {
      id: '4',
      title: 'Conferência: Avanços em Cardiologia',
      description: 'Apresentação sobre novas técnicas em cardiologia intervencionista',
      startDate: '2024-12-23',
      endDate: '2024-12-23',
      startTime: '09:00',
      endTime: '17:00',
      type: 'conference',
      category: 'Educação Médica',
      location: {
        type: 'virtual',
        platform: 'Zoom',
        link: 'https://zoom.us/meeting'
      },
      organizer: {
        id: '4',
        name: 'Sociedade Brasileira de Cardiologia',
        email: 'eventos@cardiol.br'
      },
      status: 'confirmed',
      priority: 'low',
      attendees: [
        {
          id: '6',
          name: 'Dr. Silva',
          email: 'silva@hospital.com',
          role: 'optional',
          status: 'accepted'
        }
      ]
    }
  ]

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || event.type === selectedType
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const eventTypes = [
    { value: 'all', label: 'Todos os Tipos' },
    { value: 'consultation', label: 'Consultas' },
    { value: 'surgery', label: 'Cirurgias' },
    { value: 'meeting', label: 'Reuniões' },
    { value: 'conference', label: 'Conferências' },
    { value: 'course', label: 'Cursos' },
    { value: 'personal', label: 'Pessoal' },
    { value: 'emergency', label: 'Emergência' }
  ]

  const statusTypes = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'scheduled', label: 'Agendado' },
    { value: 'confirmed', label: 'Confirmado' },
    { value: 'cancelled', label: 'Cancelado' },
    { value: 'completed', label: 'Concluído' },
    { value: 'in-progress', label: 'Em Andamento' }
  ]

  const totalEvents = events.length
  const todayEvents = events.filter(e => e.startDate === new Date().toISOString().split('T')[0]).length
  const upcomingEvents = events.filter(e => new Date(e.startDate) > new Date()).length
  const completedEvents = events.filter(e => e.status === 'completed').length

  const handleSaveEvent = (eventData: Partial<CalendarEvent>) => {
    console.log('Saving event:', eventData)
    setShowEventForm(false)
    setSelectedEvent(null)
  }

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setShowEventForm(true)
  }

  const handleDeleteEvent = (eventId: string) => {
    console.log('Deleting event:', eventId)
  }

  const handleViewEvent = (event: CalendarEvent) => {
    console.log('Viewing event:', event)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Calendário Médico</h1>
          <p className="text-white/70">Gerencie consultas, cirurgias, reuniões e eventos médicos</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="primary" icon={Plus} onClick={() => setShowEventForm(true)}>
            Novo Evento
          </Button>
          <Button variant="glass" icon={Download}>
            Exportar
          </Button>
          <Button variant="glass" icon={Settings}>
            Configurações
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CalendarIcon className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">{totalEvents}</p>
          <p className="text-white/60 text-sm">Total de Eventos</p>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">{todayEvents}</p>
          <p className="text-white/60 text-sm">Eventos Hoje</p>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Bell className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">{upcomingEvents}</p>
          <p className="text-white/60 text-sm">Próximos Eventos</p>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">{completedEvents}</p>
          <p className="text-white/60 text-sm">Concluídos</p>
        </GlassCard>
      </div>

      {/* Filters and Search */}
      <GlassCard className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
              variant="glass"
            />
          </div>
          
          <div className="flex gap-3">
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {eventTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {statusTypes.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
            
            <Button variant="glass" icon={Filter}>
              Filtros
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <CalendarIcon className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Nenhum evento encontrado</h3>
            <p className="text-white/60">Tente ajustar os filtros ou criar um novo evento</p>
          </GlassCard>
        ) : (
          filteredEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event}
              onEdit={() => handleEditEvent(event)}
              onDelete={() => handleDeleteEvent(event.id)}
              onView={() => handleViewEvent(event)}
            />
          ))
        )}
      </div>

      {/* Event Form Modal */}
      {showEventForm && (
        <EventForm
          event={selectedEvent || undefined}
          onSave={handleSaveEvent}
          onClose={() => {
            setShowEventForm(false)
            setSelectedEvent(null)
          }}
        />
      )}
    </div>
  )
}

export default Calendar