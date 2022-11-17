import { Container, Loader } from '@mantine/core'
import React from 'react'

export function UiLoader() {
  return (
    <Container sx={{ padding: 50 }}>
      <Loader size="xl" m="auto" variant="bars" />
    </Container>
  )
}
