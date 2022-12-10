import { Card, Container, Stack, Text } from '@mantine/core'
import { ReactNode } from 'react'

export function UiLayoutPage({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <Container my="md">
      <Stack>
        {title ? <AdminPageHeader title={title} /> : null}
        {children}
      </Stack>
    </Container>
  )
}
export function AdminPageHeader({ title }: { title: string }) {
  return (
    <Card withBorder radius="md">
      <Text size="lg" weight="bold">
        {title}
      </Text>
    </Card>
  )
}
