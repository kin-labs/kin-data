import { Box, Burger, Container, createStyles, Group, Header, Paper, Text, Transition } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Link, NavLink } from 'react-router-dom'
import { UiLayoutThemeToggle } from './ui-layout-theme-toggle'
import { UiLinks } from './ui-link'

const HEADER_HEIGHT = 60

const useStyles = createStyles((theme) => ({
  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}))

export function UiLayoutHeader({ links, name }: { links: UiLinks; name: string }) {
  const [opened, { toggle }] = useDisclosure(false)

  const { classes, cx } = useStyles()

  const items = links.map((link) => (
    <NavLink key={link.label} to={link.path}>
      {({ isActive }) => <Text className={cx(classes.link, { [classes.linkActive]: isActive })}>{link.label}</Text>}
    </NavLink>
  ))

  return (
    <Header height={HEADER_HEIGHT}>
      <Container size="xl" className={classes.header}>
        <Link to="/" replace>
          <img src="/assets/logo.svg" height={36} alt={'Kin Logo'} />
        </Link>
        <Group spacing={5} className={classes.links}>
          {items}
          <UiLayoutThemeToggle />
        </Group>
        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  )
}
