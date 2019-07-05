#!/usr/bin/env node

const { MetricBudget } = require('calibre')

const listMetricBudgets = async () => {
  const site = 'calibre' // site slug
  const count = 20 // number of metric budgets to return, maximum 500

  // Optional
  const metric = 'consistently-interactive' // pass a metric to limit results

  // List the metric budgets
  const metricBudgets = await MetricBudget.list({
    site,
    metric,
    count
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(metricBudgets, null, 2))
}

listMetricBudgets()
