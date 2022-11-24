import React, { ReactNode, useState } from 'react'
import {
  DailySummaryAppResult,
  DailySummaryEcosystem,
  Stat,
  StatInput,
  StatType,
  useDailySummaryAppsQuery,
  useDailySummaryEcosystemQuery,
  useStatsQuery,
} from '../../../../sdk'

export interface StatsProviderContext {
  dailySummaryAppResult?: DailySummaryAppResult | undefined
  dailySummaryEcosystem?: DailySummaryEcosystem[] | undefined
  input: StatInput
  loading: boolean
  setInput: (input: StatInput) => void
  stat?: Stat | undefined
  stats?: Stat[] | undefined
}

const StatsContext = React.createContext<StatsProviderContext>({} as StatsProviderContext)
function StatsProvider({ children }: { children: ReactNode }) {
  const [input, setInput] = useState<StatInput>({ range: '90days', type: StatType.TotalDailyTransactions })
  const [{ data: stats, fetching: statsFetching }] = useStatsQuery()
  const [{ data: dailySummaryAppResult, fetching: dailySummaryAppResultFetching }, dailySummaryAppResultQuery] =
    useDailySummaryAppsQuery({ variables: { input } })
  const [{ data: dailySummaryEcosystem, fetching: dailySummaryEcosystemFetching }, dailySummaryEcosystemQuery] =
    useDailySummaryEcosystemQuery({ variables: { input } })

  const value: StatsProviderContext = {
    dailySummaryAppResult: dailySummaryAppResult?.items,
    dailySummaryEcosystem: dailySummaryEcosystem?.items,
    input,
    loading: !!(dailySummaryAppResultFetching || dailySummaryEcosystemFetching || statsFetching),
    setInput,
    stat: stats?.items?.find((s) => s.type === input.type),
    stats: stats?.items,
  }
  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
}

const useStats = () => React.useContext(StatsContext)

export { StatsProvider, useStats }
