import { render } from '@testing-library/react'

import WebUiAppPage from './web-ui-app-page'

describe('WebUiAppPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebUiAppPage />)
    expect(baseElement).toBeTruthy()
  })
})
