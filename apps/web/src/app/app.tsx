import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DaysIndex, DevIndex, HomeIndex, KreIndexFeature } from './feature'
import { NotFoundIndex } from './feature/not-found/not-found-index'
import { UiLayout } from './ui/layout/ui-layout'
import { UiLinks } from './ui/layout/ui-link'

const queryClient = new QueryClient()

export function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'kin-data',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  const copyright = <p>Kin Foundation &copy; {new Date().getUTCFullYear()}</p>
  const name = 'Kin Data'
  const links: UiLinks = []

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme, primaryColor: 'violet' }} withGlobalStyles withNormalizeCSS>
        <QueryClientProvider client={queryClient}>
          <UiLayout name={name} copyright={copyright} links={links}>
            <Routes>
              <Route path="/" element={<Navigate to="/not-found" replace />} />
              <Route path="/dates/*" element={<DaysIndex />} />
              <Route path="/dev/*" element={<DevIndex />} />
              <Route path="/home" element={<HomeIndex />} />
              <Route path="/not-found" element={<NotFoundIndex />} />
              <Route path="/kre/*" element={<KreIndexFeature />} />
            </Routes>
          </UiLayout>
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
