import React, { ReactNode, useEffect, useState } from 'react'

export interface KreStat {
  id: string
  name: string
  description?: string
}

export interface KreStatsProviderContext {
  loading: boolean
  stats: KreStat[]
}

const KreStatsContext = React.createContext<KreStatsProviderContext>({} as KreStatsProviderContext)
const sleep = (secs: number) => new Promise((resolve) => setTimeout(() => resolve(true), secs * 1000))
function KreStatsProvider(props: { children: ReactNode }) {
  const { children } = props
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<KreStat[]>([])
  useEffect(() => {
    if (stats.length || !loading) return
    fetch('/api/unstable/kre-stats')
      .then(async (r) => {
        await sleep(1)
        return r
      })
      .then((r) => r.json())
      .then((res: KreStat[]) => {
        setStats(res)
        setLoading(false)
      })
  }, [stats, setStats, loading, setLoading])

  const value: KreStatsProviderContext = {
    loading,
    stats,
  }
  return <KreStatsContext.Provider value={value}>{children}</KreStatsContext.Provider>
}

const useKreStats = () => React.useContext(KreStatsContext)

export { KreStatsProvider, useKreStats }
