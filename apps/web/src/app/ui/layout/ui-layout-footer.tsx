import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

export function UiLayoutFooter({ copyright }: { copyright: ReactNode }) {
  return (
    <Box
      color={useColorModeValue('gray.600', 'gray.500')}
      borderTop={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Flex h={12} fontSize="sm" alignItems={'center'} justifyContent={'center'}>
        <Flex alignItems={'center'}>
          <Box>{copyright}</Box>
        </Flex>
      </Flex>
    </Box>
  )
}
