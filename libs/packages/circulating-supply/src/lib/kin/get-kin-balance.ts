import { removeDecimals, Solana } from '@kin-kinetic/solana'

export function getKinBalance(solana: Solana, publicKey: string): Promise<string> {
  return solana.getTokenBalance(publicKey).then((res) => removeDecimals(res.balance, 5))
}
