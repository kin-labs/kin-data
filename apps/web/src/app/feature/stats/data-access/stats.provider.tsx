import React, { ReactNode, useState } from 'react'
import {
  DailySummaryAppResult,
  Stat,
  StatInput,
  StatType,
  useDailySummaryAppsQuery,
  useStatsQuery,
} from '../../../../sdk'

export interface StatsProviderContext {
  dailySummaryAppResult?: DailySummaryAppResult | undefined
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

  const value: StatsProviderContext = {
    dailySummaryAppResult: dailySummaryAppResult?.items,
    input,
    loading: !!(dailySummaryAppResultFetching || statsFetching),
    setInput,
    stat: stats?.items?.find((s) => s.type === input.type),
    stats: stats?.items,
  }
  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
}

const useStats = () => React.useContext(StatsContext)

export { StatsProvider, useStats }
