import { MonthlyActiveEarnersEcosystem } from '@prisma/client'
import { MonthlyActiveEarnersEcosystemEntity } from '../entity'

export function convertMonthlyActiveEarnersEcosystem(items: MonthlyActiveEarnersEcosystem[]) {
  return items.map((item) => convertMonthlyActiveEarnerEcosystem(item))
}

export function convertMonthlyActiveEarnerEcosystem(
  item: MonthlyActiveEarnersEcosystem,
): MonthlyActiveEarnersEcosystemEntity {
  return {
    date: item.date,
    id: Number(item.id),
    walletCount: item.walletCount,
  }
}
