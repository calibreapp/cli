#!/usr/bin/env node

const { Integration } = require('calibre')

const deleteIntegration = async () => {
  const site = 'calibre' // site slug
  const uuid = '59e36fca-6307-44f2-8908-1379edf7dc60' // uuid of the integration

  // Delete the integration
  const integration = await Integration.destroy({
    site,
    uuid
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(integration, null, 2))
}

deleteIntegration()
