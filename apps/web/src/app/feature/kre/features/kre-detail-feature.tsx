import { Alert, Box, Select, Stack, Text, Title } from '@mantine/core'
import { ChartData } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UiLoader } from '../../../ui/loader/ui-loader'
import { useKreStats } from '../data-access/kre-stats.provider'
import { KreLineChart } from '../ui/kre-line-chart'
import { KreStatButtons } from './kre-list-feature'

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
    return <UiLoader />
  }
  if (!stat || !statId) {
    return <Alert color="red">KRE stat with id {statId} could not be found :(</Alert>
  }

  const { name, description, ranges } = stat

  return (
    <Box p={4}>
      <Stack spacing={12}>
        <Title size="x-large">{name}</Title>
        <Text>{description}</Text>
        <KreStatButtons stats={stats} />
        <Select
          placeholder="Select option"
          value={range}
          onChange={(res: string) => {
            setRange(res)
          }}
          data={ranges.map((range) => ({ label: range.replace('days', ' days'), value: range }))}
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
      <Box component="pre" p="6">
        {JSON.stringify(data, null, 2)}
      </Box>
    </Stack>
  )
}
function ShowStats({ data, type }: { data: any; type: string }) {
  switch (type) {
    case 'count-date':
      return data ? <CountDate data={data} /> : <UiLoader />
    default:
      return (
        <Stack>
          <Alert color="yellow">Unhandled type [{type}]</Alert>
          <Box component="pre" p="6">
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
