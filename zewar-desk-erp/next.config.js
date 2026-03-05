/**
 * Next.js Configuration
 * 
 * Configures Next.js 14 with optimizations for:
 * - React strict mode for development
 * - Image optimization settings
 * - Future compatibility settings
 * 
 * For more details, see: https://nextjs.org/docs/app/api-reference/next-config-js
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React StrictMode to highlight potential issues during development
  reactStrictMode: true,
  
  // Image optimization configuration
  images: {
    // Allowed image domains for optimization (add external domains here)
    domains: [],
    // Modern image formats for better compression
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
