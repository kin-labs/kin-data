import { Alert, Box, CircularProgress, Heading, Stack, Text } from '@chakra-ui/react'
import { Select } from '@saas-ui/react'
import { ChartData } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useKreStats } from '../data-access/kre-stats.provider'
import { AubChart } from '../ui/aub-chart'
import { KreDataSet, KreGraph } from '../ui/kre-graph'
import { KreLineChart } from '../ui/kre-line-chart'
import { KreStatButtons } from './kre-list-feature'

const renderChart = ({ data, stat }: { data: KreDataSet; stat: KreGraph }) => {
  switch (stat?.id) {
    case 'aub':
      return <AubChart data={data} />
    default:
      return <Alert status="warning">Kre stat with id [{stat.id}] not available</Alert>
  }
}

export function KreDetailFeature() {
  const [data, setData] = useState<any | undefined>()
  const [range, setRange] = useState<string>('90days')
  const { statId } = useParams<{ statId: string }>()
  const { stats, loading } = useKreStats()
  const stat = stats?.find((item) => item.id === statId)

  useEffect(() => {
    if (!stat || loading) return
    console.log('range', range)
    setData(undefined)
    fetch(`/api/unstable/kre-stat/${stat.id}?range=${range}`)
      .then((res) => res.json())
      .then((res: any[]) => {
        setData(res)
      })
  }, [stat, loading, range])

  if (loading) {
    return <CircularProgress isIndeterminate />
  }
  if (!stat || !statId) {
    return <Alert status="error">KRE stat with id {statId} could not be found :(</Alert>
  }

  const { name, description, ranges } = stat

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" rounded="md" p={4}>
      <Stack spacing={{ base: 2, md: 4, xl: 6 }}>
        <Heading as="h1" size="lg" fontWeight="bold">
          {name}
        </Heading>
        <Text>{description}</Text>
        <KreStatButtons stats={stats} />
        <Select
          placeholder="Select option"
          value={range}
          onChange={(res) => {
            if (!Array.isArray(res)) {
              setRange(res)
            }
          }}
          options={ranges.map((range) => ({ label: range.replace('days', ' days'), value: range }))}
        />

        <ShowStats data={data} type={stat.type} />
      </Stack>
    </Box>
  )
}

function CountDate({ data }: { data: any }) {
  // const labels = groupBy(data)
  // console.log(labels)

  const chart: ChartData<'line'> = {
    datasets: data?.datasets,
    labels: data?.labels,
  }
  return (
    <Stack>
      <KreLineChart data={chart} />
      <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
        {JSON.stringify(data, null, 2)}
      </Box>
    </Stack>
  )
}
function ShowStats({ data, type }: { data: any; type: string }) {
  switch (type) {
    case 'count-date':
      return data ? <CountDate data={data} /> : <CircularProgress isIndeterminate />
    default:
      return (
        <Stack>
          <Alert status="warning">Unhandled type [{type}]</Alert>
          <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
            {JSON.stringify({ type, data }, null, 2)}
          </Box>
        </Stack>
      )
  }
}

// function formatAubChartItems(items: KreAubItem[] = []) {
//   return items?.map(formatAubChartItem).filter((item) => item.x || item.y || item.app)
// }

// function formatAubChartItem(item: KreAubItem) {
//   return {
//     app: item?.name,
//     y: item?.aub,
//     x: new Date(item?.date).toISOString()?.split('T')[0],
//   }
// }

// function createSummary(data: KreAubData) {
//   const appsByName = data.reduce((acc: { [key: string]: KreAubItem[] }, curr) => {
//     const existing = acc[curr.name] ? acc[curr.name] : []
//
//     return { ...acc, [curr.name]: [...existing, curr] }
//   }, {})
//   const appNames = Object.keys(appsByName).sort()
//
//   const appCount = appNames.length
//   const appDetails = appNames.reduce((acc: any, curr) => {
//     console.log(JSON.stringify(appsByName[curr], null, 2))
//     let aubLow = 0
//     let aubHigh = 0
//
//     appsByName[curr].forEach((item) => {
//       if (!aubLow || aubLow > item.aub) {
//         aubLow = item.aub
//       }
//       if (!aubHigh || aubHigh < item.aub) {
//         aubHigh = item.aub
//       }
//     })
//
//     const chart: { x: string; y: number; app: string }[] = formatAubChartItems(appsByName[curr])
//
//     return {
//       ...acc,
//       [curr]: {
//         aubLow,
//         aubHigh,
//         color: stringToColor(curr),
//         count: appsByName[curr]?.length,
//         chart,
//         name: curr,
//       },
//     }
//   }, {})
//
//   return {
//     appCount,
//     appNames,
//     appDetails,
//   }
// }

// export function AubSummary({ data }: { data: KreAubData }) {
//   const summary = useMemo(() => createSummary(data), [data])
//   const chart = useMemo(() => formatAubChartItems(data), [data])
//   const details: any[] = Object.values(summary.appDetails) || []
//   return (
//     <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
//       <Box>
//         {Object.values(details).map((item) => (
//           <Text color={item.color}>{item?.name}</Text>
//         ))}
//       </Box>
//       {JSON.stringify(summary, null, 2)}
//       {JSON.stringify(chart, null, 2)}
//     </Box>
//   )
// }
