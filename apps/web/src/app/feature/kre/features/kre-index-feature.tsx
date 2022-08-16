import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { KreStatsProvider } from '../data-access/kre-stats.provider'
import { KreDetailFeature } from './kre-detail-feature'
import { KreListFeature } from './kre-list-feature'

export function KreIndexFeature() {
  return (
    <KreStatsProvider>
      <Routes>
        <Route index element={<KreListFeature />} />
        <Route path=":statId" element={<KreDetailFeature />} />
      </Routes>
    </KreStatsProvider>
  )
}
