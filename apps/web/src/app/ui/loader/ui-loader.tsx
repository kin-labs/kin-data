import { Container, Loader } from '@mantine/core'
import React from 'react'

export function UiLoader() {
  return (
    <Container sx={{ padding: 100 }}>
      <Loader size="xl" m="auto" variant="bars" />
    </Container>
  )
}
