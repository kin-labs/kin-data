import { CountDateEntity } from '../entity'
import { formatDateHelper } from './format-date.helper'

export function formatCountDates(items: { date: Date; walletCount: number }[]): CountDateEntity[] {
  return items.map((item) => formatCountDate(item))
}

export function formatCountDate(item: { date: Date; walletCount: number }): { date: string; count: number } {
  return {
    date: formatDateHelper(item.date),
    count: item.walletCount,
  }
}
