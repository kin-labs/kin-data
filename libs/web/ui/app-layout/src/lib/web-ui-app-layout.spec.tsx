import { render } from '@testing-library/react'

import { AppLayout } from './web-ui-app-layout'

describe('AppLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppLayout />)
    expect(baseElement).toBeTruthy()
  })
})
