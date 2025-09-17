import React, { useState } from 'react'
import { 
  TrendingUp, 
  Users, 
  Mail, 
  Phone, 
  MessageSquare, 
  Target, 
  BarChart3, 
  PieChart, 
  Calendar, 
  Eye, 
  MousePointer, 
  Share2, 
  Heart, 
  Star,
  Plus,
  Search,
  Filter,
  Download,
  Settings,
  Edit,
  Trash2,
  Play,
  Pause,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Percent,
  Activity
} from 'lucide-react'
import GlassCard from '../components/GlassCard'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

interface Campaign {
  id: string
  name: string
  description: string
  type: 'email' | 'sms' | 'social' | 'whatsapp' | 'ads' | 'content'
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled'
  startDate: string
  endDate: string
  budget: number
  spent: number
  targetAudience: {
    demographics: string[]
    interests: string[]
    location: string[]
    ageRange: { min: number; max: number }
  }
  metrics: {
    impressions: number
    clicks: number
    conversions: number
    ctr: number
    cpc: number
    roas: number
  }
  content: {
    title: string
    message: string
    images?: string[]
    videos?: string[]
    cta: string
  }
  createdAt: string
  updatedAt: string
}

interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  source: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  score: number
  interests: string[]
  lastActivity: string
  notes?: string
  assignedTo?: string
  createdAt: string
}

interface Analytics {
  period: string
  totalLeads: number
  qualifiedLeads: number
  conversions: number
  conversionRate: number
  avgLeadScore: number
  topSources: { source: string; count: number; percentage: number }[]
  campaignPerformance: { campaign: string; roi: number; conversions: number }[]
  audienceInsights: {
    demographics: { age: string; percentage: number }[]
    interests: { interest: string; percentage: number }[]
    locations: { location: string; percentage: number }[]
  }
}

interface CampaignCardProps {
  campaign: Campaign
  onEdit: () => void
  onDelete: () => void
  onToggleStatus: () => void
  onViewAnalytics: () => void
}

