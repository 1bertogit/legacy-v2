import React, { useState } from 'react'
import GlassCard from '../components/GlassCard'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import {
  FileText,
  Upload,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Download,
  Search,
  Filter,
  Plus,
  Clock,
  User,
  Tag,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Heart,
  Bookmark,
  Flag,
  Edit,
  Trash2,
  Image as ImageIcon,
  Video,
  FileImage,
  Play
} from 'lucide-react'

interface ClinicalCase {
  id: string
  title: string
  description: string
  author: {
    name: string
    specialty: string
    avatar: string
    verified: boolean
  }
  category: string
  specialty: string
  difficulty: 'Básico' | 'Intermediário' | 'Avançado'
  status: 'pending' | 'approved' | 'rejected' | 'draft'
  createdAt: string
  updatedAt: string
  views: number
  likes: number
  comments: number
  bookmarks: number
  tags: string[]
  images?: string[]
  videos?: string[]
  documents?: string[]
  patientAge: number
  patientGender: 'M' | 'F'
  symptoms: string[]
  diagnosis: string
  treatment: string
  outcome: string
  learningPoints: string[]
  references?: string[]
  featured?: boolean
}

interface CaseCardProps {
  case: ClinicalCase
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  showActions?: boolean
}

const CaseCard: React.FC<CaseCardProps> = ({ case: clinicalCase, onView, onEdit, onDelete, showActions = true }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'draft': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <AlertCircle className="w-4 h-4" />
      case 'rejected': return <XCircle className="w-4 h-4" />
      case 'draft': return <Edit className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'APROVADO'
      case 'pending': return 'PENDENTE'
      case 'rejected': return 'REJEITADO'
      case 'draft': return 'RASCUNHO'
      default: return status.toUpperCase()
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return 'bg-green-500/20 text-green-400'
      case 'Intermediário': return 'bg-yellow-500/20 text-yellow-400'
      case 'Avançado': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <GlassCard className="p-6 hover:scale-[1.02] transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-white font-semibold text-lg">{clinicalCase.title}</h3>
            {clinicalCase.featured && (
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            )}
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2 py-1 rounded-full text-xs border flex items-center gap-1 ${getStatusColor(clinicalCase.status)}`}>
              {getStatusIcon(clinicalCase.status)}
              {getStatusText(clinicalCase.status)}
            </span>
            <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(clinicalCase.difficulty)}`}>
              {clinicalCase.difficulty}
            </span>
            <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-400">
              {clinicalCase.specialty}
            </span>
          </div>
          
          <p className="text-white/70 text-sm mb-4 line-clamp-3">{clinicalCase.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              Paciente: {clinicalCase.patientAge} anos, {clinicalCase.patientGender === 'M' ? 'Masculino' : 'Feminino'}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {clinicalCase.createdAt}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-white font-medium">{clinicalCase.author.name}</p>
            {clinicalCase.author.verified && (
              <CheckCircle className="w-4 h-4 text-blue-400" />
            )}
          </div>
          <p className="text-white/60 text-sm">{clinicalCase.author.specialty}</p>
        </div>
      </div>
      
      {/* Media indicators */}
      {(clinicalCase.images || clinicalCase.videos || clinicalCase.documents) && (
        <div className="flex items-center gap-3 mb-4">
          {clinicalCase.images && clinicalCase.images.length > 0 && (
            <div className="flex items-center gap-1 text-white/60 text-sm">
              <ImageIcon className="w-4 h-4" />
              {clinicalCase.images.length}
            </div>
          )}
          {clinicalCase.videos && clinicalCase.videos.length > 0 && (
            <div className="flex items-center gap-1 text-white/60 text-sm">
              <Video className="w-4 h-4" />
              {clinicalCase.videos.length}
            </div>
          )}
          {clinicalCase.documents && clinicalCase.documents.length > 0 && (
            <div className="flex items-center gap-1 text-white/60 text-sm">
              <FileText className="w-4 h-4" />
              {clinicalCase.documents.length}
            </div>
          )}
        </div>
      )}
      
      {/* Tags */}
      {clinicalCase.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {clinicalCase.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-white/[0.06] text-white/70 text-xs rounded">
              #{tag}
            </span>
          ))}
          {clinicalCase.tags.length > 3 && (
            <span className="px-2 py-1 bg-white/[0.06] text-white/70 text-xs rounded">
              +{clinicalCase.tags.length - 3}
            </span>
          )}
        </div>
      )}
      
      {/* Stats */}
      <div className="flex items-center gap-6 text-sm text-white/60 mb-4">
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          {clinicalCase.views}
        </div>
        <div className="flex items-center gap-1">
          <Heart className="w-4 h-4" />
          {clinicalCase.likes}
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className="w-4 h-4" />
          {clinicalCase.comments}
        </div>
        <div className="flex items-center gap-1">
          <Bookmark className="w-4 h-4" />
          {clinicalCase.bookmarks}
        </div>
      </div>
      
      {/* Actions */}
      {showActions && (
        <div className="flex gap-3">
          <Button variant="primary" icon={Eye} onClick={onView}>
            Ver Caso
          </Button>
          <Button variant="glass" icon={ThumbsUp}>
            Curtir
          </Button>
          <Button variant="glass" icon={Bookmark}>
            Salvar
          </Button>
          <Button variant="glass" icon={Share2}>
            Compartilhar
          </Button>
          {onEdit && (
            <Button variant="glass" icon={Edit} onClick={onEdit}>
              Editar
            </Button>
          )}
          {onDelete && (
            <Button variant="glass" icon={Trash2} onClick={onDelete}>
              Excluir
            </Button>
          )}
        </div>
      )}
    </GlassCard>
  )
}

