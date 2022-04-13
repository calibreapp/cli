#!/usr/bin/env node

import { Integration } from 'calibre'

const createIntegration = async () => {
  const site = 'calibre' // site slug
  const destination = 'webhook' // options: slack or webhook
  const events = ['new_snapshot'] // options: 'metric_budget_change', 'new_snapshot'
  const url = 'https://mydomain.com/webhook/' // endpoint to hit

  // Create the integration
  const integration = await Integration.create({
    site,
    destination,
    events,
    url
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(integration, null, 2))
}

createIntegration()
