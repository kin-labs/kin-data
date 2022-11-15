import { Button, Group, Stack, Text } from '@mantine/core'
import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { KreStatsProvider } from '../kre/data-access/kre-stats.provider'

export function DevIndex() {
  const pages = [
    { label: 'Dev 1', path: 'dev1' },
    { label: 'Dev 2', path: 'dev2' },
  ]
  return (
    <Stack spacing={2}>
      <Group spacing={2}>
        {pages?.map(({ label, path }) => (
          <Link key={path} className="btn btn-primary" to={path}>
            <Button>{label}</Button>
          </Link>
        ))}
      </Group>
      <KreStatsProvider>
        <Routes>
          <Route index element={<Navigate to="dev1" replace />} />
          <Route path="dev1" element={<Dev1 />} />
          <Route path="dev2" element={<Dev2 />} />
        </Routes>
      </KreStatsProvider>
    </Stack>
  )
}

function Dev1() {
  return <Text>Dev1</Text>
}

function Dev2() {
  return <Text>Dev2</Text>
}
