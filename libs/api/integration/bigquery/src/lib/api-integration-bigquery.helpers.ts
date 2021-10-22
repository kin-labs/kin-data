import { createHash } from 'crypto'

export function generateMd5Hash(input: string) {
  return createHash('md5').update(input).digest('hex')
}
