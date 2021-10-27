import { render } from '@testing-library/react'

import WebUiThemeToggle from './web-ui-theme-toggle'

describe('WebUiThemeToggle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebUiThemeToggle />)
    expect(baseElement).toBeTruthy()
  })
})
