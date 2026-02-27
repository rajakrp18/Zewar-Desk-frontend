// src/components/branding/Logo.tsx
import Link from 'next/link'
import { BrandIcon } from './BrandIcon'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  href?: string
  className?: string
}

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
