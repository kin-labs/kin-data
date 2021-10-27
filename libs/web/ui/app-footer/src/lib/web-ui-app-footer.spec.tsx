import { render } from '@testing-library/react'

import { AppFooter } from './web-ui-app-footer'

describe('AppFooter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppFooter />)
    expect(baseElement).toBeTruthy()
  })
})
