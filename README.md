# Neuro Paradigm

AI-assisted clinical decision support for psychiatry and neurodevelopmental care.

A full-stack web application showcasing Neuro Paradigm's multi-modal signal fusion platform — extracting objective, quantifiable biomarkers from behavioral, biological, and cognitive data streams to augment specialist-led clinical evaluation.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite 7, TypeScript 5.9 |
| **Styling** | Tailwind CSS 4, `tw-animate-css`, `class-variance-authority` |
| **Animations** | Framer Motion |
| **UI Components** | shadcn/ui (Radix primitives) |
| **Routing** | Wouter |
| **State / Data** | TanStack React Query |
| **Backend** | Express 5, Node.js |
| **Database** | PostgreSQL + Drizzle ORM |
| **Validation** | Zod |
| **API Codegen** | Orval (from OpenAPI spec) |
| **Build** | esbuild (API server), Vite (frontend) |
| **Package Manager** | pnpm (workspaces) |

---

## Project Structure

```
Neuro-Paradigm-Site-1/
├── artifacts/
│   ├── neuro-paradigm/          # React frontend (SPA)
│   │   ├── src/
│   │   │   ├── pages/           # Route-level page components
│   │   │   │   ├── home.tsx     # Homepage — hero, signal slider, stats, newsletter
│   │   │   │   ├── about.tsx    # Mission statement + team grid
│   │   │   │   ├── gallery.tsx  # Multi-modal AI input visualizations
│   │   │   │   ├── achievements.tsx  # Timeline of milestones
│   │   │   │   ├── partners.tsx # Infinite-scroll partner carousel
│   │   │   │   └── contact.tsx  # Contact form + info
│   │   │   ├── components/
│   │   │   │   ├── Navbar.tsx   # Glassmorphism sticky navigation
│   │   │   │   ├── Footer.tsx   # Site-wide footer
│   │   │   │   └── ui/         # shadcn/ui component library
│   │   │   ├── lib/            # Theme provider, utilities
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   ├── App.tsx         # Root component + router
│   │   │   ├── main.tsx        # Entry point
│   │   │   └── index.css       # Design tokens + Tailwind config
│   │   ├── vite.config.ts
│   │   └── package.json
│   ├── api-server/              # Express API backend
│   │   ├── src/
│   │   │   ├── routes/         # API route handlers
│   │   │   ├── middlewares/    # Express middleware
│   │   │   ├── lib/            # Shared utilities
│   │   │   ├── app.ts          # Express app setup
│   │   │   └── index.ts        # Server entry point
│   │   ├── build.mjs           # esbuild bundler script
│   │   └── package.json
│   └── mockup-sandbox/          # Design sandbox (development tool)
├── lib/
│   ├── api-spec/               # OpenAPI specification (source of truth)
│   │   └── openapi.yaml
│   ├── api-client-react/       # Auto-generated React Query hooks
│   ├── api-zod/                # Auto-generated Zod schemas
│   └── db/                     # Drizzle ORM schema + migrations
├── scripts/                    # Build & utility scripts
├── package.json                # Root workspace config
├── pnpm-workspace.yaml         # Workspace packages + catalog
├── tsconfig.base.json          # Shared TypeScript config
└── tsconfig.json               # Root tsconfig
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 24
- **pnpm** ≥ 9 ([install guide](https://pnpm.io/installation))
- **PostgreSQL** (for the API server / database features)

### Installation

```bash
pnpm install
```

### Development

**Frontend only** (most common):

```bash
pnpm --filter @workspace/neuro-paradigm run dev
```

The dev server starts at `http://localhost:5173` by default.

**API server:**

```bash
pnpm --filter @workspace/api-server run dev
```

**Both simultaneously** (from the root):

```bash
# In separate terminals, or use a process manager
pnpm --filter @workspace/neuro-paradigm run dev
pnpm --filter @workspace/api-server run dev
```

### Build

```bash
# Full typecheck + build (all packages)
pnpm run build

# Frontend only
pnpm --filter @workspace/neuro-paradigm run build
```

The frontend build output goes to `artifacts/neuro-paradigm/dist/public/`.

### Type Checking

```bash
pnpm run typecheck
```

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5173` | Dev server port (frontend) |
| `BASE_PATH` | `/` | Base URL path for the app |
| `DATABASE_URL` | — | PostgreSQL connection string (API server) |

---

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Animated neural hero, 5-signal interactive slider, impact statistics, newsletter signup |
| `/about` | About | Mission statement, founding thesis, core team grid |
| `/gallery` | Gallery | Multi-modal AI input visualizations (masonry grid) |
| `/achievements` | Achievements | Company milestone timeline |
| `/partners` | Partners | Infinite-scroll carousel of institutional partners |
| `/contact` | Contact | Two-column layout with contact form + location info |

---

## API Codegen

The API layer uses contract-first development. The OpenAPI spec at `lib/api-spec/openapi.yaml` is the source of truth.

After modifying the spec:

```bash
pnpm --filter @workspace/api-spec run codegen
```

This regenerates:
- React Query hooks in `lib/api-client-react/`
- Zod validation schemas in `lib/api-zod/`

---

## Design System

- **Theme**: Clinical professional aesthetic — deep navy, cool blues, crisp whites
- **Dark/Light Mode**: Toggle via navbar; persisted to `localStorage`
- **Typography**: [Inter](https://fonts.google.com/specimen/Inter) (sans-serif), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (monospace)
- **Components**: shadcn/ui built on Radix UI primitives
- **Animations**: Framer Motion entrance animations + scroll-triggered reveals

---

## Deployment

### Static Frontend (Render, Vercel, Netlify, etc.)

```bash
pnpm --filter @workspace/neuro-paradigm run build
```

Serve the contents of `artifacts/neuro-paradigm/dist/public/` as a static site.

### API Server

```bash
pnpm --filter @workspace/api-server run build
pnpm --filter @workspace/api-server run start
```

Requires `DATABASE_URL` to be set for PostgreSQL connectivity.

---

## License

MIT
