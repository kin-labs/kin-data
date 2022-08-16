import { Box, Button, CircularProgress, Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { KreStat, useKreStats } from '../data-access/kre-stats.provider'

export function KreListFeature() {
  const { stats, loading } = useKreStats()
  if (loading) {
    return <CircularProgress isIndeterminate />
  }
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" rounded="md" p={4}>
      <Stack spacing={{ base: 2, md: 4, xl: 6 }}>
        <Heading as="h1" size="lg" fontWeight="bold">
          KRE
        </Heading>

        <KreStatButtons stats={stats} />
      </Stack>
    </Box>
  )
}

export function KreStatButtons({ stats }: { stats: KreStat[] }) {
  return (
    <SimpleGrid gap={{ base: 2, md: 4, xl: 6 }} columns={{ base: 1, md: 2, xl: 4 }}>
      {stats?.map(({ name: label, id: path }) => (
        <Link key={path} to={`/kre/${path}`}>
          <Button size="lg" width="full">
            {label}
          </Button>
        </Link>
      ))}
    </SimpleGrid>
  )
}
