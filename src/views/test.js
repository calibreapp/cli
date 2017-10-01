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
  const lh = test.reports.find(report => report.name === 'lighthouse').report
  const video = test.reports.find(report => report.name === 'video').report
  const screenshot = test.reports.find(report => report.name === 'screenshot')
    .report

  let intro = [chalk.underline.bold(test.url)]
  if (!test.device) intro.push('on Chrome Desktop')
  if (test.device) intro.push(`on a ${test.device.title}`)
  if (test.bandwidth) intro.push(`with a ${test.bandwidth.title} connection.`)

  const timingChartData = [
    {
      key: 'First Paint',
      value:
        lh.audits['speed-index-metric'].extendedInfo.value.timings
          .firstVisualChange
    },
    {
      key: 'First Meaningful Paint',
      value: lh.audits['first-meaningful-paint'].rawValue
    },
    {
      key: '85% Visually Complete',
      value:
        lh.audits['speed-index-metric'].extendedInfo.value.timings.visuallyReady
    },
    {
      key: 'Visually Complete',
      value:
        lh.audits['speed-index-metric'].extendedInfo.value.timings
          .visuallyComplete
    },
    {
      key: 'Time to Interactive',
      value: lh.audits['first-interactive'].rawValue
    }
  ]

  return `
${intro.join(' ')}
${test.location.emoji}  ${test.location.name}
${chalk.grey(dateFormat(test.updated_at, 'h:mma D-MMM-YYYY'))}

${chalk.bold(
    `Performance Grade: ${formatPerfScore(
      lh.reportCategories[0].score.toFixed()
    )}`
  )}

${chalk.bold.underline('Timing')}

${chart(timingChartData, 'duration')}


${chalk.bold.underline('Assets by Type')}



Total Requests: ${lh.audits['total-byte-weight'].extendedInfo.value
    .totalCompletedRequests}
Total Bytes: ${filesize(lh.audits['total-byte-weight'].rawValue)}


${chalk.bold.underline('Test Output')}

GIF: ${video.gifUrl}
Video: ${video.videoUrl}
Screenshot: ${screenshot.url}
  `
}
