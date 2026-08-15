# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Common Tasks
- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

### Project Structure
- **app/** - Next.js 13+ app router structure
  - **app/admin/** - Admin dashboard sections (designations, departments)
  - **app/page.tsx** - Landing page
  - **app/layout.tsx** - Root layout with global styles
- **src/components/ui/** - UI component library
  - **brutal-*** prefixed components - Custom brutalism-themed UI components
  - Standard components - Original Next.js UI components (button, card, etc.)
- **src/app/globals.css** - Global CSS with brutalism theme variables and utilities

### Architecture Overview

#### App Router Structure
This Next.js 13+ application uses the App Router:
- Each folder in `app/` represents a route
- `page.tsx` files contain route components
- `layout.tsx` files define route layouts
- API routes would typically go in `app/api/` but were removed per request

#### Brutalism Theme Implementation
The application features a custom brutalism design system:
- **Theme Variables**: Defined in `src/app/globals.css` under `@theme inline`
- **Component Library**: Custom brutalism components in `src/components/ui/` with `brutal-` prefix
- **Design Characteristics**: 
  - Zero radius elements (`--radius-*`: 0px)
  - Bold black/white/red color scheme
  - 2px solid borders throughout
  - Monospace font stacks for form elements
  - Visible grid utilities for development
  - Immediate interactions (no CSS transitions)

#### Component Organization
- **Standard UI Components**: Original components (button.tsx, card.tsx, etc.) 
- **Brutalism UI Components**: Custom components prefixed with `brutal-` (brutal-button.tsx, brutal-card.tsx, etc.)
- Pages import either standard or brutalism components based on desired styling

### Code Navigation
- **Routes to Files**: 
  - `/` → `src/app/page.tsx`
  - `/admin` → `src/app/admin/page.tsx`
  - `/admin/designations` → `src/app/admin/designations/page.tsx`
  - `/admin/departments` → `src/app/admin/departments/page.tsx`
- **Component Usage**: 
  - Brutalism components imported as `@/components/ui/brutal-*`
  - Standard components imported as `@/components/ui/*`
  - Absolute path alias `@/` maps to `src/` directory

### TypeScript Configuration
- Path alias: `@/*` maps to `src/*` (see tsconfig.json)
- Strict type checking enabled
- Next.js-specific TypeScript plugin included
- No emission during type checking (`noEmit: true`)

### Styling Approach
- Tailwind CSS v4 with custom theme extensions
- Global CSS variables for theme customization
- Utility-first approach with custom component library
- CSS variables defined in `globals.css` under `@theme inline`