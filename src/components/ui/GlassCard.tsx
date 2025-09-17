import React from 'react'
import { cn } from '../../lib/utils'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'surface' | 'elevated' | 'modal' | 'button';
  blur?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  className?: string;
}

const variantStyles = {
  surface: 'border-white/10 bg-white/5 dark:border-gray-700 dark:bg-gray-800/20',
  elevated: 'border-white/20 bg-white/10 shadow-xl dark:border-gray-600 dark:bg-gray-700/30 dark:shadow-gray-900/50',
  modal: 'border-white/30 bg-white/15 shadow-2xl backdrop-blur-xl dark:border-gray-500 dark:bg-gray-600/40 dark:shadow-gray-900/70',
  button: 'border-white/10 bg-white/5 transition-all duration-200 hover:border-white/20 hover:bg-white/10 focus:border-white/30 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800/20 dark:hover:border-gray-600 dark:hover:bg-gray-700/30 dark:focus:border-gray-500 dark:focus:bg-gray-600/40 dark:focus:ring-blue-400/50'
}

const blurStyles = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
  '2xl': 'backdrop-blur-2xl',
  '3xl': 'backdrop-blur-3xl'
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8'
}

const roundedStyles = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full'
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ 
    children, 
    variant = 'surface', 
    blur = 'md', 
    padding = 'md', 
    rounded = 'lg', 
    className = '', 
    ...props 
  }, ref) => {
    const classes = cn(
      'border backdrop-blur-md',
      variantStyles[variant],
      blurStyles[blur],
      paddingStyles[padding],
      roundedStyles[rounded],
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);
GlassCard.displayName = 'GlassCard';

// Predefined variants for common use cases
export const GlassNavCard = React.forwardRef<HTMLDivElement, Omit<GlassCardProps, 'variant' | 'blur'>>(
  (props, ref) => (
    <GlassCard ref={ref} variant="elevated" blur="lg" {...props} />
  )
);
GlassNavCard.displayName = 'GlassNavCard';

export const GlassContentCard = React.forwardRef<HTMLDivElement, Omit<GlassCardProps, 'variant'>>(
  (props, ref) => (
    <GlassCard ref={ref} variant="surface" {...props} />
  )
);
GlassContentCard.displayName = 'GlassContentCard';

export const GlassModalCard = React.forwardRef<HTMLDivElement, Omit<GlassCardProps, 'variant' | 'blur'>>(
  (props, ref) => (
    <GlassCard ref={ref} variant="modal" blur="xl" {...props} />
  )
);
GlassModalCard.displayName = 'GlassModalCard';

export const GlassButtonCard = React.forwardRef<HTMLDivElement, Omit<GlassCardProps, 'variant' | 'padding'>>(
  (props, ref) => (
    <GlassCard ref={ref} variant="button" padding="sm" {...props} />
  )
);
GlassButtonCard.displayName = 'GlassButtonCard';