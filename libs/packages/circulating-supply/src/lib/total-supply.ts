import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { KIN_TOKEN_MAINNET } from "./total-supply.constants";

export async function totalSupply(): Promise<number> {
  const conn = new Connection(clusterApiUrl('mainnet-beta'))
  const supp = await conn.getTokenSupply(new PublicKey(KIN_TOKEN_MAINNET))

  return new BigNumber(supp.value.amount).dividedBy(1e5).toNumber()
}
