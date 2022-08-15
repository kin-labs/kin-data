import { DailyActiveSpendersEcosystem } from '@prisma/client'
import { DailyActiveSpendersEcosystemEntity } from '../entity'

export function convertDailyActiveSpendersEcosystem(items: DailyActiveSpendersEcosystem[]) {
  return items.map((item) => convertDailyActiveSpenderEcosystem(item))
}

export function convertDailyActiveSpenderEcosystem(
  item: DailyActiveSpendersEcosystem,
): DailyActiveSpendersEcosystemEntity {
  return {
    id: Number(item.id),
    date: item.date,
    walletCount: Number(item.walletCount),
  }
}
