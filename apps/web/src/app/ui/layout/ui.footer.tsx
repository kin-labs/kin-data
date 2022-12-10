import { Anchor, createStyles, Flex, Footer, Group, Text } from '@mantine/core'
import { TablerIcon } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  footer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  inner: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
  },
}))

interface FooterSimpleProps {
  links: { icon: TablerIcon; link: string; label: string }[]
}

export function UiFooter({ links }: FooterSimpleProps) {
  const { classes } = useStyles()
  const items = links.map(({ icon: Icon, link, label }) => (
    <Anchor color="dimmed" href={link} key={label} target="_blank" size="sm" p={6} px={12}>
      <Group spacing={4}>
        <Icon size={14} />
        <Text>{label}</Text>
        <Text ml={4} size="sm">
          ↗
        </Text>
      </Group>
    </Anchor>
  ))

  return (
    <Footer height={60} className={classes.footer}>
      <Flex className={classes.inner}>
        <Text size="sm" color="dimmed">
          Kin Foundation &copy; {new Date().getUTCFullYear()}
        </Text>
        <Group spacing={4}>{items}</Group>
      </Flex>
    </Footer>
  )
}
