import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DataProvider } from '../context/DataContext'
import { TasksPage } from './TasksPage'

describe('TasksPage', () => {
  beforeEach(() => localStorage.clear())

  it('hides the decorative glyph in the empty state', () => {
    // 翻譯 任務在 seed 中為「已結束」，故 skill=翻譯 + 預設 status=招募中 會無結果 → 顯示空狀態
    render(
      <DataProvider>
        <MemoryRouter initialEntries={['/tasks?skill=翻譯']}>
          <TasksPage />
        </MemoryRouter>
      </DataProvider>,
    )
    expect(screen.getByText('⌁')).toHaveAttribute('aria-hidden', 'true')
  })
})
