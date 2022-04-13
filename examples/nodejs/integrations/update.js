#!/usr/bin/env node

import { Integration } from 'calibre'

const updateIntegration = async () => {
  const site = 'calibre' // site slug
  const uuid = '59e36fca-6307-44f2-8908-1379edf7dc60' // uuid of the integration
  const destination = 'webhook' // options: slack or webhook
  const events = ['new_snapshot'] // options: 'metric_budget_change', 'new_snapshot'
  const url = 'https://new.domain.com/webhook/' // endpoint to hit
  const isDisabled = false // true or false

  // Update the integration
  const integration = await Integration.update({
    site,
    uuid,
    destination,
    events,
    url,
    isDisabled
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(integration, null, 2))
}

updateIntegration()
