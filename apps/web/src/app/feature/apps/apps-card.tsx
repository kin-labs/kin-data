import { Anchor, Avatar, Badge, Card, createStyles, Flex, Group, Stack, Text } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { EcosystemApp } from './apps-api'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}))

export function AppCard({ app, details }: { app: EcosystemApp; details?: boolean }) {
  const { classes, theme } = useStyles()

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section p="md">
        <Flex align="start">
          <Flex mr="md">
            <Avatar src={app.imageUrl} size={'xl'} />
          </Flex>
          <Stack sx={{ whiteSpace: 'nowrap', flexGrow: 1 }} spacing={4}>
            <Anchor component={Link} to={`/apps/${app.index}`}>
              <Text size={24} weight={500} sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {app.name}
              </Text>
            </Anchor>
            <Group>
              <Badge>{app.index}</Badge>
            </Group>
          </Stack>
        </Flex>
      </Card.Section>

      <Card.Section className={classes.section} sx={details ? {} : { whiteSpace: 'nowrap' }}>
        <Text size="sm" mt="xs" sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
          {app.description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group>
          {app.appleUrl ? (
            <Anchor href={app.appleUrl} target="_blank">
              <Text mt="md" className={classes.label} color="dimmed">
                App Store
              </Text>
            </Anchor>
          ) : null}
          {app.googleUrl ? (
            <Anchor href={app.googleUrl} target="_blank">
              <Text mt="md" className={classes.label} color="dimmed">
                Google Play
              </Text>
            </Anchor>
          ) : null}
          {app.websiteUrl ? (
            <Anchor href={app.websiteUrl} target="_blank">
              <Text mt="md" className={classes.label} color="dimmed">
                Website
              </Text>
            </Anchor>
          ) : null}
        </Group>
      </Card.Section>
    </Card>
  )
}
