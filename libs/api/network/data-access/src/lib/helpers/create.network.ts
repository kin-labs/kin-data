import { Network } from '../interfaces/network'

export function createNetwork(network: Omit<Network, 'explorerUrl'>): Network {
  const explorerBase = 'https://explorer.solana.com'
  const cluster = network.cluster === 'mainnet-beta' ? '' : `?cluster=${network.cluster}`
  const clusterUrl = network.cluster === 'custom' ? `&customUrl=${network.endpoint}` : ''
  const explorerUrl = `${explorerBase}${cluster}${clusterUrl}`

  return {
    cluster: network.cluster,
    endpoint: network.endpoint,
    explorerUrl,
    mint: network.mint,
    name: network.name,
  }
}
