import { useEffect, useRef } from 'react'
import { useSeasonBadge } from '../hooks/useLeagues'
import type { League } from '../types/league'

interface Props {
  league: League
  onClose: () => void
}

export default function BadgeModal({ league, onClose }: Props) {
  const { data, isLoading, isError } = useSeasonBadge(league.idLeague)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialogRef.current?.showModal()
    return () => dialogRef.current?.close()
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const badge = data?.seasons?.find(s => s.strBadge) ?? null

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      className="m-auto w-full max-w-sm rounded-2xl border-0 bg-white p-0 shadow-2xl backdrop:bg-black/50 dark:bg-gray-900"
      onClick={e => { if (e.target === dialogRef.current) onClose() }}
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
        <h2 id="modal-title" className="text-base font-semibold text-gray-900 dark:text-gray-100">
          {league.strLeague}
        </h2>
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200 focus-visible:outline-2 focus-visible:outline-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div id="modal-desc" className="flex min-h-40 flex-col items-center justify-center gap-4 p-6">
        {isLoading && (
          <div role="status" aria-label="Loading season badge">
            <svg className="h-8 w-8 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z" />
            </svg>
          </div>
        )}

        {isError && (
          <p className="text-sm text-red-500" role="alert">
            Could not load badge. Please try again.
          </p>
        )}

        {!isLoading && !isError && badge?.strBadge ? (
          <>
            <img
              src={badge.strBadge}
              alt={`Season badge for ${league.strLeague}`}
              className="max-h-48 object-contain"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">Season {badge.strSeason}</p>
          </>
        ) : !isLoading && !isError && (
          <p className="text-sm text-gray-500 dark:text-gray-400">No badge available for this league.</p>
        )}
      </div>
    </dialog>
  )
}
