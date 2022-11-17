import { Anchor, Container, Stack, Text } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UiLoader } from '../../ui/loader/ui-loader'
import { AppsApi } from './apps-api'
import { AppCard } from './apps-card'

export function AppsDetail() {
  const { date } = useParams()
  const query = useQuery({ queryKey: ['date'], queryFn: () => AppsApi.getItem(date) })

  useEffect(() => {
    query.refetch()
  }, [date])

  return (
    <Container>
      <Stack>
        <Anchor component={Link} to={`..`}>
          <Text size={24} weight={500} sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
            ⬅ Back to Apps
          </Text>
        </Anchor>
        {query.isFetching ? <UiLoader /> : <Stack>{query.data ? <AppCard app={query.data} details /> : null}</Stack>}
      </Stack>
    </Container>
  )
}
