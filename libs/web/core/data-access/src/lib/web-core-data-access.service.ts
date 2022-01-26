import { Injectable } from '@angular/core'
import { ApolloAngularSDK } from '@kin-data/shared/util/sdk'

@Injectable({ providedIn: 'root' })
export class WebCoreDataAccessService extends ApolloAngularSDK {}
