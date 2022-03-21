import { Injectable } from '@nestjs/common'
import { clusterApiUrl } from '@solana/web3.js'
import { createNetwork } from './helpers/create.network'
import { Network } from './interfaces/network'

@Injectable()
export class ApiNetworkDataAccessService {
  readonly networks: Network[] = [
    createNetwork({
      cluster: 'mainnet-beta',
      endpoint: clusterApiUrl('mainnet-beta'),
      mint: 'kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6',
      name: 'Mainnet',
    }),
    createNetwork({
      cluster: 'devnet',
      endpoint: clusterApiUrl('devnet'),
      mint: 'KinDesK3dYWo3R2wDk6Ucaf31tvQCCSYyL8Fuqp33GX',
      name: 'Devnet',
    }),
    createNetwork({
      cluster: 'custom',
      endpoint: 'https://local.validator.agorainfra.dev',
      mint: 'kinTese33ph6r6txhC5RbftBGzmi68MPaT9ByhXqPbo',
      name: 'Kin Testnet (deprecated)',
    }),
  ]
}
