// src/components/branding/Logo.tsx
/**
 * Logo Component
 * 
 * Responsive brand logo with icon and optional text.
 * Sizes:
 * - sm: Small (navbar, compact spaces)
 * - md: Medium (default)
 * - lg: Large (landing page hero)
 * 
 * Features:
 * - Linkable to home page
 * - Optional text label
 * - Responsive sizing
 * - Can be customized with href and className
 */

import Link from 'next/link'
import { BrandIcon } from './BrandIcon'

/**
 * Logo component props
 */
interface LogoProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Show/hide brand text next to icon */
  showText?: boolean
  /** Navigation link target */
  href?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * Logo Component
 * 
 * @example
 * <Logo size="lg" showText /> // Large with text
 * <Logo size="sm" /> // Small icon only
 * <Logo href="/dashboard" /> // Links to dashboard
 */
export function Logo({ 
  size = 'md', 
  showText = true, 
  href = '/',
  className = ''
}: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 40, text: 'text-xl' },
    lg: { icon: 48, text: 'text-2xl' },
  }
  
  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      <BrandIcon size={sizes[size].icon} />
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-neutral-900 ${sizes[size].text} leading-none`}>
            Zewar Desk
          </span>
          <span className="text-xs text-neutral-500 mt-0.5">
            Jewellery ERP
          </span>
        </div>
      )}
    </div>
  )
  
  if (href) {
    return (
      <Link href={href} className="hover:opacity-80 transition-opacity">
        {content}
      </Link>
    )
  }
  
  return content
}
