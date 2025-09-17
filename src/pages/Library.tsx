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
  BookOpen,
  ExternalLink,
  Eye,
  ThumbsUp,
  MessageSquare,
  TrendingUp,
  Award,
  Globe,
  Zap,
  Target,
  BarChart3,
  Users,
  Heart,
  Brain,
  Microscope,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  Plus,
  Upload,
  Edit,
  Trash2,
  Archive,
  Flag,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  Info,
  Lock,
  Unlock,
  History,
  Layers,
  Database,
  Link,
  Quote,
  PieChart,
  LineChart,
  MoreHorizontal
} from 'lucide-react'

interface Article {
  id: string
  title: string
  abstract: string
  authors: Author[]
  journal: {
    name: string
    volume?: string
    issue?: string
    pages?: string
    impactFactor?: number
  }
  publishedDate: string
  doi?: string
  pmid?: string
  url?: string
  pdfUrl?: string
  keywords: string[]
  category: string
  specialty: string
  studyType: 'Revisão Sistemática' | 'Meta-análise' | 'Ensaio Clínico' | 'Estudo Observacional' | 'Relato de Caso' | 'Editorial' | 'Carta'
  evidenceLevel: 'I' | 'II' | 'III' | 'IV' | 'V'
  stats: {
    views: number
    downloads: number
    citations: number
    bookmarks: number
    shares: number
    rating: number
    reviews: number
  }
  access: {
    type: 'Open Access' | 'Subscription' | 'Free'
    available: boolean
  }
  featured?: boolean
  trending?: boolean
  recent?: boolean
}

interface Author {
  name: string
  affiliation?: string
  orcid?: string
  corresponding?: boolean
}

interface Collection {
  id: string
  name: string
  description: string
  articles: string[] // article IDs
  createdBy: string
  createdAt: string
  isPublic: boolean
  tags: string[]
  stats: {
    articles: number
    followers: number
    views: number
  }
}

