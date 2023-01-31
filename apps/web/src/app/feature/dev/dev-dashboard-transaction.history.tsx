import { Paper, Stack } from '@mantine/core'
import { EChartsOption } from 'echarts'
import ReactECharts from 'echarts-for-react'

export function DevDashboardTransactionHistory() {
  const labels = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ]
  const options: EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    // backgroundColor: 1 === 1 ? '#fff' : '#F6F6F6',
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
    ],
    xAxis: {
      type: 'category',
      data: [...labels],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [
          420, 32, 901, 934, 1290, 1330, 1320, 420, 32, 901, 934, 1290, 1330, 1320, 420, 32, 901, 934, 1290, 1330, 1320,
          420, 32, 901, 934, 1290, 1330, 1320,
        ],
        type: 'line',
        smooth: true,
      },
      {
        data: [
          32, 901, 934, 1290, 1330, 1320, 420, 32, 901, 934, 1290, 1330, 1320, 420, 32, 901, 934, 1290, 1330, 1320, 420,
          32, 901, 934, 1290, 1330, 1320, 420,
        ],
        type: 'line',
        smooth: true,
      },
      {
        data: [
          901, 934, 1290, 1330, 1320, 420, 32, 901, 934, 1290, 1330, 1320, 420, 32, 901, 934, 1290, 1330, 1320, 420, 32,
          901, 934, 1290, 1330, 1320, 420, 32,
        ],
        type: 'line',
        smooth: true,
      },
      {
        data: [
          934, 1290, 1330, 1320, 420, 32, 901, 934, 1290, 1330, 1320, 420, 32, 901, 934, 1290, 1330, 1320, 420, 32, 901,
          934, 1290, 1330, 1320, 420, 32, 901,
        ],
        type: 'line',
        smooth: true,
      },
      {
        data: [
          1290, 1330, 1320, 420, 32, 901, 934, 1290, 1330, 1320, 420, 32, 901, 934, 1290, 1330, 1320, 420, 32, 901, 934,
          1290, 1330, 1320, 420, 32, 901, 934,
        ],
        type: 'line',
        smooth: true,
      },
      {
        data: [
          1330, 1320, 420, 32, 901, 934, 1290, 1330, 1320, 420, 32, 901, 934, 1290, 1330, 1320, 420, 32, 901, 934, 1290,
          1330, 1320, 420, 32, 901, 934, 1290,
        ],
        type: 'line',
        smooth: true,
      },
      {
        data: [
          1320, 420, 32, 901, 934, 1290, 1330, 1320, 420, 32, 901, 934, 1290, 1330, 1320, 420, 32, 901, 934, 1290, 1330,
          1320, 420, 32, 901, 934, 1290, 1330,
        ],
        type: 'line',
        smooth: true,
      },
    ],
  }

  return (
    <Stack>
      <Paper withBorder p="md" radius="md">
        <ReactECharts option={options} />;
      </Paper>
    </Stack>
  )
}
