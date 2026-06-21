import { beforeEach, describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DataProvider } from '../context/DataContext'
import { HomePage } from './HomePage'

function renderHome() {
  return render(
    <DataProvider>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </DataProvider>,
  )
}

describe('HomePage', () => {
  beforeEach(() => localStorage.clear())

  it('hides the decorative hero illustration and mock avatars from assistive tech', () => {
    const { container } = renderHome()
    expect(container.querySelector('.hero-visual')).toHaveAttribute('aria-hidden', 'true')
    expect(container.querySelector('.avatar-stack')).toHaveAttribute('aria-hidden', 'true')
  })
})
