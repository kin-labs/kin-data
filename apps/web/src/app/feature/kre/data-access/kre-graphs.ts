import { KreGraph } from '../ui/kre-graph'

export const KRE_GRAPHS: KreGraph[] = [
  {
    id: 'aub',
    name: 'Active User Balance',
    description: 'Active User Balances are the summed balances of all Active Users in an app at the end of a given day',
    data: [],
  },
]

export type KreAubData = KreAubItem[]
export interface KreAubItem {
  id: number
  date: string
  appIndex: number
  au: number
  aub: number
  cappedAub: number
  name: string
}
