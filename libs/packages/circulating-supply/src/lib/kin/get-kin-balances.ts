import { Solana } from '@kin-kinetic/solana'
import { getKinBalance } from './get-kin-balance'

export function getKinBalances(solana: Solana, publicKeys: string[]): Promise<number> {
  return Promise.all(publicKeys.map((publicKey) => getKinBalance(solana, publicKey))).then((res) =>
    res.map((a) => parseFloat(a)).reduce((a, b) => a + b),
  )
}
