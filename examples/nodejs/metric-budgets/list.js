#!/usr/bin/env node

import { MetricBudget } from 'calibre'

// Returns a list of metric budgets for a site, including:
// - The budget threshold value, e.g. 2500
// - Budget status, e.g. "met", "unmet", "at_risk"
// - Metric, e.g. "largestContentfulPaint"
// - Each page and test profile associated with the budget, with:
//   - Last observed value
//   - Whether the budget is within the threshold
const listMetricBudgets = async () => {
  const site = 'calibre' // site slug
  const count = 1 // number of metric budgets to return (maximum=5)
  const metric = 'largestContentfulPaint' // specify a metric (default=budgets for all metrics are returned)

  try {
    const metricBudgets = await MetricBudget.list({
      site,
      metric,
      count
    })

    console.log(JSON.stringify(metricBudgets, null, 2))
  } catch (error) {
    console.error(error)
  }
}

listMetricBudgets()
