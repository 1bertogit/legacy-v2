import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useMockAuth } from '../../hooks/useMockAuth'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { AuthPageLayout } from './AuthPageLayout'

export const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn } = useMockAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Por favor, preencha todos os campos')
      return
    }

    setLoading(true)
    try {
      await signIn(email, password)
      toast.success('Login realizado com sucesso!')
      navigate('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2 text-center">Entrar</h2>
        <p className="text-white/60 text-center mb-6">Acesse sua conta para continuar</p>
      </div>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                label="Email"
                variant="glass"
                required
              />

              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500/50"
                />
                <span className="text-sm text-white/70">Lembrar de mim</span>
              </label>
              
              <Link
                to="/auth/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Esqueceu a senha?
              </Link>
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
              Entrar
            </Button>
    </form>
  )

  return (
    <AuthPageLayout
      title="Legacy Mentoring"
      subtitle="Acesse sua plataforma de mentoria médica"
      formContent={formContent}
      bottomLinkText="Não tem uma conta?"
      bottomLinkHref="/auth/register"
      bottomLinkCallToAction="Cadastre-se"
    />
  )
}