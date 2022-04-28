#!/usr/bin/env node

import { MetricBudget } from 'calibre'

const deleteMetricBudget = async () => {
  const site = 'calibre' // site slug
  const uuid = 'd9e9cf5a-c3cd-4809-abf9-64c11187efa9' // uuid of the metric budget

  // Delete the metric budget
  const metricBudget = await MetricBudget.destroy({
    site,
    uuid
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(metricBudget, null, 2))
}

deleteMetricBudget()
