import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { Navigate, Route, Routes } from 'react-router-dom'
import { NotFoundIndex } from './feature/not-found/not-found-index'
import { UiLinks } from './ui/layout/ui-link'

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
  const links: UiLinks = [
    { label: 'Home', path: '/home' },
    { label: 'KRE', path: '/KRE' },
  ]

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme, primaryColor: 'violet' }} withGlobalStyles withNormalizeCSS>
        {/*<UiLayout name={name} copyright={copyright} links={links}>*/}
        <Routes>
          <Route path="/" element={<Navigate to="/not-found" replace />} />
          {/*<Route path="/dev/*" element={<DevIndex />} />*/}
          {/*<Route path="/home" element={<HomeIndex />} />*/}
          <Route path="/not-found" element={<NotFoundIndex />} />
          {/*<Route path="/kre/*" element={<KreIndexFeature />} />*/}
        </Routes>
        {/*</UiLayout>*/}
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
