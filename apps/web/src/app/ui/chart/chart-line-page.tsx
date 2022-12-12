import { ChartData } from 'chart.js'
import React from 'react'
import { StatRange } from '../../../sdk'
import { ChartCard } from './chart-card'
import { ChartDetail } from './chart-detail'
import { ChartRangeSelect } from './chart-range-select'

export interface CharLinePageProps {
  data: ChartData<'line'>
  title: string
  description: string
  selectedRange: StatRange
  setSelectedRange: (range: StatRange) => void
}

export function ChartLinePage({ data, description, selectedRange, setSelectedRange, title }: CharLinePageProps) {
  return (
    <ChartCard
      title={title}
      description={description}
      headerActions={<ChartRangeSelect select={setSelectedRange} selected={selectedRange} />}
    >
      <ChartDetail data={data} />
    </ChartCard>
  )
}
