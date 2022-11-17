import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppsDetail } from './apps-detail'
import { AppsList } from './apps-list'

export function AppsIndex() {
  return (
    <Routes>
      <Route index element={<AppsList />} />
      <Route path=":date" element={<AppsDetail />} />
    </Routes>
  )
}
