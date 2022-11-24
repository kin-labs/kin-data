/* eslint-disable */
import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
}

export type DailySummaryApps = {
  __typename?: 'DailySummaryApps'
  dailyActiveEarners?: Maybe<Scalars['Int']>
  dailyActiveSpenders?: Maybe<Scalars['Int']>
  dailyActiveUsers?: Maybe<Scalars['Int']>
  dailyEarnTransactions?: Maybe<Scalars['Int']>
  dailyPeerTransactions?: Maybe<Scalars['Int']>
  dailySpendTransactions?: Maybe<Scalars['Int']>
  date: Scalars['DateTime']
  id: Scalars['String']
  index?: Maybe<Scalars['Int']>
  monthlyActiveEarners?: Maybe<Scalars['Int']>
  monthlyActiveSpenders?: Maybe<Scalars['Int']>
  monthlyActiveUsers?: Maybe<Scalars['Int']>
  name: Scalars['String']
  totalDailyTransactions?: Maybe<Scalars['Int']>
}

export type DailySummaryEcosystem = {
  __typename?: 'DailySummaryEcosystem'
  dailyActiveEarners?: Maybe<Scalars['Int']>
  dailyActiveSpenders?: Maybe<Scalars['Int']>
  dailyActiveUsers?: Maybe<Scalars['Int']>
  dailyEarnTransactions?: Maybe<Scalars['Int']>
  dailyPeerTransactions?: Maybe<Scalars['Int']>
  dailySpendTransactions?: Maybe<Scalars['Int']>
  date: Scalars['DateTime']
  id: Scalars['String']
  monthlyActiveApps?: Maybe<Scalars['Int']>
  monthlyActiveEarners?: Maybe<Scalars['Int']>
  monthlyActiveSpenders?: Maybe<Scalars['Int']>
  monthlyActiveUsers?: Maybe<Scalars['Int']>
  totalDailyTransactions?: Maybe<Scalars['Int']>
}

export type KrePayoutSummary = {
  __typename?: 'KrePayoutSummary'
  date: Scalars['DateTime']
  id: Scalars['String']
  kin?: Maybe<Scalars['Float']>
  top10?: Maybe<Scalars['JSON']>
  usd?: Maybe<Scalars['Float']>
}

export type KreStat = {
  __typename?: 'KreStat'
  button?: Maybe<Scalars['String']>
  dataLabelName?: Maybe<Scalars['String']>
  dataSetName?: Maybe<Scalars['String']>
  dataSetValue?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  displayLegend?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  table?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  xAxisLabel?: Maybe<Scalars['String']>
  yAxisLabel?: Maybe<Scalars['String']>
}

export type KreSummary = {
  __typename?: 'KreSummary'
  activeApps?: Maybe<Scalars['Int']>
  activeCappedUserBalance?: Maybe<Scalars['Float']>
  activeUserBalance?: Maybe<Scalars['Float']>
  dailyTransactions?: Maybe<Scalars['Int']>
  dailyVolatilityFactor?: Maybe<Scalars['Float']>
  date: Scalars['DateTime']
  id: Scalars['String']
  monthlyActiveEarners?: Maybe<Scalars['Int']>
  monthlyActiveSpenders?: Maybe<Scalars['Int']>
  monthlyActiveUsers?: Maybe<Scalars['Int']>
}

export type Query = {
  __typename?: 'Query'
  dailySummaryApps: Array<DailySummaryApps>
  dailySummaryEcosystem: Array<DailySummaryEcosystem>
  kreList?: Maybe<Array<Scalars['String']>>
  krePayoutSummary: Array<KrePayoutSummary>
  krePayoutSummaryDates: Array<Scalars['String']>
  kreStatList?: Maybe<Array<KreStat>>
  kreSummary: Array<KreSummary>
  kreSummaryDates: Array<Scalars['String']>
  uptime?: Maybe<Scalars['Float']>
}

export type DailySummaryAppsDetailsFragment = {
  __typename?: 'DailySummaryApps'
  dailyActiveEarners?: number | null
  dailyActiveSpenders?: number | null
  dailyActiveUsers?: number | null
  dailyEarnTransactions?: number | null
  dailyPeerTransactions?: number | null
  dailySpendTransactions?: number | null
  date: any
  id: string
  index?: number | null
  monthlyActiveEarners?: number | null
  monthlyActiveSpenders?: number | null
  monthlyActiveUsers?: number | null
  name: string
  totalDailyTransactions?: number | null
}

