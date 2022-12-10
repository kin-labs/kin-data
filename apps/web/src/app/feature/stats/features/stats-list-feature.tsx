import { Card, createStyles, SimpleGrid, Stack, Text } from '@mantine/core'
import React from 'react'
import { useStatsTypes } from '../data-access/stats-types.provider'

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan('sm')]: {
      fontSize: 24,
    },
  },

  description: {
    maxWidth: 600,
    margin: 'auto',

    '&::after': {
      content: '""',
      display: 'block',
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  card: {
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]}`,
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },
}))

export function StatsListFeature() {
  const { classes, theme } = useStyles()
  const { stats } = useStatsTypes()
  return (
    <Stack spacing={12}>
      <SimpleGrid cols={2} spacing="lg" breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
        {stats?.map((stat) => (
          <Card radius="md" key={stat.id} className={classes.card}>
            <Text size="lg" weight={500} className={classes.cardTitle}>
              {stat.name}
            </Text>
            <Text size="sm" color="dimmed">
              {stat.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  )
}
