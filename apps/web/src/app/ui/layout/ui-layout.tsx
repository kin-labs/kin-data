import { AppShell, Box, Container, Image, useMantineTheme } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { ReactNode } from 'react'
import { UiNavbarLinkProps } from './ui-layout-links-group'
import { UiFooter, UiFooterLink } from './ui.footer'
import { UiHeader } from './ui.header'
import { UiNavbar } from './ui.navbar'

export function UiLayout({
  children,
  footerLinks,
  navLinks,
}: {
  children: ReactNode
  footerLinks: UiFooterLink[]
  navLinks: UiNavbarLinkProps[]
}) {
  const theme = useMantineTheme()
  const [opened, { toggle }] = useDisclosure(false)
  const logo = <Image src={'/assets/kin-logo.svg'} height={28} alt="App logo" />
  const largeScreen = useMediaQuery(`(min-width: ${theme.breakpoints.sm}px)`)
  return (
    <AppShell
      footer={<UiFooter links={footerLinks} />}
      header={<UiHeader toggle={toggle} opened={opened} links={[]} logo={logo} />}
      navbar={<UiNavbar hidden={!opened} links={navLinks} />}
      navbarOffsetBreakpoint="md"
      padding={largeScreen ? theme.spacing.md : theme.spacing.xs}
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
