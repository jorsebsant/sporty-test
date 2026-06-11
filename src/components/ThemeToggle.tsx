interface Props {
  theme: 'light' | 'dark'
  onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-full p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
    >
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4a1 1 0 0 1 1-1V2a1 1 0 1 0-2 0v1a1 1 0 0 1 1 1Zm0 16a1 1 0 0 1-1 1v1a1 1 0 1 0 2 0v-1a1 1 0 0 1-1-1Zm8-8a1 1 0 0 1 1-1h1a1 1 0 1 0 0-2h-1a1 1 0 0 1-1 1ZM4 12a1 1 0 0 1-1 1H2a1 1 0 1 0 0 2h1a1 1 0 0 1 1-1ZM12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7Zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6.364-9.364a1 1 0 0 1 0-1.414l.707-.707a1 1 0 1 0-1.414-1.414l-.707.707a1 1 0 0 1 0 1.414 1 1 0 0 1 1.414 0ZM5.636 18.364a1 1 0 0 1 0 1.414l-.707.707a1 1 0 0 0 1.414 1.414l.707-.707a1 1 0 0 1 0-1.414 1 1 0 0 1-1.414 0ZM18.364 18.364a1 1 0 0 1 1.414 0l.707.707a1 1 0 0 0 1.414-1.414l-.707-.707a1 1 0 0 1 0-1.414 1 1 0 0 1-1.414 1.414ZM5.636 5.636a1 1 0 0 1-1.414 0l-.707-.707A1 1 0 0 0 4.929 3.515l.707.707a1 1 0 0 1 0 1.414Z"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z"/>
        </svg>
      )}
    </button>
  )
}
