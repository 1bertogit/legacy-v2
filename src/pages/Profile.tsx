import React, { useState } from 'react'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Settings, 
  Edit, 
  Save, 
  X, 
  Camera, 
  Upload, 
  Download, 
  Shield, 
  Bell, 
  Globe, 
  Lock, 
  Eye, 
  EyeOff, 
  Star, 
  Heart, 
  Clock, 
  Activity, 
  TrendingUp, 
  BarChart3, 
  Users, 
  MessageSquare, 
  FileText, 
  Stethoscope, 
  Building, 
  CreditCard, 
  Smartphone, 
  Laptop, 
  Wifi, 
  Database, 
  Cloud, 
  Key, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  HelpCircle
} from 'lucide-react'
import GlassCard from '../components/GlassCard'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useMockAuth } from '../hooks/useMockAuth'

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar?: string
  specialty: string
  crm: string
  crmState: string
  institution: string
  position: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  education: {
    degree: string
    institution: string
    year: string
  }[]
  certifications: {
    name: string
    issuer: string
    date: string
    expiryDate?: string
  }[]
  experience: {
    position: string
    institution: string
    startDate: string
    endDate?: string
    description: string
  }[]
  preferences: {
    language: string
    timezone: string
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
    privacy: {
      profileVisibility: 'public' | 'private' | 'colleagues'
      showEmail: boolean
      showPhone: boolean
    }
    theme: 'dark' | 'light' | 'auto'
  }
  stats: {
    totalCases: number
    totalMentoringSessions: number
    totalCourses: number
    totalCertifications: number
    joinDate: string
    lastActive: string
  }
  socialLinks: {
    linkedin?: string
    twitter?: string
    website?: string
    orcid?: string
  }
}

interface ProfileSectionProps {
  title: string
  icon: React.ComponentType<any>
  children: React.ReactNode
  isEditing?: boolean
  onEdit?: () => void
  onSave?: () => void
  onCancel?: () => void
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ 
  title, 
  icon: Icon, 
  children, 
  isEditing = false, 
  onEdit, 
  onSave, 
  onCancel 
}) => {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-white font-semibold text-lg">{title}</h3>
        </div>
        
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Button variant="glass" size="sm" icon={Save} onClick={onSave}>
              Salvar
            </Button>
            <Button variant="glass" size="sm" icon={X} onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        ) : (
          <Button variant="glass" size="sm" icon={Edit} onClick={onEdit}>
            Editar
          </Button>
        )}
      </div>
      
      {children}
    </GlassCard>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ComponentType<any>
  color: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  return (
    <GlassCard className="p-6 text-center">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-white/60 text-sm mb-2">{title}</p>
      {trend && (
        <div className={`flex items-center justify-center gap-1 text-xs ${
          trend.isPositive ? 'text-green-400' : 'text-red-400'
        }`}>
          <TrendingUp className={`w-3 h-3 ${trend.isPositive ? '' : 'rotate-180'}`} />
          <span>{Math.abs(trend.value)}%</span>
        </div>
      )}
    </GlassCard>
  )
}

