import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { KreDetailFeature } from './kre-detail-feature'
import { KreListFeature } from './kre-list-feature'

export function KreIndexFeature() {
  return (
    <Routes>
      <Route index element={<KreListFeature />} />
      <Route path=":graphId" element={<KreDetailFeature />} />
    </Routes>
  )
}
