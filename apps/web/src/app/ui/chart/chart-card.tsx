import { Box, Card, Flex, Image, Stack, Text, useMantineTheme } from '@mantine/core'
import React, { ReactNode } from 'react'

export interface ChartCardProps {
  children: ReactNode
  description?: ReactNode
  headerActions?: ReactNode
  title: ReactNode
}

export function ChartCard({ children, description, headerActions, title }: ChartCardProps) {
  const theme = useMantineTheme()
  const isDark = theme.colorScheme === 'dark'
  const radius = theme.radius.lg

  const backgroundImage = '/assets/gradient-1.png'
  const headerColor = theme.colors.brand[1]
  const headerHeight = 96
  const headerWrapper = headerHeight + radius

  return (
    <Card pos="relative" radius={radius} bg={theme.colors.dark[7]} p={0}>
      <Image
        pos="absolute"
        left={0}
        right={0}
        src={backgroundImage}
        sx={{ filter: isDark ? 'brightness(0.8)' : 'brightness(1.4)' }}
      />
      <Flex pos="absolute" left={0} right={0} sx={{}} h={headerWrapper}>
        <Flex align="center" px={16} h={headerHeight} w={'100%'} justify="space-between">
          <Stack spacing={0}>
            {typeof title === 'string' ? (
              <Text size="lg" fw={500} color={headerColor}>
                {title}
              </Text>
            ) : (
              title
            )}
            {typeof description === 'string' ? <Text color="dimmed">{description}</Text> : description}
          </Stack>
          <Box>{headerActions}</Box>
        </Flex>
      </Flex>
      <Card radius={radius} mt={headerHeight} py={theme.spacing.lg}>
        {children}
      </Card>
    </Card>
  )
}
