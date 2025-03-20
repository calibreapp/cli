import chalk from 'chalk'
import percentile from 'stats-percentile'

import { format } from '../utils/formatters/index.js'

const view = timeSeries => {
  const page = timeSeries.pages.map(page => page.name).join(', ')

  const metrics = timeSeries.metrics.map(measurement => {
    const series = timeSeries.series.filter(
      series => series.measurement === measurement.name
    )

    const metrics = series.map(set => {
      const values = set.values.filter(v => v !== undefined && v !== null)

      const formattedMinValue = format({
        formatter: measurement.formatter,
        value: Math.min(...values)
      })

      const formattedMaxValue = format({
        formatter: measurement.formatter,
        value: Math.max(...values)
      })

      const formattedMedian = format({
        formatter: measurement.formatter,
        value: percentile(values, 50)
      })

      const formattedP95 = format({
        formatter: measurement.formatter,
        value: percentile(values, 95)
      })

      return `
${page}
${set.name}

  Min: ${formattedMinValue}
  Max: ${formattedMaxValue}
  Median: ${formattedMedian}
  p95: ${formattedP95}
`
    })

    return `
${chalk.blue.bold(measurement.label)}
${
  metrics.length
    ? metrics.join('\n')
    : '\nThere is no data for this time period'
}
`
  })

  return `
${chalk.bold('Metric history')}
${timeSeries.length ? 'There is no data for this time period' : ''}
${metrics.join('\n')}
`
}

export default view
