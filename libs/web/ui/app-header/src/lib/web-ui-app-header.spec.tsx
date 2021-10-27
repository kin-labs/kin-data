import { render } from '@testing-library/react'

import { AppHeader } from './web-ui-app-header'

describe('AppHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppHeader toggleTheme={() => true} links={[]} />)
    expect(baseElement).toBeTruthy()
  })
})
