const chalk = require('chalk')
const dateFormat = require('date-fns/format')

const chart = require('../utils/chart')
const { filesize, duration } = require('../utils/formatters')

const formatPerfScore = score => {
  let grade = 'F'
  if (score > 20) grade = 'D'
  if (score > 40) grade = 'C'
  if (score > 60) grade = 'B'
  if (score > 80) grade = 'A'

  if (score >= 80) return chalk.green.bold(grade)
  if (score > 60 && score < 80) return chalk.yellow.bold(grade)
  if (score <= 60) return chalk.red.bold(grade)
}

module.exports = test => {
  let intro = [chalk.underline.bold(test.url)]
  if (!test.device) intro.push('on Chrome Desktop')
  if (test.device) intro.push(`on a ${test.device.title}`)
  if (test.bandwidth) intro.push(`with a ${test.bandwidth.title} connection.`)

  const { metrics } = test

  const timingChartData = () => {
    const measurements = [
      'time-to-first-byte',
      'page_wait_timing',
      'firstRender',
      'first-meaningful-paint',
      'visually_complete_85',
      'visually_complete',
      'consistently-interactive'
    ]

    let list = []

    measurements.map(name => {
      const metric = metrics[name]
      if (!metric) {
        return
      }

      list.push({
        key: metric.label,
        value: metric.value
      })
    })

    return list
  }

  return `
${intro.join(' ')}
${test.location.emoji}  ${test.location.name}
${chalk.grey(dateFormat(test.updated_at, 'h:mma D-MMM-YYYY'))}

${chalk.bold(
    `Performance Grade: ${formatPerfScore(
      metrics['lighthouse-performance-score'].value.toFixed()
    )}`
  )}
${chalk.bold(
    `Progressive Web App Grade: ${formatPerfScore(
      metrics['lighthouse-pwa-score'].value.toFixed()
    )}`
  )}
${chalk.bold(
    `Best Practices Grade: ${formatPerfScore(
      metrics['lighthouse-best-practices-score'].value.toFixed()
    )}`
  )}
${chalk.bold(
    `Accessibility Grade: ${formatPerfScore(
      metrics['lighthouse-accessibility-score'].value.toFixed()
    )}`
  )}

${chalk.bold.underline('Timing')}

${chart(timingChartData(), 'duration')}


${metrics['asset_count'].label}: ${metrics['asset_count'].value}
${metrics['page_size_in_bytes'].label}: ${filesize(
    metrics['page_size_in_bytes'].value
  )}

${chalk.bold(`View the full report ${test.test_url}`)}
  `
}
