import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
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

  it('hides every decorative call-to-action arrow', () => {
    renderHome()
    const arrows = screen.getAllByText('→')
    expect(arrows.length).toBeGreaterThan(0)
    arrows.forEach((el) => expect(el).toHaveAttribute('aria-hidden', 'true'))
  })
})
