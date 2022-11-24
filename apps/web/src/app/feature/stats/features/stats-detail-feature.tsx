import { Alert, Box, Stack } from '@mantine/core'
import { ChartData } from 'chart.js'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { UiLoader } from '../../../ui/loader/ui-loader'
import { useStats } from '../data-access/stats.provider'
import { LineChart } from '../ui/line-chart'

export function StatsDetailFeature() {
  const [data, setData] = useState<any | undefined>()
  const [range, setRange] = useState<string>('90days')
  const { statId } = useParams<{ statId: string }>()
  const { dailySummaryAppResult, dailySummaryEcosystem, loading } = useStats()

  if (loading) {
    return <UiLoader />
  }

  if (!dailySummaryAppResult || !dailySummaryEcosystem) {
    return <Alert color="red">KRE stat with id {statId} could not be found :(</Alert>
  }

  return (
    <Box p={4}>
      <Stack spacing={12}>
        <Box component="pre" p="2">
          {JSON.stringify({ dailySummaryAppResult, dailySummaryEcosystem }, null, 2)}
        </Box>
        {/*<Title size="x-large">{name}</Title>*/}
        {/*<Text>{description}</Text>*/}
        {/*<KreStatButtons stats={stats} />*/}
        {/*<Select*/}
        {/*  placeholder="Select option"*/}
        {/*  value={range}*/}
        {/*  onChange={(res: string) => {*/}
        {/*    setRange(res)*/}
        {/*  }}*/}
        {/*  data={ranges.map((range) => ({ label: range.replace('days', ' days'), value: range }))}*/}
        {/*/>*/}

        {/*<ShowStats data={data} type={stat.type} />*/}
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
      <LineChart data={chart} />
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
