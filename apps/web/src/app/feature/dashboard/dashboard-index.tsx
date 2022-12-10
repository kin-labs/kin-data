import { Box, Button, Container, createStyles, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'
import { HomeStatsPayoutSummary, DashboardStatsSummary } from './dashboard-stats.summary'

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 120,
    paddingBottom: 80,

    [theme.fn.smallerThan('md')]: {
      paddingTop: 80,
      paddingBottom: 60,
      paddingLeft: 0,
      paddingRight: 0,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  dots: {
    position: 'absolute',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],

    '@media (max-width: 755px)': {
      display: 'none',
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      // textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
  },

  description: {
    textAlign: 'center',

    '@media (max-width: 520px)': {
      textAlign: 'left',
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: 'flex',
    justifyContent: 'center',

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      height: 42,
      fontSize: theme.fontSizes.md,

      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}))

export function DashboardIndex() {
  const { classes } = useStyles()

  return (
    <Container className={classes.wrapper} size="xl">
      <Stack className={classes.inner} spacing={24}>
        <Title className={classes.title}>
          See the{' '}
          <Text
            component="span"
            className={classes.highlight}
            variant="gradient"
            gradient={{ from: '#7546f6', to: '#c8aff8' }}
            inherit
          >
            Ecosystem of Apps
          </Text>{' '}
          powered by Kin.
        </Title>
        <Container p={0} size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
            Get all the data, right from the source.
          </Text>
        </Container>
        <div className={classes.controls}>
          <Button
            component={Link}
            to={'/stats'}
            className={classes.control}
            size="xl"
            variant="gradient"
            gradient={{ from: '#7546f6', to: '#c8aff8' }}
          >
            Explore the Kin Ecosystem
          </Button>
        </div>
        <Box>
          <DashboardStatsSummary />
          <HomeStatsPayoutSummary />
        </Box>
      </Stack>
    </Container>
  )
}
