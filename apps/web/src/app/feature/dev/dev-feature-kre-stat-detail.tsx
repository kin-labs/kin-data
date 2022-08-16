import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { Chart } from './chart'
import { useKreStats } from '../kre/data-access/kre-stats.provider'

export function DevFeatureKreStatDetail() {
  const { stats } = useKreStats()
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" rounded="md" p={4}>
      <Stack spacing={6}>
        <Heading as="h1" size="lg" fontWeight="bold">
          Test 2
        </Heading>
        <Chart data={data} />
      </Stack>
    </Box>
  )
}
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map((label, i) => i + 10),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Dataset 2',
      data: labels.map((label, i) => i - 10),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Dataset 2',
      data: labels.map((label, i) => i - 10),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Dataset 2',
      data: labels.map((label, i) => i - 10),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Dataset 2',
      data: labels.map((label, i) => i - 10),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Dataset 2',
      data: labels.map((label, i) => i - 10),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Dataset 2',
      data: labels.map((label, i) => i - 10),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Dataset 2',
      data: labels.map((label, i) => i - 10),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Dataset 2',
      data: labels.map((label, i) => i - 10),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Dataset 2',
      data: labels.map((label, i) => i - 10),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Dataset 2',
      data: labels.map((label, i) => i - 10),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Dataset 2',
      data: labels.map((label, i) => i - 10),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Dataset 2',
      data: labels.map((label, i) => i - 10),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Dataset 2',
      data: labels.map((label, i) => i - 10),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Dataset 2',
      data: labels.map((label, i) => i - 10),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
}
