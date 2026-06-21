import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { DataProvider } from '../context/DataContext'
import { TaskDetailPage } from './TaskDetailPage'

function renderDetail(taskId = 'task-story-cards') {
  return render(
    <DataProvider>
      <MemoryRouter initialEntries={[`/tasks/${taskId}`]}>
        <Routes>
          <Route path="/tasks/:taskId" element={<TaskDetailPage />} />
        </Routes>
      </MemoryRouter>
    </DataProvider>,
  )
}

describe('TaskDetailPage', () => {
  beforeEach(() => localStorage.clear())

  it('hides every decorative glyph (definition list + related cards) from assistive tech', () => {
    renderDetail()
    ;['◷', '⌖', '◉', '✉'].forEach((glyph) => {
      const els = screen.getAllByText(glyph)
      expect(els.length).toBeGreaterThan(0)
      els.forEach((el) => expect(el).toHaveAttribute('aria-hidden', 'true'))
    })
  })

  it('announces each definition term cleanly, without the glyph prefix', () => {
    renderDetail()
    // 修正後 <dt> 的直接文字節點只剩詞彙本身（glyph 被包進 aria-hidden span），
    // 故精確比對成立；修正前 dt 文字為「◷ 預計時間」會找不到 → 真正的 red-green。
    expect(screen.getByText('預計時間')).toBeInTheDocument()
    expect(screen.getByText('聯絡窗口')).toBeInTheDocument()
  })
})
