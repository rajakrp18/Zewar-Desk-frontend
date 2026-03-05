# Zewar Desk - Professional Jewellery Business ERP System

A comprehensive, modern ERP (Enterprise Resource Planning) solution specifically designed for jewellery shop owners. Zewar Desk provides inventory management, billing, customer management, gold rate tracking, and business analytics—all in a user-friendly interface.

## 🎯 Project Overview

**Zewar Desk** is a full-stack web application built with Next.js 14, React 18, and TypeScript. It enables jewellery shop owners to:

- **Manage Inventory**: Track gold, diamonds, and precious stones with weight and purity details
- **Generate Billing**: Create professional invoices with automatic gold rate calculations
- **Customer Management**: Maintain detailed customer profiles and purchase history
- **Real-time Gold Rates**: Track 22K and 18K gold prices with daily updates
- **Business Analytics**: View sales trends, inventory status, and profitability metrics
- **Secure Authentication**: User registration and login with role-based access
- **Cloud-Based Access**: Use from anywhere with automatic backups and data protection

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **Git**: For version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/zewar-desk.git
   cd zewar-desk-frontend/zewar-desk-erp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development server with hot-reload
npm run dev

# Production build
npm run build

# Run production build locally
npm start

# Run ESLint for code quality
npm run lint

# Type checking without emitting
npm run type-check
```

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout wrapper
│   ├── globals.css              # Global styles and Tailwind directives
│   ├── page.tsx                 # Landing page
│   ├── login/page.tsx           # User login page
│   ├── signup/page.tsx          # User registration page
│   └── dashboard/
│       ├── layout.tsx           # Dashboard layout with sidebar
│       └── page.tsx             # Main dashboard with stats
│
├── components/                   # Reusable React components
│   ├── ui/                      # Base UI components
│   │   ├── Button.tsx           # Button with variants (primary, outline, etc)
│   │   ├── Input.tsx            # Text input with validation
│   │   ├── Card.tsx             # Card components (compound pattern)
│   │   └── Badge.tsx            # Status badges
│   │
│   ├── layout/                  # Layout components
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── Footer.tsx           # Footer component
│   │   └── DashboardSidebar.tsx # Dashboard side navigation
│   │
│   ├── branding/                # Brand components
│   │   ├── Logo.tsx             # Responsive logo
│   │   └── BrandIcon.tsx        # Diamond SVG brand icon
│   │
│   └── auth/                    # Authentication components (future)
│
├── lib/                         # Utility functions and constants
│   ├── utils.ts                 # Helper functions (formatting, validation, debounce)
│   ├── types.ts                 # TypeScript interfaces and types
│   └── constants.ts             # App constants and route definitions
│
└── public/                      # Static assets
    ├── favicon.ico
    └── [other assets]
```

## 🎨 Design System

### Colors
- **Primary**: Neutral palette with gold accents
- **Text**: Neutral-900 (dark), Neutral-600 (muted)
- **Backgrounds**: White, Neutral-50, Neutral-100

### Typography
- **Font**: Inter (from Google Fonts)
- **Headings**: Bold, large sizes (4xl to 5xl)
- **Body**: Regular weight, optimized for readability

### Components
All UI components are built with TypeScript and support:
- Multiple variants (primary, secondary, outline, ghost)
- Responsive sizing
- Accessibility features
- Tailwind CSS styling

## 🔧 Technology Stack

### Frontend
- **Framework**: Next.js 14.2.35
- **React**: 18.2.0
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS 3.4.1
- **CSS Processing**: PostCSS 8.4.33 + Autoprefixer
- **Utilities**: clsx, tailwind-merge

### Development Tools
- **Linting**: ESLint 8.56.0
- **Type Checking**: TypeScript
- **Code Formatting**: ESLint
- **Build Tool**: Next.js (SWC compiler)

### Architecture
- **Pattern**: Server-Side Rendering (SSR) with Static Generation
- **Routing**: App Router (Next.js 13+)
- **Component Pattern**: Functional components with TypeScript
- **State Management**: React hooks (useState, useCallback)
- **Validation**: Client-side form validation

## 📝 Key Features

### Authentication Pages
- **Login** (`/login`): Email/password authentication with form validation
- **Signup** (`/signup`): Multi-step registration with email verification
- Both include demo credentials for testing

### Dashboard (`/dashboard`)
- Real-time statistics cards (Sales, Inventory, Orders, Customers)
- Recent transactions table
- Gold rate tracker (22K & 18K rates with daily change)
- Responsive layout with sidebar navigation

### UI Components
- **Button**: 5 variants, multiple sizes, loading states
- **Input**: Label, error display, helper text, password toggle
- **Card**: Compound component for flexible layouts
- **Badge**: 5 status variants (default, success, warning, danger, info)

### Utility Functions
- Currency formatting (Indian format: ₹)
- Date/time formatting
- Email & phone validation (Indian format)
- Debouncing for performance
- String truncation and ID generation

## 🔐 Security Features

- TypeScript for type safety
- Client-side form validation
- Password field with visibility toggle
- Path aliases for clean imports

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts
- Touch-friendly components
- Sidebar collapses on mobile (dashboard)

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)
```bash
vercel
```

The app is optimized for Vercel's serverless platform with:
- Automatic SSR
- Static generation for landing pages
- Image optimization
- Edge middleware support

## 📊 Performance

- **Code Splitting**: Automatic by Next.js
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Google Fonts with display swap
- **CSS**: Tailwind's tree-shaking and minification
- **Bundle Size**: ~150KB gzipped (production)

## 🗺️ Roadmap

### Phase 1 (Current) ✅
- Landing page with feature showcase
- Authentication pages
- Dashboard UI
- Component library

### Phase 2 (Backend)
- PostgreSQL database setup
- Node.js/Express API
- JWT authentication
- Inventory management endpoints
- Billing system API
- Customer management API

### Phase 3 (Advanced)
- Real-time notifications
- Admin panel
- Advanced reporting
- Excel export
- Multi-user support with roles
- Mobile app (React Native)
- Flutter mobile app

## 🤝 Contributing

### Development Workflow
1. Create a feature branch: `git checkout -b feature/feature-name`
2. Make your changes
3. Run tests and linting: `npm run lint`
4. Run type checking: `npm run type-check`
5. Commit with clear messages
6. Push and create a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow the existing component patterns
- Add JSDoc comments for complex functions
- Use meaningful variable names

## 📚 Documentation Files

- **PROJECT_STATUS.md**: Current development status and completed tasks
- **FLUTTER_REPLICATION_GUIDE.md**: Guide for replicating this UI in Flutter
- **FLUTTER_CODE_EXAMPLES.md**: Working Flutter code examples

## 🐛 Troubleshooting

### Dev Server Won't Start
```bash
# Clear caches and reinstall
rm -rf node_modules .next package-lock.json
npm install
npm run dev
```

### Build Errors
```bash
# Clear build cache
rm -rf .next
npm run build
```

### Port Already in Use
The dev server will automatically use the next available port (3001, 3002, etc.)

## 📧 Support & Contact

For issues, suggestions, or questions:
- Open an issue on GitHub
- Email: support@zewardesk.com
- Website: https://zewardesk.com

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with Next.js and React
- Styled with Tailwind CSS
- Icons from Unicode/Emoji
- Inspired by modern SaaS platforms

---

**Last Updated**: February 27, 2026  
**Version**: 1.0.0  
**Status**: In Active Development
