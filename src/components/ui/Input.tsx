import React, { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { LucideIcon } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  variant?: 'default' | 'glass' | 'minimal'
  fullWidth?: boolean
}

const variantStyles = {
  default: 'border-white/[0.12] bg-white/[0.06] focus:border-white/[0.20] focus:bg-white/[0.08] dark:border-gray-600/50 dark:bg-gray-700/50 dark:focus:border-gray-500/70 dark:focus:bg-gray-600/60',
  glass: 'border-white/[0.08] bg-white/[0.04] backdrop-blur-xl focus:border-white/[0.16] focus:bg-white/[0.06] dark:border-gray-600/30 dark:bg-gray-700/30 dark:focus:border-gray-500/50 dark:focus:bg-gray-600/40',
  minimal: 'border-white/[0.08] bg-transparent focus:border-white/[0.16] focus:bg-white/[0.02] dark:border-gray-600/30 dark:focus:border-gray-500/50 dark:focus:bg-gray-700/20'
}

export const Input = forwardRef<HTMLInputElement, InputProps>((
  {
    className,
    label,
    error,
    icon: Icon,
    iconPosition = 'left',
    variant = 'default',
    fullWidth = true,
    type = 'text',
    ...props
  },
  ref
) => {
  return (
    <div className={cn('space-y-2', fullWidth && 'w-full')}>
      {label && (
        <label className="block text-sm font-medium text-white/80 dark:text-gray-200" htmlFor={props.id}>
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40 dark:text-gray-500">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
        )}
        
        <input
          type={type}
          className={cn(
            'w-full rounded-xl border px-4 py-3 text-white transition-all duration-200 ease-out placeholder:text-white/40',
            'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:ring-blue-400/50',
            variantStyles[variant],
            Icon && iconPosition === 'left' && 'pl-10',
            Icon && iconPosition === 'right' && 'pr-10',
            error && 'border-red-400/50 focus:border-red-400/70 focus:ring-red-500/50 dark:border-red-400/60 dark:focus:border-red-400/80 dark:focus:ring-red-400/50',
            className
          )}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
        
        {Icon && iconPosition === 'right' && (
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40 dark:text-gray-500">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
        )}
      </div>
      
      {error && (
        <p id={`${props.id}-error`} className="text-sm text-red-400 dark:text-red-300" role="alert">
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

// Variações específicas
export const GlassInput = forwardRef<HTMLInputElement, Omit<InputProps, 'variant'>>(
  (props, ref) => <Input {...props} variant="glass" ref={ref} />
)

GlassInput.displayName = 'GlassInput'

export const MinimalInput = forwardRef<HTMLInputElement, Omit<InputProps, 'variant'>>(
  (props, ref) => <Input {...props} variant="minimal" ref={ref} />
)

MinimalInput.displayName = 'MinimalInput'