import { Network } from '../interfaces/network'

export function createNetwork(network: Omit<Network, 'explorerUrl' | 'mintUrl'>): Network {
  const explorerBase = 'https://explorer.solana.com'
  const cluster = network.cluster === 'mainnet-beta' ? '' : `?cluster=${network.cluster}`
  const clusterUrl = network.cluster === 'custom' ? `&customUrl=${network.endpoint}` : ''
  const explorerUrl = `${explorerBase}${cluster}${clusterUrl}`
  const mintUrl = `${explorerBase}/address/${network.mint}${cluster}${clusterUrl}`

  return {
    cluster: network.cluster,
    endpoint: network.endpoint,
    explorerUrl,
    mint: network.mint,
    mintUrl,
    name: network.name,
  }
}
