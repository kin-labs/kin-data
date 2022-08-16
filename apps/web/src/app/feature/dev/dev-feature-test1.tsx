import { Box, Button, Stack, useBreakpointValue } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import aubData from '../../aub.json'
import { KreAubData } from '../kre/data-access/kre-graphs'
import { stringToColor } from '../kre/features/string-to-color'

function formatNames(data: KreAubData): KreAubData {
  return data.map((item) => ({
    ...item,
    name: item.name ? item.name : `App ${item.appIndex} *`,
  }))
}

function groupByDate(data: KreAubData): KreAppMap {
  return data.reduce((acc: KreAppMap, curr) => {
    // Get the key
    const key = curr.date?.split('T')[0]
    // Get existing data
    const data = acc[key] ? acc[key] : []
    // Merge into object
    return { ...acc, [key]: [...data, curr] }
  }, {})
}

interface KreAppMap {
  [key: string]: KreAubData
}

interface KreAppInfo {
  name: string
  appIndex: number
  color: string
}
function uniqueApps(data: KreAubData): KreAppInfo[] {
  return data.reduce((acc: KreAppInfo[], curr) => {
    if (acc.find((app) => app.appIndex === curr.appIndex)) return acc
    return [
      ...acc,
      {
        name: curr.name,
        appIndex: curr.appIndex,
        color: stringToColor(curr.name),
      },
    ]
  }, [])
}
function sortAppInfo(array: KreAppInfo[], key: keyof Omit<KreAppInfo, 'appIndex'>) {
  return array.sort((a, b) => {
    const app1 = a[key].toLowerCase()
    const app2 = b[key].toLowerCase()
    return app1 < app2 ? -1 : app1 > app2 ? 1 : 0
  })
}
function format(data: KreAubData) {
  const formatted = formatNames(data)
  const groupedByDate = groupByDate(formatted)
  const apps = sortAppInfo(uniqueApps(formatted), 'name')
  const appData = formatAppData(groupedByDate)
  const appNames = apps.map((app) => app.name)
  return {
    apps,
    appData,
    appNames,
    groupedByDate,
  }
}

function formatAppData(data: KreAppMap): { date: string; [key: number]: number }[] {
  return Object.keys(data).map((date) => {
    const apps = data[date].reduce((acc, curr) => {
      return { ...acc, [curr.appIndex]: curr.aub }
    }, {})
    return { date, ...apps }
  })
}
export function DevFeatureTest1() {
  const padding = useBreakpointValue({ base: 10, md: 30 })
  const { apps, appData, appNames, groupedByDate } = useMemo(() => format(aubData as KreAubData), [aubData])
  const [selected, setSelected] = useState<string[]>(appNames)

  const toggleSelected = (app: string) => {
    if (selected.includes(app)) {
      setSelected(selected.filter((i) => i !== app))
    } else {
      setSelected([...selected, app])
    }
  }
  const selectAll = () => {
    setSelected(apps.map((app) => app.name))
  }
  const deSelectAll = () => {
    setSelected([])
  }

  const filtered = apps.filter((app) => selected.includes(app.name))
  return (
    <Stack spacing={6}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" rounded="md" p={2}>
        <Box p={4}>
          <Button size={'xs'} onClick={() => selectAll()} mr={2} mb={2}>
            Select All
          </Button>
          <Button size={'xs'} onClick={() => deSelectAll()} mr={2} mb={2}>
            De-select All
          </Button>
          {apps.map((item) => (
            <Button
              size={'xs'}
              bg={filtered.includes(item) ? item.color : undefined}
              key={item.appIndex}
              onClick={() => toggleSelected(item.name)}
              mr={2}
              mb={2}
            >
              {item.name}
            </Button>
          ))}
        </Box>
        <ResponsiveContainer width="100%" height="100%" aspect={3}>
          <LineChart width={500} height={500} data={appData} margin={{ right: padding, left: padding }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            {filtered.map((app) => (
              <Line key={app.appIndex} type="linear" name={app.name} dataKey={app.appIndex} stroke={app.color} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Stack>
  )
}