export type DailySummaryEcosystemDetailsFragment = {
  __typename?: 'DailySummaryEcosystem'
  dailyActiveEarners?: number | null
  dailyActiveSpenders?: number | null
  dailyActiveUsers?: number | null
  dailyEarnTransactions?: number | null
  dailyPeerTransactions?: number | null
  dailySpendTransactions?: number | null
  date: any
  id: string
  monthlyActiveEarners?: number | null
  monthlyActiveSpenders?: number | null
  monthlyActiveUsers?: number | null
  totalDailyTransactions?: number | null
}

export type KrePayoutSummaryDetailsFragment = {
  __typename?: 'KrePayoutSummary'
  date: any
  id: string
  kin?: number | null
  top10?: any | null
  usd?: number | null
}

export type KreSummaryDetailsFragment = {
  __typename?: 'KreSummary'
  activeApps?: number | null
  activeCappedUserBalance?: number | null
  activeUserBalance?: number | null
  dailyTransactions?: number | null
  dailyVolatilityFactor?: number | null
  date: any
  id: string
  monthlyActiveEarners?: number | null
  monthlyActiveSpenders?: number | null
  monthlyActiveUsers?: number | null
}

export type DailySummaryAppsQueryVariables = Exact<{ [key: string]: never }>

export type DailySummaryAppsQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'DailySummaryApps'
    dailyActiveEarners?: number | null
    dailyActiveSpenders?: number | null
    dailyActiveUsers?: number | null
    dailyEarnTransactions?: number | null
    dailyPeerTransactions?: number | null
    dailySpendTransactions?: number | null
    date: any
    id: string
    index?: number | null
    monthlyActiveEarners?: number | null
    monthlyActiveSpenders?: number | null
    monthlyActiveUsers?: number | null
    name: string
    totalDailyTransactions?: number | null
  }>
}

export type DailySummaryEcosystemQueryVariables = Exact<{ [key: string]: never }>

export type DailySummaryEcosystemQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'DailySummaryEcosystem'
    dailyActiveEarners?: number | null
    dailyActiveSpenders?: number | null
    dailyActiveUsers?: number | null
    dailyEarnTransactions?: number | null
    dailyPeerTransactions?: number | null
    dailySpendTransactions?: number | null
    date: any
    id: string
    monthlyActiveEarners?: number | null
    monthlyActiveSpenders?: number | null
    monthlyActiveUsers?: number | null
    totalDailyTransactions?: number | null
  }>
}

export type KrePayoutSummaryQueryVariables = Exact<{ [key: string]: never }>

export type KrePayoutSummaryQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'KrePayoutSummary'
    date: any
    id: string
    kin?: number | null
    top10?: any | null
    usd?: number | null
  }>
}

export type KrePayoutSummaryDatesQueryVariables = Exact<{ [key: string]: never }>

export type KrePayoutSummaryDatesQuery = { __typename?: 'Query'; items: Array<string> }

export type KreSummaryQueryVariables = Exact<{ [key: string]: never }>

export type KreSummaryQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'KreSummary'
    activeApps?: number | null
    activeCappedUserBalance?: number | null
    activeUserBalance?: number | null
    dailyTransactions?: number | null
    dailyVolatilityFactor?: number | null
    date: any
    id: string
    monthlyActiveEarners?: number | null
    monthlyActiveSpenders?: number | null
    monthlyActiveUsers?: number | null
  }>
}

export type KreSummaryDatesQueryVariables = Exact<{ [key: string]: never }>

export type KreSummaryDatesQuery = { __typename?: 'Query'; items: Array<string> }

