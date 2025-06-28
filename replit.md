# SciViz Design System

## Overview

SciViz Design System is a cutting-edge design system that merges scientific accuracy with stunning visual aesthetics. It's a full-stack TypeScript application featuring a React frontend and Express backend, designed to showcase 8 sophisticated layouts inspired by real scientific concepts including neural networks, quantum physics, astrophysics, and other scientific domains.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Build**: esbuild for production bundling

## Key Components

### Database & ORM
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL via Neon Database (@neondatabase/serverless)
- **Schema Location**: `shared/schema.ts` for type-safe schema sharing
- **Migrations**: Generated in `./migrations` directory

### UI Component System
- **Design System**: shadcn/ui with "new-york" style variant
- **Component Library**: Comprehensive set including accordions, dialogs, forms, charts, carousels
- **Theming**: CSS variables-based theming with light/dark mode support
- **Icons**: Lucide React for consistent iconography

### Layout System
- **Scientific Layouts**: 8 specialized layouts (Neural Network, Quantum Physics, Bio-informatics, etc.)
- **Responsive Design**: Mobile-first approach with tablet and desktop breakpoints
- **Interactive Visualizations**: Custom React components for each scientific layout type
- **Performance Tracking**: Built-in analytics for layout interactions

## Data Flow

### Client-Server Communication
1. **API Routes**: RESTful endpoints under `/api/` prefix
2. **Data Fetching**: TanStack Query handles caching, background updates, and optimistic updates
3. **Type Safety**: Shared TypeScript types between client and server via `@shared` alias
4. **Session Management**: Basic session tracking for analytics

### Layout Management
1. **Layout Discovery**: API endpoints for browsing, searching, and filtering layouts
2. **Category Filtering**: Scientific domain-based categorization
3. **Interaction Tracking**: User engagement analytics (views, downloads, previews)
4. **Performance Metrics**: Speed, accessibility, and responsiveness scoring

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Query
- **UI Framework**: Radix UI primitives, class-variance-authority
- **Styling**: Tailwind CSS, clsx, PostCSS
- **Development**: Vite, TypeScript, tsx

### Database & Backend
- **Database**: Neon Database serverless PostgreSQL
- **ORM**: Drizzle ORM with Zod validation
- **Server**: Express.js with session management
- **Build Tools**: esbuild for production bundling

### Visualization & Interaction
- **Charts**: Recharts for data visualization
- **Carousels**: Embla Carousel for layout showcases
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Date Utilities**: date-fns for date formatting

## Deployment Strategy

### Development Environment
- **Local Development**: `npm run dev` - runs tsx server with hot reload
- **Database**: `npm run db:push` - pushes schema changes to database
- **Type Checking**: `npm run check` - TypeScript compilation check

### Production Build
- **Frontend**: Vite builds to `dist/public` directory
- **Backend**: esbuild bundles server to `dist/index.js`
- **Start Command**: `npm start` - runs production server

### Environment Configuration
- **Database URL**: Required `DATABASE_URL` environment variable
- **Replit Integration**: Built-in Replit development banner and tooling
- **Performance Monitoring**: Runtime error overlay for development

### Deployment Targets
- **Node.js Hosting**: Configured for any Node.js hosting provider
- **Database**: PostgreSQL-compatible hosting (Neon, Supabase, etc.)
- **Static Assets**: Frontend builds to standard static file structure

## Recent Changes

### June 28, 2025
- **Design Specifications Implementation**: Created comprehensive design specifications document (DESIGN_SPECIFICATIONS.md) defining visual consistency standards
- **Enhanced Preview Components**: Developed EnhancedLayoutCard component with strict adherence to orange and black color palette
- **CSS Enhancement System**: Implemented advanced CSS variables, animations, and responsive design patterns
- **Component Hierarchy Standards**: Established consistent typography, spacing, and interaction patterns across all preview components
- **Featured Layout System**: Added priority-based layout rendering with enhanced visual indicators
- **Professional Theming**: Refined color palette implementation with executive-level aesthetics

### Design System Features
- **Color Palette Consistency**: Exact hsl(25, 100%, 50%) orange implementation across all components
- **Visual Hierarchy**: Standardized typography scale with professional weight and spacing
- **Interactive Elements**: Enhanced hover states, overlay controls, and smooth transitions
- **Performance Metrics**: Visual progress indicators with animated shimmer effects
- **Badge System**: Complexity and category badges with gradient backgrounds
- **Responsive Design**: Mobile-first approach with tablet and desktop breakpoints
- **Accessibility Standards**: WCAG AA compliance with proper focus management

## Changelog

- June 28, 2025. Initial setup with comprehensive design system implementation

## User Preferences

Preferred communication style: Simple, everyday language.
Request: Generate design specifications and implementation guidelines for preview components to ensure color palette, section visibility, and UI hierarchy consistency across all instances.