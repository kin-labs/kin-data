import { gql } from 'apollo-angular'
import { Injectable } from '@angular/core'
import * as Apollo from 'apollo-angular'
import * as ApolloCore from '@apollo/client/core'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
}

export type KreStat = {
  __typename?: 'KreStat'
  button?: Maybe<Scalars['String']>
  dataLabelName?: Maybe<Scalars['String']>
  dataSetName?: Maybe<Scalars['String']>
  dataSetValue?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  displayLegend?: Maybe<Scalars['Boolean']>
  id?: Maybe<KreStatType>
  name?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  xAxisLabel?: Maybe<Scalars['String']>
  yAxisLabel?: Maybe<Scalars['String']>
}

export enum KreStatType {
  Aub = 'AUB',
  Dae = 'DAE',
  Das = 'DAS',
  Dau = 'DAU',
  Det = 'DET',
  Dst = 'DST',
  Maa = 'MAA',
  Mae = 'MAE',
  Mas = 'MAS',
  Mau = 'MAU',
  Tdt = 'TDT',
  Vf = 'VF',
  PayoutsDaily = 'payoutsDaily',
  PayoutsKin = 'payoutsKin',
  PayoutsUsd = 'payoutsUsd',
}

export type KreStatsInput = {
  type: KreStatType
}

export type Query = {
  __typename?: 'Query'
  kreChart?: Maybe<Scalars['JSON']>
  kreData?: Maybe<Scalars['JSON']>
  kreList?: Maybe<Array<Scalars['String']>>
  kreStat?: Maybe<KreStat>
  kreStatList?: Maybe<Array<KreStat>>
  uptime?: Maybe<Scalars['Float']>
}

export type QueryKreChartArgs = {
  stat: KreStatsInput
}

export type QueryKreDataArgs = {
  stat: KreStatsInput
}

export type QueryKreStatArgs = {
  stat: KreStatsInput
}

export type UptimeQueryVariables = Exact<{ [key: string]: never }>

export type UptimeQuery = { __typename?: 'Query'; uptime?: number | null | undefined }

export type KreStatDetailsFragment = {
  __typename?: 'KreStat'
  id?: KreStatType | null | undefined
  button?: string | null | undefined
  dataLabelName?: string | null | undefined
  dataSetName?: string | null | undefined
  dataSetValue?: string | null | undefined
  description?: string | null | undefined
  displayLegend?: boolean | null | undefined
  name?: string | null | undefined
  title?: string | null | undefined
  xAxisLabel?: string | null | undefined
  yAxisLabel?: string | null | undefined
}

export type KreStatListQueryVariables = Exact<{ [key: string]: never }>

export type KreStatListQuery = {
  __typename?: 'Query'
  stats?:
    | Array<{
        __typename?: 'KreStat'
        id?: KreStatType | null | undefined
        button?: string | null | undefined
        dataLabelName?: string | null | undefined
        dataSetName?: string | null | undefined
        dataSetValue?: string | null | undefined
        description?: string | null | undefined
        displayLegend?: boolean | null | undefined
        name?: string | null | undefined
        title?: string | null | undefined
        xAxisLabel?: string | null | undefined
        yAxisLabel?: string | null | undefined
      }>
    | null
    | undefined
}

export type KreStatQueryVariables = Exact<{
  stat: KreStatsInput
}>

export type KreStatQuery = {
  __typename?: 'Query'
  data?: any | null | undefined
  stat?:
    | {
        __typename?: 'KreStat'
        id?: KreStatType | null | undefined
        button?: string | null | undefined
        dataLabelName?: string | null | undefined
        dataSetName?: string | null | undefined
        dataSetValue?: string | null | undefined
        description?: string | null | undefined
        displayLegend?: boolean | null | undefined
        name?: string | null | undefined
        title?: string | null | undefined
        xAxisLabel?: string | null | undefined
        yAxisLabel?: string | null | undefined
      }
    | null
    | undefined
}

export type KreChartQueryVariables = Exact<{
  stat: KreStatsInput
}>

export type KreChartQuery = {
  __typename?: 'Query'
  chart?: any | null | undefined
  stat?:
    | {
        __typename?: 'KreStat'
        id?: KreStatType | null | undefined
        button?: string | null | undefined
        dataLabelName?: string | null | undefined
        dataSetName?: string | null | undefined
        dataSetValue?: string | null | undefined
        description?: string | null | undefined
        displayLegend?: boolean | null | undefined
        name?: string | null | undefined
        title?: string | null | undefined
        xAxisLabel?: string | null | undefined
        yAxisLabel?: string | null | undefined
      }
    | null
    | undefined
}

