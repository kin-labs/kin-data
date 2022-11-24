import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './app/app'
import { GraphQLProvider } from './sdk'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <BrowserRouter>
      <GraphQLProvider endpoint="/graphql">
        <App />
      </GraphQLProvider>
    </BrowserRouter>
  </StrictMode>,
)
