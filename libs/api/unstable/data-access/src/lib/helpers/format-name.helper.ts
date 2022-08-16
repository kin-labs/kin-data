export function formatNameHelper(item) {
  return item?.appIndex ? (item.appName ? item.appName : `*App: ${item.appIndex}`) : undefined
}