interface CaseSubmissionFormProps {
  onClose: () => void
  onSubmit: (caseData: Partial<ClinicalCase>) => void
}

const CaseSubmissionForm: React.FC<CaseSubmissionFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    specialty: '',
    difficulty: 'Básico' as const,
    patientAge: '',
    patientGender: 'M' as const,
    symptoms: '',
    diagnosis: '',
    treatment: '',
    outcome: '',
    learningPoints: '',
    tags: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      patientAge: parseInt(formData.patientAge),
      symptoms: formData.symptoms.split(',').map(s => s.trim()),
      learningPoints: formData.learningPoints.split('\n').filter(p => p.trim()),
      tags: formData.tags.split(',').map(t => t.trim()),
      status: 'pending'
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <GlassCard className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Submeter Caso Clínico</h2>
            <Button variant="ghost" onClick={onClose}>
              ✕
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Título do Caso</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Ex: Paciente com dor torácica atípica"
                  variant="glass"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Especialidade</label>
                <select 
                  value={formData.specialty}
                  onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                  className="w-full px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                >
                  <option value="">Selecione a especialidade</option>
                  <option value="Cardiologia">Cardiologia</option>
                  <option value="Neurologia">Neurologia</option>
                  <option value="Emergência">Emergência</option>
                  <option value="Cirurgia">Cirurgia</option>
                  <option value="Pediatria">Pediatria</option>
                  <option value="Radiologia">Radiologia</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Descrição do Caso</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Descreva o caso clínico de forma detalhada..."
                className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 h-32 resize-none"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Idade do Paciente</label>
                <Input
                  type="number"
                  value={formData.patientAge}
                  onChange={(e) => setFormData({...formData, patientAge: e.target.value})}
                  placeholder="Ex: 45"
                  variant="glass"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Sexo do Paciente</label>
                <select 
                  value={formData.patientGender}
                  onChange={(e) => setFormData({...formData, patientGender: e.target.value as 'M'})}
                  className="w-full px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                >
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Dificuldade</label>
                <select 
                  value={formData.difficulty}
                  onChange={(e) => setFormData({...formData, difficulty: e.target.value as 'Básico' | 'Intermediário' | 'Avançado'})}
                  className="w-full px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                >
                  <option value="Básico">Básico</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Sintomas (separados por vírgula)</label>
              <Input
                value={formData.symptoms}
                onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                placeholder="Ex: dor torácica, dispneia, palpitações"
                variant="glass"
                required
              />
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Diagnóstico</label>
              <Input
                value={formData.diagnosis}
                onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
                placeholder="Ex: Infarto agudo do miocárdio"
                variant="glass"
                required
              />
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Tratamento</label>
              <textarea
                value={formData.treatment}
                onChange={(e) => setFormData({...formData, treatment: e.target.value})}
                placeholder="Descreva o tratamento realizado..."
                className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 h-24 resize-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Desfecho</label>
              <textarea
                value={formData.outcome}
                onChange={(e) => setFormData({...formData, outcome: e.target.value})}
                placeholder="Descreva o resultado do tratamento..."
                className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 h-24 resize-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Pontos de Aprendizado (um por linha)</label>
              <textarea
                value={formData.learningPoints}
                onChange={(e) => setFormData({...formData, learningPoints: e.target.value})}
                placeholder="Ponto 1\nPonto 2\nPonto 3"
                className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 h-24 resize-none"
              />
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Tags (separadas por vírgula)</label>
              <Input
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                placeholder="Ex: cardiologia, emergência, diagnóstico"
                variant="glass"
              />
            </div>
            
            {/* File Upload Section */}
            <div className="space-y-4">
              <h3 className="text-white font-medium">Anexos (Opcional)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <GlassCard className="p-4 text-center cursor-pointer hover:bg-white/[0.08] transition-colors">
                  <ImageIcon className="w-8 h-8 text-white/60 mx-auto mb-2" />
                  <p className="text-white/70 text-sm">Adicionar Imagens</p>
                  <p className="text-white/50 text-xs">JPG, PNG até 10MB</p>
                </GlassCard>
                
                <GlassCard className="p-4 text-center cursor-pointer hover:bg-white/[0.08] transition-colors">
                  <Video className="w-8 h-8 text-white/60 mx-auto mb-2" />
                  <p className="text-white/70 text-sm">Adicionar Vídeos</p>
                  <p className="text-white/50 text-xs">MP4 até 100MB</p>
                </GlassCard>
                
                <GlassCard className="p-4 text-center cursor-pointer hover:bg-white/[0.08] transition-colors">
                  <FileText className="w-8 h-8 text-white/60 mx-auto mb-2" />
                  <p className="text-white/70 text-sm">Adicionar Documentos</p>
                  <p className="text-white/50 text-xs">PDF até 25MB</p>
                </GlassCard>
              </div>
            </div>
            
            <div className="flex gap-4 pt-6">
              <Button type="submit" variant="primary" icon={Upload} fullWidth>
                Submeter Caso
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

