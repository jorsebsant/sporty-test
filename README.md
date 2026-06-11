# Sports Leagues Viewer

A single-page application that consumes [TheSportsDB](https://www.thesportsdb.com/free_sports_api) to display and filter sports leagues worldwide. Click any league to see its season badge.

## Features

- Browse all sports leagues from TheSportsDB
- Search leagues by name in real time
- Filter leagues by sport type
- Click a league card to view its season badge image
- API responses cached to avoid repeat network calls
- Dark and light mode (respects system preference, persists user choice)
- Fully responsive — mobile-first layout
- Accessible: keyboard navigation, ARIA labels, live regions

## Tech Stack

| Tool | Role |
|---|---|
| [React](https://react.dev) | UI library |
| [TypeScript](https://www.typescriptlang.org) | Static typing |
| [Vite](https://vite.dev) | Build tool & dev server |
| [TanStack Query](https://tanstack.com/query) | Server state & caching |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [pnpm](https://pnpm.io) | Package manager |

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/
│   ├── BadgeModal.tsx     — Modal dialog with season badge image
│   ├── Header.tsx         — Sticky top bar with logo and theme toggle
│   ├── LeagueCard.tsx     — Clickable league card
│   ├── LeagueGrid.tsx     — Grid layout with filtering logic
│   ├── SearchBar.tsx      — Search input
│   ├── SportFilter.tsx    — Sport type dropdown
│   └── ThemeToggle.tsx    — Dark/light mode button
├── hooks/
│   ├── useLeagues.ts      — TanStack Query hooks for both API endpoints
│   └── useTheme.ts        — Theme state with localStorage persistence
├── services/
│   └── api.ts             — Fetch functions for TheSportsDB API
└── types/
    └── league.ts          — TypeScript interfaces
```

## API

- **All Leagues:** `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
- **Season Badge:** `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=<id>`

## Decision Records

Technical and architectural decisions are documented in the [`docs/`](./docs) folder:

- [React](./docs/react.md) — Why React as the UI library
- [Vite](./docs/vite.md) — Why Vite over Webpack and alternatives
- [TanStack Query](./docs/tanstack-query.md) — Why TanStack Query for server state and caching
- [Tailwind CSS](./docs/tailwind.md) — Why Tailwind for styling
- [pnpm](./docs/pnpm.md) — Why pnpm and its security advantages
