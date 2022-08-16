import { Button, Stack } from '@chakra-ui/react'
import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { DevFeatureKreStatDetail } from './dev-feature-kre-stat-detail'
import { DevFeatureKreStatList } from './dev-feature-kre-stat-list'
import { DevFeatureTest1 } from './dev-feature-test1'
import { KreStatsProvider } from '../kre/data-access/kre-stats.provider'

export function DevIndex() {
  const pages = [
    { label: 'Test 1', path: 'test1' },
    { label: 'KRE', path: 'kre' },
  ]
  return (
    <Stack spacing={{ base: 2, md: 4, xl: 6 }}>
      <Stack direction="row" spacing={2}>
        {pages?.map(({ label, path }) => (
          <Link key={path} className="btn btn-primary" to={path}>
            <Button>{label}</Button>
          </Link>
        ))}
      </Stack>
      <KreStatsProvider>
        <Routes>
          <Route index element={<Navigate to={'test1'} replace />} />
          <Route path="test1" element={<DevFeatureTest1 />} />
          <Route path="kre" element={<DevFeatureKreStatList />} />
          <Route path="kre/:kreStatId" element={<DevFeatureKreStatDetail />} />
        </Routes>
      </KreStatsProvider>
    </Stack>
  )
}
