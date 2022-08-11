import { SaasProvider } from '@saas-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AboutIndex, DevIndex, HomeIndex, KreIndexFeature } from './feature'
import { UiLayout } from './ui/layout/ui-layout'
import { UiLinks } from './ui/layout/ui-link'

export function App() {
  const copyright = <p>Kin Foundation &copy; {new Date().getUTCFullYear()}</p>
  const name = 'Kin Data'
  const links: UiLinks = [
    { label: 'Home', path: '/home' },
    { label: 'KRE', path: '/KRE' },
    { label: 'About', path: '/about' },
  ]
  return (
    <SaasProvider>
      <UiLayout name={name} copyright={copyright} links={links}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/about" element={<AboutIndex />} />
          <Route path="/dev/*" element={<DevIndex />} />
          <Route path="/home" element={<HomeIndex />} />
          <Route path="/kre/*" element={<KreIndexFeature />} />
        </Routes>
      </UiLayout>
    </SaasProvider>
  )
}
