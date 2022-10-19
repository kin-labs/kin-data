import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export function HomeIndex() {
  const pages = [
    { label: 'Home', path: '/home' },
    { label: 'About', path: '/about' },
  ]
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" rounded="md" p={4}>
      <Stack spacing={{ base: 2, md: 4, xl: 6 }}>
        <Heading as="h1" size="lg" fontWeight="bold">
          Hello there! 👋
        </Heading>
        <Text>For now, this is just a placeholder!</Text>
        <Stack direction="row" spacing={2}>
          {pages?.map(({ label, path }) => (
            <Link key={path} className="btn btn-primary" to={path}>
              <Button>{label}</Button>
            </Link>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}
