// src/components/branding/BrandIcon.tsx
interface BrandIconProps {
  size?: number
  className?: string
}

export function BrandIcon({ size = 40, className = '' }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Premium gold gradient */}
        <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#c4b9a3', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#a89679', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#8d7a5f', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Shadow for depth */}
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15"/>
        </filter>
      </defs>
      
      {/* Diamond shape - elegant and minimal */}
      <g filter="url(#shadow)">
        {/* Top triangle */}
        <path
          d="M 50 15 L 70 40 L 50 40 L 30 40 Z"
          fill="url(#brandGradient)"
          stroke="#6f6049"
          strokeWidth="1.5"
          strokeLinejoin="miter"
        />
        
        {/* Bottom diamond */}
        <path
          d="M 30 40 L 50 75 L 70 40 Z"
          fill="url(#brandGradient)"
          stroke="#6f6049"
          strokeWidth="1.5"
          strokeLinejoin="miter"
          opacity="0.9"
        />
        
        {/* Facet lines */}
        <line x1="30" y1="40" x2="50" y2="75" stroke="#6f6049" strokeWidth="1" opacity="0.4" />
        <line x1="70" y1="40" x2="50" y2="75" stroke="#6f6049" strokeWidth="1" opacity="0.4" />
        <line x1="50" y1="15" x2="50" y2="40" stroke="#6f6049" strokeWidth="1" opacity="0.4" />
        
        {/* Highlight line for premium feel */}
        <line x1="35" y1="35" x2="50" y2="20" stroke="white" strokeWidth="1.5" opacity="0.3" />
      </g>
      
      {/* Optional: Elegant base */}
      <path
        d="M 25 85 Q 50 88 75 85"
        stroke="url(#brandGradient)"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
    </svg>
  )
}
