import { Container, SimpleGrid } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { UiLoader } from '../../ui/loader/ui-loader'
import { AppsApi } from './apps-api'
import { AppCard } from './apps-card'

export function AppsList() {
  const query = useQuery({ queryKey: ['apps'], queryFn: AppsApi.getItems })

  return (
    <Container>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
          {query.data?.map((app) => (
            <AppCard app={app} key={app.index} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  )
}
