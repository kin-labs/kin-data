import { KreStat } from '@kin-data/api/stats/data-access'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stc = require('string-to-color')
import { KreStatTable } from './models/kre-stat-table.enum'
import { KreStatsSummary } from './models/kre-stats-summary.model'
import { TxPerDayStat } from './models/tx-per-day-stat.model'

export function countApps(data: TxPerDayStat[] = []) {
  return Object.keys(
    data.reduce((acc, curr) => ({ ...acc, [curr.appIndex]: acc[curr.appIndex] ? acc[curr.appIndex] : {} }), {}),
  ).length
}

export function countTxs(data: TxPerDayStat[]) {
  return data?.reduce((acc, curr) => acc + curr.numOfTx, 0)
}

function reduceDataPoints(labels, data) {
  const dataPoints = labels.length

  if (dataPoints <= 25) return

  for (let i = dataPoints - 2; i--; i >= 0) {
    //-2 get last datapoint always
    if (i % 4 === 0) {
      labels.splice(i, 1)
      data.forEach((point, ii) => {
        //loop for each data point
        data[ii].data.splice(i, 1) //delete corresponding index
      })
    }
  }
  if (labels.length > 25) {
    reduceDataPoints(labels, data)
  }
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
export function getFields(table: KreStatTable) {
  switch (table) {
    case 'AUB':
      return ['AUB', 'AU', 'capped_AUB']
    case 'payouts':
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

export function summarizeKreStats(row: any, table: KreStatTable) {
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

export function getKreStatsQuery(table: KreStatTable) {
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
  const date = oneYearAgo.toISOString().split('T')[0]
  const year = oneYearAgo.getFullYear()

  let fields = '*'
  let where = `WHERE DATE(date) >= '${date}'`
  let orderBy = 'ORDER BY date ASC'

  if (table === KreStatTable.payouts) {
    orderBy = 'ORDER BY year ASC, week ASC'
    fields += ', CONCAT(week,"-",year) AS date'
    where = `WHERE year >= '${year}'`
  }

  return `SELECT ${fields} FROM \`kin-bi.reports.${table}\` ${where} ${orderBy}`
}

function initDataSet(setName: string, dataLength) {
  return {
    label: setName,
    borderColor: stc(setName),
    fill: false,
    data: new Array(dataLength).fill(0),
    hidden: false,
  }
}

// get datasets prefilled with zeros
function getDataLength(stats: any[], identifier: string) {
  const dataSets = {}

  let largestSet = 0
  stats.forEach((stat) => {
    const app: string = stat[identifier]

    if (!dataSets[app]) {
      dataSets[app] = []
    }
    dataSets[app].push(0)

    if (dataSets[app].length > largestSet) largestSet = dataSets[app].length
  })

  return largestSet
}

// extract labels for graphing
function extractDataLabels(stats: any[], labelName: string) {
  const labels = []
  let t: { [x: string]: boolean }
  const unique = (a: any[]) => ((t = {}), a.filter((e: string) => !(t[e] = e in t)))

  stats.forEach((stat) => {
    const label = stat[labelName] && stat[labelName].value ? stat[labelName].value : stat[labelName]
    labels.push(label)
  })

  return unique(labels) //return unique values
}

function sortKeys(array) {
  return array.sort((a, b) => {
    if (a.label == 'All') {
      return -1
    } else if (b.label == 'All') {
      return 1
    } else {
      return a.label.localeCompare(b.label)
    }
  })
}

// extract values for graphing
function extractDataSet(stats: any[], identifier: string, valueName: string) {
  const dataSet: {
    [x: string]: { label: string; borderColor: string; fill: boolean; data: any[]; hidden: boolean }
  } = {}
  const activeApps = undefined // [] // JSON.parse(localStorage.getItem('active-apps'))
  const dataLength = getDataLength(stats, identifier)
  let insertionIndex = 0

  stats.forEach((stat) => {
    const app = stat[identifier] ? stat[identifier] : valueName

    if (!dataSet[app]) {
      dataSet[app] = initDataSet(app, dataLength)
      if (
        app !== 'All' &&
        app !== undefined && // volatility factor and MAA and TDT doesn't have a dataset
        app != valueName
      ) {
        dataSet[app].hidden = true
      }
    }

    if (activeApps && typeof activeApps[app] !== undefined && app != valueName) {
      dataSet[app].hidden = !activeApps[app] // override based on previous selection
    }

    dataSet[app].data[insertionIndex] = Math.max(0, stat[valueName]) // in case a -ve number came from a bug upstream (temp fix)

    if (
      app == 'All' ||
      app == valueName //only one element in legend
    ) {
      insertionIndex++
    }
  })

  const setArray = Object.values(dataSet)

  return sortKeys(setArray)
}

export function getData(stat: KreStat, data: unknown[]) {
  const labels = extractDataLabels(data, stat.dataLabelName)
  const datasets = extractDataSet(data, stat.dataSetName, stat.dataSetValue)

  if (!['payoutsDaily', 'payoutsKin', 'payoutsUsd'].includes(stat.id)) {
    reduceDataPoints(labels, datasets)
  }

  return stat && data.length
    ? {
        labels,
        datasets,
      }
    : undefined
}
