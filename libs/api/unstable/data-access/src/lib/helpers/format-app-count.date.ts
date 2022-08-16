import { CountDateEntity } from '../entity'
import { formatDateHelper } from './format-date.helper'
import { formatNameHelper } from './format-name.helper'

export function formatAppCountDates(
  items: { appIndex: bigint; appName: string; date: Date; walletCount: number }[],
): CountDateEntity[] {
  return items.map((item) => formatAppCountDate(item))
}

export function formatAppCountDate(item: { appIndex: bigint; appName: string; date: Date; walletCount: number }): {
  appIndex: number
  appName: string
  date: string
  count: number
} {
  return {
    appIndex: Number(item.appIndex),
    appName: formatNameHelper(item),
    date: formatDateHelper(item.date),
    count: item.walletCount,
  }
}
