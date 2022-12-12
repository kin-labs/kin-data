import { ScrollArea } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { DataTable } from 'mantine-datatable'
import React from 'react'

export interface ChartTableProps<T> {
  data: T[]
  fields: DataTableColumn<T>[]
}

export function ChartTable<T>({ data, fields }: ChartTableProps<T>) {
  return (
    <ScrollArea>
      <DataTable borderRadius="md" withBorder shadow="xs" idAccessor="programId" records={data} columns={fields} />
    </ScrollArea>
  )
}
