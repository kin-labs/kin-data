import { AppShell, Container, Image, useMantineTheme } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { IconBrandGithub, IconBrandTwitter, IconGauge, IconPresentationAnalytics } from '@tabler/icons'
import { ReactNode } from 'react'
import { UiNavbarLinkProps } from './ui-layout-links-group'
import { UiFooter } from './ui.footer'
import { UiHeader } from './ui.header'
import { UiNavbar } from './ui.navbar'

export function UiLayout({
  children,
  statsLinks,
}: {
  children: ReactNode
  statsLinks: { link: string; label: string }[]
}) {
  const theme = useMantineTheme()
  const [opened, { toggle }] = useDisclosure(false)
  const logo = <Image src={'/assets/kin-logo.svg'} height={28} alt="App logo" />
  const footerLinks = [
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
  const navLinks: UiNavbarLinkProps[] = [
    { label: 'Dashboard', icon: IconGauge, link: '/dashboard' },
    {
      label: 'Statistics',
      link: '/stats',
      icon: IconPresentationAnalytics,
      links: [...statsLinks],
    },
  ]
  const largeScreen = useMediaQuery(`(min-width: ${theme.breakpoints.sm}px)`)
  return (
    <AppShell
      footer={<UiFooter links={footerLinks} />}
      header={<UiHeader toggle={toggle} opened={opened} links={[]} logo={logo} />}
      navbar={<UiNavbar hidden={!opened} links={navLinks} />}
      navbarOffsetBreakpoint="md"
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
    >
      <Container px={largeScreen ? undefined : 0} py={largeScreen ? 'lg' : 0} size={largeScreen ? 'xl' : 'sm'}>
        {children}
      </Container>
    </AppShell>
  )
}
