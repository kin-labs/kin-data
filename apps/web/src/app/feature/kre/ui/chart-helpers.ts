import { stringToColor } from '../features/string-to-color'
import { KreDataRow, KreDataSet } from './kre-graph'

const colors = [
  'black',
  'silver',
  'gray',
  'maroon',
  'red',
  'purple',
  'fuchsia',
  'green',
  'lime',
  'olive',
  'navy',
  'blue',
  'teal',
  'blueviolet',
  'cadetblue',
  'coral',
]

export const randomColor = () => colors[Math.floor(Math.random() * colors.length)]

export const sortArrayOfDates = (date1: string, date2: string, direction = 'asc') => {
  const date1Date = new Date(date1).valueOf()
  const date2Date = new Date(date2).valueOf()

  const diff = direction === 'asc' ? date1Date - date2Date : date2Date - date1Date

  return diff > 0 ? 1 : diff < 0 ? -1 : 0
}

export const prepareApps = (data: KreDataRow) => {
  return Object.keys(data)
    .filter((p) => p.toLowerCase() !== 'all')
    .sort((a: string, b: string) => (a < b ? -1 : 1))
    .map((app) => ({ name: app, color: stringToColor(app) }))
}

export const prepareData = (data: KreDataSet) => {
  // prepare data
  const dataFormatted: KreDataRow[] = Object.values(data)
    .filter((item) => item['date'] && item['name'].toLowerCase() !== 'all')
    .map((item) => {
      return {
        x: new Date(item['date']).toISOString().split('T')[0],
        y: item['aub'],
        app: item['name'] as string,
      }
    })

  const baseData = Object.values(dataFormatted).reduce((previousValue, item) => {
    const app = item['app'] as string

    const newItem: KreDataRow = {
      x: item['x'],
      y: item['y'],
    }

    if (!previousValue[app]) {
      previousValue[app] = [newItem]
      return previousValue
    }

    previousValue[app].push(newItem)

    return previousValue
  }, {})

  const dataSlice = Object.entries(baseData).reduce((previousValue: KreDataRow, entry) => {
    const app = entry[0]
    const data = entry[1]

    // sort data
    data.sort((a: KreDataRow, b: KreDataRow) => sortArrayOfDates(a['x'], b['x']))

    // Get every other record and then slice the last 24 weeks
    if (!previousValue[app]) {
      previousValue[app] = data.filter((p: KreDataRow, index: number) => index % 7 === 1).slice(-4)
    }

    return previousValue
  }, {})

  // prepare apps
  const apps = prepareApps(dataSlice)

  return { dataSlice, apps }
}

export const prepareXTicks = (data: KreDataRow) => {
  return Array.from(
    new Set(
      Object.values(data)
        .flat(1)
        .map((p) => p.x),
    ),
  ).sort((a, b) => sortArrayOfDates(a, b))
}

export const prepareYTicks = (data: KreDataRow, selection: string[]) => {
  const allData = Object.keys(data)
    .filter((name) => selection.includes(name))
    .map((name) => data[name])
    .flat(1)
    .map((p) => p.y)

  const min: number = Math.min(...allData)
  const max: number = Math.max(...allData)

  return { min, max }
}
