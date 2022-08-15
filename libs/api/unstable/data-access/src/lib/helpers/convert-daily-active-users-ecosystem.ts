import { DailyActiveUsersEcosystem } from '@prisma/client'
import { DailyActiveUsersEcosystemEntity } from '../entity'

export function convertDailyActiveUsersEcosystem(items: DailyActiveUsersEcosystem[]) {
  return items.map((item) => convertDailyActiveUserEcosystem(item))
}

export function convertDailyActiveUserEcosystem(item: DailyActiveUsersEcosystem): DailyActiveUsersEcosystemEntity {
  return {
    id: Number(item.id),
    date: item.date,
    walletCount: Number(item.walletCount),
  }
}
