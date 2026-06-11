import type { LeaguesResponse, SeasonBadgesResponse } from '../types/league'

const BASE = 'https://www.thesportsdb.com/api/v1/json/3'

export async function fetchLeagues(): Promise<LeaguesResponse> {
  const res = await fetch(`${BASE}/all_leagues.php`)
  if (!res.ok) throw new Error('Failed to fetch leagues')
  return res.json()
}

export async function fetchSeasonBadge(leagueId: string): Promise<SeasonBadgesResponse> {
  const res = await fetch(`${BASE}/search_all_seasons.php?badge=1&id=${leagueId}`)
  if (!res.ok) throw new Error('Failed to fetch season badge')
  return res.json()
}
