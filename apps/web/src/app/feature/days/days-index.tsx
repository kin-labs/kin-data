import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { DaysDetail } from './days-detail'
import { DaysList } from './days-list'

export function DaysIndex() {
  return (
    <Routes>
      <Route index element={<DaysList />} />
      <Route path=":date" element={<DaysDetail />} />
    </Routes>
  )
}
