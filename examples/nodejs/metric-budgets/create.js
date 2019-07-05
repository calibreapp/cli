#!/usr/bin/env node

const { MetricBudget } = require('calibre')

const createMetricBudget = async () => {
  const site = 'calibre' // site slug
  const measurement = 'consistently-interactive' // metric to create budget for
  const value = 5000 // budget value, ms for timing metrics
  const pages = ['cd7490c0-3d76-4eb3-9761-fccb9214b771'] // uuids of pages
  const profiles = ['58f3667d-4b90-4710-a92f-5e1e0b891818'] // uuids profiles

  // Create the metric budget
  const metricBudget = await MetricBudget.create({
    site,
    measurement,
    value,
    pages,
    profiles
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(metricBudget, null, 2))
}

createMetricBudget()
