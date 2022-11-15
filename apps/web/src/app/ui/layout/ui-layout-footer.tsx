import { ActionIcon, createStyles, Footer, Group } from '@mantine/core'
import { IconBrandGithub, IconBrandTwitter } from '@tabler/icons'
import React, { ReactNode } from 'react'

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}))

interface FooterCenteredProps {
  copyright: ReactNode
}

export function UiLayoutFooter({ copyright }: FooterCenteredProps) {
  const { classes } = useStyles()

  return (
    <Footer height={60} className={classes.footer}>
      <div className={classes.inner}>
        <Group className={classes.links}>{copyright}</Group>

        <Group spacing="xs" position="right" noWrap>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandGithub size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </Footer>
  )
}
