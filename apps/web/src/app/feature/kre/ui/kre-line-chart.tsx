import { useBreakpointValue, useColorModeValue, useToken } from '@chakra-ui/react'
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
  const [primaryLight, primaryDark] = useToken('colors', ['primary.300', 'primary.500'])
  console.log({
    primaryLight,
    primaryDark,
  })
  const [lineLight, lineDark] = useToken('colors', ['gray.300', 'gray.700'])
  const gridColor = useColorModeValue(lineLight, lineDark)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      x: { grid: { color: gridColor } },
      y: { grid: { color: gridColor } },
    },
    xAxes: [
      {
        scaleLabel: {
          display: true,
        },
        // ticks: {
        //
        //   userCallback: function (value) {
        //     if (typeof value !== 'string') return value;
        //     const date = value.split('-');
        //     if (date.length == 2) { //not full date just week of year
        //       return getDateOfISOWeek(date[0], date[1]);
        //     }
        //     return value
        //   }
        // }
      },
    ],
  }

  return <Line options={options} data={data} />
}
