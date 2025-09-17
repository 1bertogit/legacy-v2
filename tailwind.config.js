/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Backgrounds Ultra-Escuros
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#1a1a2e', 
        'bg-tertiary': '#2d2d44',
        
        // 8 Níveis de Superfícies de Vidro
        'glass': {
          1: 'rgba(255, 255, 255, 0.02)',
          2: 'rgba(255, 255, 255, 0.04)',
          3: 'rgba(255, 255, 255, 0.06)',
          4: 'rgba(255, 255, 255, 0.08)',
          5: 'rgba(255, 255, 255, 0.10)',
          6: 'rgba(255, 255, 255, 0.12)',
          7: 'rgba(255, 255, 255, 0.15)',
          8: 'rgba(255, 255, 255, 0.18)',
        },
        
        // Texto
        'text': {
          'primary': 'rgba(255, 255, 255, 0.95)',
          'secondary': 'rgba(255, 255, 255, 0.70)',
          'tertiary': 'rgba(255, 255, 255, 0.50)',
        },
        
        // Cores de Destaque
        'accent': {
          'blue': '#007AFF',
          'purple': '#5856D6',
          'green': '#34C759',
          'orange': '#FF9500',
          'red': '#FF3B30',
        },
      },
      
      backdropBlur: {
        'ultra': '60px',
        'intense': '120px',
      },
      
      borderRadius: {
        'ultra': '32px',
        'glass': '24px',
      },
      
      fontFamily: {
        'sf': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'system-ui', 'sans-serif'],
        'sf-mono': ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'glass-hover': 'glassHover 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glassHover: {
          '0%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '100%': { transform: 'scale(1.02)', filter: 'brightness(1.1)' },
        },
      },
      
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'glass-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.5)',
        'glass-button': '0 4px 16px 0 rgba(31, 38, 135, 0.3)',
        'inner-glass': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
      },
    },
  },
  plugins: [],
};
