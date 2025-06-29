# SciViz Design System

A production-ready, visually stunning design system for scientific visualization applications.

## Features

- 🧬 Scientific-themed UI components
- 🎨 Modern design system with Tailwind CSS
- ⚡ High-performance React components
- 🔧 TypeScript support
- 📱 Responsive design
- 🌙 Dark/Light theme support
- 🚀 Production-ready build system

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rajshah9305/SciViz-Design-System.git
cd SciViz-Design-System
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000` (frontend) and `http://localhost:5000` (API).

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run preview` - Preview production build locally
- `npm run check` - Type check
- `npm run db:push` - Push database schema changes

### Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── hooks/       # Custom hooks
│   │   ├── lib/         # Utilities
│   │   └── pages/       # Page components
├── server/          # Express backend
├── shared/          # Shared types and schemas

```

## Database Setup

### Local Development (SQLite)
The app uses SQLite by default for local development. No additional setup required.

### Production (PostgreSQL)
1. Set up a PostgreSQL database
2. Update `DATABASE_URL` in your environment variables:
```
DATABASE_URL=postgresql://username:password@localhost:5432/sciviz_db
```

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Any Platform

The built application can be deployed to:
- **Vercel**: Deploy the `client` folder as a static site and `server` as serverless functions
- **Netlify**: Deploy the built `dist/public` folder
- **Docker**: Use the included Dockerfile
- **Traditional hosting**: Deploy the built files to any web server

### Environment Variables for Production

Make sure to set these environment variables in your production environment:
- `DATABASE_URL` - Your production database URL
- `NODE_ENV=production`
- `SESSION_SECRET` - A secure session secret
- `PORT` - Server port (optional, defaults to 5000)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.