export const ClinicalCases: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'my-cases' | 'pending' | 'favorites'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('Todos')
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todos')
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)
  const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null)

  const cases: ClinicalCase[] = [
    {
      id: '1',
      title: 'Paciente com Dor Torácica Atípica e ECG Normal',
      description: 'Homem de 45 anos apresenta dor torácica há 2 horas, com características atípicas. ECG inicial normal, mas troponina elevada. Discussão sobre diagnóstico diferencial e conduta.',
      author: {
        name: 'Dr. Carlos Silva',
        specialty: 'Cardiologista',
        avatar: '',
        verified: true
      },
      category: 'Emergência',
      specialty: 'Cardiologia',
      difficulty: 'Intermediário',
      status: 'approved',
      createdAt: '10/12/2024',
      updatedAt: '10/12/2024',
      views: 1250,
      likes: 89,
      comments: 23,
      bookmarks: 45,
      tags: ['cardiologia', 'emergência', 'diagnóstico', 'ECG'],
      images: ['ecg1.jpg', 'ecg2.jpg'],
      patientAge: 45,
      patientGender: 'M',
      symptoms: ['dor torácica', 'sudorese', 'náusea'],
      diagnosis: 'Infarto agudo do miocárdio sem supradesnivelamento do ST',
      treatment: 'Dupla antiagregação, anticoagulação, cateterismo de urgência',
      outcome: 'Paciente evoluiu bem após angioplastia primária',
      learningPoints: [
        'ECG normal não exclui IAM',
        'Troponina é fundamental no diagnóstico',
        'Tempo é músculo em cardiologia'
      ],
      featured: true
    },
    {
      id: '2',
      title: 'Criança com Convulsão Febril Complexa',
      description: 'Paciente pediátrico de 3 anos com episódio convulsivo prolongado durante quadro febril. Discussão sobre manejo inicial e investigação.',
      author: {
        name: 'Dra. Ana Santos',
        specialty: 'Pediatra',
        avatar: '',
        verified: true
      },
      category: 'Pediatria',
      specialty: 'Neurologia',
      difficulty: 'Avançado',
      status: 'approved',
      createdAt: '08/12/2024',
      updatedAt: '08/12/2024',
      views: 890,
      likes: 67,
      comments: 18,
      bookmarks: 32,
      tags: ['pediatria', 'neurologia', 'convulsão', 'febre'],
      videos: ['convulsao_manejo.mp4'],
      documents: ['protocolo_convulsao.pdf'],
      patientAge: 3,
      patientGender: 'F',
      symptoms: ['convulsão', 'febre', 'alteração de consciência'],
      diagnosis: 'Convulsão febril complexa',
      treatment: 'Diazepam, antitérmico, investigação de foco infeccioso',
      outcome: 'Paciente estável, sem novos episódios convulsivos',
      learningPoints: [
        'Diferenciação entre convulsão febril simples e complexa',
        'Indicações para investigação adicional',
        'Manejo da crise convulsiva em pediatria'
      ]
    },
    {
      id: '3',
      title: 'Abdome Agudo em Paciente Idoso',
      description: 'Paciente de 78 anos com dor abdominal intensa e sinais de irritação peritoneal. Tomografia mostra perfuração intestinal.',
      author: {
        name: 'Dr. Roberto Lima',
        specialty: 'Cirurgião',
        avatar: '',
        verified: false
      },
      category: 'Cirurgia',
      specialty: 'Cirurgia',
      difficulty: 'Avançado',
      status: 'pending',
      createdAt: '12/12/2024',
      updatedAt: '12/12/2024',
      views: 234,
      likes: 12,
      comments: 5,
      bookmarks: 8,
      tags: ['cirurgia', 'emergência', 'abdome agudo'],
      images: ['tc_abdome.jpg'],
      patientAge: 78,
      patientGender: 'M',
      symptoms: ['dor abdominal', 'vômitos', 'distensão abdominal'],
      diagnosis: 'Perfuração intestinal secundária a diverticulite',
      treatment: 'Laparotomia exploradora com ressecção e anastomose',
      outcome: 'Paciente em recuperação pós-operatória',
      learningPoints: [
        'Avaliação do abdome agudo no idoso',
        'Indicações cirúrgicas na diverticulite',
        'Cuidados pós-operatórios em pacientes idosos'
      ]
    }
  ]

  const filteredCases = cases.filter(clinicalCase => {
    const matchesSearch = clinicalCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clinicalCase.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === 'Todos' || clinicalCase.specialty === selectedSpecialty
    const matchesDifficulty = selectedDifficulty === 'Todos' || clinicalCase.difficulty === selectedDifficulty
    const matchesTab = 
      (activeTab === 'all') ||
      (activeTab === 'my-cases' && clinicalCase.author.name === 'Dr. Carlos Silva') ||
      (activeTab === 'pending' && clinicalCase.status === 'pending') ||
      (activeTab === 'favorites' && clinicalCase.featured)
    
    return matchesSearch && matchesSpecialty && matchesDifficulty && matchesTab
  })

  const specialties = ['Todos', 'Cardiologia', 'Neurologia', 'Cirurgia', 'Emergência', 'Pediatria', 'Radiologia']
  const difficulties = ['Todos', 'Básico', 'Intermediário', 'Avançado']

  const handleSubmitCase = (caseData: Partial<ClinicalCase>) => {
    console.log('Submitting case:', caseData)
    setShowSubmissionForm(false)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Casos Clínicos</h1>
          <p className="text-white/70">Explore e compartilhe casos clínicos reais para aprendizado colaborativo</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="primary" icon={Plus} onClick={() => setShowSubmissionForm(true)}>
            Submeter Caso
          </Button>
          <Button variant="glass" icon={FileText}>
            Meus Casos
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">1,247</p>
          <p className="text-white/60 text-sm">Casos Publicados</p>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">892</p>
          <p className="text-white/60 text-sm">Casos Aprovados</p>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">45</p>
          <p className="text-white/60 text-sm">Aguardando Revisão</p>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">156</p>
          <p className="text-white/60 text-sm">Casos em Destaque</p>
        </GlassCard>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white/[0.06] p-1 rounded-lg w-fit">
        {[
          { key: 'all', label: 'Todos os Casos', icon: FileText },
          { key: 'my-cases', label: 'Meus Casos', icon: User },
          { key: 'pending', label: 'Pendentes', icon: Clock },
          { key: 'favorites', label: 'Favoritos', icon: Star }
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
              placeholder="Buscar casos clínicos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
              variant="glass"
            />
          </div>
          
          <div className="flex gap-3">
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
          </div>
        </div>
      </GlassCard>

      {/* Cases */}
      <div className="space-y-6">
        {filteredCases.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Nenhum caso encontrado</h3>
            <p className="text-white/60">Tente ajustar os filtros ou submeter um novo caso</p>
          </GlassCard>
        ) : (
          filteredCases.map(clinicalCase => (
            <CaseCard 
              key={clinicalCase.id} 
              case={clinicalCase}
              onView={() => setSelectedCase(clinicalCase)}
            />
          ))
        )}
      </div>

      {/* Submission Form Modal */}
      {showSubmissionForm && (
        <CaseSubmissionForm
          onClose={() => setShowSubmissionForm(false)}
          onSubmit={handleSubmitCase}
        />
      )}
    </div>
  )
}

export default ClinicalCases