import { Alert, Box, Heading, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { KRE_GRAPHS, KreAubData, KreAubItem } from '../data-access/kre-graphs'
import { AubChart } from '../ui/aub-chart'
import { KreDataSet, KreGraph } from '../ui/kre-graph'
import { stringToColor } from './string-to-color'

const renderChart = ({ data, graph }: { data: KreDataSet; graph: KreGraph }) => {
  switch (graph?.id) {
    case 'aub':
      return <AubChart data={data} />
    default:
      return <Alert status="warning">Kre graph with id [{graph.id}] not available</Alert>
  }
}

export function KreDetailFeature() {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<KreAubItem[]>([])
  const { graphId } = useParams<{ graphId: string }>()

  const graph = KRE_GRAPHS.find((item) => item.id === graphId)

  useEffect(() => {
    if (!graph || graph.data?.length || loading || data.length) return
    setLoading(true)
    fetch('https://data.kin.org/api/unstable/daily-active-user-balance')
      .then((res) => res.json())
      .then((res: KreAubItem[]) => {
        setData(
          res.map((item) => ({
            ...item,
            name: item.name ? item.name : `*App: ${item.appIndex}`,
          })),
        )
        setLoading(false)
      })
  }, [graph, loading])

  if (!graph || !graphId) {
    return <Alert status="error">Kre graph with id {graphId} could not be found :(</Alert>
  }

  const { name, description } = graph

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" rounded="md" p={4}>
      <Stack spacing={6}>
        <Heading as="h1" size="lg" fontWeight="bold">
          {name}
        </Heading>
        <Text>{description}</Text>
        <Stack direction="row" spacing={2}>
          <Box display="flex" justifyContent="center" px={4} alignItems="center" width="full">
            {renderChart({ data, graph })}
          </Box>
        </Stack>

        <AubSummary data={data} />
        <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
          {JSON.stringify(data, null, 2)}
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
