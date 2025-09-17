import React, { useState } from 'react'
import GlassCard from '../components/GlassCard'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import {
  Search,
  Filter,
  Download,
  Share2,
  Bookmark,
  Star,
  Clock,
  User,
  Calendar,
  Tag,
  FileText,
  Heart,
  Brain,
  Stethoscope,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  ThumbsUp,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Info,
  Zap,
  Target,
  Award,
  BookOpen,
  Clipboard,
  Users,
  TrendingUp,
  BarChart3,
  Globe,
  Lock,
  Unlock,
  RefreshCw,
  Archive,
  Flag,
  MessageSquare,
  History,
  Upload
} from 'lucide-react'

interface Protocol {
  id: string
  title: string
  description: string
  category: string
  specialty: string
  version: string
  lastUpdated: string
  author: {
    name: string
    institution: string
    avatar: string
    verified: boolean
  }
  content: {
    sections: ProtocolSection[]
    references: string[]
    attachments?: string[]
  }
  metadata: {
    difficulty: 'Básico' | 'Intermediário' | 'Avançado'
    evidenceLevel: 'A' | 'B' | 'C' | 'D'
    approvalStatus: 'Aprovado' | 'Em Revisão' | 'Rascunho'
    tags: string[]
    estimatedReadTime: number // in minutes
  }
  stats: {
    views: number
    downloads: number
    bookmarks: number
    likes: number
    comments: number
    rating: number
  }
  featured?: boolean
  premium?: boolean
  urgent?: boolean
}

interface ProtocolSection {
  id: string
  title: string
  content: string
  subsections?: ProtocolSection[]
  type: 'text' | 'checklist' | 'flowchart' | 'table' | 'image'
  order: number
}

interface ProtocolCardProps {
  protocol: Protocol
  onView: () => void
  viewMode: 'grid' | 'list'
}

