#!/usr/bin/env node

import { MetricBudget } from 'calibre'

const updateMetricBudget = async () => {
  const site = 'calibre' // site slug
  const uuid = '377bff6a-0445-4f69-9009-6445ed1724d0' // uuid of the metric budget
  const measurement = 'consistently-interactive' // metric to create budget for
  const value = 3500 // budget value, ms for timing metrics
  const pages = ['cd7490c0-3d76-4eb3-9761-fccb9214b771'] // uuids of pages
  const profiles = ['58f3667d-4b90-4710-a92f-5e1e0b891818'] // uuids profiles

  // Update the metric budget
  const metricBudget = await MetricBudget.update({
    site,
    uuid,
    measurement,
    value,
    pages,
    profiles
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(metricBudget, null, 2))
}

updateMetricBudget()
