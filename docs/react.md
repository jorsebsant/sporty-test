# Decision: React

## Choice

[React](https://react.dev) — UI component library.

## Reason

React is the library the team has the deepest day-to-day experience with. Choosing a familiar tool for a scoped assignment reduces the risk of time being spent navigating an unfamiliar API rather than delivering the actual requirements.

Beyond familiarity, React is a strong fit for this project on its own merits:

- **Component model** aligns directly with the task's requirement for component-based architecture. Each UI concern — the search bar, the sport filter, individual league cards, the badge modal — maps cleanly to a standalone component.
- **Ecosystem maturity** means every tool in this stack (TanStack Query, Tailwind, Vite) has first-class React support with well-maintained bindings.
- **Hooks API** keeps state and side-effect logic co-located and reusable. `useLeagues`, `useTheme`, and `useSeasonBadge` are thin, testable hooks that keep components declarative.
- **React 19** ships with concurrent features and the improved `<dialog>` integration used for the badge modal.

## Alternatives Considered

| Alternative | Reason not chosen |
|---|---|
| Vue 3 | Also listed as acceptable in the brief; strong choice, but less team familiarity |
| Angular | Heavier framework footprint than this project needs; steeper ramp-up cost |
| Svelte | Excellent performance story, but ecosystem is smaller and team has no prior exposure |
