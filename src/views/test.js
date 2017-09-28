const chalk = require('chalk')
// var Chart = require('cli-chart')
const distanceInWordsToNow = require('date-fns/distance_in_words_to_now')

const { filesize, duration } = require('../utils/formatters')

module.exports = test => {
  const lh = test.reports.find(report => report.name === 'lighthouse').report
  const video = test.reports.find(report => report.name === 'video').report
  const screenshot = test.reports.find(report => report.name === 'screenshot')
    .report

  let intro = [chalk.underline.bold(test.url)]
  if (!test.device) intro.push('on Chrome Desktop')
  if (test.device) intro.push(`on a ${test.device.title}`)
  if (test.bandwidth) intro.push(`with a ${test.bandwidth.title} connection.`)

  return `
${intro.join(' ')}
${test.location.emoji}  ${test.location.name}
${chalk.grey(distanceInWordsToNow(test.created_at) + ' ago')}

${chalk.bold(`Performance score: ${lh.reportCategories[0].score.toFixed()}`)}

${chalk.dim('===')} Paint Metrics
First Paint: ${duration(
    lh.audits['speed-index-metric'].extendedInfo.value.timings.firstVisualChange
  )}
First Meaningful Paint: ${duration(
    lh.audits['first-meaningful-paint'].rawValue
  )}
Visually Complete: ${duration(
    lh.audits['speed-index-metric'].extendedInfo.value.timings.visuallyReady
  )}
Time to Interactive: ${duration(lh.audits['first-interactive'].rawValue)}

${chalk.dim('===')} Load Metrics
Total Requests: ${lh.audits['total-byte-weight'].extendedInfo.value
    .totalCompletedRequests}
Total Bytes: ${filesize(lh.audits['total-byte-weight'].rawValue)}

${chalk.dim('===')} Assets
GIF: ${video.gifUrl}
Video: ${video.videoUrl}
Screenshot: ${screenshot.url}

Thanks for using Calibre 🙏
  `
}
