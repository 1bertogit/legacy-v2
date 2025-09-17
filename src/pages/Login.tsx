import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Stethoscope } from 'lucide-react';
import { useMockAuth } from '../hooks/useMockAuth';
import GlassCard from '../components/GlassCard';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, loginAsDemo } = useMockAuth();
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginForm>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginForm> = {};
    
    if (!form.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!form.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (form.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🔍 [DEBUG] Iniciando processo de login...');
    console.log('🔍 [DEBUG] Email:', form.email);
    
    if (!validateForm()) {
      console.log('🔍 [DEBUG] Validação do formulário falhou');
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('🔍 [DEBUG] Chamando função signIn...');
      const { error } = await signIn(form.email, form.password);
      
      if (error) {
        console.error('🔍 [DEBUG] Erro no login:', error);
        console.error('🔍 [DEBUG] Mensagem do erro:', error.message);
        
        if (error.message.includes('Invalid login credentials')) {
          setErrors({ email: 'Email ou senha incorretos' });
        } else if (error.message.includes('Email not confirmed')) {
          setErrors({ email: 'Por favor, confirme seu email antes de fazer login' });
        } else {
          setErrors({ email: 'Erro ao fazer login. Tente novamente.' });
        }
      } else {
        console.log('🔍 [DEBUG] Login realizado com sucesso!');
        // Login successful, navigation will be handled by AuthProvider
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('🔍 [DEBUG] Erro no login:', error);
      console.error('🔍 [DEBUG] Mensagem do erro:', error.message);
      console.error('🔍 [DEBUG] Stack do erro:', error.stack);
      setErrors({ email: 'Erro ao fazer login. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e] flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo e Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10">
              <Stethoscope className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Legacy Mentoring</h1>
          <p className="text-gray-400">Plataforma de Mentoria Médica</p>
        </div>

        {/* Login Form */}
        <GlassCard variant="elevated" padding="lg" className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-white mb-2">Entrar</h2>
              <p className="text-gray-400">Acesse sua conta para continuar</p>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all ${
                    errors.email ? 'border-red-500/50' : 'border-white/10'
                  }`}
                  placeholder="seu@email.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all ${
                    errors.password ? 'border-red-500/50' : 'border-white/10'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-500 bg-white/5 border-white/10 rounded focus:ring-blue-500/50 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-300">Lembrar de mim</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Entrar
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Demo Login Button */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1a1a2e] text-gray-400">ou</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                loginAsDemo();
                navigate('/dashboard');
              }}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 text-green-400 font-medium rounded-lg hover:from-green-500/30 hover:to-emerald-600/30 hover:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all group"
            >
              <Stethoscope className="mr-2 h-4 w-4" />
              Entrar como Demo
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </GlassCard>

        {/* Register Link */}
        <GlassCard variant="subtle" padding="md" className="text-center">
          <p className="text-gray-400">
            Não tem uma conta?{' '}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Criar conta
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default Login;