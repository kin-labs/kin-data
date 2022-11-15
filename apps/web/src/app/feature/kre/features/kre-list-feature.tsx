import { Box, Button, Grid, Stack, Title } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { UiLoader } from '../../../ui/loader/ui-loader'
import { KreStat, useKreStats } from '../data-access/kre-stats.provider'

export function KreListFeature() {
  const { stats, loading } = useKreStats()
  if (loading) {
    return <UiLoader />
  }
  return (
    <Box p={4}>
      <Stack spacing={12}>
        <Title size="x-large">KRE</Title>
        <KreStatButtons stats={stats} />
      </Stack>
    </Box>
  )
}

export function KreStatButtons({ stats }: { stats: KreStat[] }) {
  return (
    <Grid gutter={2}>
      {stats?.map(({ name: label, id: path, type }) => (
        <Grid.Col key={path} md={6} lg={2} p={6}>
          <Link to={`/kre/${path}`}>
            <Button size={'sm'} fullWidth color="gray" variant={type === 'count-date' ? 'filled' : 'outline'}>
              {label}
            </Button>
          </Link>
        </Grid.Col>
      ))}
    </Grid>
  )
}
