import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './Layout'

function renderLayout(initialEntries = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<h1>首頁</h1>} />
          <Route path="tasks" element={<h1>任務</h1>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('Layout', () => {
  it('hides the decorative arrow in the nav CTA', () => {
    renderLayout()
    expect(screen.getByText('→')).toHaveAttribute('aria-hidden', 'true')
  })

  it('provides a skip link that targets the main landmark', () => {
    renderLayout()
    expect(screen.getByRole('link', { name: '跳至主要內容' })).toHaveAttribute('href', '#main-content')
    expect(document.getElementById('main-content')).toHaveAttribute('tabindex', '-1')
  })

  it('moves focus to the main landmark after navigating, but not on first render', async () => {
    renderLayout()
    const main = document.getElementById('main-content')
    expect(main).not.toHaveFocus()
    fireEvent.click(screen.getByRole('link', { name: '找到我的任務' }))
    await waitFor(() => expect(main).toHaveFocus())
  })
})
