import { formatGrading } from '../../src/views/grading.js'

describe('formatGrading', () => {
  test('returns Good for good grading', () => {
    const result = formatGrading('good')
    expect(result).toContain('Good')
  })

  test('returns Needs Improvement for needs-improvement grading', () => {
    const result = formatGrading('needs-improvement')
    expect(result).toContain('Needs Improvement')
  })

  test('returns Poor for poor grading', () => {
    const result = formatGrading('poor')
    expect(result).toContain('Poor')
  })

  test('returns — for null', () => {
    const result = formatGrading(null)
    expect(result).toBe('—')
  })
})
