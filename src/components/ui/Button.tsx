import React from 'react'
import { cn } from '../../lib/utils'
import { LucideIcon } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  loading?: boolean
  fullWidth?: boolean
}

const variantStyles = {
  primary: 'border-white/20 bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white shadow-glass-button hover:from-blue-400/90 hover:to-purple-500/90 focus:ring-blue-500/50 dark:border-blue-400/30 dark:from-blue-600/90 dark:to-purple-700/90 dark:hover:from-blue-500/95 dark:hover:to-purple-600/95 dark:focus:ring-blue-400/50',
  secondary: 'border-white/[0.12] bg-white/[0.08] text-white hover:border-white/[0.16] hover:bg-white/[0.12] focus:ring-white/30 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:hover:border-gray-500/60 dark:hover:bg-gray-600/60 dark:focus:ring-gray-400/50',
  ghost: 'border-transparent bg-transparent text-white/80 hover:bg-white/[0.06] hover:text-white focus:ring-white/30 dark:text-gray-300 dark:hover:bg-gray-700/30 dark:hover:text-gray-100 dark:focus:ring-gray-400/50',
  glass: 'border-white/[0.10] bg-white/[0.06] text-white backdrop-blur-xl hover:border-white/[0.14] hover:bg-white/[0.10] focus:ring-white/30 dark:border-gray-600/30 dark:bg-gray-700/30 dark:text-gray-100 dark:hover:border-gray-500/40 dark:hover:bg-gray-600/40 dark:focus:ring-gray-400/50',
  danger: 'border-red-400/20 bg-red-500/80 text-white shadow-glass-button hover:bg-red-400/90 focus:ring-red-500/50 dark:border-red-400/30 dark:bg-red-600/90 dark:hover:bg-red-500/95 dark:focus:ring-red-400/50'
}

const sizeStyles = {
  sm: 'h-8 px-3 py-1.5 text-sm',
  md: 'h-10 px-4 py-2 text-sm',
  lg: 'h-12 px-6 py-3 text-base',
  xl: 'h-14 px-8 py-4 text-lg'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border font-medium transition-all duration-200 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent',
        'active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      {...props}
    >
      {loading && (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
      )}
      
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className="h-4 w-4" aria-hidden="true" />
      )}
      
      {children}
      
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  )
}

// Variações específicas
export const GlassButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="glass" />
)

export const PrimaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="primary" />
)

export const SecondaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="secondary" />
)

export const GhostButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="ghost" />
)