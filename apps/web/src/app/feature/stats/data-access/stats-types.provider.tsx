import React, { ReactNode } from 'react'
import { CombinedError } from 'urql'
import { Stat, useStatsQuery } from '../../../../sdk'

export interface StatsTypesProviderContext {
  error: CombinedError | undefined
  loading: boolean
  stats: Stat[]
}

const StatsTypesContext = React.createContext<StatsTypesProviderContext>({} as StatsTypesProviderContext)
function StatsTypesProvider({ children }: { children: ReactNode }) {
  const [{ data, error, fetching }] = useStatsQuery()

  const value: StatsTypesProviderContext = {
    error,
    loading: !!fetching,
    stats: data?.items ?? [],
  }
  return <StatsTypesContext.Provider value={value}>{children}</StatsTypesContext.Provider>
}

const useStatsTypes = () => React.useContext(StatsTypesContext)

export { StatsTypesProvider, useStatsTypes }
