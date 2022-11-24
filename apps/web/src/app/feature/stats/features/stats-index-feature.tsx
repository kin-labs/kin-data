import { Container } from '@mantine/core'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { StatsProvider } from '../data-access/stats.provider'
import { StatsDetailFeature } from './stats-detail-feature'
import { StatsListFeature } from './stats-list-feature'

export function StatsIndexFeature() {
  return (
    <StatsProvider>
      <Container size="xl">
        <Routes>
          <Route index element={<StatsListFeature />} />
          <Route path=":statId" element={<StatsDetailFeature />} />
        </Routes>
      </Container>
    </StatsProvider>
  )
}
