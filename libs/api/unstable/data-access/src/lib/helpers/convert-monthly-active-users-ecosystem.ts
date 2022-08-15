import { MonthlyActiveUsersEcosystem } from '@prisma/client'
import { MonthlyActiveUsersEcosystemEntity } from '../entity'

export function convertMonthlyActiveUsersEcosystem(items: MonthlyActiveUsersEcosystem[]) {
  return items.map((item) => convertMonthlyActiveUserEcosystem(item))
}

export function convertMonthlyActiveUserEcosystem(
  item: MonthlyActiveUsersEcosystem,
): MonthlyActiveUsersEcosystemEntity {
  return {
    date: item.date,
    id: Number(item.id),
    walletCount: item.walletCount,
  }
}
