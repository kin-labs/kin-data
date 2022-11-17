import { Anchor, Card, Container, SimpleGrid, Text } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import { UiLoader } from '../../ui/loader/ui-loader'
import { DaysApi } from './days-api'

export function DaysList() {
  const query = useQuery({ queryKey: ['dates'], queryFn: DaysApi.getSummaryDates })

  return (
    <Container>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <SimpleGrid cols={7} spacing="sm" verticalSpacing="sm">
          {query.data?.map((date) => (
            <Card radius="md" key={date}>
              <Anchor component={Link} color={'primary'} to={`./${date}`}>
                <Text size="sm">{new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}</Text>
                <Text size="xs" color="dimmed">
                  {new Date(date).toLocaleDateString()}
                </Text>
              </Anchor>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Container>
  )
}
