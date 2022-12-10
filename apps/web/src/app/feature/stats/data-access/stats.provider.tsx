import React, { ReactNode, useState } from 'react'
import { DailySummaryAppResult, Stat, StatInput, StatType, useDailySummaryAppsQuery } from '../../../../sdk'
import { useStatsTypes } from './stats-types.provider'

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
  const { stats } = useStatsTypes()
  const [input, setInput] = useState<StatInput>({ range: '90days', type: StatType.TotalDailyTransactions })

  const [{ data: dailySummaryAppResult, fetching: dailySummaryAppResultFetching }, dailySummaryAppResultQuery] =
    useDailySummaryAppsQuery({ variables: { input } })

  const value: StatsProviderContext = {
    dailySummaryAppResult: dailySummaryAppResult?.items,
    input,
    loading: !!dailySummaryAppResultFetching,
    setInput,
    stat: stats?.find((s) => s.type === input.type),
    stats,
  }
  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
}

const useStats = () => React.useContext(StatsContext)

export { StatsProvider, useStats }
