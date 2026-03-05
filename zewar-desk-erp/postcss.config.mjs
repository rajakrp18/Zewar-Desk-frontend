/**
 * PostCSS Configuration
 * 
 * Configures CSS processing pipeline:
 * - Tailwind CSS: Utility-first CSS framework
 * - Autoprefixer: Adds vendor prefixes for browser compatibility
 * 
 * For more details:
 * - Tailwind: https://tailwindcss.com/docs/using-with-postprocessors
 * - Autoprefixer: https://github.com/postcss/autoprefixer
 */

const config = {
  // List of PostCSS plugins and their configuration
  plugins: {
    // Tailwind CSS - Generates all utility classes
    tailwindcss: {},
    
    // Autoprefixer - Adds vendor prefixes (-webkit-, -moz-, etc.)
    // Ensures CSS works across different browsers
    autoprefixer: {},
  },
};

export default config;
