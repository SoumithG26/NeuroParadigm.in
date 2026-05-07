# Neuro Paradigm

A multi-page marketing and information website for Neuro Paradigm, a healthcare AI startup specializing in AI-assisted clinical decision support for psychiatry and neurodevelopmental care.

## Run & Operate

- `pnpm --filter @workspace/neuro-paradigm run dev` — run the frontend (reads PORT env)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- No database required — frontend-only website

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite, Tailwind CSS v4
- Routing: wouter
- Animations: framer-motion
- Theme: next-themes (light/dark toggle)
- Fonts: Outfit (display/headings), Inter (body) via Google Fonts
- UI: shadcn/ui components, lucide-react icons

## Where things live

- `artifacts/neuro-paradigm/src/pages/` — one file per page (home, about, gallery, achievements, partners, contact)
- `artifacts/neuro-paradigm/src/components/` — Navbar, Footer shared components
- `artifacts/neuro-paradigm/src/index.css` — theme tokens (clinical blue/slate light, deep navy dark)
- `artifacts/neuro-paradigm/src/App.tsx` — router + ThemeProvider setup

## Architecture decisions

- Pure frontend site — no backend or database needed; contact form simulates submission with setTimeout
- CSS custom properties use space-separated HSL (no `hsl()` wrapper) per tailwind v4 convention
- `@import url(...)` for Google Fonts is placed as the very first line in index.css (required by PostCSS)
- Neural network background on hero uses canvas + requestAnimationFrame for smooth 60fps animation
- Gallery visuals are procedurally generated with SVG/CSS (no external image dependencies)

## Product

- **Home**: Full-viewport hero with live neural network animation, 5-slide Multi-Signal Fusion carousel (Motion/MRI/Speech/Eye-Tracking/EEG), animated impact stats, newsletter signup
- **About Us**: Mission statement, three signal pillars (Behavioral/Biological/Cognitive), philosophy cards
- **Gallery**: Tabbed grid (Platform UI, Behavioral Observation, MRI Analysis, Audio Spectrograms) with procedurally-generated CSS/SVG visuals per category
- **Achievements**: Animated vertical timeline with 8 clinical milestones from 2023 to present
- **Partners**: Three-category partner grid (Hospitals, Clinics, Academic Research) with scrolling marquee
- **Contact**: Validated form (react-hook-form + zod), abstract globe graphic, success state

## User preferences

- Inspired by cyberparadigm.in aesthetic: bold typography, dark hero, frosted-glass nav, cinematic feel
- Light/dark mode toggle required in navbar
- Multi-page routing (not single-page scroll)
- Clinical color palette: soft blues, crisp white, slate grays (light) / deep navy + electric cyan (dark)

## Gotchas

- Google Fonts `@import url(...)` MUST stay as line 1 of index.css — PostCSS fails silently if any `@import` precedes it
- Canvas neural animation uses a cleanup function; HMR won't leak animation frames
- The `@theme inline` block in index.css references CSS vars — all must be defined in `:root` and `.dark`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See the `react-vite` skill for adding new pages or backend features
