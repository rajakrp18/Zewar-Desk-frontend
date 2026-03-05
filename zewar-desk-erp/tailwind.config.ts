/**
 * Tailwind CSS Configuration
 * 
 * Defines the design system for Zewar Desk:
 * - Custom color palette (neutral theme with gold accents)
 * - Typography scale
 * - Spacing and sizing
 * - Custom utilities and components
 * 
 * For more details, see: https://tailwindcss.com/docs/configuration
 */

import type { Config } from 'tailwindcss'

const config: Config = {
  // Paths to template files for purging unused CSS
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  // Theme customization and extensions
  theme: {
    extend: {
      // Custom color palette
      colors: {
        // Neutral/grayscale colors for text, backgrounds, borders
        neutral: {
          50: '#fafafa',    // Lightest gray
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',   // Darkest gray
        },
        // Gold accent colors for jewelry business
        gold: {
          50: '#fffbf0',
          100: '#fef3e0',
          200: '#fde5b8',
          300: '#fcd690',
          400: '#f7bb2a',
          500: '#d4a84a',
          600: '#b8932b',
          700: '#9c7a22',
          800: '#7a5f1a',
          900: '#634812',
        },
        // Premium accent colors
        amber: {
          50: '#fffbf0',
          100: '#feedd4',
          200: '#fcdba5',
          300: '#fac876',
          400: '#f7b641',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      
      // Custom typography scale
      fontSize: {
        xs: '0.75rem',      // 12px - small labels
        sm: '0.875rem',     // 14px - small text
        base: '1rem',       // 16px - body text
        lg: '1.125rem',     // 18px
        xl: '1.25rem',      // 20px - emphasis
        '2xl': '1.5rem',    // 24px - subheadings
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px - main headings
      },
      
      // Premium shadows
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'button': '0 2px 8px rgba(0, 0, 0, 0.12)',
      },
      
      // Gradients
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
        'gradient-gold': 'linear-gradient(135deg, #f7bb2a 0%, #d4a84a 100%)',
        'gradient-dark': 'linear-gradient(135deg, #171717 0%, #262626 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
      },
      
      // Border radius
      borderRadius: {
        'xs': '0.25rem',
        'sm': '0.375rem',
        'base': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
    },
  },
  
  // Tailwind plugins for extending functionality
  plugins: [],
}


export default config
