import { AppShell, useMantineTheme } from '@mantine/core'
import React, { PropsWithChildren, ReactNode } from 'react'
import { UiLayoutFooter } from './ui-layout-footer'
import { UiLayoutHeader } from './ui-layout-header'
import { UiLinks } from './ui-link'

export function UiLayout({
  children,
  copyright,
  links,
  name,
}: PropsWithChildren<{
  copyright: ReactNode
  links: UiLinks
  name: string
}>) {
  const theme = useMantineTheme()
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      // footer={<UiLayoutFooter copyright={copyright} />}
      header={<UiLayoutHeader name={name} links={links} />}
    >
      {children}
    </AppShell>
  )
}
