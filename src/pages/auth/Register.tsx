import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useMockAuth } from '../../hooks/useMockAuth'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, GraduationCap, UserCheck } from 'lucide-react'
import { toast } from 'sonner'
import { AuthPageLayout } from './AuthPageLayout'

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'student' | 'mentor',
    crm: '',
    specialty: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signUp } = useMockAuth()
  const navigate = useNavigate()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Por favor, preencha todos os campos obrigatórios')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem')
      return
    }

    if (formData.password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres')
      return
    }

    if (formData.role === 'mentor' && !formData.crm) {
      toast.error('CRM é obrigatório para mentores')
      return
    }

    setLoading(true)
    try {
      await signUp(formData.email, formData.password, {
        name: formData.name,
        role: formData.role,
        crm: formData.crm,
        specialty: formData.specialty
      })
      toast.success('Conta criada com sucesso! Verifique seu email.')
      navigate('/auth/login')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2 text-center">Criar Conta</h2>
        <p className="text-white/60 text-center mb-6">Junte-se à nossa plataforma de mentoria médica</p>
      </div>
            {/* Role selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white">Tipo de conta</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('role', 'student')}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    formData.role === 'student'
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                      : 'bg-white/[0.04] border-white/[0.08] text-white/70 hover:bg-white/[0.08]'
                  }`}
                >
                  <GraduationCap className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">Estudante</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('role', 'mentor')}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    formData.role === 'mentor'
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                      : 'bg-white/[0.04] border-white/[0.08] text-white/70 hover:bg-white/[0.08]'
                  }`}
                >
                  <UserCheck className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">Mentor</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                icon={User}
                label="Nome completo"
                variant="glass"
                required
              />

              <Input
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                icon={Mail}
                label="Email"
                variant="glass"
                required
              />

              {formData.role === 'mentor' && (
                <>
                  <Input
                    type="text"
                    placeholder="CRM/12345"
                    value={formData.crm}
                    onChange={(e) => handleInputChange('crm', e.target.value)}
                    label="CRM"
                    variant="glass"
                    required
                  />
                  
                  <Input
                    type="text"
                    placeholder="Ex: Cardiologia, Neurologia..."
                    value={formData.specialty}
                    onChange={(e) => handleInputChange('specialty', e.target.value)}
                    label="Especialidade"
                    variant="glass"
                  />
                </>
              )}

              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Sua senha"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  icon={Lock}
                  label="Senha"
                  variant="glass"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirme sua senha"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  icon={Lock}
                  label="Confirmar senha"
                  variant="glass"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 mt-0.5 rounded border border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500/50"
                />
                <span className="text-sm text-white/70">
                  Aceito os{' '}
                  <Link to="/terms" className="text-blue-400 hover:text-blue-300">
                    Termos de Uso
                  </Link>{' '}
                  e{' '}
                  <Link to="/privacy" className="text-blue-400 hover:text-blue-300">
                    Política de Privacidade
                  </Link>
                </span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Criar Conta
            </Button>
    </form>
  )

  return (
    <AuthPageLayout
      title="Criar Conta"
      subtitle="Junte-se à nossa plataforma de mentoria médica"
      formContent={formContent}
      bottomLinkText="Já tem uma conta?"
      bottomLinkHref="/auth/login"
      bottomLinkCallToAction="Faça login"
    />
  )
}