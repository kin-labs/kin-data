import { Box, Card, Container, createStyles, Flex, Grid, Skeleton, Stack, Text } from '@mantine/core'
import { useKrePayoutSummaryQuery, useKreSummaryQuery } from '../../../sdk'
import { formatNumber } from '../days/days-api'
import { DaysBox, DaysStatBox } from '../days/days-detail'
import { stringToColor } from '../stats/features/string-to-color'
import { PieChart } from '../stats/ui/pie-chart'

const useStyles = createStyles((theme) => ({
  container: {
    padding: theme.spacing.md,
    [theme.fn.smallerThan('md')]: {
      padding: 0,
      paddingTop: theme.spacing.xs,
      paddingBottom: theme.spacing.xs,
    },
  },
}))

export function DashboardStatsSummary() {
  const { classes } = useStyles()
  const [{ data, fetching: loading }] = useKreSummaryQuery()

  const last = data?.item

  return (
    <Container className={classes.container}>
      <Box px={4} py={12}>
        <Text size={28}>Ecosystem Statistics</Text>
      </Box>
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

export function HomeStatsPayoutSummary() {
  const { classes } = useStyles()
  const [{ data, fetching: loading }] = useKrePayoutSummaryQuery()

  const item = data?.item

  const labels = item?.top10?.map((app) => app.name) ?? []
  const totalKin = item?.top10?.reduce((acc, app) => acc + (app.kin ?? 0), 0) ?? 0
  const percentageKin = item?.top10?.map((app) => app.kin ?? 0).map((item) => (item / totalKin) * 100) ?? []

  const pieData = {
    labels,
    datasets: [
      {
        data: [...percentageKin],
        backgroundColor: labels.map((label) => stringToColor(`${label}`, 25)),
        borderColor: labels.map((label) => stringToColor(`${label}`)),
      },
    ],
  }

  return (
    <Container className={classes.container}>
      <Box px={4} py={12}>
        <Text size={28}>KRE Payouts</Text>
      </Box>
      <Grid>
        <Grid.Col xs={4}>
          <Stack>
            <Card>
              {loading ? (
                <Skeleton height={140} radius="md" />
              ) : (
                <Stack>
                  <DaysStatBox amount={item?.kin ?? 0} label="Payouts (KIN)" />
                </Stack>
              )}
            </Card>
            <Card>
              {loading ? (
                <Skeleton height={140} radius="md" />
              ) : (
                <Stack>
                  <DaysStatBox amount={item?.usd ?? 0} label="Payouts (USD)" />
                </Stack>
              )}
            </Card>
            <Card>
              {loading ? (
                <Skeleton height={140} radius="md" />
              ) : (
                <Stack>
                  <DaysBox
                    content={<Text size={32}>{item?.date ? new Date(item?.date).toLocaleDateString() : ''}</Text>}
                    label="Payout for week of"
                  />
                </Stack>
              )}
            </Card>
          </Stack>
        </Grid.Col>
        <Grid.Col xs={4}>
          <Card>
            <PieChart data={pieData} />
          </Card>
        </Grid.Col>
        <Grid.Col xs={4}>
          <Card>
            {item?.top10?.slice(0, 5).map((app) => {
              return (
                <Stack spacing={0} key={app.index}>
                  <Flex justify="space-between" align="center">
                    <Text size={24}>{`${app.name}`}</Text>
                    <Text size={24} color="dimmed">
                      {Math.round(((app.kin ?? 0) / totalKin) * 100)} %
                    </Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Stack spacing={0}>
                      <Text size={16} color="dimmed">
                        KIN: {formatNumber(app.kin ?? 0)}
                      </Text>
                      <Text size={16} color="dimmed">
                        USD: $ {Math.round(app.usd ?? 0)}.00
                      </Text>
                    </Stack>
                  </Flex>
                </Stack>
              )
            })}
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  )
}
