import { styleText } from 'node:util'

const formatGrading = grading => {
  if (!grading) return '—'

  switch (grading) {
    case 'good':
    case 'GOOD':
      return styleText('green', 'Good')
    case 'average':
    case 'needs-improvement':
    case 'NEEDS_IMPROVEMENT':
      return styleText('yellow', 'Needs Improvement')
    case 'poor':
    case 'POOR':
      return styleText('red', 'Poor')
    case 'pass':
      return styleText('green', 'Pass')
    case 'fail':
      return styleText('red', 'Fail')
    case 'ungraded':
    case 'not_assessed':
      return styleText('gray', '—')
    default:
      return grading
  }
}

const colorByGrading = (value, grading) => {
  if (value === null || value === undefined) return '—'
  const display = String(value)
  if (!grading) return display

  switch (grading) {
    case 'good':
    case 'GOOD':
      return styleText('green', display)
    case 'average':
    case 'needs-improvement':
    case 'NEEDS_IMPROVEMENT':
      return styleText('yellow', display)
    case 'poor':
    case 'POOR':
      return styleText('red', display)
    default:
      return display
  }
}

export { formatGrading, colorByGrading }
