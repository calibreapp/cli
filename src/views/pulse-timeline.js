const chalk = require('chalk')
const dateFormat = require('date-fns/format')
const percentile = require('stats-percentile')

const { filesize, duration } = require('../utils/formatters')

const format = (value, formatter) => {}

module.exports = data => {
  const metrics = data.page.timeseries.series.map(series => {
    let formatFn
    switch (series.metric.formatter) {
      case 'humanDuration':
        formatFn = duration
        break
      case 'fileSize':
        formatFn = filesize
        break
      case 'trust':
        formatFn = val => val
      default:
        formatFn = val => val
    }

    return `
${chalk.blue.bold(series.metric.label)}

${series.sets
      .map(set => {
        const values = set.values.map(value => value.value)

        const min = Math.min(...values)
        const formattedMinValue = formatFn(min)

        const max = Math.max(...values)
        const formattedMaxValue = formatFn(max)

        const median = percentile(values, 50)
        const formattedMedian = formatFn(median)

        const p95 = percentile(values, 95)
        const formattedP95 = formatFn(p95)

        return `
${set.profile.name}

  Min: ${formattedMinValue}
  Max: ${formattedMaxValue}
  Median: ${formattedMedian}
  p95: ${formattedP95}
  `
      })
      .join('\n')}
    `
  })

  return `
${chalk.bold('Metric history')}
Page: ${data.page.name} ${chalk.grey(`(${data.page.url})`)}

${!data.page.timeseries.length ? 'There is no data for this time period' : null}

${metrics.join('\n')}

  `
}
