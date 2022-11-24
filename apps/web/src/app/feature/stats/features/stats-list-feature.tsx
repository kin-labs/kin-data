import { Box, Button, Card, Flex, Group, Select, Stack, Table, Text, Title } from '@mantine/core'
import React, { useState } from 'react'
import { App, StatRange, StatType } from '../../../../sdk'
import { UiLoader } from '../../../ui/loader/ui-loader'
import { useStats } from '../data-access/stats.provider'
import { LineChart } from '../ui/line-chart'
import { PieChart } from '../ui/pie-chart'
import { stringToColor } from './string-to-color'

export function StatButtons({ select, selected }: { select: (range: StatRange) => void; selected: StatRange }) {
  const ranges = Object.keys(StatRange)
  return (
    <Group>
      {ranges?.map((range) => (
        <Button
          key={range}
          size={'sm'}
          onClick={() => select(range as StatRange)}
          variant={selected.toString() === range.toString() ? 'filled' : 'default'}
        >
          {range}
        </Button>
      ))}
    </Group>
  )
}
function getDatasets(apps: App[]): { data: number[]; label: string }[] {
  return apps
    .filter((app) => app)
    .map((app) => {
      return {
        data: app.data ?? [],
        label: `${app.name}`,
        hidden: app.hidden,
      }
    })
}

export function StatsListFeature() {
  const { dailySummaryAppResult, input, loading, setInput, stats, stat } = useStats()
  const [showAll, setShowAll] = useState(false)

  const apps: App[] = dailySummaryAppResult?.apps ?? []

  const datasets = getDatasets(apps)

  const data = {
    labels: dailySummaryAppResult?.dates ?? [],
    datasets,
  }

  const dates = dailySummaryAppResult?.dates ?? []
  const firstDate = dates?.[0]
  const lastDate = dates?.[dates?.length - 1]

  const topApps = dailySummaryAppResult?.apps?.slice(0, 10) ?? []

  const labels = [...topApps.map((app) => app.name), 'Rest']

  const percentages = [
    ...topApps.map((app) => {
      return Math.round(((app.total ?? 0) / (dailySummaryAppResult?.total ?? 0)) * 100)
    }),
  ]

  const sum = percentages.reduce((a, b) => a + b, 0)
  const rest = 100 - sum

  const pieData = {
    labels,
    datasets: [
      {
        data: [...percentages, rest],
        backgroundColor: labels.map((label) => stringToColor(`${label}`, 25)),
        borderColor: labels.map((label) => stringToColor(`${label}`)),
      },
    ],
  }

  return (
    <Box p={4}>
      <Stack spacing={12}>
        <Title size="x-large">Stats</Title>
        <Flex justify="space-between">
          <Select
            placeholder="Select option"
            value={stat?.type}
            onChange={(res: StatType) => setInput({ ...input, type: res })}
            data={stats?.map((stat) => ({ label: `${stat.id}: ${stat.name}`, value: stat.type })) ?? []}
          />
        </Flex>
        <Stack>
          <Title size="x-large">{stat?.name}</Title>
          <Text fz="xs">
            {firstDate && lastDate
              ? `From ${new Date(firstDate).toLocaleDateString()} to ${new Date(lastDate).toLocaleDateString()}`
              : 'Fetching...'}
          </Text>
          <Text>{stat?.description ?? 'N/A'}</Text>
          <Flex>
            <StatButtons selected={input.range as StatRange} select={(range) => setInput({ ...input, range })} />
          </Flex>
          {loading ? (
            <UiLoader />
          ) : (
            <Stack>
              <Card>
                <LineChart data={data} />
              </Card>
              <Stack>
                <Group align="start">
                  <Card py={20}>
                    <PieChart data={pieData} />
                  </Card>
                  <Card>
                    <Stack>
                      <Stack spacing={2} px={2}>
                        <Text fw="bold">{stat?.name}</Text>
                        <Text fz="xs">
                          From {new Date(firstDate).toLocaleDateString()} to {new Date(lastDate).toLocaleDateString()}
                        </Text>
                      </Stack>
                      <Table>
                        <thead>
                          <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Total</th>
                            <th>Percentage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dailySummaryAppResult?.apps
                            ?.filter((app) => showAll || !app.hidden)
                            .map((app) => (
                              <tr key={app.name}>
                                <td>{app.index}</td>
                                <td>{app.name}</td>
                                <td>{app.total}</td>
                                <td>
                                  {Math.round(((app.total ?? 0) / (dailySummaryAppResult?.total ?? 0)) * 100 * 100) /
                                    100}{' '}
                                  %
                                </td>
                              </tr>
                            ))}
                          {dailySummaryAppResult?.apps && dailySummaryAppResult?.apps?.length > 10 ? (
                            <tr>
                              <td colSpan={4}>
                                <Flex justify={'center'} pt={16}>
                                  <Button size="sm" onClick={() => setShowAll(!showAll)}>
                                    {showAll ? 'Show top 10' : 'Show all apps'}
                                  </Button>
                                </Flex>
                              </td>
                            </tr>
                          ) : null}
                        </tbody>
                      </Table>
                    </Stack>
                  </Card>
                </Group>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}
