import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTheme } from './hooks/useTheme'
import Header from './components/Header'
import LeagueGrid from './components/LeagueGrid'

const queryClient = new QueryClient()

function AppContent() {
  const { theme, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header theme={theme} onToggleTheme={toggle} />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <LeagueGrid />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}
