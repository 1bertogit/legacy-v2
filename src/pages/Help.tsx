import React, { useState } from 'react'
import { Search, Book, MessageCircle, Video, FileText, ExternalLink, ChevronRight, Star, Clock, User, Tag, Filter, Download, Send, Phone, Mail, MapPin, Globe, HelpCircle, CheckCircle, AlertCircle, Info, Lightbulb, Zap, Heart, ThumbsUp, ThumbsDown, Eye, Share2, Bookmark } from 'lucide-react'
import GlassCard from '../components/GlassCard'

interface HelpArticle {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  views: number
  rating: number
  lastUpdated: string
  author: string
  readTime: number
  helpful: number
  notHelpful: number
  featured: boolean
}

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  helpful: number
  notHelpful: number
}

interface VideoTutorial {
  id: string
  title: string
  description: string
  duration: string
  thumbnail: string
  category: string
  views: number
  rating: number
  level: 'beginner' | 'intermediate' | 'advanced'
}

interface SupportTicket {
  id: string
  subject: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: string
  createdAt: string
  lastReply: string
  messages: number
}

interface ContactInfo {
  type: 'phone' | 'email' | 'address' | 'website'
  label: string
  value: string
  icon: React.ComponentType<any>
  available?: string
}

interface HelpStats {
  totalArticles: number
  totalViews: number
  avgRating: number
  resolvedTickets: number
  responseTime: string
  satisfaction: number
}

