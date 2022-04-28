#!/usr/bin/env node

import { MetricBudget } from 'calibre'

const createMetricBudget = async () => {
  const site = 'calibre' // site slug
  const measurement = 'consistently-interactive' // metric to create budget for
  const value = 5000 // budget value, ms for timing metrics

  // In this example, the budget is set to one page, for one profile
  // Omitting `pages` or `profiles` will set the budget on all pages/profiles
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
