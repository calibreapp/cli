const columnify = require('columnify')
const { gradeFormatter } = require('../utils/formatters')

const table = measurements => {
  const perf = measurements
    .find(metric => metric.name === 'lighthouse-performance-score')
    .value.toFixed()
  const bp = measurements
    .find(metric => metric.name === 'lighthouse-best-practices-score')
    .value.toFixed()
  const accessibility = measurements
    .find(metric => metric.name === 'lighthouse-accessibility-score')
    .value.toFixed()
  const seo = measurements
    .find(metric => metric.name === 'lighthouse-seo-score')
    .value.toFixed()
  const pwa = measurements
    .find(metric => metric.name === 'lighthouse-pwa-score')
    .value.toFixed()

  const rows = [
    {
      category: 'Performance',
      score: gradeFormatter(perf)
    },
    {
      category: 'Best Practices',
      score: gradeFormatter(bp)
    },
    {
      category: 'Accessibility',
      score: gradeFormatter(accessibility)
    },
    {
      category: 'SEO',
      score: gradeFormatter(seo)
    },
    {
      category: 'Progressive Web App',
      score: gradeFormatter(pwa)
    }
  ]

  return columnify(rows, {
    columnSplitter: ' | ',
    maxLineWidth: '80',
    config: {
      score: {
        align: 'right'
      }
    }
  })
}

module.exports = table
