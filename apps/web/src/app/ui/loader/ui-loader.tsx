import { Container, Loader, MantineSize, useMantineTheme } from '@mantine/core'
import React from 'react'

export function UiLoader({ size = 'xl' }: { size?: MantineSize }) {
  const theme = useMantineTheme()
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
      }}
    >
      <Loader size={size} variant="bars" color="brand" />
    </Container>
  )
}
