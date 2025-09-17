import React, { useState } from 'react'
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Upload, 
  Settings, 
  Edit, 
  Trash2, 
  Copy, 
  Send, 
  Star, 
  Heart, 
  Clock, 
  Eye, 
  Users, 
  Tag, 
  Image, 
  FileText, 
  Video, 
  Mic, 
  Paperclip, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  BarChart3, 
  Calendar, 
  Phone, 
  Mail, 
  Share2, 
  Bookmark, 
  Archive, 
  Folder, 
  FolderOpen
} from 'lucide-react'
import GlassCard from '../components/GlassCard'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

interface WhatsAppMessage {
  id: string
  title: string
  content: string
  type: 'text' | 'image' | 'video' | 'audio' | 'document' | 'template'
  category: string
  tags: string[]
  mediaUrl?: string
  mediaType?: string
  isTemplate: boolean
  isFavorite: boolean
  usageCount: number
  lastUsed?: string
  effectiveness: {
    sent: number
    delivered: number
    read: number
    replied: number
    responseRate: number
  }
  targetAudience: string[]
  specialty: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

interface MessageTemplate {
  id: string
  name: string
  description: string
  content: string
  variables: string[]
  category: string
  specialty: string
  isApproved: boolean
  approvedBy?: string
  approvedAt?: string
  usageCount: number
  effectiveness: {
    responseRate: number
    conversionRate: number
    satisfactionScore: number
  }
  createdBy: string
  createdAt: string
}

interface MessageFolder {
  id: string
  name: string
  description: string
  color: string
  messageCount: number
  isShared: boolean
  createdBy: string
  createdAt: string
}

interface MessageStats {
  totalMessages: number
  totalTemplates: number
  totalFolders: number
  mostUsedCategory: string
  avgResponseRate: number
  topPerformingMessages: WhatsAppMessage[]
  recentActivity: {
    date: string
    action: string
    message: string
    user: string
  }[]
}

interface MessageCardProps {
  message: WhatsAppMessage
  onEdit: () => void
  onDelete: () => void
  onCopy: () => void
  onToggleFavorite: () => void
  onUse: () => void
  onViewStats: () => void
}

const MessageCard: React.FC<MessageCardProps> = ({ 
  message, 
  onEdit, 
  onDelete, 
  onCopy, 
  onToggleFavorite, 
  onUse, 
  onViewStats 
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return FileText
      case 'image': return Image
      case 'video': return Video
      case 'audio': return Mic
      case 'document': return Paperclip
      case 'template': return MessageSquare
      default: return FileText
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'text': return 'bg-blue-500/20 text-blue-400'
      case 'image': return 'bg-green-500/20 text-green-400'
      case 'video': return 'bg-purple-500/20 text-purple-400'
      case 'audio': return 'bg-yellow-500/20 text-yellow-400'
      case 'document': return 'bg-red-500/20 text-red-400'
      case 'template': return 'bg-emerald-500/20 text-emerald-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const Icon = getTypeIcon(message.type)
  const responseRate = message.effectiveness.responseRate

  return (
    <GlassCard className="p-6 hover:scale-[1.01] transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(message.type)}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-semibold">{message.title}</h3>
              {message.isFavorite && (
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
              )}
              {message.isTemplate && (
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded">
                  Template
                </span>
              )}
            </div>
            <p className="text-white/60 text-sm line-clamp-2">{message.content}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={onToggleFavorite} 
            className={`transition-colors ${
              message.isFavorite ? 'text-yellow-400' : 'text-white/60 hover:text-yellow-400'
            }`}
          >
            <Star className={`w-4 h-4 ${message.isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button onClick={onCopy} className="text-white/60 hover:text-blue-400 transition-colors">
            <Copy className="w-4 h-4" />
          </button>
          <button onClick={onUse} className="text-white/60 hover:text-green-400 transition-colors">
            <Send className="w-4 h-4" />
          </button>
          <button onClick={onViewStats} className="text-white/60 hover:text-purple-400 transition-colors">
            <BarChart3 className="w-4 h-4" />
          </button>
          <button onClick={onEdit} className="text-white/60 hover:text-white transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="text-white/60 hover:text-red-400 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <span className={`px-2 py-1 rounded text-xs ${getTypeColor(message.type)}`}>
          {message.type === 'text' ? 'Texto' :
           message.type === 'image' ? 'Imagem' :
           message.type === 'video' ? 'Vídeo' :
           message.type === 'audio' ? 'Áudio' :
           message.type === 'document' ? 'Documento' : 'Template'}
        </span>
        <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
          {message.category}
        </span>
        <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
          {message.specialty}
        </span>
      </div>
      
      {message.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {message.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-white/5 rounded text-xs text-white/60">
              #{tag}
            </span>
          ))}
          {message.tags.length > 3 && (
            <span className="px-2 py-1 bg-white/5 rounded text-xs text-white/60">
              +{message.tags.length - 3}
            </span>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-white/60 text-xs mb-1">Enviadas</p>
          <p className="text-white font-semibold">{message.effectiveness.sent}</p>
        </div>
        <div className="text-center">
          <p className="text-white/60 text-xs mb-1">Lidas</p>
          <p className="text-white font-semibold">{message.effectiveness.read}</p>
        </div>
        <div className="text-center">
          <p className="text-white/60 text-xs mb-1">Respostas</p>
          <p className="text-white font-semibold">{message.effectiveness.replied}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Taxa de Resposta</span>
          <span className={`font-semibold ${
            responseRate >= 70 ? 'text-green-400' :
            responseRate >= 40 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {responseRate}%
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              responseRate >= 70 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
              responseRate >= 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
              'bg-gradient-to-r from-red-500 to-pink-500'
            }`}
            style={{ width: `${responseRate}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/60">
          <span>Usado {message.usageCount}x</span>
          {message.lastUsed && (
            <span>Último uso: {new Date(message.lastUsed).toLocaleDateString()}</span>
          )}
        </div>
      </div>
    </GlassCard>
  )
}

interface TemplateCardProps {
  template: MessageTemplate
  onEdit: () => void
  onDelete: () => void
  onCopy: () => void
  onUse: () => void
  onApprove?: () => void
}

const TemplateCard: React.FC<TemplateCardProps> = ({ 
  template, 
  onEdit, 
  onDelete, 
  onCopy, 
  onUse, 
  onApprove 
}) => {
  return (
    <GlassCard className="p-6 hover:scale-[1.01] transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white font-semibold">{template.name}</h3>
            {template.isApproved ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-yellow-400" />
            )}
          </div>
          <p className="text-white/60 text-sm mb-2">{template.description}</p>
          <p className="text-white/70 text-sm line-clamp-3">{template.content}</p>
        </div>
        
        <div className="flex items-center gap-1 ml-4">
          <button onClick={onCopy} className="text-white/60 hover:text-blue-400 transition-colors">
            <Copy className="w-4 h-4" />
          </button>
          <button onClick={onUse} className="text-white/60 hover:text-green-400 transition-colors">
            <Send className="w-4 h-4" />
          </button>
          {!template.isApproved && onApprove && (
            <button onClick={onApprove} className="text-white/60 hover:text-green-400 transition-colors">
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
          <button onClick={onEdit} className="text-white/60 hover:text-white transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="text-white/60 hover:text-red-400 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded">
          {template.category}
        </span>
        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
          {template.specialty}
        </span>
        <span className={`px-2 py-1 text-xs rounded ${
          template.isApproved 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-yellow-500/20 text-yellow-400'
        }`}>
          {template.isApproved ? 'Aprovado' : 'Pendente'}
        </span>
      </div>
      
      {template.variables.length > 0 && (
        <div className="mb-4">
          <p className="text-white/60 text-xs mb-2">Variáveis:</p>
          <div className="flex flex-wrap gap-1">
            {template.variables.map((variable, index) => (
              <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                {variable}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-white/60 text-xs mb-1">Taxa Resposta</p>
          <p className="text-white font-semibold">{template.effectiveness.responseRate}%</p>
        </div>
        <div className="text-center">
          <p className="text-white/60 text-xs mb-1">Conversão</p>
          <p className="text-white font-semibold">{template.effectiveness.conversionRate}%</p>
        </div>
        <div className="text-center">
          <p className="text-white/60 text-xs mb-1">Satisfação</p>
          <p className="text-white font-semibold">{template.effectiveness.satisfactionScore}/5</p>
        </div>
      </div>
    </GlassCard>
  )
}

interface FolderCardProps {
  folder: MessageFolder
  onOpen: () => void
  onEdit: () => void
  onDelete: () => void
  onShare: () => void
}

const FolderCard: React.FC<FolderCardProps> = ({ 
  folder, 
  onOpen, 
  onEdit, 
  onDelete, 
  onShare 
}) => {
  return (
    <GlassCard className="p-6 hover:scale-[1.01] transition-all duration-200 cursor-pointer" onClick={onOpen}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${folder.color}20` }}>
            <FolderOpen className="w-6 h-6" style={{ color: folder.color }} />
          </div>
          <div>
            <h3 className="text-white font-semibold">{folder.name}</h3>
            <p className="text-white/60 text-sm">{folder.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          {folder.isShared && (
            <Share2 className="w-4 h-4 text-blue-400" />
          )}
          <button onClick={onShare} className="text-white/60 hover:text-blue-400 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button onClick={onEdit} className="text-white/60 hover:text-white transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="text-white/60 hover:text-red-400 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-white/60 text-sm">{folder.messageCount} mensagens</span>
        <span className="text-white/60 text-xs">
          Criado em {new Date(folder.createdAt).toLocaleDateString()}
        </span>
      </div>
    </GlassCard>
  )
}

export const WhatsAppLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'messages' | 'templates' | 'folders' | 'analytics'>('messages')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [showMessageForm, setShowMessageForm] = useState(false)
  const [showTemplateForm, setShowTemplateForm] = useState(false)
  const [showFolderForm, setShowFolderForm] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const messages: WhatsAppMessage[] = [
    {
      id: '1',
      title: 'Confirmação de Consulta',
      content: 'Olá! Sua consulta está agendada para {data} às {hora}. Por favor, chegue 15 minutos antes. Em caso de dúvidas, entre em contato conosco.',
      type: 'template',
      category: 'Agendamento',
      tags: ['consulta', 'confirmação', 'agendamento'],
      isTemplate: true,
      isFavorite: true,
      usageCount: 245,
      lastUsed: '2024-12-18',
      effectiveness: {
        sent: 245,
        delivered: 242,
        read: 238,
        replied: 89,
        responseRate: 37.4
      },
      targetAudience: ['Pacientes agendados'],
      specialty: 'Geral',
      createdBy: 'Dr. Silva',
      createdAt: '2024-11-01',
      updatedAt: '2024-12-15'
    },
    {
      id: '2',
      title: 'Lembrete de Exame',
      content: 'Lembrete: Seu exame de {tipo_exame} está marcado para amanhã às {hora}. Lembre-se de trazer os documentos solicitados e manter o jejum de {horas} horas.',
      type: 'template',
      category: 'Exames',
      tags: ['exame', 'lembrete', 'jejum'],
      isTemplate: true,
      isFavorite: false,
      usageCount: 156,
      lastUsed: '2024-12-17',
      effectiveness: {
        sent: 156,
        delivered: 154,
        read: 151,
        replied: 23,
        responseRate: 15.2
      },
      targetAudience: ['Pacientes com exames'],
      specialty: 'Diagnóstico',
      createdBy: 'Dra. Santos',
      createdAt: '2024-10-15',
      updatedAt: '2024-12-10'
    },
    {
      id: '3',
      title: 'Resultado de Exame Disponível',
      content: 'Seu resultado de exame já está disponível! Você pode retirá-lo na recepção ou agendar uma consulta para discussão dos resultados. Horário de funcionamento: 8h às 18h.',
      type: 'text',
      category: 'Resultados',
      tags: ['resultado', 'exame', 'disponível'],
      isTemplate: false,
      isFavorite: true,
      usageCount: 89,
      lastUsed: '2024-12-16',
      effectiveness: {
        sent: 89,
        delivered: 87,
        read: 85,
        replied: 67,
        responseRate: 78.8
      },
      targetAudience: ['Pacientes com resultados'],
      specialty: 'Geral',
      createdBy: 'Recepção',
      createdAt: '2024-11-20',
      updatedAt: '2024-12-16'
    },
    {
      id: '4',
      title: 'Orientações Pós-Cirúrgicas',
      content: 'Orientações importantes para o pós-operatório: 1) Manter repouso por 48h, 2) Tomar medicação conforme prescrito, 3) Retornar em caso de febre ou sangramento, 4) Próximo retorno em 7 dias.',
      type: 'text',
      category: 'Pós-operatório',
      tags: ['cirurgia', 'orientações', 'cuidados'],
      mediaUrl: '/images/pos-cirurgico.pdf',
      mediaType: 'document',
      isTemplate: false,
      isFavorite: false,
      usageCount: 34,
      lastUsed: '2024-12-14',
      effectiveness: {
        sent: 34,
        delivered: 34,
        read: 32,
        replied: 28,
        responseRate: 87.5
      },
      targetAudience: ['Pacientes pós-cirúrgicos'],
      specialty: 'Cirurgia',
      createdBy: 'Dr. Cardoso',
      createdAt: '2024-12-01',
      updatedAt: '2024-12-14'
    }
  ]

  const templates: MessageTemplate[] = [
    {
      id: '1',
      name: 'Agendamento de Consulta',
      description: 'Template para confirmação de agendamento',
      content: 'Olá {nome_paciente}! Sua consulta com {nome_medico} está confirmada para {data} às {hora}. Local: {endereco_clinica}. Em caso de dúvidas: {telefone_contato}.',
      variables: ['nome_paciente', 'nome_medico', 'data', 'hora', 'endereco_clinica', 'telefone_contato'],
      category: 'Agendamento',
      specialty: 'Geral',
      isApproved: true,
      approvedBy: 'Dr. Silva',
      approvedAt: '2024-11-15',
      usageCount: 312,
      effectiveness: {
        responseRate: 42.5,
        conversionRate: 89.2,
        satisfactionScore: 4.7
      },
      createdBy: 'Recepção',
      createdAt: '2024-10-01'
    },
    {
      id: '2',
      name: 'Lembrete de Medicação',
      description: 'Template para lembrar pacientes sobre medicação',
      content: 'Lembrete: Não se esqueça de tomar sua medicação {nome_medicamento} às {horario}. Dosagem: {dosagem}. Em caso de efeitos colaterais, entre em contato imediatamente.',
      variables: ['nome_medicamento', 'horario', 'dosagem'],
      category: 'Medicação',
      specialty: 'Geral',
      isApproved: false,
      usageCount: 0,
      effectiveness: {
        responseRate: 0,
        conversionRate: 0,
        satisfactionScore: 0
      },
      createdBy: 'Dra. Santos',
      createdAt: '2024-12-10'
    },
    {
      id: '3',
      name: 'Orientações Cardiológicas',
      description: 'Template específico para orientações cardiológicas',
      content: 'Orientações importantes para sua saúde cardíaca: 1) Mantenha atividade física regular, 2) Evite alimentos ricos em sódio, 3) Tome a medicação nos horários corretos, 4) Monitore sua pressão arterial.',
      variables: [],
      category: 'Orientações',
      specialty: 'Cardiologia',
      isApproved: true,
      approvedBy: 'Dr. Cardoso',
      approvedAt: '2024-11-20',
      usageCount: 78,
      effectiveness: {
        responseRate: 65.4,
        conversionRate: 92.3,
        satisfactionScore: 4.9
      },
      createdBy: 'Dr. Cardoso',
      createdAt: '2024-11-01'
    }
  ]

  const folders: MessageFolder[] = [
    {
      id: '1',
      name: 'Agendamentos',
      description: 'Mensagens relacionadas a agendamentos e consultas',
      color: '#3B82F6',
      messageCount: 45,
      isShared: true,
      createdBy: 'Recepção',
      createdAt: '2024-10-01'
    },
    {
      id: '2',
      name: 'Exames e Resultados',
      description: 'Templates para comunicação sobre exames',
      color: '#10B981',
      messageCount: 23,
      isShared: false,
      createdBy: 'Dr. Silva',
      createdAt: '2024-10-15'
    },
    {
      id: '3',
      name: 'Emergências',
      description: 'Mensagens para situações de emergência',
      color: '#EF4444',
      messageCount: 12,
      isShared: true,
      createdBy: 'Dr. Cardoso',
      createdAt: '2024-11-01'
    },
    {
      id: '4',
      name: 'Cardiologia',
      description: 'Mensagens específicas da especialidade',
      color: '#8B5CF6',
      messageCount: 34,
      isShared: false,
      createdBy: 'Dr. Cardoso',
      createdAt: '2024-11-10'
    }
  ]

  const stats: MessageStats = {
    totalMessages: messages.length,
    totalTemplates: templates.length,
    totalFolders: folders.length,
    mostUsedCategory: 'Agendamento',
    avgResponseRate: 54.7,
    topPerformingMessages: messages.slice(0, 3),
    recentActivity: [
      {
        date: '2024-12-18',
        action: 'Mensagem enviada',
        message: 'Confirmação de Consulta',
        user: 'Recepção'
      },
      {
        date: '2024-12-17',
        action: 'Template criado',
        message: 'Lembrete de Medicação',
        user: 'Dra. Santos'
      },
      {
        date: '2024-12-16',
        action: 'Pasta compartilhada',
        message: 'Agendamentos',
        user: 'Dr. Silva'
      }
    ]
  }

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || message.category === selectedCategory
    const matchesType = selectedType === 'all' || message.type === selectedType
    const matchesSpecialty = selectedSpecialty === 'all' || message.specialty === selectedSpecialty
    
    return matchesSearch && matchesCategory && matchesType && matchesSpecialty
  })

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesSpecialty = selectedSpecialty === 'all' || template.specialty === selectedSpecialty
    
    return matchesSearch && matchesCategory && matchesSpecialty
  })

  const filteredFolders = folders.filter(folder => {
    const matchesSearch = folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         folder.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSearch
  })

  const categories = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'Agendamento', label: 'Agendamento' },
    { value: 'Exames', label: 'Exames' },
    { value: 'Resultados', label: 'Resultados' },
    { value: 'Medicação', label: 'Medicação' },
    { value: 'Orientações', label: 'Orientações' },
    { value: 'Pós-operatório', label: 'Pós-operatório' },
    { value: 'Emergência', label: 'Emergência' }
  ]

  const messageTypes = [
    { value: 'all', label: 'Todos os Tipos' },
    { value: 'text', label: 'Texto' },
    { value: 'image', label: 'Imagem' },
    { value: 'video', label: 'Vídeo' },
    { value: 'audio', label: 'Áudio' },
    { value: 'document', label: 'Documento' },
    { value: 'template', label: 'Template' }
  ]

  const specialties = [
    { value: 'all', label: 'Todas as Especialidades' },
    { value: 'Geral', label: 'Geral' },
    { value: 'Cardiologia', label: 'Cardiologia' },
    { value: 'Ortopedia', label: 'Ortopedia' },
    { value: 'Dermatologia', label: 'Dermatologia' },
    { value: 'Cirurgia', label: 'Cirurgia' },
    { value: 'Diagnóstico', label: 'Diagnóstico' }
  ]

  const handleEditMessage = (message: WhatsAppMessage) => {
    console.log('Editing message:', message)
    setShowMessageForm(true)
  }

  const handleDeleteMessage = (messageId: string) => {
    console.log('Deleting message:', messageId)
  }

  const handleCopyMessage = (messageId: string) => {
    console.log('Copying message:', messageId)
    // Implementar cópia para clipboard
  }

  const handleToggleFavorite = (messageId: string) => {
    console.log('Toggling favorite:', messageId)
  }

  const handleUseMessage = (messageId: string) => {
    console.log('Using message:', messageId)
  }

  const handleViewMessageStats = (messageId: string) => {
    console.log('Viewing message stats:', messageId)
  }

  const handleEditTemplate = (template: MessageTemplate) => {
    console.log('Editing template:', template)
    setShowTemplateForm(true)
  }

  const handleDeleteTemplate = (templateId: string) => {
    console.log('Deleting template:', templateId)
  }

  const handleCopyTemplate = (templateId: string) => {
    console.log('Copying template:', templateId)
  }

  const handleUseTemplate = (templateId: string) => {
    console.log('Using template:', templateId)
  }

  const handleApproveTemplate = (templateId: string) => {
    console.log('Approving template:', templateId)
  }

  const handleOpenFolder = (folderId: string) => {
    console.log('Opening folder:', folderId)
  }

  const handleEditFolder = (folder: MessageFolder) => {
    console.log('Editing folder:', folder)
    setShowFolderForm(true)
  }

  const handleDeleteFolder = (folderId: string) => {
    console.log('Deleting folder:', folderId)
  }

  const handleShareFolder = (folderId: string) => {
    console.log('Sharing folder:', folderId)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Acervo WhatsApp</h1>
          <p className="text-white/70">Gerencie mensagens, templates e comunicação com pacientes</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="primary" 
            icon={Plus} 
            onClick={() => {
              if (activeTab === 'messages') setShowMessageForm(true)
              else if (activeTab === 'templates') setShowTemplateForm(true)
              else if (activeTab === 'folders') setShowFolderForm(true)
            }}
          >
            {activeTab === 'messages' ? 'Nova Mensagem' :
             activeTab === 'templates' ? 'Novo Template' :
             activeTab === 'folders' ? 'Nova Pasta' : 'Novo Item'}
          </Button>
          <Button variant="glass" icon={Upload}>
            Importar
          </Button>
          <Button variant="glass" icon={Download}>
            Exportar
          </Button>
          <Button variant="glass" icon={Settings}>
            Configurações
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white/[0.06] p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'messages'
              ? 'bg-white/[0.12] text-white shadow-lg'
              : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
          }`}
        >
          Mensagens
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'templates'
              ? 'bg-white/[0.12] text-white shadow-lg'
              : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
          }`}
        >
          Templates
        </button>
        <button
          onClick={() => setActiveTab('folders')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'folders'
              ? 'bg-white/[0.12] text-white shadow-lg'
              : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
          }`}
        >
          Pastas
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'analytics'
              ? 'bg-white/[0.12] text-white shadow-lg'
              : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
          }`}
        >
          Analytics
        </button>
      </div>

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          {/* Message Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stats.totalMessages}</p>
              <p className="text-white/60 text-sm">Total de Mensagens</p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{messages.filter(m => m.isFavorite).length}</p>
              <p className="text-white/60 text-sm">Favoritas</p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stats.avgResponseRate}%</p>
              <p className="text-white/60 text-sm">Taxa Média de Resposta</p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Tag className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stats.mostUsedCategory}</p>
              <p className="text-white/60 text-sm">Categoria Mais Usada</p>
            </GlassCard>
          </div>

          {/* Filters and Search */}
          <GlassCard className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Buscar mensagens, tags ou conteúdo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={Search}
                  variant="glass"
                />
              </div>
              
              <div className="flex gap-3">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>{category.label}</option>
                  ))}
                </select>
                
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {messageTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                
                <select 
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {specialties.map(specialty => (
                    <option key={specialty.value} value={specialty.value}>{specialty.label}</option>
                  ))}
                </select>
                
                <Button variant="glass" icon={Filter}>
                  Filtros
                </Button>
              </div>
            </div>
          </GlassCard>

          {/* Messages Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMessages.length === 0 ? (
              <div className="col-span-full">
                <GlassCard className="p-12 text-center">
                  <MessageSquare className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Nenhuma mensagem encontrada</h3>
                  <p className="text-white/60">Tente ajustar os filtros ou criar uma nova mensagem</p>
                </GlassCard>
              </div>
            ) : (
              filteredMessages.map(message => (
                <MessageCard 
                  key={message.id} 
                  message={message}
                  onEdit={() => handleEditMessage(message)}
                  onDelete={() => handleDeleteMessage(message.id)}
                  onCopy={() => handleCopyMessage(message.id)}
                  onToggleFavorite={() => handleToggleFavorite(message.id)}
                  onUse={() => handleUseMessage(message.id)}
                  onViewStats={() => handleViewMessageStats(message.id)}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          {/* Template Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stats.totalTemplates}</p>
              <p className="text-white/60 text-sm">Total de Templates</p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{templates.filter(t => t.isApproved).length}</p>
              <p className="text-white/60 text-sm">Aprovados</p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6 text-yellow-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{templates.filter(t => !t.isApproved).length}</p>
              <p className="text-white/60 text-sm">Pendentes</p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">
                {templates.reduce((acc, t) => acc + t.usageCount, 0)}
              </p>
              <p className="text-white/60 text-sm">Total de Usos</p>
            </GlassCard>
          </div>

          {/* Filters and Search */}
          <GlassCard className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Buscar templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={Search}
                  variant="glass"
                />
              </div>
              
              <div className="flex gap-3">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>{category.label}</option>
                  ))}
                </select>
                
                <select 
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {specialties.map(specialty => (
                    <option key={specialty.value} value={specialty.value}>{specialty.label}</option>
                  ))}
                </select>
                
                <Button variant="glass" icon={Filter}>
                  Filtros
                </Button>
              </div>
            </div>
          </GlassCard>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTemplates.length === 0 ? (
              <div className="col-span-full">
                <GlassCard className="p-12 text-center">
                  <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Nenhum template encontrado</h3>
                  <p className="text-white/60">Tente ajustar os filtros ou criar um novo template</p>
                </GlassCard>
              </div>
            ) : (
              filteredTemplates.map(template => (
                <TemplateCard 
                  key={template.id} 
                  template={template}
                  onEdit={() => handleEditTemplate(template)}
                  onDelete={() => handleDeleteTemplate(template.id)}
                  onCopy={() => handleCopyTemplate(template.id)}
                  onUse={() => handleUseTemplate(template.id)}
                  onApprove={!template.isApproved ? () => handleApproveTemplate(template.id) : undefined}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* Folders Tab */}
      {activeTab === 'folders' && (
        <div className="space-y-6">
          {/* Folder Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Folder className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stats.totalFolders}</p>
              <p className="text-white/60 text-sm">Total de Pastas</p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Share2 className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{folders.filter(f => f.isShared).length}</p>
              <p className="text-white/60 text-sm">Compartilhadas</p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-yellow-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{folders.reduce((acc, f) => acc + f.messageCount, 0)}</p>
              <p className="text-white/60 text-sm">Total de Mensagens</p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{folders.filter(f => f.isShared).length}</p>
              <p className="text-white/60 text-sm">Colaborativas</p>
            </GlassCard>
          </div>

          {/* Search */}
          <GlassCard className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Buscar pastas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={Search}
                  variant="glass"
                />
              </div>
            </div>
          </GlassCard>

          {/* Folders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFolders.length === 0 ? (
              <div className="col-span-full">
                <GlassCard className="p-12 text-center">
                  <Folder className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Nenhuma pasta encontrada</h3>
                  <p className="text-white/60">Tente ajustar a busca ou criar uma nova pasta</p>
                </GlassCard>
              </div>
            ) : (
              filteredFolders.map(folder => (
                <FolderCard 
                  key={folder.id} 
                  folder={folder}
                  onOpen={() => handleOpenFolder(folder.id)}
                  onEdit={() => handleEditFolder(folder)}
                  onDelete={() => handleDeleteFolder(folder.id)}
                  onShare={() => handleShareFolder(folder.id)}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Performance Geral</h3>
                  <p className="text-white/60 text-sm">Últimos 30 dias</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Taxa de Entrega</span>
                  <span className="text-white font-semibold">98.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Taxa de Leitura</span>
                  <span className="text-white font-semibold">94.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Taxa de Resposta</span>
                  <span className="text-white font-semibold">{stats.avgResponseRate}%</span>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Top Mensagens</h3>
                  <p className="text-white/60 text-sm">Maior engajamento</p>
                </div>
              </div>
              <div className="space-y-3">
                {stats.topPerformingMessages.slice(0, 3).map((message, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-white/70 text-sm truncate">{message.title}</span>
                    <span className="text-white font-semibold text-sm">{message.effectiveness.responseRate}%</span>
                  </div>
                ))}
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Atividade Recente</h3>
                  <p className="text-white/60 text-sm">Últimas ações</p>
                </div>
              </div>
              <div className="space-y-3">
                {stats.recentActivity.slice(0, 3).map((activity, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">{activity.action}</span>
                      <span className="text-white/60 text-xs">{new Date(activity.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-white/60 text-xs truncate">{activity.message}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Usage by Category */}
          <GlassCard className="p-6">
            <h3 className="text-white font-semibold mb-4">Uso por Categoria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.slice(1).map((category, index) => {
                const categoryMessages = messages.filter(m => m.category === category.value)
                const totalUsage = categoryMessages.reduce((acc, m) => acc + m.usageCount, 0)
                const avgResponse = categoryMessages.length > 0 
                  ? categoryMessages.reduce((acc, m) => acc + m.effectiveness.responseRate, 0) / categoryMessages.length 
                  : 0
                
                return (
                  <div key={index} className="bg-white/[0.06] rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">{category.label}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Mensagens</span>
                        <span className="text-white">{categoryMessages.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Usos</span>
                        <span className="text-white">{totalUsage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Resposta</span>
                        <span className="text-white">{avgResponse.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </GlassCard>

          {/* Performance Timeline */}
          <GlassCard className="p-6">
            <h3 className="text-white font-semibold mb-4">Timeline de Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/[0.06] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-white font-medium">Dezembro 2024</p>
                    <p className="text-white/60 text-sm">Performance atual</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">67.8%</p>
                  <p className="text-white/60 text-sm">Taxa de resposta</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/[0.06] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-white font-medium">Novembro 2024</p>
                    <p className="text-white/60 text-sm">Mês anterior</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">54.2%</p>
                  <p className="text-white/60 text-sm">Taxa de resposta</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/[0.06] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-white font-medium">Outubro 2024</p>
                    <p className="text-white/60 text-sm">Dois meses atrás</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">48.9%</p>
                  <p className="text-white/60 text-sm">Taxa de resposta</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}

export default WhatsAppLibrary