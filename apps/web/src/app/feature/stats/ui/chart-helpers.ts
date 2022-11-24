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