const Help: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'faq' | 'videos' | 'contact' | 'tickets'>('articles')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null)
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  })

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-500/20 text-blue-400'
      case 'in_progress': return 'bg-yellow-500/20 text-yellow-400'
      case 'resolved': return 'bg-green-500/20 text-green-400'
      case 'closed': return 'bg-gray-500/20 text-gray-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-500/20 text-green-400'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400'
      case 'high': return 'bg-orange-500/20 text-orange-400'
      case 'urgent': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  // Mock data
  const stats: HelpStats = {
    totalArticles: 156,
    totalViews: 12450,
    avgRating: 4.7,
    resolvedTickets: 98,
    responseTime: '2h',
    satisfaction: 96
  }

  const categories = [
    { id: 'all', name: 'Todas as Categorias', count: 156 },
    { id: 'getting-started', name: 'Primeiros Passos', count: 24 },
    { id: 'account', name: 'Conta e Perfil', count: 18 },
    { id: 'features', name: 'Funcionalidades', count: 32 },
    { id: 'troubleshooting', name: 'Solução de Problemas', count: 28 },
    { id: 'billing', name: 'Faturamento', count: 15 },
    { id: 'security', name: 'Segurança', count: 12 },
    { id: 'integrations', name: 'Integrações', count: 19 },
    { id: 'api', name: 'API', count: 8 }
  ]

  const articles: HelpArticle[] = [
    {
      id: '1',
      title: 'Como começar na plataforma Legacy Mentoring',
      content: 'Guia completo para novos usuários...',
      category: 'getting-started',
      tags: ['iniciante', 'tutorial', 'setup'],
      views: 1250,
      rating: 4.8,
      lastUpdated: '2024-01-15',
      author: 'Equipe Legacy',
      readTime: 5,
      helpful: 89,
      notHelpful: 3,
      featured: true
    },
    {
      id: '2',
      title: 'Configurando seu perfil médico',
      content: 'Aprenda a personalizar seu perfil...',
      category: 'account',
      tags: ['perfil', 'configuração', 'médico'],
      views: 890,
      rating: 4.6,
      lastUpdated: '2024-01-12',
      author: 'Dr. Silva',
      readTime: 3,
      helpful: 67,
      notHelpful: 5,
      featured: false
    },
    {
      id: '3',
      title: 'Usando o sistema de casos clínicos',
      content: 'Como submeter e revisar casos...',
      category: 'features',
      tags: ['casos', 'clínico', 'submissão'],
      views: 756,
      rating: 4.9,
      lastUpdated: '2024-01-10',
      author: 'Dr. Santos',
      readTime: 7,
      helpful: 92,
      notHelpful: 2,
      featured: true
    }
  ]

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'Como posso redefinir minha senha?',
      answer: 'Você pode redefinir sua senha clicando em "Esqueci minha senha" na tela de login e seguindo as instruções enviadas por email.',
      category: 'account',
      helpful: 45,
      notHelpful: 2
    },
    {
      id: '2',
      question: 'Posso usar a plataforma no celular?',
      answer: 'Sim! Nossa plataforma é totalmente responsiva e funciona perfeitamente em dispositivos móveis através do navegador.',
      category: 'features',
      helpful: 38,
      notHelpful: 1
    },
    {
      id: '3',
      question: 'Como cancelar minha assinatura?',
      answer: 'Você pode cancelar sua assinatura a qualquer momento nas configurações da conta, seção "Plano e Faturamento".',
      category: 'billing',
      helpful: 29,
      notHelpful: 3
    }
  ]

  const videos: VideoTutorial[] = [
    {
      id: '1',
      title: 'Tour pela plataforma Legacy Mentoring',
      description: 'Conheça todas as funcionalidades principais',
      duration: '8:45',
      thumbnail: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=medical%20platform%20dashboard%20tutorial%20video%20thumbnail%20modern%20interface&image_size=landscape_16_9',
      category: 'getting-started',
      views: 2340,
      rating: 4.8,
      level: 'beginner'
    },
    {
      id: '2',
      title: 'Criando seu primeiro caso clínico',
      description: 'Passo a passo para submeter casos',
      duration: '12:30',
      thumbnail: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=medical%20case%20study%20creation%20tutorial%20clinical%20documentation&image_size=landscape_16_9',
      category: 'features',
      views: 1890,
      rating: 4.9,
      level: 'intermediate'
    },
    {
      id: '3',
      title: 'Configurações avançadas de segurança',
      description: 'Proteja sua conta e dados médicos',
      duration: '6:15',
      thumbnail: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cybersecurity%20medical%20data%20protection%20tutorial%20interface&image_size=landscape_16_9',
      category: 'security',
      views: 1234,
      rating: 4.7,
      level: 'advanced'
    }
  ]

  const tickets: SupportTicket[] = [
    {
      id: 'TK-001',
      subject: 'Problema com upload de imagens',
      status: 'in_progress',
      priority: 'medium',
      category: 'technical',
      createdAt: '2024-01-15',
      lastReply: '2024-01-15',
      messages: 3
    },
    {
      id: 'TK-002',
      subject: 'Dúvida sobre faturamento',
      status: 'resolved',
      priority: 'low',
      category: 'billing',
      createdAt: '2024-01-14',
      lastReply: '2024-01-14',
      messages: 2
    }
  ]

  const contactInfo: ContactInfo[] = [
    {
      type: 'phone',
      label: 'Telefone',
      value: '+55 (11) 9999-9999',
      icon: Phone,
      available: 'Seg-Sex, 8h-18h'
    },
    {
      type: 'email',
      label: 'Email',
      value: 'suporte@legacymentoring.com',
      icon: Mail,
      available: '24/7'
    },
    {
      type: 'address',
      label: 'Endereço',
      value: 'São Paulo, SP - Brasil',
      icon: MapPin
    },
    {
      type: 'website',
      label: 'Website',
      value: 'www.legacymentoring.com',
      icon: Globe
    }
  ]

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory
    return matchesSearch && matchesCategory
  })





  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500/20 text-green-400'
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400'
      case 'advanced': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const tabs = [
    { id: 'articles', name: 'Artigos', icon: Book, count: filteredArticles.length },
    { id: 'faq', name: 'FAQ', icon: HelpCircle, count: filteredFAQs.length },
    { id: 'videos', name: 'Vídeos', icon: Video, count: filteredVideos.length },
    { id: 'contact', name: 'Contato', icon: MessageCircle, count: 0 },
    { id: 'tickets', name: 'Tickets', icon: FileText, count: tickets.length }
  ]

  const ArticleCard: React.FC<{ article: HelpArticle }> = ({ article }) => (
    <GlassCard 
      className="p-6 cursor-pointer hover:bg-white/[0.08] transition-all duration-200"
      onClick={() => setSelectedArticle(article)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {article.featured && (
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
                <Star className="w-3 h-3" />
                Destaque
              </div>
            )}
            <span className="px-2 py-1 bg-white/[0.08] text-white/70 rounded-full text-xs">
              {article.category}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{article.title}</h3>
          <p className="text-white/70 text-sm mb-3 line-clamp-2">{article.content}</p>
          <div className="flex items-center gap-4 text-xs text-white/60">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime} min
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {article.views}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              {article.rating}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">{article.helpful}</span>
          </div>
          <ChevronRight className="w-5 h-5 text-white/40" />
        </div>
      </div>
    </GlassCard>
  )

  const FAQCard: React.FC<{ faq: FAQ }> = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
      <GlassCard className="p-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left flex items-center justify-between"
        >
          <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
          <ChevronRight className={`w-5 h-5 text-white/60 transition-transform duration-200 ${
            isOpen ? 'rotate-90' : ''
          }`} />
        </button>
        {isOpen && (
          <div className="mt-4 pt-4 border-t border-white/[0.12]">
            <p className="text-white/80 mb-4">{faq.answer}</p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">{faq.helpful}</span>
              </button>
              <button className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors">
                <ThumbsDown className="w-4 h-4" />
                <span className="text-sm">{faq.notHelpful}</span>
              </button>
            </div>
          </div>
        )}
      </GlassCard>
    )
  }

  const VideoCard: React.FC<{ video: VideoTutorial }> = ({ video }) => (
    <GlassCard className="p-6 cursor-pointer hover:bg-white/[0.08] transition-all duration-200">
      <div className="relative mb-4">
        <div className="w-full h-32 bg-white/[0.08] rounded-lg flex items-center justify-center">
          <Video className="w-8 h-8 text-white/60" />
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
          {video.duration}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{video.title}</h3>
      <p className="text-white/70 text-sm mb-3 line-clamp-2">{video.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-white/60">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {video.views}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            {video.rating}
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          video.level === 'beginner' ? 'bg-green-500/20 text-green-400' :
          video.level === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-red-500/20 text-red-400'
        }`}>
          {video.level === 'beginner' ? 'Iniciante' :
           video.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
        </span>
      </div>
    </GlassCard>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Central de Ajuda</h1>
          <p className="text-white/70">Encontre respostas, tutoriais e suporte para usar a plataforma</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <GlassCard className="p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{stats.totalArticles}</div>
            <div className="text-white/60 text-sm">Artigos</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{stats.totalViews.toLocaleString()}</div>
            <div className="text-white/60 text-sm">Visualizações</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{stats.avgRating}</div>
            <div className="text-white/60 text-sm">Avaliação</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{stats.resolvedTickets}%</div>
            <div className="text-white/60 text-sm">Resolvidos</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{stats.responseTime}</div>
            <div className="text-white/60 text-sm">Resposta</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{stats.satisfaction}%</div>
            <div className="text-white/60 text-sm">Satisfação</div>
          </GlassCard>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <GlassCard className="p-1">
            <div className="flex flex-wrap gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white/[0.12] text-white'
                      : 'text-white/70 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                  {tab.count > 0 && (
                    <span className="px-2 py-1 bg-white/[0.12] text-white/80 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Search and Filters */}
        {(activeTab === 'articles' || activeTab === 'faq' || activeTab === 'videos') && (
          <div className="mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3">
                <GlassCard className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                    <input
                      type="text"
                      placeholder="Buscar por título, conteúdo ou tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-transparent text-white placeholder-white/60 border-none outline-none"
                    />
                  </div>
                </GlassCard>
              </div>
              <div>
                <GlassCard className="p-4">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-transparent text-white border-none outline-none appearance-none cursor-pointer"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id} className="bg-[#1a1a2e] text-white">
                          {category.name} ({category.count})
                        </option>
                      ))}
                    </select>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <GlassCard className="p-12 text-center">
                <Book className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Nenhum artigo encontrado</h3>
                <p className="text-white/60">Tente ajustar sua busca ou filtros</p>
              </GlassCard>
            )}
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <FAQCard key={faq.id} faq={faq} />
              ))
            ) : (
              <GlassCard className="p-12 text-center">
                <HelpCircle className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Nenhuma pergunta encontrada</h3>
                <p className="text-white/60">Tente ajustar sua busca ou filtros</p>
              </GlassCard>
            )}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="space-y-6">
            {filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              <GlassCard className="p-12 text-center">
                <Video className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Nenhum vídeo encontrado</h3>
                <p className="text-white/60">Tente ajustar sua busca ou filtros</p>
              </GlassCard>
            )}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <GlassCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Informações de Contato</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white/[0.04] rounded-lg">
                      <div className="w-12 h-12 bg-white/[0.08] rounded-lg flex items-center justify-center">
                        <info.icon className="w-6 h-6 text-white/80" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{info.label}</p>
                        <p className="text-white/70">{info.value}</p>
                        {info.available && (
                          <p className="text-white/50 text-sm">{info.available}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Horário de Atendimento</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Segunda - Sexta</span>
                    <span className="text-white">8:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Sábado</span>
                    <span className="text-white">9:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Domingo</span>
                    <span className="text-white/50">Fechado</span>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Contact Form */}
            <div>
              <GlassCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Enviar Mensagem</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Nome</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.12] rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/[0.24]"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.12] rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/[0.24]"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Assunto</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.12] rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/[0.24]"
                      placeholder="Assunto da mensagem"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Mensagem</label>
                    <textarea
                      rows={6}
                      className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.12] rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/[0.24] resize-none"
                      placeholder="Descreva sua dúvida ou problema..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                  >
                    <Send className="w-4 h-4" />
                    Enviar Mensagem
                  </button>
                </form>
              </GlassCard>
            </div>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="space-y-6">
            {/* Create Ticket */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Criar Novo Ticket</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Assunto</label>
                  <input
                    type="text"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.12] rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/[0.24]"
                    placeholder="Descreva brevemente o problema"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Categoria</label>
                  <select
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.12] rounded-lg text-white focus:outline-none focus:border-white/[0.24] appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#1a1a2e]">Selecione uma categoria</option>
                    <option value="technical" className="bg-[#1a1a2e]">Técnico</option>
                    <option value="billing" className="bg-[#1a1a2e]">Faturamento</option>
                    <option value="account" className="bg-[#1a1a2e]">Conta</option>
                    <option value="feature" className="bg-[#1a1a2e]">Funcionalidade</option>
                    <option value="other" className="bg-[#1a1a2e]">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Prioridade</label>
                  <select
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.12] rounded-lg text-white focus:outline-none focus:border-white/[0.24] appearance-none cursor-pointer"
                  >
                    <option value="low" className="bg-[#1a1a2e]">Baixa</option>
                    <option value="medium" className="bg-[#1a1a2e]">Média</option>
                    <option value="high" className="bg-[#1a1a2e]">Alta</option>
                    <option value="urgent" className="bg-[#1a1a2e]">Urgente</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-white/80 text-sm font-medium mb-2">Descrição</label>
                  <textarea
                    rows={4}
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.12] rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/[0.24] resize-none"
                    placeholder="Descreva detalhadamente o problema ou solicitação..."
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                  >
                    <Send className="w-4 h-4" />
                    Criar Ticket
                  </button>
                </div>
              </form>
            </GlassCard>

            {/* Existing Tickets */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Meus Tickets</h3>
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <GlassCard key={ticket.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-white">{ticket.subject}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
                            {ticket.status === 'open' ? 'Aberto' : 
                             ticket.status === 'in_progress' ? 'Em Andamento' :
                             ticket.status === 'resolved' ? 'Resolvido' : 'Fechado'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority === 'low' ? 'Baixa' :
                             ticket.priority === 'medium' ? 'Média' :
                             ticket.priority === 'high' ? 'Alta' : 'Urgente'}
                          </span>
                        </div>
                        <p className="text-white/60 text-sm mb-2">#{ticket.id}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-white/60">
                      <div className="flex items-center gap-4">
                        <span>Criado: {ticket.createdAt}</span>
                        <span>Última resposta: {ticket.lastReply}</span>
                        <span>{ticket.messages} mensagens</span>
                      </div>
                      <button className="text-blue-400 hover:text-blue-300 transition-colors">
                        Ver Detalhes
                      </button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Help