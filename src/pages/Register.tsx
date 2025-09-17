import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Stethoscope, GraduationCap } from 'lucide-react';
import { useMockAuth } from '../hooks/useMockAuth';
import GlassCard from '../components/GlassCard';

interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  crm: string;
  specialty: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const Register: React.FC = () => {
  const { signUp } = useMockAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    phone: '',
    crm: '',
    specialty: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterForm>>({});

  const specialties = [
    'Cardiologia',
    'Neurologia',
    'Ortopedia',
    'Pediatria',
    'Ginecologia',
    'Dermatologia',
    'Psiquiatria',
    'Radiologia',
    'Anestesiologia',
    'Cirurgia Geral',
    'Medicina Interna',
    'Outro'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name as keyof RegisterForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterForm> = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!form.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!form.phone) {
      newErrors.phone = 'Telefone é obrigatório';
    }
    
    if (!form.crm) {
      newErrors.crm = 'CRM é obrigatório';
    }
    
    if (!form.specialty) {
      newErrors.specialty = 'Especialidade é obrigatória';
    }
    
    if (!form.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (form.password.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    }
    
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }
    
    if (!form.acceptTerms) {
      newErrors.acceptTerms = 'Você deve aceitar os termos';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const userData = {
        name: form.name,
        phone: form.phone,
        crm: form.crm,
        specialty: form.specialty
      };

      const { error } = await signUp(form.email, form.password, userData);
      
      if (error) {
        if (error.message.includes('User already registered')) {
          setErrors({ email: 'Este email já está cadastrado' });
        } else if (error.message.includes('Password should be at least 6 characters')) {
          setErrors({ password: 'A senha deve ter pelo menos 6 caracteres' });
        } else {
          setErrors({ email: 'Erro ao criar conta. Tente novamente.' });
        }
      } else {
        // Registration successful
        alert('Conta criada com sucesso! Verifique seu email para confirmar a conta.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      setErrors({ email: 'Erro ao criar conta. Tente novamente.' });
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

      <div className="relative z-10 w-full max-w-lg">
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

        {/* Register Form */}
        <GlassCard variant="elevated" padding="lg" className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-white mb-2">Criar Conta</h2>
              <p className="text-gray-400">Junte-se à nossa comunidade médica</p>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Nome Completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all ${
                    errors.name ? 'border-red-500/50' : 'border-white/10'
                  }`}
                  placeholder="Dr. João Silva"
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name}</p>
              )}
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
                  placeholder="joao@email.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Phone and CRM Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                  Telefone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all ${
                      errors.phone ? 'border-red-500/50' : 'border-white/10'
                    }`}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-400 text-sm">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="crm" className="block text-sm font-medium text-gray-300">
                  CRM
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="crm"
                    name="crm"
                    type="text"
                    value={form.crm}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all ${
                      errors.crm ? 'border-red-500/50' : 'border-white/10'
                    }`}
                    placeholder="123456/SP"
                  />
                </div>
                {errors.crm && (
                  <p className="text-red-400 text-sm">{errors.crm}</p>
                )}
              </div>
            </div>

            {/* Specialty Field */}
            <div className="space-y-2">
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-300">
                Especialidade
              </label>
              <select
                id="specialty"
                name="specialty"
                value={form.specialty}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all ${
                  errors.specialty ? 'border-red-500/50' : 'border-white/10'
                }`}
              >
                <option value="" className="bg-gray-800">Selecione sua especialidade</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty} className="bg-gray-800">
                    {specialty}
                  </option>
                ))}
              </select>
              {errors.specialty && (
                <p className="text-red-400 text-sm">{errors.specialty}</p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all ${
                      errors.confirmPassword ? 'border-red-500/50' : 'border-white/10'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="space-y-2">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={form.acceptTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 mt-1 text-blue-500 bg-white/5 border-white/10 rounded focus:ring-blue-500/50 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-300">
                  Eu aceito os{' '}
                  <Link to="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Termos de Uso
                  </Link>
                  {' '}e{' '}
                  <Link to="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Política de Privacidade
                  </Link>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="text-red-400 text-sm">{errors.acceptTerms}</p>
              )}
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
                  Criar Conta
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </GlassCard>

        {/* Login Link */}
        <GlassCard variant="subtle" padding="md" className="text-center">
          <p className="text-gray-400">
            Já tem uma conta?{' '}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Fazer login
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default Register;