import { createStyles, Group, Paper, SimpleGrid, Text } from '@mantine/core'
import { TablerIcon } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}))

interface StatsGridProps {
  data: { title: string; subtitle: string; icon: TablerIcon; value: string }[]
}

export function DevDashboardStatsRow({ data }: StatsGridProps) {
  const { classes } = useStyles()
  const stats = data.map(({ icon: Icon, value, subtitle, title }) => {
    return (
      <Paper withBorder p="md" radius="md" key={title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {title}
          </Text>
          <Icon className={classes.icon} size={22} stroke={1.5} />
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{value}</Text>
        </Group>
        <Text size="xs" color="dimmed" mt={7}>
          {subtitle}
        </Text>
      </Paper>
    )
  })
  return (
    <SimpleGrid
      cols={4}
      breakpoints={[
        { maxWidth: 'lg', cols: 2 },
        { maxWidth: 'xs', cols: 1 },
      ]}
    >
      {stats}
    </SimpleGrid>
  )
}