export const Profile: React.FC = () => {
  const { user } = useMockAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'education' | 'experience' | 'preferences' | 'security'>('profile')
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)

  // Mock user profile data
  const profile: UserProfile = {
    id: '1',
    firstName: 'Dr. João',
    lastName: 'Silva',
    email: 'joao.silva@hospital.com',
    phone: '+55 11 99999-9999',
    avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20doctor%20portrait%20male%20white%20coat%20stethoscope%20confident%20smile%20medical%20background&image_size=square',
    specialty: 'Cardiologia',
    crm: '123456',
    crmState: 'SP',
    institution: 'Hospital das Clínicas',
    position: 'Médico Cardiologista Sênior',
    address: {
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brasil'
    },
    education: [
      {
        degree: 'Medicina',
        institution: 'Universidade de São Paulo (USP)',
        year: '2010'
      },
      {
        degree: 'Residência em Cardiologia',
        institution: 'Hospital das Clínicas - USP',
        year: '2013'
      },
      {
        degree: 'Mestrado em Cardiologia',
        institution: 'Universidade de São Paulo (USP)',
        year: '2015'
      }
    ],
    certifications: [
      {
        name: 'Certificação em Ecocardiografia',
        issuer: 'Sociedade Brasileira de Cardiologia',
        date: '2020-03-15',
        expiryDate: '2025-03-15'
      },
      {
        name: 'ACLS - Advanced Cardiovascular Life Support',
        issuer: 'American Heart Association',
        date: '2023-06-10',
        expiryDate: '2025-06-10'
      },
      {
        name: 'Certificação em Hemodinâmica',
        issuer: 'Sociedade Brasileira de Hemodinâmica',
        date: '2021-09-20',
        expiryDate: '2026-09-20'
      }
    ],
    experience: [
      {
        position: 'Médico Cardiologista Sênior',
        institution: 'Hospital das Clínicas',
        startDate: '2018-01-01',
        description: 'Atendimento ambulatorial e hospitalar, realização de procedimentos diagnósticos e terapêuticos em cardiologia.'
      },
      {
        position: 'Médico Cardiologista',
        institution: 'Hospital Sírio-Libanês',
        startDate: '2015-03-01',
        endDate: '2017-12-31',
        description: 'Atendimento em pronto-socorro cardiológico e unidade de terapia intensiva coronariana.'
      },
      {
        position: 'Médico Residente',
        institution: 'Hospital das Clínicas - USP',
        startDate: '2011-03-01',
        endDate: '2013-02-28',
        description: 'Residência médica em cardiologia com rotações em todas as áreas da especialidade.'
      }
    ],
    preferences: {
      language: 'pt-BR',
      timezone: 'America/Sao_Paulo',
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      privacy: {
        profileVisibility: 'colleagues',
        showEmail: false,
        showPhone: false
      },
      theme: 'dark'
    },
    stats: {
      totalCases: 156,
      totalMentoringSessions: 89,
      totalCourses: 23,
      totalCertifications: 8,
      joinDate: '2024-01-15',
      lastActive: '2024-12-18'
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/joao-silva-cardiologista',
      website: 'https://drjoaosilva.com.br',
      orcid: '0000-0000-0000-0000'
    }
  }

  const handleEditSection = (section: string) => {
    setEditingSection(section)
  }

  const handleSaveSection = () => {
    setEditingSection(null)
    // Implementar salvamento
  }

  const handleCancelEdit = () => {
    setEditingSection(null)
  }

  const handleAvatarUpload = () => {
    console.log('Upload avatar')
  }

  const handleExportProfile = () => {
    console.log('Export profile')
  }

  const handleChangePassword = () => {
    setShowPasswordForm(true)
  }

  const handleDeleteAccount = () => {
    setShowDeleteAccount(true)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Meu Perfil</h1>
          <p className="text-white/70">Gerencie suas informações pessoais e preferências</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="glass" icon={Download} onClick={handleExportProfile}>
            Exportar Perfil
          </Button>
          <Button variant="glass" icon={Settings}>
            Configurações
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <GlassCard className="p-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-white/10">
              {profile.avatar ? (
                <img 
                  src={profile.avatar} 
                  alt={`${profile.firstName} ${profile.lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-16 h-16 text-white/60" />
                </div>
              )}
            </div>
            <button 
              onClick={handleAvatarUpload}
              className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
            >
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>
          
          {/* Basic Info */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-blue-400 font-medium mb-2">{profile.specialty}</p>
            <p className="text-white/70 mb-4">{profile.position}</p>
            <p className="text-white/70 mb-4">{profile.institution}</p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4" />
                <span>CRM {profile.crm}/{profile.crmState}</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-3 mt-4">
              {profile.socialLinks.linkedin && (
                <a 
                  href={profile.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Globe className="w-5 h-5 text-white/70" />
                </a>
              )}
              {profile.socialLinks.website && (
                <a 
                  href={profile.socialLinks.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Globe className="w-5 h-5 text-white/70" />
                </a>
              )}
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{profile.stats.totalCases}</p>
              <p className="text-white/60 text-sm">Casos Clínicos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{profile.stats.totalMentoringSessions}</p>
              <p className="text-white/60 text-sm">Mentorias</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{profile.stats.totalCourses}</p>
              <p className="text-white/60 text-sm">Cursos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{profile.stats.totalCertifications}</p>
              <p className="text-white/60 text-sm">Certificações</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Casos Clínicos"
          value={profile.stats.totalCases}
          icon={FileText}
          color="bg-blue-500/20 text-blue-400"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Sessões de Mentoria"
          value={profile.stats.totalMentoringSessions}
          icon={Users}
          color="bg-green-500/20 text-green-400"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title="Cursos Concluídos"
          value={profile.stats.totalCourses}
          icon={GraduationCap}
          color="bg-purple-500/20 text-purple-400"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard 
          title="Certificações"
          value={profile.stats.totalCertifications}
          icon={Award}
          color="bg-yellow-500/20 text-yellow-400"
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white/[0.06] p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'profile'
              ? 'bg-white/[0.12] text-white shadow-lg'
              : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
          }`}
        >
          Informações Pessoais
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'education'
              ? 'bg-white/[0.12] text-white shadow-lg'
              : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
          }`}
        >
          Formação
        </button>
        <button
          onClick={() => setActiveTab('experience')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'experience'
              ? 'bg-white/[0.12] text-white shadow-lg'
              : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
          }`}
        >
          Experiência
        </button>
        <button
          onClick={() => setActiveTab('preferences')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'preferences'
              ? 'bg-white/[0.12] text-white shadow-lg'
              : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
          }`}
        >
          Preferências
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'security'
              ? 'bg-white/[0.12] text-white shadow-lg'
              : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
          }`}
        >
          Segurança
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          {/* Personal Information */}
          <ProfileSection 
            title="Informações Pessoais"
            icon={User}
            isEditing={editingSection === 'personal'}
            onEdit={() => handleEditSection('personal')}
            onSave={handleSaveSection}
            onCancel={handleCancelEdit}
          >
            {editingSection === 'personal' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Nome"
                  defaultValue={profile.firstName}
                  variant="glass"
                />
                <Input 
                  label="Sobrenome"
                  defaultValue={profile.lastName}
                  variant="glass"
                />
                <Input 
                  label="Email"
                  type="email"
                  defaultValue={profile.email}
                  variant="glass"
                />
                <Input 
                  label="Telefone"
                  defaultValue={profile.phone}
                  variant="glass"
                />
                <Input 
                  label="Especialidade"
                  defaultValue={profile.specialty}
                  variant="glass"
                />
                <Input 
                  label="CRM"
                  defaultValue={profile.crm}
                  variant="glass"
                />
                <Input 
                  label="Estado do CRM"
                  defaultValue={profile.crmState}
                  variant="glass"
                />
                <Input 
                  label="Instituição"
                  defaultValue={profile.institution}
                  variant="glass"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Nome Completo</label>
                  <p className="text-white">{profile.firstName} {profile.lastName}</p>
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Email</label>
                  <p className="text-white">{profile.email}</p>
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Telefone</label>
                  <p className="text-white">{profile.phone}</p>
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Especialidade</label>
                  <p className="text-white">{profile.specialty}</p>
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">CRM</label>
                  <p className="text-white">{profile.crm}/{profile.crmState}</p>
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Instituição</label>
                  <p className="text-white">{profile.institution}</p>
                </div>
              </div>
            )}
          </ProfileSection>

          {/* Address */}
          <ProfileSection 
            title="Endereço"
            icon={MapPin}
            isEditing={editingSection === 'address'}
            onEdit={() => handleEditSection('address')}
            onSave={handleSaveSection}
            onCancel={handleCancelEdit}
          >
            {editingSection === 'address' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Input 
                    label="Endereço"
                    defaultValue={profile.address.street}
                    variant="glass"
                  />
                </div>
                <Input 
                  label="Cidade"
                  defaultValue={profile.address.city}
                  variant="glass"
                />
                <Input 
                  label="Estado"
                  defaultValue={profile.address.state}
                  variant="glass"
                />
                <Input 
                  label="CEP"
                  defaultValue={profile.address.zipCode}
                  variant="glass"
                />
                <Input 
                  label="País"
                  defaultValue={profile.address.country}
                  variant="glass"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-white">{profile.address.street}</p>
                <p className="text-white">
                  {profile.address.city}, {profile.address.state} - {profile.address.zipCode}
                </p>
                <p className="text-white">{profile.address.country}</p>
              </div>
            )}
          </ProfileSection>
        </div>
      )}

      {/* Education Tab */}
      {activeTab === 'education' && (
        <div className="space-y-6">
          {/* Education */}
          <ProfileSection 
            title="Formação Acadêmica"
            icon={GraduationCap}
            isEditing={editingSection === 'education'}
            onEdit={() => handleEditSection('education')}
            onSave={handleSaveSection}
            onCancel={handleCancelEdit}
          >
            <div className="space-y-4">
              {profile.education.map((edu, index) => (
                <div key={index} className="p-4 bg-white/[0.06] rounded-lg">
                  <h4 className="text-white font-semibold">{edu.degree}</h4>
                  <p className="text-white/70">{edu.institution}</p>
                  <p className="text-white/60 text-sm">Concluído em {edu.year}</p>
                </div>
              ))}
            </div>
          </ProfileSection>

          {/* Certifications */}
          <ProfileSection 
            title="Certificações"
            icon={Award}
            isEditing={editingSection === 'certifications'}
            onEdit={() => handleEditSection('certifications')}
            onSave={handleSaveSection}
            onCancel={handleCancelEdit}
          >
            <div className="space-y-4">
              {profile.certifications.map((cert, index) => (
                <div key={index} className="p-4 bg-white/[0.06] rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{cert.name}</h4>
                      <p className="text-white/70">{cert.issuer}</p>
                      <p className="text-white/60 text-sm">
                        Emitido em {new Date(cert.date).toLocaleDateString()}
                      </p>
                      {cert.expiryDate && (
                        <p className="text-white/60 text-sm">
                          Válido até {new Date(cert.expiryDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {cert.expiryDate && new Date(cert.expiryDate) > new Date() ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : cert.expiryDate ? (
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ProfileSection>
        </div>
      )}

      {/* Experience Tab */}
      {activeTab === 'experience' && (
        <div className="space-y-6">
          <ProfileSection 
            title="Experiência Profissional"
            icon={Briefcase}
            isEditing={editingSection === 'experience'}
            onEdit={() => handleEditSection('experience')}
            onSave={handleSaveSection}
            onCancel={handleCancelEdit}
          >
            <div className="space-y-6">
              {profile.experience.map((exp, index) => (
                <div key={index} className="relative">
                  {index < profile.experience.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-px bg-white/20"></div>
                  )}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{exp.position}</h4>
                      <p className="text-blue-400 font-medium">{exp.institution}</p>
                      <p className="text-white/60 text-sm mb-2">
                        {new Date(exp.startDate).toLocaleDateString()} - 
                        {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Atual'}
                      </p>
                      <p className="text-white/70">{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ProfileSection>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="space-y-6">
          {/* General Preferences */}
          <ProfileSection 
            title="Preferências Gerais"
            icon={Settings}
            isEditing={editingSection === 'general'}
            onEdit={() => handleEditSection('general')}
            onSave={handleSaveSection}
            onCancel={handleCancelEdit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-white/60 text-sm mb-2 block">Idioma</label>
                <select className="w-full px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Fuso Horário</label>
                <select className="w-full px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                  <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                  <option value="America/New_York">New York (GMT-5)</option>
                  <option value="Europe/London">London (GMT+0)</option>
                </select>
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Tema</label>
                <select className="w-full px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                  <option value="dark">Escuro</option>
                  <option value="light">Claro</option>
                  <option value="auto">Automático</option>
                </select>
              </div>
            </div>
          </ProfileSection>

          {/* Notification Preferences */}
          <ProfileSection 
            title="Notificações"
            icon={Bell}
            isEditing={editingSection === 'notifications'}
            onEdit={() => handleEditSection('notifications')}
            onSave={handleSaveSection}
            onCancel={handleCancelEdit}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/[0.06] rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">Notificações por Email</p>
                    <p className="text-white/60 text-sm">Receber atualizações por email</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    defaultChecked={profile.preferences.notifications.email}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/[0.06] rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">Notificações Push</p>
                    <p className="text-white/60 text-sm">Receber notificações no dispositivo</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    defaultChecked={profile.preferences.notifications.push}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/[0.06] rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-white font-medium">Notificações por SMS</p>
                    <p className="text-white/60 text-sm">Receber mensagens de texto</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    defaultChecked={profile.preferences.notifications.sms}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </ProfileSection>

          {/* Privacy Preferences */}
          <ProfileSection 
            title="Privacidade"
            icon={Shield}
            isEditing={editingSection === 'privacy'}
            onEdit={() => handleEditSection('privacy')}
            onSave={handleSaveSection}
            onCancel={handleCancelEdit}
          >
            <div className="space-y-4">
              <div>
                <label className="text-white/60 text-sm mb-2 block">Visibilidade do Perfil</label>
                <select className="w-full px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                  <option value="public">Público</option>
                  <option value="colleagues">Apenas Colegas</option>
                  <option value="private">Privado</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/[0.06] rounded-lg">
                <div>
                  <p className="text-white font-medium">Mostrar Email</p>
                  <p className="text-white/60 text-sm">Permitir que outros vejam seu email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    defaultChecked={profile.preferences.privacy.showEmail}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/[0.06] rounded-lg">
                <div>
                  <p className="text-white font-medium">Mostrar Telefone</p>
                  <p className="text-white/60 text-sm">Permitir que outros vejam seu telefone</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    defaultChecked={profile.preferences.privacy.showPhone}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </ProfileSection>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          {/* Password */}
          <ProfileSection 
            title="Senha"
            icon={Lock}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/[0.06] rounded-lg">
                <div>
                  <p className="text-white font-medium">Alterar Senha</p>
                  <p className="text-white/60 text-sm">Última alteração há 3 meses</p>
                </div>
                <Button variant="glass" onClick={handleChangePassword}>
                  Alterar
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/[0.06] rounded-lg">
                <div>
                  <p className="text-white font-medium">Autenticação de Dois Fatores</p>
                  <p className="text-white/60 text-sm">Adicione uma camada extra de segurança</p>
                </div>
                <Button variant="glass">
                  Configurar
                </Button>
              </div>
            </div>
          </ProfileSection>

          {/* Sessions */}
          <ProfileSection 
            title="Sessões Ativas"
            icon={Activity}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/[0.06] rounded-lg">
                <div className="flex items-center gap-3">
                  <Laptop className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">MacBook Pro - Chrome</p>
                    <p className="text-white/60 text-sm">São Paulo, Brasil - Ativo agora</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Atual</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/[0.06] rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">iPhone - Safari</p>
                    <p className="text-white/60 text-sm">São Paulo, Brasil - 2 horas atrás</p>
                  </div>
                </div>
                <Button variant="glass" size="sm">
                  Encerrar
                </Button>
              </div>
            </div>
          </ProfileSection>

          {/* Account Actions */}
          <ProfileSection 
            title="Ações da Conta"
            icon={AlertTriangle}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/[0.06] rounded-lg">
                <div>
                  <p className="text-white font-medium">Exportar Dados</p>
                  <p className="text-white/60 text-sm">Baixar uma cópia dos seus dados</p>
                </div>
                <Button variant="glass">
                  Exportar
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div>
                  <p className="text-white font-medium">Excluir Conta</p>
                  <p className="text-white/60 text-sm">Remover permanentemente sua conta e dados</p>
                </div>
                <Button variant="danger" onClick={handleDeleteAccount}>
                  Excluir
                </Button>
              </div>
            </div>
          </ProfileSection>
        </div>
      )}
    </div>
  )
}

export default Profile