export const DailySummaryAppsDetailsFragmentDoc = gql`
  fragment DailySummaryAppsDetails on DailySummaryApps {
    dailyActiveEarners
    dailyActiveSpenders
    dailyActiveUsers
    dailyEarnTransactions
    dailyPeerTransactions
    dailySpendTransactions
    date
    id
    index
    monthlyActiveEarners
    monthlyActiveSpenders
    monthlyActiveUsers
    name
    totalDailyTransactions
  }
`
export const DailySummaryEcosystemDetailsFragmentDoc = gql`
  fragment DailySummaryEcosystemDetails on DailySummaryEcosystem {
    dailyActiveEarners
    dailyActiveSpenders
    dailyActiveUsers
    dailyEarnTransactions
    dailyPeerTransactions
    dailySpendTransactions
    date
    id
    monthlyActiveEarners
    monthlyActiveSpenders
    monthlyActiveUsers
    totalDailyTransactions
  }
`
export const KrePayoutSummaryDetailsFragmentDoc = gql`
  fragment KrePayoutSummaryDetails on KrePayoutSummary {
    date
    id
    kin
    top10
    usd
  }
`
export const KreSummaryDetailsFragmentDoc = gql`
  fragment KreSummaryDetails on KreSummary {
    activeApps
    activeCappedUserBalance
    activeUserBalance
    dailyTransactions
    dailyVolatilityFactor
    date
    id
    monthlyActiveEarners
    monthlyActiveSpenders
    monthlyActiveUsers
  }
`
export const DailySummaryAppsDocument = gql`
  query dailySummaryApps {
    items: dailySummaryApps {
      ...DailySummaryAppsDetails
    }
  }
  ${DailySummaryAppsDetailsFragmentDoc}
`

export function useDailySummaryAppsQuery(options?: Omit<Urql.UseQueryArgs<DailySummaryAppsQueryVariables>, 'query'>) {
  return Urql.useQuery<DailySummaryAppsQuery, DailySummaryAppsQueryVariables>({
    query: DailySummaryAppsDocument,
    ...options,
  })
}
export const DailySummaryEcosystemDocument = gql`
  query dailySummaryEcosystem {
    items: dailySummaryEcosystem {
      ...DailySummaryEcosystemDetails
    }
  }
  ${DailySummaryEcosystemDetailsFragmentDoc}
`

export function useDailySummaryEcosystemQuery(
  options?: Omit<Urql.UseQueryArgs<DailySummaryEcosystemQueryVariables>, 'query'>,
) {
  return Urql.useQuery<DailySummaryEcosystemQuery, DailySummaryEcosystemQueryVariables>({
    query: DailySummaryEcosystemDocument,
    ...options,
  })
}
export const KrePayoutSummaryDocument = gql`
  query KrePayoutSummary {
    items: krePayoutSummary {
      ...KrePayoutSummaryDetails
    }
  }
  ${KrePayoutSummaryDetailsFragmentDoc}
`

export function useKrePayoutSummaryQuery(options?: Omit<Urql.UseQueryArgs<KrePayoutSummaryQueryVariables>, 'query'>) {
  return Urql.useQuery<KrePayoutSummaryQuery, KrePayoutSummaryQueryVariables>({
    query: KrePayoutSummaryDocument,
    ...options,
  })
}
export const KrePayoutSummaryDatesDocument = gql`
  query KrePayoutSummaryDates {
    items: krePayoutSummaryDates
  }
`

export function useKrePayoutSummaryDatesQuery(
  options?: Omit<Urql.UseQueryArgs<KrePayoutSummaryDatesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<KrePayoutSummaryDatesQuery, KrePayoutSummaryDatesQueryVariables>({
    query: KrePayoutSummaryDatesDocument,
    ...options,
  })
}
export const KreSummaryDocument = gql`
  query KreSummary {
    items: kreSummary {
      ...KreSummaryDetails
    }
  }
  ${KreSummaryDetailsFragmentDoc}
`

export function useKreSummaryQuery(options?: Omit<Urql.UseQueryArgs<KreSummaryQueryVariables>, 'query'>) {
  return Urql.useQuery<KreSummaryQuery, KreSummaryQueryVariables>({ query: KreSummaryDocument, ...options })
}
export const KreSummaryDatesDocument = gql`
  query KreSummaryDates {
    items: kreSummaryDates
  }
`

export function useKreSummaryDatesQuery(options?: Omit<Urql.UseQueryArgs<KreSummaryDatesQueryVariables>, 'query'>) {
  return Urql.useQuery<KreSummaryDatesQuery, KreSummaryDatesQueryVariables>({
    query: KreSummaryDatesDocument,
    ...options,
  })
}
