import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'

export enum StatType {
  dailyActiveEarners = 'dailyActiveEarners',
  dailyActiveSpenders = 'dailyActiveSpenders',
  dailyActiveUsers = 'dailyActiveUsers',
  dailyEarnTransactions = 'dailyEarnTransactions',
  dailyPeerTransactions = 'dailyPeerTransactions',
  dailySpendTransactions = 'dailySpendTransactions',
  monthlyActiveEarners = 'monthlyActiveEarners',
  monthlyActiveSpenders = 'monthlyActiveSpenders',
  monthlyActiveUsers = 'monthlyActiveUsers',
  totalDailyTransactions = 'totalDailyTransactions',
}

registerEnumType(StatType, { name: 'StatType' })

@ObjectType()
export class Stat {
  @Field()
  id: string
  @Field()
  name: string
  @Field(() => [String])
  description: string[]
  @Field(() => StatType)
  type: StatType
}

export const STATS: Stat[] = [
  {
    id: 'DAE',
    type: StatType.dailyActiveEarners,
    name: 'Daily Active Earners',
    description: ['DAE is the number of users with at least one earn in a day'],
  },
  {
    id: 'DAS',
    type: StatType.dailyActiveSpenders,
    name: 'Daily Active Spenders',
    description: ['DAS is the number of users with at least one spend in a day'],
  },
  {
    id: 'DAU',
    type: StatType.dailyActiveUsers,
    name: 'Daily Active Users',
    description: [
      'DAU is the number of users with at least one transaction in a day.',
      'This is different from the definition used for payout calculations.',
      "Note that for DAU, 'Other' includes accounts outside the app ecosystem",
    ],
  },
  {
    id: 'DET',
    type: StatType.dailyEarnTransactions,
    name: 'Daily Earn Transactions',
    description: ['TBD'],
  },
  {
    id: 'DPT',
    type: StatType.dailyPeerTransactions,
    name: 'Daily Peer Transactions',
    description: ['TBD'],
  },
  {
    id: 'DST',
    type: StatType.dailySpendTransactions,
    name: 'Daily Spend Transactions',
    description: ['DST is the number of apps with at least one spend in a day'],
  },
  {
    id: 'MAE',
    type: StatType.monthlyActiveEarners,
    name: 'Monthly Active Earners',
    description: ['MAE is the number of users with at least one earn in a month'],
  },
  {
    id: 'MAS',
    type: StatType.monthlyActiveSpenders,
    name: 'Monthly Active Spenders',
    description: ['MAS is the number of users with at least one spend in a month'],
  },
  {
    id: 'MAU',
    type: StatType.monthlyActiveUsers,
    name: 'Monthly Active Users',
    description: ['MAU is the number of users with at least one transaction in a month.'],
  },
  {
    id: 'TDT',
    type: StatType.totalDailyTransactions,
    name: 'Total Daily Transactions',
    description: ['All transactions for Kin on the blockchain. (Account creations, earns, spends, etc)'],
  },
]

const x = [
  {
    name: 'payouts-kin',
    description: `<p>The payouts are calculated proportionally based on <i>Capped Active User Balances</i> for each app with at least one Active User.</p>
                        <p>An Active User (for payment calculations) is a unique user-owned wallet with at least 3 spends in the last 30 days.</p>
                        <p>Payout data is updated once a week on Wednesdays</p>`,
  },
  {
    name: 'payouts-usd',
    description: `<p>This is the conversion to USD of KIN paid out to apps using the daily price from CoinGecko</p>`,
  },
  {
    name: 'payouts-daily-kin',
    description: [
      `<p>The payouts are calculated proportionally based on <i>Capped Active User Balances</i> for each app with at least one Active User.</p>`,
      `<p>An Active User (for payment calculations) is a unique user-owned wallet with at least 3 spends in the last 30 days.</p>`,
      `<p>Payout data is updated once a week on Wednesdays</p>`,
    ].join(''),
  },
  {
    name: 'AUB',
    description: `<p>Active User Balances are the summed balances of all Active Users in an app at the end of a given day</p>`,
  },
  {
    name: 'AUB-capped',
    description: `<p>Capped Active User Balances is the lesser of the Active User Balance of the app and 100,000*(the number of Active Users in an app)</p>`,
  },
  {
    name: 'DET',
    description: `<p>DET is the number of apps with at least one earn in a day</p>`,
  },
  {
    name: 'MAA',
    description: `<p>MAA is the number of apps that have users earning or spending in the last 30 days</p>`,
  },
  {
    name: 'VF',
    description: `<p>The Volatility factor is the absolute average deviation in the closing price of Kin as listed on CoinGecko over the last 30 days, divided by the average closing price over the same period.</p>`,
  },
]
