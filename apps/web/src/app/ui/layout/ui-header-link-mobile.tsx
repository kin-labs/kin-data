import { Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { UiLayoutHeaderLink } from './ui-header-link'
import { UiLink } from './ui-link'

export function UiHeaderLinkMobile({ label, path }: UiLink) {
  return (
    <Flex
      py={2}
      as={UiLayoutHeaderLink}
      to={path}
      justify={'space-between'}
      align={'center'}
      _activeLink={{
        color: useColorModeValue('primary.600', 'primary.100'),
        bg: useColorModeValue('primary.100', 'primary.800'),
      }}
      _hover={{
        textDecoration: 'none',
      }}
    >
      <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
        {label}
      </Text>
    </Flex>
  )
}
