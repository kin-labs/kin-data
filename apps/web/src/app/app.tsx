import { IconBrandGithub, IconBrandTwitter, IconBug, IconGauge, IconPresentationAnalytics } from '@tabler/icons'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './app-shell'
import { DashboardIndex, DaysIndex, DevIndex } from './feature'
import { AppsIndex } from './feature/apps/apps-index'
import { NotFoundIndex } from './feature/not-found/not-found-index'
import { StatsTypesProvider, useStatsTypes } from './feature/stats/data-access/stats-types.provider'
import { StatsIndexFeature } from './feature/stats/features/stats-index-feature'
import { UiLayout } from './ui/layout/ui-layout'
import { UiNavbarLinkProps } from './ui/layout/ui-layout-links-group'
import { UiFooterLink } from './ui/layout/ui.footer'
import { UiLoader } from './ui/loader/ui-loader'
import { UiError } from './ui/loader/ui.error'

const queryClient = new QueryClient()

export function App() {
  const { stats, loading, error } = useStatsTypes()
  return (
    <AppShell>
      <QueryClientProvider client={queryClient}>
        <StatsTypesProvider>
          <AppRoutes />
        </StatsTypesProvider>
      </QueryClientProvider>
    </AppShell>
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

  const footerLinks: UiFooterLink[] = [
    {
      icon: IconBrandGithub,
      link: 'https://github.com/kin-labs/kinetic',
      label: 'GitHub',
    },
    {
      icon: IconBrandTwitter,
      link: 'https://kin.org/developerdiscord',
      label: 'Discord',
    },
  ]
  const statsLinks = stats.map((s) => ({
    label: s.name,
    link: `/stats/${s.type}`,
  }))

  const navLinks: UiNavbarLinkProps[] = [
    { label: 'Dashboard', icon: IconGauge, link: '/dashboard' },
    {
      label: 'Statistics',
      link: '/stats',
      icon: IconPresentationAnalytics,
      links: [...statsLinks],
    },
    { label: 'Developer', icon: IconBug, link: '/dev' },
  ]

  return (
    <UiLayout footerLinks={footerLinks} navLinks={navLinks}>
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
