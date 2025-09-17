import React from 'react';
import { cn } from '../utils/cn';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'floating' | 'subtle' | 'intense' | 'overlay' | 'modal' | 'surface';
  blur?: 'light' | 'medium' | 'heavy' | 'ultra';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  border?: boolean;
  shadow?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  variant = 'default',
  blur = 'medium',
  padding = 'md',
  rounded = 'lg',
  border = true,
  shadow = true,
  hover = false,
  onClick
}) => {
  const baseClasses = 'relative overflow-hidden transition-all duration-300';
  
  // Vision Pro Glass Variants - 8 níveis de superfícies de vidro
  const variantClasses = {
    default: 'bg-white/5 backdrop-blur-md',
    elevated: 'bg-white/8 backdrop-blur-lg',
    floating: 'bg-white/10 backdrop-blur-xl',
    subtle: 'bg-white/3 backdrop-blur-sm',
    intense: 'bg-white/12 backdrop-blur-2xl',
    overlay: 'bg-white/15 backdrop-blur-3xl',
    modal: 'bg-white/20 backdrop-blur-3xl',
    surface: 'bg-white/25 backdrop-blur-3xl'
  };

  // Blur intensity levels (60-120px equivalent)
  const blurClasses = {
    light: 'backdrop-blur-sm', // ~4px
    medium: 'backdrop-blur-md', // ~12px
    heavy: 'backdrop-blur-xl', // ~24px
    ultra: 'backdrop-blur-3xl' // ~64px
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  const borderClass = border ? 'border border-white/10' : '';
  const shadowClass = shadow ? 'shadow-2xl shadow-black/20' : '';
  const hoverClass = hover ? 'hover:bg-white/15 hover:border-white/20 hover:shadow-3xl hover:scale-[1.02]' : '';
  const clickableClass = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        blurClasses[blur],
        paddingClasses[padding],
        roundedClasses[rounded],
        borderClass,
        shadowClass,
        hoverClass,
        clickableClass,
        className
      )}
      onClick={onClick}
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
};

export default GlassCard;