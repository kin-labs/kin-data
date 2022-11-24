import { ReactNode } from 'react'
import { createClient, Provider } from 'urql'

export function createGraphqlClient(url: string) {
  return createClient({
    url,
    fetchOptions: {
      credentials: 'include',
      mode: 'cors',
    },
    requestPolicy: 'network-only',
  })
}

export function GraphQLProvider({ children, endpoint }: { children: ReactNode; endpoint: string }) {
  const client = createGraphqlClient(endpoint)

  return <Provider value={client}>{children}</Provider>
}
