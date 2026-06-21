import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DataProvider } from '../context/DataContext'
import { AdminPage } from './AdminPage'

function renderAdmin() {
  return render(
    <DataProvider>
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    </DataProvider>,
  )
}

describe('AdminPage', () => {
  beforeEach(() => localStorage.clear())

  it('hides the decorative search icon from assistive tech', () => {
    renderAdmin()
    expect(screen.getByText('⌕')).toHaveAttribute('aria-hidden', 'true')
  })
})
