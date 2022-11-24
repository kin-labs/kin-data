import { Box, Button, Flex, Group, Select, Stack, Text, Title } from '@mantine/core'
import React from 'react'
import { App, StatRange, StatType } from '../../../../sdk'
import { UiLoader } from '../../../ui/loader/ui-loader'
import { useStats } from '../data-access/stats.provider'
import { LineChart } from '../ui/line-chart'
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
          variant={selected.toString() === range.toString() ? 'filled' : 'outline'}
        >
          {range}
        </Button>
      ))}
    </Group>
  )
}
function getDatasets(apps: App[]): { data: number[]; label: string; borderColor: string; backgroundColor: string }[] {
  return apps
    .filter((app) => app)
    .map((app) => {
      return {
        data: app.data ?? [],
        label: `${app.name}`,
        borderColor: stringToColor(`${app.name}`),
        backgroundColor: stringToColor(`${app.name}`, 25),
      }
    })
}

export function StatsListFeature() {
  const { dailySummaryAppResult, input, loading, setInput, stats, stat } = useStats()

  const apps: App[] = dailySummaryAppResult?.apps ?? []

  const datasets = getDatasets(apps)

  const data = {
    labels: dailySummaryAppResult?.dates ?? [],
    datasets,
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
          <StatButtons selected={input.range as StatRange} select={(range) => setInput({ ...input, range })} />
        </Flex>
        <Stack>
          <Title size="x-large">{stat?.name}</Title>
          <Text>{stat?.description ?? 'N/A'}</Text>
          {loading ? (
            <UiLoader />
          ) : (
            <Stack>
              <LineChart data={data} />
              {/*<Box component="pre" p="2">*/}
              {/*  {JSON.stringify(*/}
              {/*    {*/}
              {/*      input,*/}
              {/*      // dailySummaryAppResult: dailySummaryAppResult,*/}
              {/*      // dailySummaryEcosystem: dailySummaryEcosystem?.length,*/}
              {/*      data,*/}
              {/*      apps,*/}
              {/*    },*/}
              {/*    null,*/}
              {/*    2,*/}
              {/*  )}*/}
              {/*</Box>*/}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}
