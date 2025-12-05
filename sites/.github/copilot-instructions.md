# Portfolio Demo Showcase - Copilot Instructions

## Project Overview
A Next.js portfolio demo showcase site designed for GitHub Pages deployment. Features 12+ interactive demos showcasing full-stack development capabilities.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages (Static Export)
- **Animations**: CSS animations + Framer Motion

## Project Structure
```
/src
  /app                 # App Router pages
    /demos             # Individual demo routes
      /saas            # SaaS Landing + Dashboard
      /ecommerce       # E-commerce Storefront
      /ai-tools        # AI-Powered Apps
      /dashboard       # API-Driven Dashboard
      /crud            # Enterprise CRUD App
      /realtime        # Real-Time Chat App
      /creative        # 3D/Interactive Experience
      /automation      # Integration Tool Demo
  /components          # Shared UI components
  /lib                 # Utilities and mock data
```

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run export` - Export static files for GitHub Pages

## Guidelines
- All demos use mock data (no real backends)
- Optimize for visual impact and demonstration
- Mobile-responsive design required
- Keep bundle size minimal
