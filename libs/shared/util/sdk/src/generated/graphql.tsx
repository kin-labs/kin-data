import type { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type KreStatKeySpecifier = (
  | 'button'
  | 'dataLabelName'
  | 'dataSetName'
  | 'dataSetValue'
  | 'description'
  | 'displayLegend'
  | 'name'
  | 'table'
  | 'title'
  | 'xAxisLabel'
  | 'yAxisLabel'
  | KreStatKeySpecifier
)[]
export type KreStatFieldPolicy = {
  button?: FieldPolicy<any> | FieldReadFunction<any>
  dataLabelName?: FieldPolicy<any> | FieldReadFunction<any>
  dataSetName?: FieldPolicy<any> | FieldReadFunction<any>
  dataSetValue?: FieldPolicy<any> | FieldReadFunction<any>
  description?: FieldPolicy<any> | FieldReadFunction<any>
  displayLegend?: FieldPolicy<any> | FieldReadFunction<any>
  name?: FieldPolicy<any> | FieldReadFunction<any>
  table?: FieldPolicy<any> | FieldReadFunction<any>
  title?: FieldPolicy<any> | FieldReadFunction<any>
  xAxisLabel?: FieldPolicy<any> | FieldReadFunction<any>
  yAxisLabel?: FieldPolicy<any> | FieldReadFunction<any>
}
export type QueryKeySpecifier = ('kreList' | 'kreStatList' | 'uptime' | QueryKeySpecifier)[]
export type QueryFieldPolicy = {
  kreList?: FieldPolicy<any> | FieldReadFunction<any>
  kreStatList?: FieldPolicy<any> | FieldReadFunction<any>
  uptime?: FieldPolicy<any> | FieldReadFunction<any>
}
export type StrictTypedTypePolicies = {
  KreStat?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | KreStatKeySpecifier | (() => undefined | KreStatKeySpecifier)
    fields?: KreStatFieldPolicy
  }
  Query?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier)
    fields?: QueryFieldPolicy
  }
}
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type KreStat = {
  readonly __typename?: 'KreStat'
  readonly button?: Maybe<Scalars['String']>
  readonly dataLabelName?: Maybe<Scalars['String']>
  readonly dataSetName?: Maybe<Scalars['String']>
  readonly dataSetValue?: Maybe<Scalars['String']>
  readonly description?: Maybe<Scalars['String']>
  readonly displayLegend?: Maybe<Scalars['Boolean']>
  readonly name?: Maybe<Scalars['String']>
  readonly table?: Maybe<Scalars['String']>
  readonly title?: Maybe<Scalars['String']>
  readonly xAxisLabel?: Maybe<Scalars['String']>
  readonly yAxisLabel?: Maybe<Scalars['String']>
}

export type Query = {
  readonly __typename?: 'Query'
  readonly kreList?: Maybe<ReadonlyArray<Scalars['String']>>
  readonly kreStatList?: Maybe<ReadonlyArray<KreStat>>
  readonly uptime?: Maybe<Scalars['Float']>
}

export type UptimeQueryVariables = Exact<{ [key: string]: never }>

export type UptimeQuery = { readonly __typename?: 'Query'; readonly uptime?: number | null | undefined }

export type KreStatDetailsFragment = {
  readonly __typename?: 'KreStat'
  readonly button?: string | null | undefined
  readonly dataLabelName?: string | null | undefined
  readonly dataSetName?: string | null | undefined
  readonly dataSetValue?: string | null | undefined
  readonly description?: string | null | undefined
  readonly displayLegend?: boolean | null | undefined
  readonly name?: string | null | undefined
  readonly table?: string | null | undefined
  readonly title?: string | null | undefined
  readonly xAxisLabel?: string | null | undefined
  readonly yAxisLabel?: string | null | undefined
}

export type KreStatListQueryVariables = Exact<{ [key: string]: never }>

export type KreStatListQuery = {
  readonly __typename?: 'Query'
  readonly stats?:
    | ReadonlyArray<{
        readonly __typename?: 'KreStat'
        readonly button?: string | null | undefined
        readonly dataLabelName?: string | null | undefined
        readonly dataSetName?: string | null | undefined
        readonly dataSetValue?: string | null | undefined
        readonly description?: string | null | undefined
        readonly displayLegend?: boolean | null | undefined
        readonly name?: string | null | undefined
        readonly table?: string | null | undefined
        readonly title?: string | null | undefined
        readonly xAxisLabel?: string | null | undefined
        readonly yAxisLabel?: string | null | undefined
      }>
    | null
    | undefined
}
