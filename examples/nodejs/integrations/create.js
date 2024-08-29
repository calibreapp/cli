#!/usr/bin/env node

import { Integration } from 'calibre'

const createIntegration = async () => {
  const site = 'calibre' // site slug
  const provider = 'webhook' // options: slack or webhook
  const events = ['new_snapshot'] // options: 'metric_budget_change', 'new_snapshot'
  const url = 'https://mydomain.com/webhook/' // endpoint to hit

  // Create the integration
  const integration = await Integration.create({
    site,
    provider,
    events,
    url
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(integration, null, 2))
}

createIntegration()
