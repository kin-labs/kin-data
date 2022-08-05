import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'

export function AboutIndex() {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" rounded="md" p={4}>
      <Stack spacing={6}>
        <Heading as="h1" size="lg" fontWeight="bold">
          About
        </Heading>
        <Text>For now, this is just a placeholder!</Text>
      </Stack>
    </Box>
  )
}
