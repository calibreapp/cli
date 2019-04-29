const chalk = require('chalk')
const dateFormat = require('date-fns/format')

const chart = require('../utils/chart')
const gradeTable = require('../views/grade-table')
const { filesize } = require('../utils/formatters')

module.exports = test => {
  let intro = [chalk.underline.bold(test.url)]

  if (!test.device) intro.push('on Chrome Desktop')
  if (test.device) intro.push(`on a ${test.device.title}`)
  if (test.connection) intro.push(`with a ${test.connection.title} connection.`)
  if (test.adBlockerIsEnabled) intro.push('(Adblocker enabled)')

  const { metrics } = test

  const timingChartData = () => {
    const measurements = [
      'time-to-first-byte',
      'page_wait_timing',
      'first-contentful-paint',
      'consistently-interactive'
    ]

    let list = []

    measurements.map(name => {
      const metric = metrics.find(metric => metric.name === name)
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
${chalk.grey(dateFormat(test.updatedAt, 'h:mma D-MMM-YYYY'))}

${chalk.bold.underline('Overall scores')}

${gradeTable(metrics)}

${chalk.bold.underline('Timing')}

${chart(timingChartData(), 'duration')}


${metrics.find(metric => metric.name === 'asset_count').label}: ${
    metrics.find(metric => metric.name === 'asset_count').value
  }
${
  metrics.find(metric => metric.name === 'page_size_in_bytes').label
}: ${filesize(
    metrics.find(metric => metric.name === 'page_size_in_bytes').value
  )}

${chalk.bold(`View the full report ${test.formattedTestUrl}`)}
  `
}
