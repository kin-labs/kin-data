import { useMantineTheme } from '@mantine/core'
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartEvent,
  Legend,
  LegendElement,
  LegendItem,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'

import { getAutoColors } from './get-auto-colors.plugin'

const autocolors = getAutoColors()

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, autocolors)

const handler = ChartJS.defaults.plugins.legend.onClick as (
  e: ChartEvent,
  legendItem: LegendItem,
  legend: LegendElement<any>,
) => void

export function LineChart({ data }: { data: ChartData<'line'> }) {
  const theme = useMantineTheme()
  const color = theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[4]

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      autocolors,
      legend: {
        position: 'bottom' as const,
        onClick: (e: ChartEvent, legendItem: LegendItem, legend: LegendElement<any>) => {
          console.log({
            e,
            legendItem,
            legend,
          })
          handler(e, legendItem, legend)
        },
      },
    },
    scales: {
      x: { grid: { color } },
      y: { grid: { color } },
    },
    xAxes: [
      {
        scaleLabel: { display: true },
      },
    ],
  }

  return (
    <Line
      height={600}
      options={options}
      data={data}
      onSelect={(e) => {
        console.log('click', e)
      }}
    />
  )
}
