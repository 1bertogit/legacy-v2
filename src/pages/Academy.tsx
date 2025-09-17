import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GlassCard from '../components/GlassCard'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import {
  BookOpen,
  Play,
  Clock,
  Users,
  Star,
  Search,
  Filter,
  Grid,
  List,
  Award,
  TrendingUp,
  ChevronRight
} from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  students: number
  rating: number
  level: 'Iniciante' | 'Intermediário' | 'Avançado'
  category: string
  thumbnail: string
  progress?: number
  price: string
  featured?: boolean
}

interface CategoryProps {
  name: string
  count: number
  icon: React.ComponentType<any>
  color: string
}

const CategoryCard: React.FC<CategoryProps> = ({ name, count, icon: Icon, color }) => (
  <GlassCard className="p-6 hover:scale-105 transition-transform duration-200 cursor-pointer">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-white font-semibold">{name}</h3>
        <p className="text-white/60 text-sm">{count} cursos</p>
      </div>
    </div>
  </GlassCard>
)

interface CourseCardProps {
  course: Course
  viewMode: 'grid' | 'list'
}

const CourseCard: React.FC<CourseCardProps> = ({ course, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <GlassCard className="p-6 hover:scale-[1.02] transition-all duration-200">
        <div className="flex gap-6">
          <div className="w-32 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Play className="w-8 h-8 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">{course.title}</h3>
                <p className="text-white/60 text-sm mb-2">{course.description}</p>
                <p className="text-white/50 text-sm">Por {course.instructor}</p>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-white mb-1">{course.price}</p>
                {course.featured && (
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    Destaque
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {course.duration}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {course.students} alunos
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {course.rating}
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                course.level === 'Iniciante' ? 'bg-green-500/20 text-green-400' :
                course.level === 'Intermediário' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {course.level}
              </span>
            </div>
            
            {course.progress !== undefined && (
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/60">Progresso</span>
                  <span className="text-white">{course.progress}%</span>
                </div>
                <div className="w-full bg-white/[0.06] rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <div className="flex gap-3">
              <Button variant="primary" size="sm" icon={Play}>
                {course.progress ? 'Continuar' : 'Iniciar Curso'}
              </Button>
              <Button variant="glass" size="sm">
                Ver Detalhes
              </Button>
            </div>
          </div>
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="overflow-hidden hover:scale-105 transition-transform duration-200">
      <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
        <Play className="w-12 h-12 text-white" />
        {course.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full">
              Destaque
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">
            {course.duration}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-white font-semibold text-lg mb-2">{course.title}</h3>
          <p className="text-white/60 text-sm mb-2">{course.description}</p>
          <p className="text-white/50 text-sm">Por {course.instructor}</p>
        </div>
        
        <div className="flex items-center gap-3 text-sm text-white/60 mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {course.students}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {course.rating}
          </div>
          <span className={`px-2 py-1 rounded text-xs ${
            course.level === 'Iniciante' ? 'bg-green-500/20 text-green-400' :
            course.level === 'Intermediário' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {course.level}
          </span>
        </div>
        
        {course.progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white/60">Progresso</span>
              <span className="text-white">{course.progress}%</span>
            </div>
            <div className="w-full bg-white/[0.06] rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-white">{course.price}</span>
          <Button variant="primary" size="sm" icon={Play}>
            {course.progress ? 'Continuar' : 'Iniciar'}
          </Button>
        </div>
      </div>
    </GlassCard>
  )
}

export const Academy: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('popular')

  const categories = [
    { name: 'Cardiologia', count: 24, icon: BookOpen, color: 'bg-red-500/20' },
    { name: 'Neurologia', count: 18, icon: BookOpen, color: 'bg-blue-500/20' },
    { name: 'Emergência', count: 32, icon: BookOpen, color: 'bg-orange-500/20' },
    { name: 'Cirurgia', count: 15, icon: BookOpen, color: 'bg-purple-500/20' },
    { name: 'Pediatria', count: 21, icon: BookOpen, color: 'bg-green-500/20' },
    { name: 'Radiologia', count: 12, icon: BookOpen, color: 'bg-cyan-500/20' }
  ]

  const courses: Course[] = [
    {
      id: '1',
      title: 'Cardiologia Avançada',
      description: 'Curso completo sobre diagnóstico e tratamento de doenças cardiovasculares',
      instructor: 'Dr. Carlos Silva',
      duration: '12h 30min',
      students: 1250,
      rating: 4.8,
      level: 'Avançado',
      category: 'Cardiologia',
      thumbnail: '',
      progress: 65,
      price: 'R$ 299',
      featured: true
    },
    {
      id: '2',
      title: 'Emergências Médicas',
      description: 'Protocolos e condutas em situações de emergência',
      instructor: 'Dra. Ana Santos',
      duration: '8h 45min',
      students: 890,
      rating: 4.9,
      level: 'Intermediário',
      category: 'Emergência',
      thumbnail: '',
      progress: 30,
      price: 'R$ 199'
    },
    {
      id: '3',
      title: 'Neurologia Clínica',
      description: 'Fundamentos da neurologia para a prática clínica',
      instructor: 'Dr. Roberto Lima',
      duration: '15h 20min',
      students: 567,
      rating: 4.7,
      level: 'Iniciante',
      category: 'Neurologia',
      thumbnail: '',
      price: 'R$ 349'
    },
    {
      id: '4',
      title: 'Técnicas Cirúrgicas Modernas',
      description: 'Novas abordagens em cirurgia minimamente invasiva',
      instructor: 'Dr. Pedro Costa',
      duration: '20h 15min',
      students: 423,
      rating: 4.6,
      level: 'Avançado',
      category: 'Cirurgia',
      thumbnail: '',
      price: 'R$ 499',
      featured: true
    }
  ]

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Academy</h1>
          <p className="text-white/70">Explore nossa biblioteca de cursos médicos especializados</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="primary" icon={TrendingUp}>
            Meus Cursos
          </Button>
          <Button variant="glass" icon={Award}>
            Certificados
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Categorias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <GlassCard className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
              variant="glass"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="Todos">Todas as categorias</option>
              {categories.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="popular">Mais populares</option>
              <option value="recent">Mais recentes</option>
              <option value="rating">Melhor avaliados</option>
              <option value="price">Menor preço</option>
            </select>
            
            <div className="flex bg-white/[0.06] rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white/[0.10] text-white' : 'text-white/60'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white/[0.10] text-white' : 'text-white/60'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Courses Grid/List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {filteredCourses.length} cursos encontrados
          </h2>
        </div>
        
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
        }>
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} viewMode={viewMode} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Academy