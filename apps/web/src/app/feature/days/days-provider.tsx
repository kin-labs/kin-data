import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { DaysApi, DaySummary } from './days-api'

export interface DaysProviderContext {
  dates: string[]
  date: string | undefined
  previous: string | undefined
  next: string | undefined
  loading: boolean
  setDate: (date: string) => void
  summary: DaySummary | undefined
}

const DaysContext = createContext<DaysProviderContext>({} as DaysProviderContext)

function DaysProvider({ children }: { children: ReactNode }) {
  const [dates, setDates] = useState<string[]>([])
  const [date, setDate] = useState<string>('')
  const [summary, setSummary] = useState<DaySummary | undefined>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (dates?.length || loading) return
    setLoading(true)
    DaysApi.getSummaryDates().then((res: string[]) => {
      setDates(res)
      setLoading(false)
    })
  }, [dates, loading])

  useEffect(() => {
    if (!date || loading || summary) return
    setLoading(true)
    DaysApi.getSummary(date).then((res) => {
      setSummary(res)
      setLoading(false)
    })
  }, [date, summary, loading])

  const previous = dates[dates.indexOf(date) + 1]
  const next = dates[dates.indexOf(date) - 1]

  const value = {
    dates,
    date,
    previous,
    next,
    loading,
    setDate: () => {
      setSummary(undefined)
      setDate(date)
    },
    summary,
  }
  return <DaysContext.Provider value={value}>{children}</DaysContext.Provider>
}

const useDays = () => useContext(DaysContext)

export { DaysProvider, useDays }
