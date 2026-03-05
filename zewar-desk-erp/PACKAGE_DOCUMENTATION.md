# Package.json Documentation

## Scripts

### Development
```bash
npm run dev
```
- Starts the Next.js development server with hot module reload
- Server runs on http://localhost:3000
- Auto-compiles on file changes
- Shows detailed compilation errors

### Production Build
```bash
npm run build
```
- Creates optimized production build
- Compiles TypeScript, minifies CSS/JS
- Generates static pages where possible
- Outputs to `.next` directory

### Start Production Server
```bash
npm start
```
- Starts the production server (must run `build` first)
- Recommended for Vercel deployments
- More efficient than dev server

### Linting
```bash
npm run lint
```
- Runs ESLint for code quality checks
- Uses Next.js ESLint configuration
- Reports style and logic issues

### Type Checking
```bash
npm run type-check
```
- TypeScript compiler without emitting output
- Checks for type errors without building
- Fast way to verify TypeScript validity

---

## Dependencies (Runtime)

### Core Framework
- **next** (^14.1.0) - React framework for production
  - Provides App Router, SSR, SSG, API routes
  - Optimizations for images, fonts, code splitting

- **react** (^18.2.0) - UI library
  - Component-based architecture
  - Hooks for state and effects

- **react-dom** (^18.2.0) - React DOM rendering
  - Main entry point for React in browsers

### Styling
- **clsx** (^2.1.0) - Utility for conditional CSS classes
  - Simpler than ternary operators for className
  - Example: `cn('px-2', { 'px-4': isLarge })`

- **tailwind-merge** (^2.2.0) - Tailwind CSS class conflict resolver
  - Merges Tailwind classes intelligently
  - Resolves specificity conflicts
  - Used with clsx for powerful className patterns

---

## Dev Dependencies (Development Only)

### Type Definitions
- **@types/node** (^20.11.5) - Node.js type definitions
- **@types/react** (^18.2.48) - React type definitions
- **@types/react-dom** (^18.2.18) - React DOM type definitions

### Styling Tools
- **autoprefixer** (^10.4.17) - PostCSS plugin
  - Adds vendor prefixes (-webkit-, -moz-, etc.)
  - Ensures cross-browser CSS compatibility

- **postcss** (^8.4.33) - CSS transformation tool
  - Processes CSS with plugins (Tailwind, Autoprefixer)
  - Used during build process

- **tailwindcss** (^3.4.1) - Utility-first CSS framework
  - Generates CSS utilities from tailwind.config.ts
  - Tree-shakes unused styles in production

### Linting & Type Checking
- **eslint** (^8.56.0) - JavaScript linter
  - Enforces code quality and style rules
  - Catches common mistakes and inconsistencies

- **eslint-config-next** (^14.1.0) - Next.js ESLint rules
  - Recommended rules for Next.js projects
  - Includes React best practices

- **typescript** (^5.3.3) - TypeScript compiler
  - Adds static type checking to JavaScript
  - Provides excellent IDE support
  - Compiled to JavaScript for production

---

## Engines

Specifies minimum required versions:
- **node**: >= 18.0.0 (LTS)
- **npm**: >= 9.0.0

Ensure your system meets these requirements before development.

---

## Installation

```bash
# First time setup
npm install

# Clean install (remove node_modules)
rm -rf node_modules package-lock.json
npm install

# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Check for security vulnerabilities
npm audit
```

## Troubleshooting

### High memory usage during build
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max_old_space_size=4096"
npm run build
```

### Dependency conflicts
```bash
# Force use of specified versions
npm install --force
```

### Port already in use
Next.js will automatically pick next available port (3001, 3002...)

---

**Last Updated**: February 27, 2026  
**Version**: 1.0.0
