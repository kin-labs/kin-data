import { useMantineTheme } from '@mantine/core'
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Colors,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, Colors, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export function ChartLine({ data }: { data: ChartData<'line'> }) {
  const theme = useMantineTheme()
  const color = theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[4]

  const options: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      decimation: {
        enabled: true,
        algorithm: 'lttb',
      },
    },
    datasets: {
      line: {
        indexAxis: 'x',
      },
    },
    scales: {
      x: { grid: { color } },
      y: { grid: { color } },
    },
  }

  return <Line height={600} options={options} data={data} />
}