const ProtocolCard: React.FC<ProtocolCardProps> = ({ protocol, onView, viewMode }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return 'bg-green-500/20 text-green-400'
      case 'Intermediário': return 'bg-yellow-500/20 text-yellow-400'
      case 'Avançado': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getEvidenceLevelColor = (level: string) => {
    switch (level) {
      case 'A': return 'bg-green-500/20 text-green-400'
      case 'B': return 'bg-blue-500/20 text-blue-400'
      case 'C': return 'bg-yellow-500/20 text-yellow-400'
      case 'D': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado': return 'bg-green-500/20 text-green-400'
      case 'Em Revisão': return 'bg-yellow-500/20 text-yellow-400'
      case 'Rascunho': return 'bg-gray-500/20 text-gray-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  if (viewMode === 'list') {
    return (
      <GlassCard className="p-6 hover:scale-[1.01] transition-all duration-200">
        <div className="flex items-start gap-6">
          {/* Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-8 h-8 text-white" />
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-white font-bold text-lg">{protocol.title}</h3>
                  {protocol.featured && <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
                  {protocol.urgent && <AlertTriangle className="w-5 h-5 text-red-400" />}
                  {protocol.premium && <Lock className="w-5 h-5 text-yellow-400" />}
                </div>
                
                <p className="text-white/70 mb-3 line-clamp-2">{protocol.description}</p>
                
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(protocol.metadata.difficulty)}`}>
                    {protocol.metadata.difficulty}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${getEvidenceLevelColor(protocol.metadata.evidenceLevel)}`}>
                    Nível {protocol.metadata.evidenceLevel}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(protocol.metadata.approvalStatus)}`}>
                    {protocol.metadata.approvalStatus}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {protocol.author.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {protocol.lastUpdated}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {protocol.metadata.estimatedReadTime}min
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {protocol.stats.views}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="primary" onClick={onView}>
              Visualizar
            </Button>
            <Button variant="glass" icon={Download} />
            <Button variant="glass" icon={Bookmark} />
            <Button variant="glass" icon={Share2} />
          </div>
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="overflow-hidden hover:scale-[1.02] transition-all duration-200">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex items-center gap-1">
            {protocol.featured && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
            {protocol.urgent && <AlertTriangle className="w-4 h-4 text-red-400" />}
            {protocol.premium && <Lock className="w-4 h-4 text-yellow-400" />}
          </div>
        </div>
        
        <h3 className="text-white font-bold mb-2 line-clamp-2">{protocol.title}</h3>
        <p className="text-white/70 text-sm mb-4 line-clamp-3">{protocol.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(protocol.metadata.difficulty)}`}>
            {protocol.metadata.difficulty}
          </span>
          <span className={`px-2 py-1 rounded text-xs ${getEvidenceLevelColor(protocol.metadata.evidenceLevel)}`}>
            Nível {protocol.metadata.evidenceLevel}
          </span>
          <span className={`px-2 py-1 rounded text-xs ${getStatusColor(protocol.metadata.approvalStatus)}`}>
            {protocol.metadata.approvalStatus}
          </span>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
            <User className="w-3 h-3 text-white" />
          </div>
          <div>
            <p className="text-white text-xs font-medium">{protocol.author.name}</p>
            <p className="text-white/60 text-xs">{protocol.author.institution}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-white/60 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {protocol.stats.views}
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              {protocol.stats.downloads}
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" />
              {protocol.stats.likes}
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {protocol.metadata.estimatedReadTime}min
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="primary" onClick={onView} fullWidth>
            Visualizar
          </Button>
          <Button variant="glass" icon={Bookmark} />
          <Button variant="glass" icon={Download} />
        </div>
      </div>
    </GlassCard>
  )
}

interface ProtocolViewerProps {
  protocol: Protocol
  onClose: () => void
}

const ProtocolViewer: React.FC<ProtocolViewerProps> = ({ protocol, onClose }) => {
  const [activeSection, setActiveSection] = useState(0)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const renderSection = (section: ProtocolSection, depth = 0) => {
    const isExpanded = expandedSections.has(section.id)
    
    return (
      <div key={section.id} className={`${depth > 0 ? 'ml-6' : ''}`}>
        <div 
          className="flex items-center gap-2 p-3 hover:bg-white/[0.03] rounded-lg cursor-pointer"
          onClick={() => toggleSection(section.id)}
        >
          {section.subsections && section.subsections.length > 0 && (
            isExpanded ? 
              <ChevronDown className="w-4 h-4 text-white/60" /> : 
              <ChevronRight className="w-4 h-4 text-white/60" />
          )}
          <h4 className={`text-white font-medium ${depth === 0 ? 'text-lg' : 'text-base'}`}>
            {section.title}
          </h4>
        </div>
        
        {isExpanded && (
          <div className="ml-6 mb-4">
            <div className="prose prose-invert max-w-none">
              <p className="text-white/80 leading-relaxed">{section.content}</p>
            </div>
            
            {section.subsections && section.subsections.map(subsection => 
              renderSection(subsection, depth + 1)
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <GlassCard className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/[0.08]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-2">{protocol.title}</h1>
                <p className="text-white/70 mb-4">{protocol.description}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{protocol.author.name}</p>
                      <p className="text-white/60 text-xs">{protocol.author.institution}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Atualizado em {protocol.lastUpdated}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {protocol.metadata.estimatedReadTime}min de leitura
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {protocol.stats.views} visualizações
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${protocol.metadata.difficulty === 'Básico' ? 'bg-green-500/20 text-green-400' : protocol.metadata.difficulty === 'Intermediário' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                    {protocol.metadata.difficulty}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${protocol.metadata.evidenceLevel === 'A' ? 'bg-green-500/20 text-green-400' : protocol.metadata.evidenceLevel === 'B' ? 'bg-blue-500/20 text-blue-400' : protocol.metadata.evidenceLevel === 'C' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                    Evidência Nível {protocol.metadata.evidenceLevel}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400">
                    {protocol.specialty}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="glass" icon={Download}>
                  Download
                </Button>
                <Button variant="glass" icon={Share2}>
                  Compartilhar
                </Button>
                <Button variant="glass" icon={Bookmark}>
                  Salvar
                </Button>
                <button 
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-hidden flex">
            {/* Table of Contents */}
            <div className="w-80 border-r border-white/[0.08] p-6 overflow-y-auto">
              <h3 className="text-white font-semibold mb-4">Índice</h3>
              <div className="space-y-1">
                {protocol.content.sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(index)}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      activeSection === index 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'text-white/70 hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {protocol.content.sections.map((section, index) => (
                <div key={section.id} className={activeSection === index ? 'block' : 'hidden'}>
                  {renderSection(section)}
                </div>
              ))}
              
              {/* References */}
              {protocol.content.references.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/[0.08]">
                  <h3 className="text-white font-semibold mb-4">Referências</h3>
                  <div className="space-y-2">
                    {protocol.content.references.map((reference, index) => (
                      <p key={index} className="text-white/70 text-sm">
                        {index + 1}. {reference}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export const Protocols: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'recent' | 'drafts'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedSpecialty, setSelectedSpecialty] = useState('Todas')
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todos')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null)

  const protocols: Protocol[] = [
    {
      id: '1',
      title: 'Protocolo de Atendimento ao IAM com Supradesnivelamento do ST',
      description: 'Diretrizes atualizadas para o manejo do infarto agudo do miocárdio com supradesnivelamento do segmento ST',
      category: 'Emergência',
      specialty: 'Cardiologia',
      version: '2.1',
      lastUpdated: '15/12/2024',
      author: {
        name: 'Dr. Carlos Mendes',
        institution: 'Hospital das Clínicas - USP',
        avatar: '',
        verified: true
      },
      content: {
        sections: [
          {
            id: 's1',
            title: 'Definição e Critérios Diagnósticos',
            content: 'O infarto agudo do miocárdio com supradesnivelamento do ST (IAMCSST) é definido pela presença de dor torácica típica associada a alterações eletrocardiográficas específicas...',
            type: 'text',
            order: 1
          },
          {
            id: 's2',
            title: 'Avaliação Inicial',
            content: 'A avaliação inicial deve ser rápida e sistemática, priorizando a identificação de candidatos à reperfusão...',
            type: 'checklist',
            order: 2
          }
        ],
        references: [
          'Sociedade Brasileira de Cardiologia. Diretriz da SBC sobre Tratamento do Infarto Agudo do Miocárdio com Supradesnivelamento do Segmento ST. 2020.',
          'ESC Guidelines for the management of acute myocardial infarction in patients presenting with ST-segment elevation. 2017.'
        ]
      },
      metadata: {
        difficulty: 'Avançado',
        evidenceLevel: 'A',
        approvalStatus: 'Aprovado',
        tags: ['IAM', 'STEMI', 'emergência', 'cardiologia'],
        estimatedReadTime: 15
      },
      stats: {
        views: 3420,
        downloads: 892,
        bookmarks: 156,
        likes: 234,
        comments: 45,
        rating: 4.8
      },
      featured: true
    },
    {
      id: '2',
      title: 'Protocolo de Sedação Consciente em Procedimentos',
      description: 'Diretrizes para sedação segura em procedimentos ambulatoriais e hospitalares',
      category: 'Procedimentos',
      specialty: 'Anestesiologia',
      version: '1.5',
      lastUpdated: '10/12/2024',
      author: {
        name: 'Dra. Ana Rodrigues',
        institution: 'Hospital Sírio-Libanês',
        avatar: '',
        verified: true
      },
      content: {
        sections: [
          {
            id: 's1',
            title: 'Indicações e Contraindicações',
            content: 'A sedação consciente está indicada para procedimentos que causam desconforto moderado...',
            type: 'text',
            order: 1
          }
        ],
        references: [
          'American Society of Anesthesiologists. Practice Guidelines for Moderate Procedural Sedation and Analgesia. 2018.'
        ]
      },
      metadata: {
        difficulty: 'Intermediário',
        evidenceLevel: 'B',
        approvalStatus: 'Aprovado',
        tags: ['sedação', 'anestesia', 'procedimentos'],
        estimatedReadTime: 12
      },
      stats: {
        views: 2180,
        downloads: 567,
        bookmarks: 89,
        likes: 145,
        comments: 23,
        rating: 4.6
      }
    },
    {
      id: '3',
      title: 'Manejo da Convulsão Febril em Pediatria',
      description: 'Protocolo atualizado para abordagem da convulsão febril em crianças',
      category: 'Pediatria',
      specialty: 'Pediatria',
      version: '3.0',
      lastUpdated: '08/12/2024',
      author: {
        name: 'Dr. Pedro Santos',
        institution: 'Hospital Infantil Sabará',
        avatar: '',
        verified: true
      },
      content: {
        sections: [
          {
            id: 's1',
            title: 'Definição e Classificação',
            content: 'Convulsão febril é definida como episódio convulsivo em criança entre 6 meses e 5 anos...',
            type: 'text',
            order: 1
          }
        ],
        references: [
          'Sociedade Brasileira de Pediatria. Diretrizes para o manejo da convulsão febril. 2019.'
        ]
      },
      metadata: {
        difficulty: 'Básico',
        evidenceLevel: 'A',
        approvalStatus: 'Em Revisão',
        tags: ['convulsão', 'febre', 'pediatria'],
        estimatedReadTime: 8
      },
      stats: {
        views: 1890,
        downloads: 445,
        bookmarks: 67,
        likes: 123,
        comments: 18,
        rating: 4.7
      },
      urgent: true
    }
  ]

  const filteredProtocols = protocols.filter(protocol => {
    const matchesSearch = protocol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         protocol.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || protocol.category === selectedCategory
    const matchesSpecialty = selectedSpecialty === 'Todas' || protocol.specialty === selectedSpecialty
    const matchesDifficulty = selectedDifficulty === 'Todos' || protocol.metadata.difficulty === selectedDifficulty
    const matchesTab = 
      (activeTab === 'all') ||
      (activeTab === 'favorites' && protocol.featured) ||
      (activeTab === 'recent' && new Date(protocol.lastUpdated.split('/').reverse().join('-')) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (activeTab === 'drafts' && protocol.metadata.approvalStatus === 'Rascunho')
    
    return matchesSearch && matchesCategory && matchesSpecialty && matchesDifficulty && matchesTab
  })

  const categories = ['Todos', 'Emergência', 'Procedimentos', 'Pediatria', 'Cirurgia', 'UTI']
  const specialties = ['Todas', 'Cardiologia', 'Anestesiologia', 'Pediatria', 'Neurologia', 'Cirurgia']
  const difficulties = ['Todos', 'Básico', 'Intermediário', 'Avançado']

  const totalProtocols = protocols.length
  const approvedProtocols = protocols.filter(p => p.metadata.approvalStatus === 'Aprovado').length
  const totalViews = protocols.reduce((acc, protocol) => acc + protocol.stats.views, 0)
  const averageRating = protocols.reduce((acc, protocol) => acc + protocol.stats.rating, 0) / protocols.length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Protocolos Médicos</h1>
          <p className="text-white/70">Acesse protocolos atualizados e baseados em evidências científicas</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="primary" icon={Plus}>
            Novo Protocolo
          </Button>
          <Button variant="glass" icon={Upload}>
            Importar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">{totalProtocols}</p>
          <p className="text-white/60 text-sm">Protocolos Disponíveis</p>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">{approvedProtocols}</p>
          <p className="text-white/60 text-sm">Protocolos Aprovados</p>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Eye className="w-6 h-6 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">{totalViews.toLocaleString()}</p>
          <p className="text-white/60 text-sm">Total de Visualizações</p>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">{averageRating.toFixed(1)}</p>
          <p className="text-white/60 text-sm">Avaliação Média</p>
        </GlassCard>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white/[0.06] p-1 rounded-lg w-fit">
        {[
          { key: 'all', label: 'Todos os Protocolos', icon: FileText },
          { key: 'favorites', label: 'Favoritos', icon: Star },
          { key: 'recent', label: 'Recentes', icon: Clock },
          { key: 'drafts', label: 'Rascunhos', icon: Edit }
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

      {/* Filters and Search */}
      <GlassCard className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Buscar protocolos..."
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
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select 
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
            
            <select 
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
            
            <div className="flex bg-white/[0.06] rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-white/[0.10] text-white' : 'text-white/60'
                }`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-white/[0.10] text-white' : 'text-white/60'
                }`}
              >
                <div className="w-4 h-4 flex flex-col gap-1">
                  <div className="bg-current h-0.5 rounded" />
                  <div className="bg-current h-0.5 rounded" />
                  <div className="bg-current h-0.5 rounded" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Protocols */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredProtocols.length === 0 ? (
          <div className="col-span-full">
            <GlassCard className="p-12 text-center">
              <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Nenhum protocolo encontrado</h3>
              <p className="text-white/60">Tente ajustar os filtros ou criar um novo protocolo</p>
            </GlassCard>
          </div>
        ) : (
          filteredProtocols.map(protocol => (
            <ProtocolCard 
              key={protocol.id} 
              protocol={protocol}
              onView={() => setSelectedProtocol(protocol)}
              viewMode={viewMode}
            />
          ))
        )}
      </div>

      {/* Protocol Viewer Modal */}
      {selectedProtocol && (
        <ProtocolViewer
          protocol={selectedProtocol}
          onClose={() => setSelectedProtocol(null)}
        />
      )}
    </div>
  )
}

export default Protocols