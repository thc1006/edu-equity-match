import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SkillPicker, SuccessPanel } from './FormFields'

describe('SkillPicker', () => {
  it('labels each skill checkbox by its name only, not the decorative glyph', () => {
    render(<SkillPicker value={[]} onChange={() => {}} />)
    // Accessible name must be the skill name alone; the leading icon must be hidden.
    expect(screen.getByRole('checkbox', { name: '視覺設計' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: '影音剪輯' })).toBeInTheDocument()
  })
})

describe('SuccessPanel', () => {
  it('hides the decorative check glyph from assistive tech', () => {
    render(<SuccessPanel title="完成">內容</SuccessPanel>)
    expect(screen.getByText('✓')).toHaveAttribute('aria-hidden', 'true')
  })
})
