import { AppFooter, AppFooterLinkGroup } from '@kin-data/web/ui/app-footer'
import { AppHeader, AppHeaderLink } from '@kin-data/web/ui/app-header'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

export const AppLayout: React.FC = (props) => {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const links: AppHeaderLink[] = [
    // Header Links here
    { label: 'Dashboard', href: '/' },
    { label: 'KRE', href: '/kre' },
  ]

  const linkGroups: AppFooterLinkGroup[] = [
    {
      title: 'Quick Links',
      links: [
        { label: 'Start Quickly', href: '/' },
        { label: 'SDKs', href: '/' },
        { label: 'Starter Kits', href: '/' },
        { label: 'Tutorials', href: '/' },
        { label: 'Blog', href: '/' },
      ],
    },
    {
      title: 'About',
      links: [
        { label: 'Kin Foundation', href: '/' },
        { label: 'Privacy Policy', href: '/' },
        { label: 'Cookie Policy', href: '/' },
        { label: 'Terms and Conditions', href: '/' },
        { label: 'Developer Terms', href: '/' },
      ],
    },
    {
      title: 'Social',
      links: [
        { label: 'Twitter', href: '' },
        { label: 'Reddit', href: '' },
        { label: 'LinkedIn', href: '' },
        { label: 'Instagram', href: '' },
        { label: 'Facebook', href: '' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'Developer Portal', href: '' },
        { label: 'Developer Discord', href: '' },
      ],
    },
  ]

  const toggleTheme = () => {
    if (isMounted) {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    }
  }

  useEffect(() => setIsMounted(true), [])

  return (
    <div className="flex flex-col h-full justify-between">
      <AppHeader toggleTheme={toggleTheme} links={links} />
      <main className="flex-grow">{props.children}</main>
      <AppFooter groups={linkGroups} />
    </div>
  )
}