interface ArticleCardProps {
  article: Article
  onView: () => void
  viewMode: 'grid' | 'list'
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onView, viewMode }) => {
  const getStudyTypeColor = (type: string) => {
    switch (type) {
      case 'Revisão Sistemática': return 'bg-purple-500/20 text-purple-400'
      case 'Meta-análise': return 'bg-blue-500/20 text-blue-400'
      case 'Ensaio Clínico': return 'bg-green-500/20 text-green-400'
      case 'Estudo Observacional': return 'bg-yellow-500/20 text-yellow-400'
      case 'Relato de Caso': return 'bg-orange-500/20 text-orange-400'
      case 'Editorial': return 'bg-gray-500/20 text-gray-400'
      case 'Carta': return 'bg-pink-500/20 text-pink-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getEvidenceLevelColor = (level: string) => {
    switch (level) {
      case 'I': return 'bg-green-500/20 text-green-400'
      case 'II': return 'bg-blue-500/20 text-blue-400'
      case 'III': return 'bg-yellow-500/20 text-yellow-400'
      case 'IV': return 'bg-orange-500/20 text-orange-400'
      case 'V': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getAccessColor = (type: string) => {
    switch (type) {
      case 'Open Access': return 'bg-green-500/20 text-green-400'
      case 'Free': return 'bg-blue-500/20 text-blue-400'
      case 'Subscription': return 'bg-yellow-500/20 text-yellow-400'
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
                  <h3 className="text-white font-bold text-lg line-clamp-2">{article.title}</h3>
                  {article.featured && <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
                  {article.trending && <TrendingUp className="w-5 h-5 text-green-400" />}
                  {article.access.type === 'Open Access' && <Unlock className="w-5 h-5 text-green-400" />}
                </div>
                
                <p className="text-white/70 mb-3 line-clamp-3">{article.abstract}</p>
                
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStudyTypeColor(article.studyType)}`}>
                    {article.studyType}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${getEvidenceLevelColor(article.evidenceLevel)}`}>
                    Nível {article.evidenceLevel}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${getAccessColor(article.access.type)}`}>
                    {article.access.type}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {article.authors[0]?.name}{article.authors.length > 1 && ` et al.`}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {article.journal.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {article.publishedDate}
                  </div>
                  {article.journal.impactFactor && (
                    <div className="flex items-center gap-1">
                      <BarChart3 className="w-4 h-4" />
                      IF: {article.journal.impactFactor}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {article.stats.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    {article.stats.downloads}
                  </div>
                  <div className="flex items-center gap-1">
                    <Quote className="w-4 h-4" />
                    {article.stats.citations} citações
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {article.stats.rating.toFixed(1)}
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
            {article.pdfUrl && (
              <Button variant="glass" icon={Download} />
            )}
            <Button variant="glass" icon={Bookmark} />
            <Button variant="glass" icon={Share2} />
            {article.url && (
              <Button variant="glass" icon={ExternalLink} />
            )}
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
            {article.featured && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
            {article.trending && <TrendingUp className="w-4 h-4 text-green-400" />}
            {article.access.type === 'Open Access' && <Unlock className="w-4 h-4 text-green-400" />}
          </div>
        </div>
        
        <h3 className="text-white font-bold mb-2 line-clamp-3 text-sm leading-tight">{article.title}</h3>
        <p className="text-white/70 text-xs mb-4 line-clamp-4">{article.abstract}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          <span className={`px-2 py-1 rounded text-xs ${getStudyTypeColor(article.studyType)}`}>
            {article.studyType}
          </span>
          <span className={`px-2 py-1 rounded text-xs ${getEvidenceLevelColor(article.evidenceLevel)}`}>
            Nível {article.evidenceLevel}
          </span>
          <span className={`px-2 py-1 rounded text-xs ${getAccessColor(article.access.type)}`}>
            {article.access.type}
          </span>
        </div>
        
        <div className="mb-4">
          <p className="text-white text-xs font-medium">
            {article.authors[0]?.name}{article.authors.length > 1 && ` et al.`}
          </p>
          <p className="text-white/60 text-xs">{article.journal.name} • {article.publishedDate}</p>
          {article.journal.impactFactor && (
            <p className="text-white/60 text-xs">Impact Factor: {article.journal.impactFactor}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs text-white/60 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {article.stats.views}
            </div>
            <div className="flex items-center gap-1">
              <Quote className="w-3 h-3" />
              {article.stats.citations}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              {article.stats.rating.toFixed(1)}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="primary" onClick={onView} fullWidth>
            Visualizar
          </Button>
          <Button variant="glass" icon={Bookmark} />
          {article.pdfUrl && (
            <Button variant="glass" icon={Download} />
          )}
        </div>
      </div>
    </GlassCard>
  )
}

interface ArticleViewerProps {
  article: Article
  onClose: () => void
}

const ArticleViewer: React.FC<ArticleViewerProps> = ({ article, onClose }) => {
  const [activeTab, setActiveTab] = useState<'abstract' | 'details' | 'citations' | 'reviews'>('abstract')

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <GlassCard className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/[0.08]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-xl font-bold text-white mb-3 leading-tight">{article.title}</h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">
                        {article.authors.map(author => author.name).join(', ')}
                      </p>
                      <p className="text-white/60 text-xs">
                        {article.journal.name} • {article.publishedDate}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${article.studyType === 'Revisão Sistemática' ? 'bg-purple-500/20 text-purple-400' : article.studyType === 'Meta-análise' ? 'bg-blue-500/20 text-blue-400' : article.studyType === 'Ensaio Clínico' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {article.studyType}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${article.evidenceLevel === 'I' ? 'bg-green-500/20 text-green-400' : article.evidenceLevel === 'II' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    Evidência Nível {article.evidenceLevel}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${article.access.type === 'Open Access' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {article.access.type}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400">
                    {article.specialty}
                  </span>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {article.stats.views} visualizações
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    {article.stats.downloads} downloads
                  </div>
                  <div className="flex items-center gap-1">
                    <Quote className="w-4 h-4" />
                    {article.stats.citations} citações
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {article.stats.rating.toFixed(1)} ({article.stats.reviews} avaliações)
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {article.pdfUrl && (
                  <Button variant="primary" icon={Download}>
                    Download PDF
                  </Button>
                )}
                {article.url && (
                  <Button variant="glass" icon={ExternalLink}>
                    Ver Original
                  </Button>
                )}
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
          
          {/* Tabs */}
          <div className="flex space-x-1 bg-white/[0.06] p-1 mx-6 mt-4 rounded-lg w-fit">
            {[
              { key: 'abstract', label: 'Resumo', icon: FileText },
              { key: 'details', label: 'Detalhes', icon: Info },
              { key: 'citations', label: 'Citações', icon: Quote },
              { key: 'reviews', label: 'Avaliações', icon: Star }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
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
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'abstract' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-semibold mb-3">Resumo</h3>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-white/80 leading-relaxed">{article.abstract}</p>
                  </div>
                </div>
                
                {article.keywords.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3">Palavras-chave</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.keywords.map((keyword, index) => (
                        <span key={index} className="px-3 py-1 bg-white/[0.06] rounded-full text-sm text-white/80">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-white font-semibold mb-3">Informações da Publicação</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-white/60 text-sm">Revista</p>
                        <p className="text-white">{article.journal.name}</p>
                      </div>
                      {article.journal.volume && (
                        <div>
                          <p className="text-white/60 text-sm">Volume/Edição</p>
                          <p className="text-white">{article.journal.volume}{article.journal.issue && `(${article.journal.issue})`}</p>
                        </div>
                      )}
                      {article.journal.pages && (
                        <div>
                          <p className="text-white/60 text-sm">Páginas</p>
                          <p className="text-white">{article.journal.pages}</p>
                        </div>
                      )}
                      {article.journal.impactFactor && (
                        <div>
                          <p className="text-white/60 text-sm">Fator de Impacto</p>
                          <p className="text-white">{article.journal.impactFactor}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-semibold mb-3">Identificadores</h3>
                    <div className="space-y-3">
                      {article.doi && (
                        <div>
                          <p className="text-white/60 text-sm">DOI</p>
                          <p className="text-white font-mono text-sm">{article.doi}</p>
                        </div>
                      )}
                      {article.pmid && (
                        <div>
                          <p className="text-white/60 text-sm">PMID</p>
                          <p className="text-white font-mono text-sm">{article.pmid}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-3">Autores</h3>
                  <div className="space-y-2">
                    {article.authors.map((author, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg">
                        <div>
                          <p className="text-white font-medium">{author.name}</p>
                          {author.affiliation && (
                            <p className="text-white/60 text-sm">{author.affiliation}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {author.corresponding && (
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                              Correspondente
                            </span>
                          )}
                          {author.orcid && (
                            <Button variant="glass" icon={ExternalLink} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'citations' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">Citações ({article.stats.citations})</h3>
                  <Button variant="glass" icon={Download}>
                    Exportar
                  </Button>
                </div>
                
                <div className="text-center py-12">
                  <Quote className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Citações em desenvolvimento</h3>
                  <p className="text-white/60">Esta funcionalidade estará disponível em breve</p>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">Avaliações ({article.stats.reviews})</h3>
                  <Button variant="primary">
                    Avaliar Artigo
                  </Button>
                </div>
                
                <div className="text-center py-12">
                  <Star className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Sistema de avaliações em desenvolvimento</h3>
                  <p className="text-white/60">Esta funcionalidade estará disponível em breve</p>
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export const Library: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'collections' | 'saved' | 'trending'>('articles')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [selectedSpecialty, setSelectedSpecialty] = useState('Todas')
  const [selectedStudyType, setSelectedStudyType] = useState('Todos')
  const [selectedAccess, setSelectedAccess] = useState('Todos')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const articles: Article[] = [
    {
      id: '1',
      title: 'Efficacy and Safety of Novel Anticoagulants in Atrial Fibrillation: A Systematic Review and Meta-Analysis',
      abstract: 'Background: Novel oral anticoagulants (NOACs) have emerged as alternatives to warfarin for stroke prevention in atrial fibrillation. This systematic review and meta-analysis evaluates the efficacy and safety of NOACs compared to warfarin in patients with atrial fibrillation. Methods: We searched PubMed, Embase, and Cochrane databases for randomized controlled trials comparing NOACs with warfarin in atrial fibrillation patients. Results: Twenty-three studies involving 94,656 patients were included. NOACs showed superior efficacy in preventing stroke and systemic embolism (RR 0.81, 95% CI 0.73-0.91) with significantly lower rates of intracranial hemorrhage (RR 0.48, 95% CI 0.39-0.59). Conclusion: NOACs demonstrate superior efficacy and safety profile compared to warfarin in atrial fibrillation patients.',
      authors: [
        { name: 'Dr. Maria Silva', affiliation: 'Hospital das Clínicas - USP', corresponding: true },
        { name: 'Dr. João Santos', affiliation: 'InCor - HCFMUSP' },
        { name: 'Dr. Ana Costa', affiliation: 'Hospital Sírio-Libanês' }
      ],
      journal: {
        name: 'Journal of the American College of Cardiology',
        volume: '78',
        issue: '12',
        pages: '1234-1245',
        impactFactor: 24.094
      },
      publishedDate: '2024-03-15',
      doi: '10.1016/j.jacc.2024.03.015',
      pmid: '38456789',
      url: 'https://www.jacc.org/doi/10.1016/j.jacc.2024.03.015',
      pdfUrl: 'https://www.jacc.org/doi/pdf/10.1016/j.jacc.2024.03.015',
      keywords: ['anticoagulants', 'atrial fibrillation', 'stroke prevention', 'meta-analysis'],
      category: 'Cardiologia',
      specialty: 'Cardiologia',
      studyType: 'Meta-análise',
      evidenceLevel: 'I',
      stats: {
        views: 5420,
        downloads: 1230,
        citations: 89,
        bookmarks: 234,
        shares: 156,
        rating: 4.8,
        reviews: 45
      },
      access: {
        type: 'Subscription',
        available: true
      },
      featured: true,
      trending: true
    },
    {
      id: '2',
      title: 'Machine Learning Applications in Medical Diagnosis: Current State and Future Perspectives',
      abstract: 'Artificial intelligence and machine learning have revolutionized medical diagnosis across multiple specialties. This comprehensive review examines current applications, challenges, and future directions of ML in clinical practice. We analyze recent developments in image recognition, natural language processing, and predictive modeling in healthcare settings.',
      authors: [
        { name: 'Dr. Pedro Oliveira', affiliation: 'MIT - Massachusetts Institute of Technology', corresponding: true },
        { name: 'Dr. Carla Mendes', affiliation: 'Stanford University School of Medicine' }
      ],
      journal: {
        name: 'Nature Medicine',
        volume: '30',
        issue: '4',
        pages: '567-578',
        impactFactor: 87.241
      },
      publishedDate: '2024-04-02',
      doi: '10.1038/s41591-024-02890-1',
      pmid: '38567890',
      keywords: ['machine learning', 'artificial intelligence', 'medical diagnosis', 'healthcare'],
      category: 'Tecnologia Médica',
      specialty: 'Informática Médica',
      studyType: 'Revisão Sistemática',
      evidenceLevel: 'II',
      stats: {
        views: 8920,
        downloads: 2340,
        citations: 156,
        bookmarks: 445,
        shares: 289,
        rating: 4.9,
        reviews: 78
      },
      access: {
        type: 'Open Access',
        available: true
      },
      featured: true,
      recent: true
    },
    {
      id: '3',
      title: 'COVID-19 Long-term Neurological Sequelae: A Prospective Cohort Study',
      abstract: 'Background: Long-term neurological complications following COVID-19 infection have been increasingly recognized. This prospective cohort study investigates the prevalence and characteristics of neurological sequelae in COVID-19 survivors. Methods: We followed 2,847 COVID-19 patients for 12 months post-infection, assessing neurological symptoms, cognitive function, and quality of life. Results: 34% of patients reported persistent neurological symptoms, with cognitive impairment being the most common (23%). Risk factors included severe acute illness and pre-existing comorbidities.',
      authors: [
        { name: 'Dr. Roberto Lima', affiliation: 'Hospital Albert Einstein', corresponding: true },
        { name: 'Dr. Fernanda Rocha', affiliation: 'UNIFESP' },
        { name: 'Dr. Carlos Brito', affiliation: 'Hospital das Clínicas - UFPE' }
      ],
      journal: {
        name: 'The Lancet Neurology',
        volume: '23',
        issue: '8',
        pages: '789-801',
        impactFactor: 59.935
      },
      publishedDate: '2024-08-15',
      doi: '10.1016/S1474-4422(24)00234-5',
      pmid: '39123456',
      keywords: ['COVID-19', 'neurological sequelae', 'long COVID', 'cognitive impairment'],
      category: 'Neurologia',
      specialty: 'Neurologia',
      studyType: 'Estudo Observacional',
      evidenceLevel: 'II',
      stats: {
        views: 6780,
        downloads: 1890,
        citations: 67,
        bookmarks: 298,
        shares: 234,
        rating: 4.7,
        reviews: 56
      },
      access: {
        type: 'Free',
        available: true
      },
      trending: true,
      recent: true
    }
  ]

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.authors.some(author => author.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'Todas' || article.category === selectedCategory
    const matchesSpecialty = selectedSpecialty === 'Todas' || article.specialty === selectedSpecialty
    const matchesStudyType = selectedStudyType === 'Todos' || article.studyType === selectedStudyType
    const matchesAccess = selectedAccess === 'Todos' || article.access.type === selectedAccess
    const matchesTab = 
      (activeTab === 'articles') ||
      (activeTab === 'saved' && article.featured) ||
      (activeTab === 'trending' && article.trending) ||
      (activeTab === 'collections')
    
    return matchesSearch && matchesCategory && matchesSpecialty && matchesStudyType && matchesAccess && matchesTab
  })

  const categories = ['Todas', 'Cardiologia', 'Neurologia', 'Tecnologia Médica', 'Oncologia', 'Pediatria']
  const specialties = ['Todas', 'Cardiologia', 'Neurologia', 'Informática Médica', 'Oncologia', 'Pediatria']
  const studyTypes = ['Todos', 'Revisão Sistemática', 'Meta-análise', 'Ensaio Clínico', 'Estudo Observacional', 'Relato de Caso']
  const accessTypes = ['Todos', 'Open Access', 'Free', 'Subscription']

  const totalArticles = articles.length
  const openAccessArticles = articles.filter(a => a.access.type === 'Open Access').length
  const totalCitations = articles.reduce((acc, article) => acc + article.stats.citations, 0)
  const averageRating = articles.reduce((acc, article) => acc + article.stats.rating, 0) / articles.length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Biblioteca Científica</h1>
          <p className="text-white/70">Acesse artigos científicos, pesquisas e publicações médicas atualizadas</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="primary" icon={Plus}>
            Adicionar Artigo
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
          <p className="text-2xl font-bold text-white mb-1">{totalArticles}</p>
          <p className="text-white/60 text-sm">Artigos Disponíveis</p>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Unlock className="w-6 h-6 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">{openAccessArticles}</p>
          <p className="text-white/60 text-sm">Open Access</p>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Quote className="w-6 h-6 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">{totalCitations}</p>
          <p className="text-white/60 text-sm">Total de Citações</p>
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
          { key: 'articles', label: 'Todos os Artigos', icon: FileText },
          { key: 'collections', label: 'Coleções', icon: Layers },
          { key: 'saved', label: 'Salvos', icon: Bookmark },
          { key: 'trending', label: 'Em Alta', icon: TrendingUp }
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
              placeholder="Buscar artigos, autores, palavras-chave..."
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
              value={selectedStudyType}
              onChange={(e) => setSelectedStudyType(e.target.value)}
              className="px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {studyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select 
              value={selectedAccess}
              onChange={(e) => setSelectedAccess(e.target.value)}
              className="px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {accessTypes.map(access => (
                <option key={access} value={access}>{access}</option>
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

      {/* Articles */}
      {activeTab === 'collections' ? (
        <div className="text-center py-12">
          <GlassCard className="p-12">
            <Layers className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Coleções em desenvolvimento</h3>
            <p className="text-white/60">Esta funcionalidade estará disponível em breve</p>
          </GlassCard>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredArticles.length === 0 ? (
            <div className="col-span-full">
              <GlassCard className="p-12 text-center">
                <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Nenhum artigo encontrado</h3>
                <p className="text-white/60">Tente ajustar os filtros ou adicionar novos artigos</p>
              </GlassCard>
            </div>
          ) : (
            filteredArticles.map(article => (
              <ArticleCard 
                key={article.id} 
                article={article}
                onView={() => setSelectedArticle(article)}
                viewMode={viewMode}
              />
            ))
          )}
        </div>
      )}

      {/* Article Viewer Modal */}
      {selectedArticle && (
        <ArticleViewer
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  )
}

export default Library