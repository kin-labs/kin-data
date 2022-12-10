import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardIndex, DaysIndex, DevIndex } from './feature'
import { AppsIndex } from './feature/apps/apps-index'
import { NotFoundIndex } from './feature/not-found/not-found-index'
import { StatsTypesProvider, useStatsTypes } from './feature/stats/data-access/stats-types.provider'
import { StatsIndexFeature } from './feature/stats/features/stats-index-feature'
import { MantineApp } from './mantine-app'
import { UiLayout } from './ui/layout/ui-layout'
import { UiLoader } from './ui/loader/ui-loader'
import { UiError } from './ui/loader/ui.error'

const queryClient = new QueryClient()

export function App() {
  const { stats, loading, error } = useStatsTypes()
  return (
    <MantineApp>
      <QueryClientProvider client={queryClient}>
        <StatsTypesProvider>
          <AppRoutes />
        </StatsTypesProvider>
      </QueryClientProvider>
    </MantineApp>
  )
}

export function AppRoutes() {
  const { stats, loading, error } = useStatsTypes()
  if (loading) {
    return <UiLoader />
  }
  if (error) {
    if (error.networkError) {
      console.log('Network error', error.networkError)
      return <UiError code={500} title="A network error occurred" description={error?.toString() ?? 'Unknown error'} />
    }
    return <UiError code={400} title="An error occurred" description={error?.toString() ?? 'Unknown error'} />
  }

  const statsLinks = stats.map((s) => ({
    label: s.name,
    link: `/stats/${s.type}`,
  }))

  return (
    <UiLayout statsLinks={[...(statsLinks ?? [])]}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/apps/*" element={<AppsIndex />} />
        <Route path="/dates/*" element={<DaysIndex />} />
        <Route path="/dashboard" element={<DashboardIndex />} />
        <Route path="/dev/*" element={<DevIndex />} />
        <Route path="/not-found" element={<NotFoundIndex />} />
        <Route path="/stats/*" element={<StatsIndexFeature />} />
      </Routes>
    </UiLayout>
  )
}
