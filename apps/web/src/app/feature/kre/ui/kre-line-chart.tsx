import { useMantineTheme } from '@mantine/core'
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export function KreLineChart({ data }: { data: ChartData<'line'> }) {
  const theme = useMantineTheme()
  const color = theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[4]

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
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

  return <Line options={options} data={data} />
}
