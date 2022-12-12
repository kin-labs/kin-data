import { Button, Card, Flex, MantineThemeColors, Stack, useMantineTheme } from '@mantine/core'
import { ChartData } from 'chart.js'
import { DataTableColumn } from 'mantine-datatable'
import React, { useEffect, useState } from 'react'

import { UiLoader } from '../loader/ui-loader'
import { ChartLine } from './chart-line'
import { ChartTable } from './chart-table'

export interface ChartDetailType {
  name: string
  index: number
  percentage: string
  total: number
}


function reduceAppData(data: number[]) {
  return data.reduce((acc, curr) => acc + curr, 0)
}

function getColor(colors: MantineThemeColors, int: number): { borderColor: string; backgroundColor: string } {
  const set = ['red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'green', 'lime', 'yellow', 'orange', 'teal']

  // take the int and mod it by the number of colors
  const color = set[int % set.length]
  return {
    borderColor: colors[color][6],
    backgroundColor: colors[color][4],
  }
}


export function ChartDetail({ data }: { data: ChartData<'line'> }) {
  const theme = useMantineTheme()
  const radius = theme.radius.md
  const cardHeight = 480
  const [appsCount, setAppsCount] = useState(10)
  const [chartData, setChartData] = useState<ChartData<'line'> | undefined>(undefined)

  const apps = data.datasets ?? []

  const totalKin = data.datasets.reduce((acc, curr) => acc + reduceAppData(curr.data as number[]), 0)

  const tableData: ChartDetailType[] = [
    ...apps.slice(0, appsCount).map((app, index) => {
      const total = reduceAppData(app.data as number[])
      return {
        name: `${app.label}`,
        index,
        percentage: `${((total / totalKin) * 100).toFixed(2)}%`,
        total,
      }
    }),
  ]

  const tableFields: DataTableColumn<ChartDetailType>[] = [
    {
      accessor: 'index',
      title: '#',
      textAlignment: 'center',
      width: 40,
    },
    {
      accessor: 'name',
      title: 'Name',
    },
    {
      accessor: 'total',
      title: 'Total',
      textAlignment: 'right',
    },
    {
      accessor: 'percentage',
      title: 'Total %',
      textAlignment: 'right',
      width: 80,
    },
  ]

  useEffect(() => {
    setChartData({
      ...data,
      datasets: data.datasets?.slice(0, appsCount).map((item, index) => ({
        ...item,
        ...getColor(theme.colors, index),
      })),
    })
  }, [appsCount])

  const showLargest = appsCount === 10

  function toggleApps() {
    setAppsCount(showLargest ? data?.datasets?.length : 10)
  }

  return (
    <Stack spacing={theme.spacing.xl}>
      <Card radius={radius} withBorder h={cardHeight}>
        {chartData ? <ChartLine data={chartData} /> : <UiLoader />}
      </Card>
      <ChartTable<ChartDetailType> data={tableData} fields={tableFields} />
      <Flex justify="center">
        <Button onClick={toggleApps}>{showLargest ? 'Show all apps' : 'Show top 10'}</Button>
      </Flex>
    </Stack>
  )
}
