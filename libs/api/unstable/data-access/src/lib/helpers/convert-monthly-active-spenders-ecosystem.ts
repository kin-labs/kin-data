import { MonthlyActiveSpendersEcosystem } from '@prisma/client'
import { MonthlyActiveSpendersEcosystemEntity } from '../entity'

export function convertMonthlyActiveSpendersEcosystem(items: MonthlyActiveSpendersEcosystem[]) {
  return items.map((item) => convertMonthlyActiveSpenderEcosystem(item))
}

export function convertMonthlyActiveSpenderEcosystem(
  item: MonthlyActiveSpendersEcosystem,
): MonthlyActiveSpendersEcosystemEntity {
  return {
    date: item.date,
    id: Number(item.id),
    walletCount: item.walletCount,
  }
}
