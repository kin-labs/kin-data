import { useMantineTheme } from '@mantine/core'
import { ArcElement, Chart as ChartJS, ChartData, Legend, Tooltip } from 'chart.js'
import React from 'react'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export function PieChart({ data }: { data: ChartData<'pie'> }) {
  const theme = useMantineTheme()
  const color = theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[4]

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
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

  return <Pie options={options} data={data} height={460} />
}
