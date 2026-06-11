import { useQuery } from '@tanstack/react-query'
import { fetchLeagues, fetchSeasonBadge } from '../services/api'

export function useLeagues() {
  return useQuery({
    queryKey: ['leagues'],
    queryFn: fetchLeagues,
    staleTime: 1000 * 60 * 10,
  })
}

export function useSeasonBadge(leagueId: string | null) {
  return useQuery({
    queryKey: ['season-badge', leagueId],
    queryFn: () => fetchSeasonBadge(leagueId!),
    enabled: !!leagueId,
    staleTime: 1000 * 60 * 10,
  })
}
