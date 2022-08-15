import { DailyActiveEarnersEcosystem } from '@prisma/client'
import { DailyActiveEarnersEcosystemEntity } from '../entity'

export function convertDailyActiveEarnersEcosystem(items: DailyActiveEarnersEcosystem[]) {
  return items.map((item) => convertDailyActiveEarnerEcosystem(item))
}

export function convertDailyActiveEarnerEcosystem(
  item: DailyActiveEarnersEcosystem,
): DailyActiveEarnersEcosystemEntity {
  return {
    date: item.date,
    id: Number(item.id),
    walletCount: item.walletCount,
  }
}
