import { Box, Button, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { KRE_GRAPHS } from '../data-access/kre-graphs'

export function KreListFeature() {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" rounded="md" p={4}>
      <Stack spacing={6}>
        <Heading as="h1" size="lg" fontWeight="bold">
          KRE
        </Heading>
        <Stack direction="row" spacing={2}>
          {KRE_GRAPHS?.map(({ name: label, id: path }) => (
            <Link key={path} className="btn btn-primary" to={path}>
              <Button>{label}</Button>
            </Link>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}
