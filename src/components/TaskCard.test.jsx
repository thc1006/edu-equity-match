import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { TaskCard } from './TaskCard'

const task = {
  id: 't1', title: '測試任務', organization: '某組織', summary: '摘要',
  skills: ['視覺設計'], mode: '線上', time: '7/01', volunteerHours: true, status: '招募中',
}

const renderCard = () => render(<MemoryRouter><TaskCard task={task} /></MemoryRouter>)

describe('TaskCard', () => {
  it('hides the decorative time/hours glyphs from assistive tech', () => {
    renderCard()
    expect(screen.getByText('◷')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('◉')).toHaveAttribute('aria-hidden', 'true')
  })

  it('still exposes the human-readable task info as text', () => {
    renderCard()
    expect(screen.getByText('7/01')).toBeInTheDocument()
    expect(screen.getByText('可提供服務時數')).toBeInTheDocument()
  })
})
