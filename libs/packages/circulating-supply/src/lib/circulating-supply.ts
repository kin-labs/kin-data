import { Solana } from '@kin-kinetic/solana'
import { clusterApiUrl } from '@solana/web3.js'
import { Etherscan } from 'etherscan-ts'
import { CirculatingSupplyConfig } from './circulating-supply.config'
import { KIN_TOKEN_MAX, KIN_TOKEN_PRESALES, KIN_TOKEN_VESTING } from './circulating-supply.constants'
import { getErc20Balances } from './eth/get-erc20-balances'
import { getKinBalances } from './kin/get-kin-balances'

export async function circulatingSupply(config: CirculatingSupplyConfig): Promise<number> {
  const etherscan = new Etherscan(config.etherscanApiKey)
  const solana = new Solana(clusterApiUrl('mainnet-beta'))

  const [currentBalance, pendingPresale] = await Promise.all([
    getKinBalances(solana, KIN_TOKEN_VESTING),
    getErc20Balances(etherscan, KIN_TOKEN_PRESALES),
  ])

  return KIN_TOKEN_MAX - currentBalance - pendingPresale
}
