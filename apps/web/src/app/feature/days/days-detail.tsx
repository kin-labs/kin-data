import { Anchor, Card, Container, Flex, SimpleGrid, Stack, Text, Tooltip } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import React, { ReactNode, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UiLoader } from '../../ui/loader/ui-loader'
import { DaysApi, formatNumber } from './days-api'

export function DaysDetail() {
  const { date } = useParams()
  const query = useQuery({ queryKey: ['date'], queryFn: () => DaysApi.getSummary(date) })
  const queryDates = useQuery({ queryKey: ['dates'], queryFn: DaysApi.getSummaryDates })

  useEffect(() => {
    query.refetch()
  }, [date])

  return (
    <Container>
      <Card radius="md">
        <Stack>
          {date && queryDates?.data?.length ? <DaysStatHeader date={date} dates={queryDates.data} /> : null}
          {query.isFetching ? (
            <UiLoader />
          ) : (
            <Stack>
              <SimpleGrid cols={3}>
                <DaysStatBox label={'Daily Transactions'} amount={query.data?.dailyTransactions ?? 0} />
                <DaysStatBox label={'Active Apps'} amount={query.data?.activeApps ?? 0} />
                <DaysStatBox label={'Active User Balance'} amount={query.data?.activeUserBalance ?? 0} />
              </SimpleGrid>
              <SimpleGrid cols={3}>
                <DaysStatBox label={'Monthly Active Spenders'} amount={query.data?.monthlyActiveSpenders ?? 0} />
                <DaysStatBox label={'Monthly Active Earners'} amount={query.data?.monthlyActiveEarners ?? 0} />
                <DaysStatBox label={'Monthly Active Users'} amount={query.data?.monthlyActiveUsers ?? 0} />
              </SimpleGrid>
            </Stack>
          )}
        </Stack>
      </Card>
    </Container>
  )
}

export function DaysBox({ content, label }: { content: ReactNode; label: string }) {
  return (
    <Stack>
      <Text size="lg" color="dimmed">
        {label}
      </Text>
      {content}
    </Stack>
  )
}

export function DaysStatBox({ amount, label }: { amount: number; label: string }) {
  return (
    <Stack>
      <Text size="lg" color="dimmed">
        {label}
      </Text>
      <Tooltip label={amount}>
        <Text size={32}>{formatNumber(amount ?? 0)}</Text>
      </Tooltip>
    </Stack>
  )
}

export function DaysStatHeader({ date, dates }: { date: string; dates: string[] }) {
  const currentDate = dates.findIndex((d) => d === date) || 0
  const previousDate = dates[currentDate + 1] || dates[0]
  const nextDate = dates[currentDate - 1]

  return (
    <SimpleGrid cols={3}>
      <DaysStatHeaderBox date={nextDate} />
      <DaysStatHeaderBox date={date} />
      <DaysStatHeaderBox date={previousDate} />
    </SimpleGrid>
  )
}

export function DaysStatHeaderBox({ date }: { date?: string }) {
  return (
    <Card radius="md" withBorder>
      <Flex justify="center" align="center" mih={50}>
        {date ? (
          <Anchor component={Link} color={'primary'} to={`../${date}`}>
            <Text align="center">{new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}</Text>
            <Text align="center" color="dimmed">
              {new Date(date).toLocaleDateString()}
            </Text>
          </Anchor>
        ) : (
          'No date selected'
        )}
      </Flex>
    </Card>
  )
}
