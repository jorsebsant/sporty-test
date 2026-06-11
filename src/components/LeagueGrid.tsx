import { useState, useMemo } from 'react'
import { useLeagues } from '../hooks/useLeagues'
import type { League } from '../types/league'
import LeagueCard from './LeagueCard'
import SearchBar from './SearchBar'
import SportFilter from './SportFilter'
import BadgeModal from './BadgeModal'

export default function LeagueGrid() {
  const { data, isLoading, isError } = useLeagues()
  const [search, setSearch] = useState('')
  const [sport, setSport] = useState('')
  const [selected, setSelected] = useState<League | null>(null)

  const sports = useMemo(() => {
    if (!data?.leagues) return []
    return Array.from(new Set(data.leagues.map(l => l.strSport))).sort()
  }, [data])

  const filtered = useMemo(() => {
    if (!data?.leagues) return []
    return data.leagues.filter(l => {
      const matchName = l.strLeague.toLowerCase().includes(search.toLowerCase())
      const matchSport = sport === '' || l.strSport === sport
      return matchName && matchSport
    })
  }, [data, search, sport])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20" role="status" aria-label="Loading leagues">
        <svg className="h-10 w-10 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z" />
        </svg>
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading leagues...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20" role="alert">
        <p className="text-base font-medium text-red-600 dark:text-red-400">Failed to load leagues.</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Please check your connection and refresh the page.</p>
      </div>
    )
  }

  return (
    <section aria-label="Sports leagues">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <SearchBar value={search} onChange={setSearch} />
        <SportFilter sports={sports} value={sport} onChange={setSport} />
      </div>

      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400" aria-live="polite">
        {filtered.length === 0
          ? 'No leagues found.'
          : `Showing ${filtered.length} league${filtered.length !== 1 ? 's' : ''}`}
      </p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16">
          <svg className="h-12 w-12 text-gray-300 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
          </svg>
          <p className="text-sm text-gray-400 dark:text-gray-500">No leagues match your filters.</p>
        </div>
      ) : (
        <ul
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="League list"
        >
          {filtered.map(league => (
            <li key={league.idLeague}>
              <LeagueCard league={league} onClick={setSelected} />
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <BadgeModal league={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