const CampaignCard: React.FC<CampaignCardProps> = ({ 
  campaign, 
  onEdit, 
  onDelete, 
  onToggleStatus, 
  onViewAnalytics 
}) => {
  const getCampaignTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail
      case 'sms': return Phone
      case 'social': return Share2
      case 'whatsapp': return MessageSquare
      case 'ads': return Target
      case 'content': return Edit
      default: return TrendingUp
    }
  }

  const getCampaignTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-500/20 text-blue-400'
      case 'sms': return 'bg-green-500/20 text-green-400'
      case 'social': return 'bg-purple-500/20 text-purple-400'
      case 'whatsapp': return 'bg-emerald-500/20 text-emerald-400'
      case 'ads': return 'bg-red-500/20 text-red-400'
      case 'content': return 'bg-yellow-500/20 text-yellow-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-500/20 text-gray-400'
      case 'active': return 'bg-green-500/20 text-green-400'
      case 'paused': return 'bg-yellow-500/20 text-yellow-400'
      case 'completed': return 'bg-blue-500/20 text-blue-400'
      case 'cancelled': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const Icon = getCampaignTypeIcon(campaign.type)
  const budgetUsed = (campaign.spent / campaign.budget) * 100

  return (
    <GlassCard className="p-6 hover:scale-[1.01] transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getCampaignTypeColor(campaign.type)}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{campaign.name}</h3>
            <p className="text-white/60 text-sm">{campaign.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button onClick={onEdit} className="text-white/60 hover:text-white transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={onViewAnalytics} className="text-white/60 hover:text-blue-400 transition-colors">
            <BarChart3 className="w-4 h-4" />
          </button>
          <button onClick={onToggleStatus} className="text-white/60 hover:text-green-400 transition-colors">
            {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button onClick={onDelete} className="text-white/60 hover:text-red-400 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <span className={`px-2 py-1 rounded text-xs ${getCampaignTypeColor(campaign.type)}`}>
          {campaign.type === 'email' ? 'E-mail' :
           campaign.type === 'sms' ? 'SMS' :
           campaign.type === 'social' ? 'Redes Sociais' :
           campaign.type === 'whatsapp' ? 'WhatsApp' :
           campaign.type === 'ads' ? 'Anúncios' : 'Conteúdo'}
        </span>
        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(campaign.status)}`}>
          {campaign.status === 'draft' ? 'Rascunho' :
           campaign.status === 'active' ? 'Ativo' :
           campaign.status === 'paused' ? 'Pausado' :
           campaign.status === 'completed' ? 'Concluído' : 'Cancelado'}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-white/60 text-xs mb-1">Impressões</p>
          <p className="text-white font-semibold">{campaign.metrics.impressions.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-white/60 text-xs mb-1">Cliques</p>
          <p className="text-white font-semibold">{campaign.metrics.clicks.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-white/60 text-xs mb-1">Conversões</p>
          <p className="text-white font-semibold">{campaign.metrics.conversions}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Orçamento</span>
          <span className="text-white">R$ {campaign.spent.toLocaleString()} / R$ {campaign.budget.toLocaleString()}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(budgetUsed, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/60">
          <span>CTR: {campaign.metrics.ctr}%</span>
          <span>ROAS: {campaign.metrics.roas}x</span>
        </div>
      </div>
    </GlassCard>
  )
}

interface LeadCardProps {
  lead: Lead
  onEdit: () => void
  onDelete: () => void
  onContact: () => void
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, onEdit, onDelete, onContact }) => {
  const getLeadStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-400'
      case 'contacted': return 'bg-yellow-500/20 text-yellow-400'
      case 'qualified': return 'bg-green-500/20 text-green-400'
      case 'converted': return 'bg-purple-500/20 text-purple-400'
      case 'lost': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    if (score >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  return (
    <GlassCard className="p-4 hover:scale-[1.01] transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div>
            <h4 className="text-white font-semibold">{lead.name}</h4>
            <p className="text-white/60 text-sm">{lead.email}</p>
            {lead.phone && (
              <p className="text-white/60 text-sm">{lead.phone}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button onClick={onContact} className="text-white/60 hover:text-green-400 transition-colors">
            <Phone className="w-4 h-4" />
          </button>
          <button onClick={onEdit} className="text-white/60 hover:text-white transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="text-white/60 hover:text-red-400 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <span className={`px-2 py-1 rounded text-xs ${getLeadStatusColor(lead.status)}`}>
          {lead.status === 'new' ? 'Novo' :
           lead.status === 'contacted' ? 'Contatado' :
           lead.status === 'qualified' ? 'Qualificado' :
           lead.status === 'converted' ? 'Convertido' : 'Perdido'}
        </span>
        <span className="text-white/60 text-xs">Fonte: {lead.source}</span>
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-white/60 text-xs mb-1">Score do Lead</p>
          <p className={`font-semibold ${getScoreColor(lead.score)}`}>{lead.score}/100</p>
        </div>
        <div className="text-right">
          <p className="text-white/60 text-xs mb-1">Última Atividade</p>
          <p className="text-white text-xs">{new Date(lead.lastActivity).toLocaleDateString()}</p>
        </div>
      </div>
      
      {lead.interests.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {lead.interests.slice(0, 3).map((interest, index) => (
            <span key={index} className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
              {interest}
            </span>
          ))}
          {lead.interests.length > 3 && (
            <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
              +{lead.interests.length - 3}
            </span>
          )}
        </div>
      )}
    </GlassCard>
  )
}

export const Marketing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'leads' | 'analytics'>('campaigns')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showCampaignForm, setShowCampaignForm] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)

  const campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Campanha Cardiologia 2024',
      description: 'Promoção de consultas cardiológicas preventivas',
      type: 'email',
      status: 'active',
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      budget: 5000,
      spent: 2800,
      targetAudience: {
        demographics: ['Homens', 'Mulheres'],
        interests: ['Saúde', 'Cardiologia', 'Prevenção'],
        location: ['São Paulo', 'Rio de Janeiro'],
        ageRange: { min: 35, max: 65 }
      },
      metrics: {
        impressions: 15420,
        clicks: 892,
        conversions: 47,
        ctr: 5.8,
        cpc: 3.14,
        roas: 2.8
      },
      content: {
        title: 'Cuide do seu coração',
        message: 'Agende sua consulta cardiológica preventiva com desconto especial',
        cta: 'Agendar Consulta'
      },
      createdAt: '2024-11-15',
      updatedAt: '2024-12-18'
    },
    {
      id: '2',
      name: 'WhatsApp Ortopedia',
      description: 'Divulgação de tratamentos ortopédicos via WhatsApp',
      type: 'whatsapp',
      status: 'active',
      startDate: '2024-12-10',
      endDate: '2024-12-25',
      budget: 3000,
      spent: 1200,
      targetAudience: {
        demographics: ['Atletas', 'Idosos'],
        interests: ['Ortopedia', 'Fisioterapia', 'Esportes'],
        location: ['São Paulo'],
        ageRange: { min: 25, max: 70 }
      },
      metrics: {
        impressions: 8500,
        clicks: 425,
        conversions: 23,
        ctr: 5.0,
        cpc: 2.82,
        roas: 3.2
      },
      content: {
        title: 'Tratamento Ortopédico Especializado',
        message: 'Dores nas articulações? Nossos especialistas podem ajudar!',
        cta: 'Falar no WhatsApp'
      },
      createdAt: '2024-12-01',
      updatedAt: '2024-12-18'
    },
    {
      id: '3',
      name: 'Redes Sociais - Dermatologia',
      description: 'Campanha de conscientização sobre câncer de pele',
      type: 'social',
      status: 'paused',
      startDate: '2024-11-20',
      endDate: '2024-12-20',
      budget: 4000,
      spent: 3200,
      targetAudience: {
        demographics: ['Mulheres', 'Homens'],
        interests: ['Dermatologia', 'Beleza', 'Saúde da Pele'],
        location: ['Brasil'],
        ageRange: { min: 18, max: 60 }
      },
      metrics: {
        impressions: 25600,
        clicks: 1280,
        conversions: 64,
        ctr: 5.0,
        cpc: 2.50,
        roas: 2.5
      },
      content: {
        title: 'Dezembro Laranja',
        message: 'Previna-se contra o câncer de pele. Faça seu check-up dermatológico',
        cta: 'Agendar Consulta'
      },
      createdAt: '2024-11-10',
      updatedAt: '2024-12-15'
    }
  ]

  const leads: Lead[] = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '(11) 99999-9999',
      source: 'Campanha Cardiologia 2024',
      status: 'qualified',
      score: 85,
      interests: ['Cardiologia', 'Check-up', 'Prevenção'],
      lastActivity: '2024-12-18',
      notes: 'Interessado em consulta preventiva',
      assignedTo: 'Dr. Silva',
      createdAt: '2024-12-15'
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '(11) 88888-8888',
      source: 'WhatsApp Ortopedia',
      status: 'contacted',
      score: 72,
      interests: ['Ortopedia', 'Dor nas costas'],
      lastActivity: '2024-12-17',
      assignedTo: 'Dr. Cardoso',
      createdAt: '2024-12-16'
    },
    {
      id: '3',
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@email.com',
      source: 'Redes Sociais - Dermatologia',
      status: 'new',
      score: 68,
      interests: ['Dermatologia', 'Câncer de pele'],
      lastActivity: '2024-12-18',
      createdAt: '2024-12-18'
    }
  ]

  const analytics: Analytics = {
    period: 'Últimos 30 dias',
    totalLeads: 156,
    qualifiedLeads: 89,
    conversions: 34,
    conversionRate: 21.8,
    avgLeadScore: 74,
    topSources: [
      { source: 'E-mail Marketing', count: 67, percentage: 43 },
      { source: 'Redes Sociais', count: 45, percentage: 29 },
      { source: 'WhatsApp', count: 28, percentage: 18 },
      { source: 'Anúncios Google', count: 16, percentage: 10 }
    ],
    campaignPerformance: [
      { campaign: 'Campanha Cardiologia 2024', roi: 280, conversions: 47 },
      { campaign: 'WhatsApp Ortopedia', roi: 320, conversions: 23 },
      { campaign: 'Redes Sociais - Dermatologia', roi: 250, conversions: 64 }
    ],
    audienceInsights: {
      demographics: [
        { age: '25-34', percentage: 28 },
        { age: '35-44', percentage: 32 },
        { age: '45-54', percentage: 25 },
        { age: '55+', percentage: 15 }
      ],
      interests: [
        { interest: 'Cardiologia', percentage: 35 },
        { interest: 'Ortopedia', percentage: 28 },
        { interest: 'Dermatologia', percentage: 22 },
        { interest: 'Check-up', percentage: 15 }
      ],
      locations: [
        { location: 'São Paulo', percentage: 45 },
        { location: 'Rio de Janeiro', percentage: 25 },
        { location: 'Belo Horizonte', percentage: 15 },
        { location: 'Outros', percentage: 15 }
      ]
    }
  }

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || campaign.type === selectedType
    const matchesStatus = selectedStatus === 'all' || campaign.status === selectedStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  const campaignTypes = [
    { value: 'all', label: 'Todos os Tipos' },
    { value: 'email', label: 'E-mail' },
    { value: 'sms', label: 'SMS' },
    { value: 'social', label: 'Redes Sociais' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'ads', label: 'Anúncios' },
    { value: 'content', label: 'Conteúdo' }
  ]

  const campaignStatusTypes = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'draft', label: 'Rascunho' },
    { value: 'active', label: 'Ativo' },
    { value: 'paused', label: 'Pausado' },
    { value: 'completed', label: 'Concluído' },
    { value: 'cancelled', label: 'Cancelado' }
  ]

  const leadStatusTypes = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'new', label: 'Novo' },
    { value: 'contacted', label: 'Contatado' },
    { value: 'qualified', label: 'Qualificado' },
    { value: 'converted', label: 'Convertido' },
    { value: 'lost', label: 'Perdido' }
  ]

  const handleEditCampaign = (campaign: Campaign) => {
    console.log('Editing campaign:', campaign)
    setShowCampaignForm(true)
  }

  const handleDeleteCampaign = (campaignId: string) => {
    console.log('Deleting campaign:', campaignId)
  }

  const handleToggleCampaignStatus = (campaignId: string) => {
    console.log('Toggling campaign status:', campaignId)
  }

  const handleViewCampaignAnalytics = (campaignId: string) => {
    console.log('Viewing campaign analytics:', campaignId)
  }

  const handleEditLead = (lead: Lead) => {
    console.log('Editing lead:', lead)
    setShowLeadForm(true)
  }

  const handleDeleteLead = (leadId: string) => {
    console.log('Deleting lead:', leadId)
  }

  const handleContactLead = (leadId: string) => {
    console.log('Contacting lead:', leadId)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Marketing Médico</h1>
          <p className="text-white/70">Gerencie campanhas, leads e análise de performance</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="primary" 
            icon={Plus} 
            onClick={() => activeTab === 'campaigns' ? setShowCampaignForm(true) : setShowLeadForm(true)}
          >
            {activeTab === 'campaigns' ? 'Nova Campanha' : 'Novo Lead'}
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
          onClick={() => setActiveTab('campaigns')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'campaigns'
              ? 'bg-white/[0.12] text-white shadow-lg'
              : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
          }`}
        >
          Campanhas
        </button>
        <button
          onClick={() => setActiveTab('leads')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'leads'
              ? 'bg-white/[0.12] text-white shadow-lg'
              : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
          }`}
        >
          Leads
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

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          {/* Campaign Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{campaigns.length}</p>
              <p className="text-white/60 text-sm">Total de Campanhas</p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{campaigns.filter(c => c.status === 'active').length}</p>
              <p className="text-white/60 text-sm">Campanhas Ativas</p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-yellow-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">R$ {campaigns.reduce((acc, c) => acc + c.spent, 0).toLocaleString()}</p>
              <p className="text-white/60 text-sm">Total Investido</p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Percent className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{(campaigns.reduce((acc, c) => acc + c.metrics.roas, 0) / campaigns.length).toFixed(1)}x</p>
              <p className="text-white/60 text-sm">ROAS Médio</p>
            </GlassCard>
          </div>

          {/* Filters and Search */}
          <GlassCard className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Buscar campanhas..."
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
                  {campaignTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {campaignStatusTypes.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
                
                <Button variant="glass" icon={Filter}>
                  Filtros
                </Button>
              </div>
            </div>
          </GlassCard>

          {/* Campaigns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCampaigns.length === 0 ? (
              <div className="col-span-full">
                <GlassCard className="p-12 text-center">
                  <Target className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Nenhuma campanha encontrada</h3>
                  <p className="text-white/60">Tente ajustar os filtros ou criar uma nova campanha</p>
                </GlassCard>
              </div>
            ) : (
              filteredCampaigns.map(campaign => (
                <CampaignCard 
                  key={campaign.id} 
                  campaign={campaign}
                  onEdit={() => handleEditCampaign(campaign)}
                  onDelete={() => handleDeleteCampaign(campaign.id)}
                  onToggleStatus={() => handleToggleCampaignStatus(campaign.id)}
                  onViewAnalytics={() => handleViewCampaignAnalytics(campaign.id)}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* Leads Tab */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          {/* Lead Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{analytics.totalLeads}</p>
              <p className="text-white/60 text-sm">Total de Leads</p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{analytics.qualifiedLeads}</p>
              <p className="text-white/60 text-sm">Leads Qualificados</p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{analytics.conversions}</p>
              <p className="text-white/60 text-sm">Conversões</p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Percent className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{analytics.conversionRate}%</p>
              <p className="text-white/60 text-sm">Taxa de Conversão</p>
            </GlassCard>
          </div>

          {/* Filters and Search */}
          <GlassCard className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Buscar leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={Search}
                  variant="glass"
                />
              </div>
              
              <div className="flex gap-3">
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {leadStatusTypes.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
                
                <Button variant="glass" icon={Filter}>
                  Filtros
                </Button>
              </div>
            </div>
          </GlassCard>

          {/* Leads Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredLeads.length === 0 ? (
              <div className="col-span-full">
                <GlassCard className="p-12 text-center">
                  <Users className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Nenhum lead encontrado</h3>
                  <p className="text-white/60">Tente ajustar os filtros ou adicionar um novo lead</p>
                </GlassCard>
              </div>
            ) : (
              filteredLeads.map(lead => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead}
                  onEdit={() => handleEditLead(lead)}
                  onDelete={() => handleDeleteLead(lead.id)}
                  onContact={() => handleContactLead(lead.id)}
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
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Performance Geral</h3>
                  <p className="text-white/60 text-sm">{analytics.period}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Taxa de Conversão</span>
                  <span className="text-white font-semibold">{analytics.conversionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Score Médio</span>
                  <span className="text-white font-semibold">{analytics.avgLeadScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Total de Leads</span>
                  <span className="text-white font-semibold">{analytics.totalLeads}</span>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Top Fontes</h3>
                  <p className="text-white/60 text-sm">Principais origens</p>
                </div>
              </div>
              <div className="space-y-3">
                {analytics.topSources.slice(0, 3).map((source, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-white/70 text-sm">{source.source}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">{source.count}</span>
                      <span className="text-white/60 text-xs">({source.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">ROI Campanhas</h3>
                  <p className="text-white/60 text-sm">Retorno sobre investimento</p>
                </div>
              </div>
              <div className="space-y-3">
                {analytics.campaignPerformance.slice(0, 3).map((campaign, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-white/70 text-sm truncate">{campaign.campaign}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">{campaign.roi}%</span>
                      <span className="text-white/60 text-xs">({campaign.conversions})</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Audience Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GlassCard className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Demografia
              </h3>
              <div className="space-y-3">
                {analytics.audienceInsights.demographics.map((demo, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-white/70">{demo.age} anos</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${demo.percentage}%` }}
                        />
                      </div>
                      <span className="text-white text-sm">{demo.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Interesses
              </h3>
              <div className="space-y-3">
                {analytics.audienceInsights.interests.map((interest, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-white/70">{interest.interest}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                          style={{ width: `${interest.percentage}%` }}
                        />
                      </div>
                      <span className="text-white text-sm">{interest.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Localização
              </h3>
              <div className="space-y-3">
                {analytics.audienceInsights.locations.map((location, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-white/70">{location.location}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-yellow-500 to-red-500 rounded-full"
                          style={{ width: `${location.percentage}%` }}
                        />
                      </div>
                      <span className="text-white text-sm">{location.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  )
}

export default Marketing