import { Alert, Box, CircularProgress, Heading, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { KreAubData, KreAubItem } from '../data-access/kre-graphs'
import { useKreStats } from '../data-access/kre-stats.provider'
import { AubChart } from '../ui/aub-chart'
import { KreDataSet, KreGraph } from '../ui/kre-graph'
import { KreStatButtons } from './kre-list-feature'
import { stringToColor } from './string-to-color'

const renderChart = ({ data, stat }: { data: KreDataSet; stat: KreGraph }) => {
  switch (stat?.id) {
    case 'aub':
      return <AubChart data={data} />
    default:
      return <Alert status="warning">Kre stat with id [{stat.id}] not available</Alert>
  }
}

export function KreDetailFeature() {
  const [data, setData] = useState<any[]>([])
  const { statId } = useParams<{ statId: string }>()
  const { stats, loading } = useKreStats()
  const stat = stats?.find((item) => item.id === statId)

  useEffect(() => {
    if (!stat || loading) return
    setData([])
    fetch(`/api/unstable/${stat.id}`)
      .then((res) => res.json())
      .then((res: any[]) => {
        setData(res)
      })
  }, [stat, loading])

  if (loading) {
    return <CircularProgress isIndeterminate />
  }
  if (!stat || !statId) {
    return <Alert status="error">KRE stat with id {statId} could not be found :(</Alert>
  }

  const { name, description } = stat

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" rounded="md" p={4}>
      <Stack spacing={6}>
        <Heading as="h1" size="lg" fontWeight="bold">
          {name}
        </Heading>
        <Text>{description}</Text>
        <KreStatButtons stats={stats} />
        <Stack direction="row" spacing={2}>
          {/*<Box display="flex" justifyContent="center" px={4} alignItems="center" width="full">*/}
          {/*  {renderChart({ data, stat })}*/}
          {/*</Box>*/}
        </Stack>

        {/*<AubSummary data={data} />*/}
        <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
          {JSON.stringify({ stat, data }, null, 2)}
        </Box>
      </Stack>
    </Box>
  )
}

function formatAubChartItems(items: KreAubItem[] = []) {
  return items?.map(formatAubChartItem).filter((item) => item.x || item.y || item.app)
}

function formatAubChartItem(item: KreAubItem) {
  return {
    app: item?.name,
    y: item?.aub,
    x: new Date(item?.date).toISOString()?.split('T')[0],
  }
}

function createSummary(data: KreAubData) {
  const appsByName = data.reduce((acc: { [key: string]: KreAubItem[] }, curr) => {
    const existing = acc[curr.name] ? acc[curr.name] : []

    return { ...acc, [curr.name]: [...existing, curr] }
  }, {})
  const appNames = Object.keys(appsByName).sort()

  const appCount = appNames.length
  const appDetails = appNames.reduce((acc: any, curr) => {
    console.log(JSON.stringify(appsByName[curr], null, 2))
    let aubLow = 0
    let aubHigh = 0

    appsByName[curr].forEach((item) => {
      if (!aubLow || aubLow > item.aub) {
        aubLow = item.aub
      }
      if (!aubHigh || aubHigh < item.aub) {
        aubHigh = item.aub
      }
    })

    const chart: { x: string; y: number; app: string }[] = formatAubChartItems(appsByName[curr])

    return {
      ...acc,
      [curr]: {
        aubLow,
        aubHigh,
        color: stringToColor(curr),
        count: appsByName[curr]?.length,
        chart,
        name: curr,
      },
    }
  }, {})

  return {
    appCount,
    appNames,
    appDetails,
  }
}

export function AubSummary({ data }: { data: KreAubData }) {
  const summary = useMemo(() => createSummary(data), [data])
  const chart = useMemo(() => formatAubChartItems(data), [data])
  const details: any[] = Object.values(summary.appDetails) || []
  return (
    <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
      <Box>
        {Object.values(details).map((item) => (
          <Text color={item.color}>{item?.name}</Text>
        ))}
      </Box>
      {JSON.stringify(summary, null, 2)}
      {JSON.stringify(chart, null, 2)}
    </Box>
  )
}