export const KreStatDetailsFragmentDoc = gql`
  fragment KreStatDetails on KreStat {
    id
    button
    dataLabelName
    dataSetName
    dataSetValue
    description
    displayLegend
    name
    title
    xAxisLabel
    yAxisLabel
  }
`
export const UptimeDocument = gql`
  query Uptime {
    uptime
  }
`

@Injectable({
  providedIn: 'root',
})
export class UptimeGQL extends Apollo.Query<UptimeQuery, UptimeQueryVariables> {
  document = UptimeDocument

  constructor(apollo: Apollo.Apollo) {
    super(apollo)
  }
}
export const KreStatListDocument = gql`
  query KreStatList {
    stats: kreStatList {
      ...KreStatDetails
    }
  }
  ${KreStatDetailsFragmentDoc}
`

@Injectable({
  providedIn: 'root',
})
export class KreStatListGQL extends Apollo.Query<KreStatListQuery, KreStatListQueryVariables> {
  document = KreStatListDocument

  constructor(apollo: Apollo.Apollo) {
    super(apollo)
  }
}
export const KreStatDocument = gql`
  query KreStat($stat: KreStatsInput!) {
    stat: kreStat(stat: $stat) {
      ...KreStatDetails
    }
    data: kreData(stat: $stat)
  }
  ${KreStatDetailsFragmentDoc}
`

@Injectable({
  providedIn: 'root',
})
export class KreStatGQL extends Apollo.Query<KreStatQuery, KreStatQueryVariables> {
  document = KreStatDocument

  constructor(apollo: Apollo.Apollo) {
    super(apollo)
  }
}
export const KreChartDocument = gql`
  query KreChart($stat: KreStatsInput!) {
    stat: kreStat(stat: $stat) {
      ...KreStatDetails
    }
    chart: kreChart(stat: $stat)
  }
  ${KreStatDetailsFragmentDoc}
`

@Injectable({
  providedIn: 'root',
})
export class KreChartGQL extends Apollo.Query<KreChartQuery, KreChartQueryVariables> {
  document = KreChartDocument

  constructor(apollo: Apollo.Apollo) {
    super(apollo)
  }
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

interface WatchQueryOptionsAlone<V> extends Omit<ApolloCore.WatchQueryOptions<V>, 'query' | 'variables'> {}

interface QueryOptionsAlone<V> extends Omit<ApolloCore.QueryOptions<V>, 'query' | 'variables'> {}

interface MutationOptionsAlone<T, V> extends Omit<ApolloCore.MutationOptions<T, V>, 'mutation' | 'variables'> {}

interface SubscriptionOptionsAlone<V> extends Omit<ApolloCore.SubscriptionOptions<V>, 'query' | 'variables'> {}

@Injectable({ providedIn: 'root' })
export class ApolloAngularSDK {
  constructor(
    private uptimeGql: UptimeGQL,
    private kreStatListGql: KreStatListGQL,
    private kreStatGql: KreStatGQL,
    private kreChartGql: KreChartGQL,
  ) {}

  uptime(variables?: UptimeQueryVariables, options?: QueryOptionsAlone<UptimeQueryVariables>) {
    return this.uptimeGql.fetch(variables, options)
  }

  uptimeWatch(variables?: UptimeQueryVariables, options?: WatchQueryOptionsAlone<UptimeQueryVariables>) {
    return this.uptimeGql.watch(variables, options)
  }

  kreStatList(variables?: KreStatListQueryVariables, options?: QueryOptionsAlone<KreStatListQueryVariables>) {
    return this.kreStatListGql.fetch(variables, options)
  }

  kreStatListWatch(variables?: KreStatListQueryVariables, options?: WatchQueryOptionsAlone<KreStatListQueryVariables>) {
    return this.kreStatListGql.watch(variables, options)
  }

  kreStat(variables: KreStatQueryVariables, options?: QueryOptionsAlone<KreStatQueryVariables>) {
    return this.kreStatGql.fetch(variables, options)
  }

  kreStatWatch(variables: KreStatQueryVariables, options?: WatchQueryOptionsAlone<KreStatQueryVariables>) {
    return this.kreStatGql.watch(variables, options)
  }

  kreChart(variables: KreChartQueryVariables, options?: QueryOptionsAlone<KreChartQueryVariables>) {
    return this.kreChartGql.fetch(variables, options)
  }

  kreChartWatch(variables: KreChartQueryVariables, options?: WatchQueryOptionsAlone<KreChartQueryVariables>) {
    return this.kreChartGql.watch(variables, options)
  }
}
