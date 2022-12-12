import { Select } from '@mantine/core'
import React from 'react'
import { StatRange } from '../../../sdk'

export function ChartRangeSelect({ select, selected }: { select: (range: StatRange) => void; selected: StatRange }) {
  const ranges = Object.keys(StatRange)
  return (
    <Select
      defaultValue={selected}
      data={[...ranges.map((range) => ({ value: range, label: range.replace('days', ' days') }))]}
      onChange={(e) => select(e as StatRange)}
    />
  )
}
