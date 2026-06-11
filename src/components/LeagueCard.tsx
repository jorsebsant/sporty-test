import type { League } from '../types/league'

interface Props {
  league: League
  onClick: (league: League) => void
}

const SPORT_COLORS: Record<string, string> = {
  Soccer: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Basketball: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  Baseball: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  Hockey: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Motorsport: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  Tennis: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Rugby: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
}

function sportBadgeClass(sport: string) {
  return SPORT_COLORS[sport] ?? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
}

export default function LeagueCard({ league, onClick }: Props) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick(league)}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick(league)}
      aria-label={`View season badge for ${league.strLeague}`}
      className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-blue-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-snug text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
          {league.strLeague}
        </h3>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${sportBadgeClass(league.strSport)}`}>
          {league.strSport}
        </span>
      </div>

      {league.strLeagueAlternate && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          <span className="font-medium">Also known as: </span>
          {league.strLeagueAlternate}
        </p>
      )}

      <p className="mt-3 text-xs text-blue-500 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-400">
        Click to view season badge →
      </p>
    </article>
  )
}
