import { Box, Button, Card, Container, createStyles, Grid, Skeleton, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useKreSummaryQuery } from '../../../sdk'
import { DaysStatBox } from '../days/days-detail'

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 120,
    paddingBottom: 80,

    '@media (max-width: 755px)': {
      paddingTop: 80,
      paddingBottom: 60,
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
      textAlign: 'left',
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

export function HomeIndex() {
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
        <Box>
          <GridAsymmetrical />
        </Box>
        <div className={classes.controls}>
          <Button
            component={Link}
            to={'/stats'}
            className={classes.control}
            size="xl"
            variant="gradient"
            gradient={{ from: '#7546f6', to: '#c8aff8' }}
          >
            Explore Ecosystem Stats
          </Button>
        </div>
      </Stack>
    </Container>
  )
}

export function GridAsymmetrical() {
  const [{ data, fetching: loading }] = useKreSummaryQuery()

  const last = data?.item

  return (
    <Container my="md">
      <Grid>
        <Grid.Col xs={4}>
          <Card>
            {loading ? (
              <Skeleton height={140} radius="md" />
            ) : (
              <Stack>
                <DaysStatBox amount={last?.activeApps ?? 0} label={'Active Apps'} />
              </Stack>
            )}
          </Card>
        </Grid.Col>
        <Grid.Col xs={4}>
          <Card>
            {loading ? (
              <Skeleton height={140} radius="md" />
            ) : (
              <DaysStatBox label="Daily Transactions" amount={last?.dailyTransactions ?? 0} />
            )}
          </Card>
        </Grid.Col>
        <Grid.Col xs={4}>
          <Card>
            {loading ? (
              <Skeleton height={140} radius="md" />
            ) : (
              <Stack>
                <DaysStatBox amount={last?.activeUserBalance ?? 0} label={'Active User Balance'} />
              </Stack>
            )}
          </Card>
        </Grid.Col>
        <Grid.Col xs={4}>
          <Card>
            {loading ? (
              <Skeleton height={140} radius="md" />
            ) : (
              <Stack>
                <DaysStatBox amount={last?.monthlyActiveUsers ?? 0} label={'Monthly Active Users'} />
              </Stack>
            )}
          </Card>
        </Grid.Col>
        <Grid.Col xs={4}>
          <Card>
            {loading ? (
              <Skeleton height={140} radius="md" />
            ) : (
              <Stack>
                <DaysStatBox amount={last?.monthlyActiveSpenders ?? 0} label="Monthly Active Spenders" />
              </Stack>
            )}
          </Card>
        </Grid.Col>
        <Grid.Col xs={4}>
          <Card>
            {loading ? (
              <Skeleton height={140} radius="md" />
            ) : (
              <Stack>
                <DaysStatBox amount={last?.monthlyActiveEarners ?? 0} label={'Monthly Active Earners'} />
              </Stack>
            )}
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  )
}
