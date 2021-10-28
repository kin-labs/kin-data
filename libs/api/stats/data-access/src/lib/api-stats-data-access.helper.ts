import { KreStatsSummary } from './models/kre-stats-summary.model'
import { KreStatsType } from './models/kre-stats.enum'
import { TxPerDayStat } from './models/tx-per-day-stat.model'

export function countApps(data: TxPerDayStat[] = []) {
  return Object.keys(
    data.reduce((acc, curr) => ({ ...acc, [curr.appIndex]: acc[curr.appIndex] ? acc[curr.appIndex] : {} }), {}),
  ).length
}

export function countTxs(data: TxPerDayStat[]) {
  return data?.reduce((acc, curr) => acc + curr.numOfTx, 0)
}

export function resetSummary(summary: string[]): KreStatsSummary {
  const summarized: KreStatsSummary = {}
  summarized.date = { value: 0 }

  summary.forEach((stat: string) => {
    summarized[stat] = 0
  })

  return summarized
}

/**
 * Get the fields we want to summarize
 * @param table name of the table
 * @returns fields we want to summarize
 */
export function getFields(table: KreStatsType) {
  switch (table) {
    case 'AUB':
      return ['AUB', 'AU', 'capped_AUB']
    case 'payouts':
    case 'payouts_daily':
      return ['payout_kin', 'payout_usd']
    default:
      return [table]
  }
}

export function getDates(app: KreStatsSummary, summarized: KreStatsSummary) {
  if (app.date?.value) {
    return { summaryDate: app.date?.value, appDate: summarized.date?.value }
  }
  return { summaryDate: summarized.date, appDate: app.date }
}

export function summarizeKreStats(row: any, table: KreStatsType) {
  const fields = getFields(table)
  const rowCopy = JSON.parse(JSON.stringify(row)) //copy so we can itterate and splice as well

  let summarized = resetSummary(fields)
  let filled = false
  let index = 0

  rowCopy.forEach((app: KreStatsSummary) => {
    const { summaryDate, appDate } = getDates(app, summarized)

    if (summaryDate != appDate) {
      if (filled) {
        row.splice(index, 0, { ...summarized, digital_service_name: 'All' })
        index++
      }

      summarized = resetSummary(fields)
      if (app.date?.value) {
        summarized.date.value = appDate as any
      } else {
        summarized.date = appDate as any
      }

      filled = false
    }

    fields.forEach((stat: string) => {
      filled = true
      summarized[stat] += app[stat]
    })

    index++
  })

  row.push({ ...summarized, digital_service_name: 'All' })
  return row
}

export function getKreStatsQuery(table: KreStatsType) {
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
  const date = oneYearAgo.toISOString().split('T')[0]
  const year = oneYearAgo.getFullYear()

  let fields = '*'
  let where = `WHERE DATE(date) >= '${date}'`
  let orderBy = 'ORDER BY date ASC'

  if (table === KreStatsType.payouts) {
    orderBy = 'ORDER BY year ASC, week ASC'
    fields += ', CONCAT(week,"-",year) AS date'
    where = `WHERE year >= '${year}'`
  }

  return `SELECT ${fields} FROM \`kin-bi.reports.${table}\` ${where} ${orderBy}`
}
