# Sports Leagues Viewer
I used claude actively for this home test, opus model for planning and Haiku for executing.

The prop sent to the AI was pretty much what was mentioned on the document but i added the critical architectural definitions.

React because is the library i have the most experience with, but i do know angular and vue. Its just personal preference.

The pnpm decision is based on the security issue found some days ago caused by an infected dependency and a very early patch release installed in a lot of projects. Refer to the .md attached so you can know more about it in case you dont know(this was very famous).

Tanstack query its the library i normally use to avoid creating the cache logic myself so i specified that into the prompt too.

For tailwind, mostly because is one of the biggest and with one of the greatest community and documentation(even though they have comunicated they dont want to improve their documentation for AI usage since most of their income comes from visits to their webpage and documentation which would be affected by this but eventually i think it might happen) and the standard is easy to follow and maintain.

I can suggest more of the tools i can use on AI based development but the scope didnt require this, 2 promts and less than 40% scope usage made the trick, if i need to explain further just let me know!

This is mobile first and with dark and light mode just for accesibility, i also specified to use aria tags for accesibility(no matter what the project is we should almost always consider accesibility).



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
