# Projekt

A React + TypeScript + Vite frontend application.

## Project Structure

- `projekt/` - Main frontend application
  - `src/` - React source files (components, App.tsx, main.tsx, types.ts)
  - `assets_add/` - Additional image assets (battle backgrounds, character sprites)
  - `public/` - Static public assets
  - `index.html` - HTML entry point
  - `vite.config.ts` - Vite configuration
  - `package.json` - Dependencies

## Tech Stack

- React 19
- TypeScript
- Vite 7
- Zustand (state management)
- Lucide React (icons)

## Development

The app runs on port 5000 via the "Start application" workflow:
```
cd projekt && npm run dev
```

Vite is configured with:
- `host: '0.0.0.0'` — binds to all interfaces
- `port: 5000` — required for Replit webview
- `allowedHosts: true` — allows Replit proxy

## Deployment

Configured as a static site deployment:
- Build: `npm --prefix projekt run build`
- Public directory: `projekt/dist`
