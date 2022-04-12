import columnify from 'columnify'
import { gradeFormatter } from '../utils/formatters/index.js'

const view = measurements => {
  const perfMetric = measurements.find(
    metric => metric.name === 'lighthouse-performance-score'
  )
  const perfScore = perfMetric && perfMetric.value.toFixed()

  const bestPracticesMetric = measurements.find(
    metric => metric.name === 'lighthouse-best-practices-score'
  )
  const bestPracticesScore =
    bestPracticesMetric && bestPracticesMetric.value.toFixed()

  const accessibilityMetric = measurements.find(
    metric => metric.name === 'lighthouse-accessibility-score'
  )
  const accessibilityScore =
    accessibilityMetric && accessibilityMetric.value.toFixed()

  const seoMetric = measurements.find(
    metric => metric.name === 'lighthouse-seo-score'
  )
  const seoScore = seoMetric && seoMetric.value.toFixed()

  const pwaMetric = measurements.find(
    metric => metric.name === 'lighthouse-pwa-score'
  )
  const pwaScore = pwaMetric && pwaMetric.value.toFixed()

  const rows = [
    {
      category: 'Performance',
      score: gradeFormatter(perfScore)
    },
    {
      category: 'Best Practices',
      score: gradeFormatter(bestPracticesScore)
    },
    {
      category: 'Accessibility',
      score: gradeFormatter(accessibilityScore)
    },
    {
      category: 'SEO',
      score: gradeFormatter(seoScore)
    },
    {
      category: 'Progressive Web App',
      score: gradeFormatter(pwaScore)
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

export default view
