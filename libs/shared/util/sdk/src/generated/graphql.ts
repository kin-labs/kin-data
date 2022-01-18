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

export type Query = {
  __typename?: 'Query'
  kreList?: Maybe<Array<Scalars['String']>>
  kreStatList?: Maybe<Array<KreStat>>
  uptime?: Maybe<Scalars['Float']>
}

export type UptimeQueryVariables = Exact<{ [key: string]: never }>

export type UptimeQuery = { __typename?: 'Query'; uptime?: number | null | undefined }

export type KreStatDetailsFragment = {
  __typename?: 'KreStat'
  button?: string | null | undefined
  dataLabelName?: string | null | undefined
  dataSetName?: string | null | undefined
  dataSetValue?: string | null | undefined
  description?: string | null | undefined
  displayLegend?: boolean | null | undefined
  name?: string | null | undefined
  table?: string | null | undefined
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
        button?: string | null | undefined
        dataLabelName?: string | null | undefined
        dataSetName?: string | null | undefined
        dataSetValue?: string | null | undefined
        description?: string | null | undefined
        displayLegend?: boolean | null | undefined
        name?: string | null | undefined
        table?: string | null | undefined
        title?: string | null | undefined
        xAxisLabel?: string | null | undefined
        yAxisLabel?: string | null | undefined
      }>
    | null
    | undefined
}

export const KreStatDetailsFragmentDoc = gql`
  fragment KreStatDetails on KreStat {
    button
    dataLabelName
    dataSetName
    dataSetValue
    description
    displayLegend
    name
    table
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

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

interface WatchQueryOptionsAlone<V> extends Omit<ApolloCore.WatchQueryOptions<V>, 'query' | 'variables'> {}

interface QueryOptionsAlone<V> extends Omit<ApolloCore.QueryOptions<V>, 'query' | 'variables'> {}

interface MutationOptionsAlone<T, V> extends Omit<ApolloCore.MutationOptions<T, V>, 'mutation' | 'variables'> {}

interface SubscriptionOptionsAlone<V> extends Omit<ApolloCore.SubscriptionOptions<V>, 'query' | 'variables'> {}

@Injectable({ providedIn: 'root' })
export class ApolloAngularSDK {
  constructor(private uptimeGql: UptimeGQL, private kreStatListGql: KreStatListGQL) {}

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
}
