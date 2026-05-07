import chalk from 'chalk'

const formatGrading = grading => {
  if (!grading) return '—'

  switch (grading) {
    case 'good':
    case 'GOOD':
      return chalk.green('Good')
    case 'average':
    case 'needs-improvement':
    case 'NEEDS_IMPROVEMENT':
      return chalk.yellow('Needs Improvement')
    case 'poor':
    case 'POOR':
      return chalk.red('Poor')
    case 'pass':
      return chalk.green('Pass')
    case 'fail':
      return chalk.red('Fail')
    case 'ungraded':
    case 'not_assessed':
      return chalk.grey('—')
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
      return chalk.green(display)
    case 'average':
    case 'needs-improvement':
    case 'NEEDS_IMPROVEMENT':
      return chalk.yellow(display)
    case 'poor':
    case 'POOR':
      return chalk.red(display)
    default:
      return display
  }
}

export { formatGrading, colorByGrading }
