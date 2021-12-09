import { ApolloProvider } from '@apollo/react-hooks'
import { useApollo } from '@kin-data/shared/util/sdk'
import { AppLayout } from '@kin-data/web/ui/app-layout'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import Head from 'next/head'
import './styles.css'

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps)
  return (
    <ThemeProvider attribute="class">
      <ApolloProvider client={client}>
        <Head>
          <title>Welcome to web!</title>
        </Head>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default App
