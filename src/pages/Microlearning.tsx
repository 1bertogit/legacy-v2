import React, { useState } from 'react'
import GlassCard from '../components/GlassCard'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Download,
  Search,
  Filter,
  Plus,
  User,
  Calendar,
  Star,
  CheckCircle,
  PlayCircle,
  Award,
  Target,
  TrendingUp,
  BookOpen,
  Video,
  Zap,
  Brain,
  Lightbulb,
  Timer,
  BarChart3,
  Trophy,
  Flame,
  ChevronRight,
  Lock,
  Unlock
} from 'lucide-react'

interface Microlesson {
  id: string
  title: string
  description: string
  instructor: {
    name: string
    specialty: string
    avatar: string
    verified: boolean
  }
  category: string
  specialty: string
  duration: number // in seconds
  difficulty: 'Básico' | 'Intermediário' | 'Avançado'
  thumbnail: string
  videoUrl: string
  views: number
  likes: number
  dislikes: number
  bookmarks: number
  createdAt: string
  tags: string[]
  learningObjectives: string[]
  prerequisites?: string[]
  nextLessons?: string[]
  quiz?: {
    questions: number
    passingScore: number
  }
  completed?: boolean
  progress?: number
  rating: number
  featured?: boolean
  premium?: boolean
}

interface VideoPlayerProps {
  lesson: Microlesson
  onClose: () => void
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ lesson, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = (currentTime / lesson.duration) * 100

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-6xl mx-4">
        <GlassCard className="overflow-hidden">
          {/* Video Container */}
          <div className="relative bg-black aspect-video">
            {/* Video Element Placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
              <div className="text-center">
                <PlayCircle className="w-20 h-20 text-white/60 mx-auto mb-4" />
                <p className="text-white/60">Vídeo: {lesson.title}</p>
                <p className="text-white/40 text-sm">{formatTime(lesson.duration)}</p>
              </div>
            </div>
            
            {/* Video Controls */}
            {showControls && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-white/20 rounded-full h-1 cursor-pointer">
                    <div 
                      className="bg-blue-500 h-1 rounded-full transition-all"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
                
                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    
                    <button className="text-white hover:text-blue-400 transition-colors">
                      <SkipBack className="w-5 h-5" />
                    </button>
                    
                    <button className="text-white hover:text-blue-400 transition-colors">
                      <SkipForward className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                      
                      <div className="w-20 bg-white/20 rounded-full h-1">
                        <div 
                          className="bg-white h-1 rounded-full"
                          style={{ width: `${volume * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <span className="text-white text-sm">
                      {formatTime(currentTime)} / {formatTime(lesson.duration)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className="text-white hover:text-blue-400 transition-colors">
                      <Maximize className="w-5 h-5" />
                    </button>
                    
                    <button 
                      onClick={onClose}
                      className="text-white hover:text-red-400 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Video Info */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-2">{lesson.title}</h2>
                <p className="text-white/70 mb-4">{lesson.description}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{lesson.instructor.name}</p>
                      <p className="text-white/60 text-xs">{lesson.instructor.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {lesson.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {lesson.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatTime(lesson.duration)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Learning Objectives */}
            {lesson.learningObjectives.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  Objetivos de Aprendizado
                </h3>
                <ul className="space-y-2">
                  {lesson.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2 text-white/70">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="primary" icon={ThumbsUp}>
                Curtir
              </Button>
              <Button variant="glass" icon={Bookmark}>
                Salvar
              </Button>
              <Button variant="glass" icon={Share2}>
                Compartilhar
              </Button>
              <Button variant="glass" icon={Download}>
                Download
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

interface LessonCardProps {
  lesson: Microlesson
  onPlay: () => void
  viewMode: 'grid' | 'list'
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, onPlay, viewMode }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return 'bg-green-500/20 text-green-400'
      case 'Intermediário': return 'bg-yellow-500/20 text-yellow-400'
      case 'Avançado': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  if (viewMode === 'list') {
    return (
      <GlassCard className="p-4 hover:scale-[1.01] transition-all duration-200">
        <div className="flex items-center gap-4">
          {/* Thumbnail */}
          <div className="relative w-32 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle className="w-8 h-8 text-white/60" />
            </div>
            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
              {formatTime(lesson.duration)}
            </div>
            {lesson.premium && (
              <div className="absolute top-1 left-1">
                <Lock className="w-4 h-4 text-yellow-400" />
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-white font-semibold">{lesson.title}</h3>
              {lesson.featured && (
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              )}
            </div>
            
            <p className="text-white/70 text-sm mb-2 line-clamp-2">{lesson.description}</p>
            
            <div className="flex items-center gap-3 text-xs text-white/60 mb-2">
              <span className={`px-2 py-1 rounded ${getDifficultyColor(lesson.difficulty)}`}>
                {lesson.difficulty}
              </span>
              <span>{lesson.specialty}</span>
              <span>{lesson.instructor.name}</span>
              <span>{lesson.views} visualizações</span>
            </div>
            
            {lesson.completed && (
              <div className="flex items-center gap-1 text-green-400 text-xs">
                <CheckCircle className="w-3 h-3" />
                Concluído
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="primary" icon={Play} onClick={onPlay}>
              Assistir
            </Button>
            <Button variant="glass" icon={Bookmark} />
          </div>
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="overflow-hidden hover:scale-[1.02] transition-all duration-200">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle className="w-12 h-12 text-white/60" />
        </div>
        
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {formatTime(lesson.duration)}
        </div>
        
        {lesson.premium && (
          <div className="absolute top-2 left-2">
            <Lock className="w-5 h-5 text-yellow-400" />
          </div>
        )}
        
        {lesson.featured && (
          <div className="absolute top-2 right-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </div>
        )}
        
        {lesson.completed && (
          <div className="absolute top-2 left-2">
            <div className="bg-green-500 rounded-full p-1">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
        
        {/* Play Button Overlay */}
        <button 
          onClick={onPlay}
          className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors flex items-center justify-center group"
        >
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
        </button>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white font-semibold text-sm line-clamp-2">{lesson.title}</h3>
        </div>
        
        <p className="text-white/70 text-xs mb-3 line-clamp-2">{lesson.description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(lesson.difficulty)}`}>
            {lesson.difficulty}
          </span>
          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
            {lesson.specialty}
          </span>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-white/60 mb-3">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {lesson.views}
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-3 h-3" />
            {lesson.likes}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            {lesson.rating}
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-3 h-3 text-white" />
          </div>
          <span className="text-white/70 text-xs">{lesson.instructor.name}</span>
        </div>
        
        {lesson.progress !== undefined && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-white/60 mb-1">
              <span>Progresso</span>
              <span>{lesson.progress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1">
              <div 
                className="bg-blue-500 h-1 rounded-full transition-all"
                style={{ width: `${lesson.progress}%` }}
              />
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button variant="primary" icon={Play} onClick={onPlay} fullWidth>
            Assistir
          </Button>
          <Button variant="glass" icon={Bookmark} />
        </div>
      </div>
    </GlassCard>
  )
}

interface LearningPathProps {
  title: string
  description: string
  lessons: Microlesson[]
  progress: number
  totalDuration: number
}

const LearningPath: React.FC<LearningPathProps> = ({ title, description, lessons, progress, totalDuration }) => {
  const formatTotalTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
          <p className="text-white/70 text-sm mb-4">{description}</p>
          
          <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
            <div className="flex items-center gap-1">
              <Video className="w-4 h-4" />
              {lessons.length} aulas
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatTotalTime(totalDuration)}
            </div>
            <div className="flex items-center gap-1">
              <BarChart3 className="w-4 h-4" />
              {progress}% concluído
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-white/60 mb-2">
              <span>Progresso do Trilha</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="primary" icon={PlayCircle}>
            Continuar
          </Button>
          <Button variant="glass" icon={Bookmark} />
        </div>
      </div>
      
      {/* Lessons Preview */}
      <div className="space-y-2">
        {lessons.slice(0, 3).map((lesson, index) => (
          <div key={lesson.id} className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-lg">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
              lesson.completed ? 'bg-green-500 text-white' : 'bg-white/10 text-white/60'
            }`}>
              {lesson.completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
            </div>
            
            <div className="flex-1">
              <p className="text-white text-sm font-medium">{lesson.title}</p>
              <p className="text-white/60 text-xs">{Math.floor(lesson.duration / 60)}min</p>
            </div>
            
            {lesson.premium && <Lock className="w-4 h-4 text-yellow-400" />}
            {!lesson.completed && index > 0 && <Lock className="w-4 h-4 text-white/40" />}
          </div>
        ))}
        
        {lessons.length > 3 && (
          <div className="text-center pt-2">
            <Button variant="ghost" icon={ChevronRight}>
              Ver todas as {lessons.length} aulas
            </Button>
          </div>
        )}
      </div>
    </GlassCard>
  )
}

export const Microlearning: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'paths' | 'favorites' | 'completed'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todos')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedLesson, setSelectedLesson] = useState<Microlesson | null>(null)

  const lessons: Microlesson[] = [
    {
      id: '1',
      title: 'ECG Básico: Interpretação de Ritmo',
      description: 'Aprenda os fundamentos da interpretação de ECG em apenas 5 minutos',
      instructor: {
        name: 'Dr. Carlos Silva',
        specialty: 'Cardiologista',
        avatar: '',
        verified: true
      },
      category: 'Cardiologia',
      specialty: 'Cardiologia',
      duration: 300, // 5 minutes
      difficulty: 'Básico',
      thumbnail: '',
      videoUrl: '',
      views: 2450,
      likes: 189,
      dislikes: 12,
      bookmarks: 67,
      createdAt: '10/12/2024',
      tags: ['ECG', 'cardiologia', 'básico', 'ritmo'],
      learningObjectives: [
        'Identificar ritmo sinusal normal',
        'Reconhecer arritmias básicas',
        'Calcular frequência cardíaca'
      ],
      rating: 4.8,
      featured: true,
      completed: true,
      progress: 100
    },
    {
      id: '2',
      title: 'Manejo da Dor Torácica na Emergência',
      description: 'Protocolo rápido para avaliação inicial de dor torácica',
      instructor: {
        name: 'Dra. Ana Santos',
        specialty: 'Emergencista',
        avatar: '',
        verified: true
      },
      category: 'Emergência',
      specialty: 'Emergência',
      duration: 420, // 7 minutes
      difficulty: 'Intermediário',
      thumbnail: '',
      videoUrl: '',
      views: 1890,
      likes: 156,
      dislikes: 8,
      bookmarks: 89,
      createdAt: '08/12/2024',
      tags: ['emergência', 'dor torácica', 'protocolo'],
      learningObjectives: [
        'Aplicar protocolo de dor torácica',
        'Identificar sinais de alarme',
        'Definir conduta inicial'
      ],
      rating: 4.9,
      progress: 65
    },
    {
      id: '3',
      title: 'Técnica de Intubação Orotraqueal',
      description: 'Passo a passo da intubação segura em situações críticas',
      instructor: {
        name: 'Dr. Roberto Lima',
        specialty: 'Anestesiologista',
        avatar: '',
        verified: true
      },
      category: 'Procedimentos',
      specialty: 'Anestesiologia',
      duration: 600, // 10 minutes
      difficulty: 'Avançado',
      thumbnail: '',
      videoUrl: '',
      views: 3200,
      likes: 245,
      dislikes: 15,
      bookmarks: 156,
      createdAt: '05/12/2024',
      tags: ['intubação', 'procedimento', 'via aérea'],
      learningObjectives: [
        'Preparar material de intubação',
        'Executar técnica correta',
        'Confirmar posicionamento do tubo'
      ],
      rating: 4.7,
      premium: true
    },
    {
      id: '4',
      title: 'Convulsão Febril em Pediatria',
      description: 'Abordagem rápida da convulsão febril na criança',
      instructor: {
        name: 'Dra. Maria Costa',
        specialty: 'Pediatra',
        avatar: '',
        verified: true
      },
      category: 'Pediatria',
      specialty: 'Pediatria',
      duration: 360, // 6 minutes
      difficulty: 'Intermediário',
      thumbnail: '',
      videoUrl: '',
      views: 1560,
      likes: 98,
      dislikes: 5,
      bookmarks: 45,
      createdAt: '03/12/2024',
      tags: ['pediatria', 'convulsão', 'febre'],
      learningObjectives: [
        'Diferenciar convulsão febril simples e complexa',
        'Aplicar medidas de suporte',
        'Definir necessidade de investigação'
      ],
      rating: 4.6
    }
  ]

  const learningPaths = [
    {
      title: 'Cardiologia de Emergência',
      description: 'Trilha completa para manejo de emergências cardiológicas',
      lessons: lessons.filter(l => l.category === 'Cardiologia'),
      progress: 75,
      totalDuration: 1800
    },
    {
      title: 'Procedimentos Básicos',
      description: 'Aprenda os procedimentos essenciais da medicina',
      lessons: lessons.filter(l => l.category === 'Procedimentos'),
      progress: 30,
      totalDuration: 2400
    }
  ]

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || lesson.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'Todos' || lesson.difficulty === selectedDifficulty
    const matchesTab = 
      (activeTab === 'all') ||
      (activeTab === 'favorites' && lesson.featured) ||
      (activeTab === 'completed' && lesson.completed)
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesTab
  })

  const categories = ['Todos', 'Cardiologia', 'Emergência', 'Procedimentos', 'Pediatria', 'Neurologia']
  const difficulties = ['Todos', 'Básico', 'Intermediário', 'Avançado']

  const totalWatchTime = lessons.reduce((acc, lesson) => acc + (lesson.progress || 0) * lesson.duration / 100, 0)
  const completedLessons = lessons.filter(l => l.completed).length
  const averageRating = lessons.reduce((acc, lesson) => acc + lesson.rating, 0) / lessons.length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Microaulas</h1>
          <p className="text-white/70">Aprenda conceitos médicos essenciais em vídeos curtos e objetivos</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="primary" icon={Plus}>
            Criar Microaula
          </Button>
          <Button variant="glass" icon={Trophy}>
            Ranking
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Video className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">{lessons.length}</p>
          <p className="text-white/60 text-sm">Microaulas Disponíveis</p>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">{completedLessons}</p>
          <p className="text-white/60 text-sm">Aulas Concluídas</p>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">{Math.floor(totalWatchTime / 60)}min</p>
          <p className="text-white/60 text-sm">Tempo Assistido</p>
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
          { key: 'all', label: 'Todas as Aulas', icon: Video },
          { key: 'paths', label: 'Trilhas de Aprendizado', icon: BookOpen },
          { key: 'favorites', label: 'Favoritas', icon: Star },
          { key: 'completed', label: 'Concluídas', icon: CheckCircle }
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

      {/* Learning Paths */}
      {activeTab === 'paths' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Trilhas de Aprendizado</h2>
            <Button variant="glass" icon={Plus}>
              Criar Trilha
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {learningPaths.map((path, index) => (
              <LearningPath key={index} {...path} />
            ))}
          </div>
        </div>
      )}

      {/* Filters and Search */}
      {activeTab !== 'paths' && (
        <GlassCard className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Buscar microaulas..."
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
      )}

      {/* Lessons */}
      {activeTab !== 'paths' && (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
          {filteredLessons.length === 0 ? (
            <div className="col-span-full">
              <GlassCard className="p-12 text-center">
                <Video className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Nenhuma microaula encontrada</h3>
                <p className="text-white/60">Tente ajustar os filtros ou criar uma nova microaula</p>
              </GlassCard>
            </div>
          ) : (
            filteredLessons.map(lesson => (
              <LessonCard 
                key={lesson.id} 
                lesson={lesson}
                onPlay={() => setSelectedLesson(lesson)}
                viewMode={viewMode}
              />
            ))
          )}
        </div>
      )}

      {/* Video Player Modal */}
      {selectedLesson && (
        <VideoPlayer
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
        />
      )}
    </div>
  )
}

export default Microlearning