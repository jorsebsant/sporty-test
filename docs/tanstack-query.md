# Decision: TanStack Query

## Choice

[@tanstack/react-query](https://tanstack.com/query) v5 — server state management and request caching.

## Reason

The project brief explicitly requires that API responses be cached to avoid repeat calls. TanStack Query is purpose-built for exactly this: it sits between the component tree and the network, deduplicates in-flight requests, and returns cached data instantly on repeat renders.

### How caching is applied here

Every query is configured with a `staleTime` of 10 minutes:

```ts
useQuery({
  queryKey: ['leagues'],
  queryFn: fetchLeagues,
  staleTime: 1000 * 60 * 10,
})
```

This means:
- The first call to `/all_leagues.php` hits the network once.
- Any subsequent component that calls `useLeagues()` — on any render, any navigation — receives the cached result instantly without a new network request.
- The same applies to individual season badge lookups. Each `['season-badge', id]` entry is cached independently, so opening a league modal, closing it, and reopening it costs zero additional requests.
- The `enabled: !!leagueId` guard ensures the badge query only fires when a league is actually selected.

### Why not fetch + useState

A plain `useEffect` + `useState` approach would re-fetch on every mount, could trigger race conditions on fast interactions, has no shared cache between components, and requires manual loading/error state management everywhere. TanStack Query handles all of that out of the box.

### Scalability

If this project grows — adding pagination, mutations, optimistic updates, background refetching on window focus — TanStack Query supports all of it without architectural changes. The query key system scales from a handful of endpoints to hundreds without collision.

## Alternatives Considered

| Alternative | Reason not chosen |
|---|---|
| SWR | Solid library, but TanStack Query has richer cache control, more granular stale/cache time configuration, and broader ecosystem adoption |
| Apollo Client | Designed for GraphQL; adds unnecessary overhead for REST endpoints |
| Zustand / Redux | General state managers, not optimised for server state; caching requires significant manual implementation |
| fetch + useState | No caching, no deduplication, verbose error/loading handling per component |
