import { Box, Button, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useKreStats } from '../kre/data-access/kre-stats.provider'

export function DevFeatureKreStatList() {
  const { stats } = useKreStats()
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" rounded="md" p={4}>
      <Stack spacing={6}>
        <Heading as="h1" size="lg" fontWeight="bold">
          KRE
        </Heading>
        <Stack direction="row" spacing={2}>
          {stats?.map(({ id, name }) => (
            <Link key={id} className="btn btn-primary" to={id}>
              <Button>{name}</Button>
            </Link>
          ))}
        </Stack>
        <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
          {JSON.stringify({ stats }, null, 2)}
        </Box>
      </Stack>
    </Box>
  )
}
